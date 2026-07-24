import { requestAPI } from "@/src/lib/api-client";
import { guestService } from "@/src/services/guest.service";

export interface CartItem {
  cartItemId: number;
  productId: number;
  variantId: number;
  productName: string;
  imageUrl: string;
  size: string;
  quantity: number;
  stockAvailable: number;
  currentPrice: number;
}

type Listener = (items: CartItem[]) => void;

class CartService {
  private items: CartItem[] = [];
  private listeners: Listener[] = [];
  private pendingCalls = new Map<number, boolean>();

  // Subscribe to cart changes (like BehaviorSubject)
  subscribe(listener: Listener) {
    this.listeners.push(listener);
    listener(this.items);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.items]));
  }

  getGuestId(): string {
    return guestService.getOrCreateGuestId();
  }

  async fetchCart(): Promise<void> {
    try {
      const guestId = this.getGuestId();
      const data = await requestAPI<CartItem[]>(`/cart/${guestId}`);
      this.items = data.filter((i) => i.quantity > 0);
      this.notify();
    } catch (err) {
      console.error("Cart fetch failed", err);
    }
  }

  async addItem(variantId: number, quantity: number = 1): Promise<void> {
    try {
      await requestAPI("/cart/addcart", {
        method: "POST",
        body: JSON.stringify({
          guestId: this.getGuestId(),
          quantity: String(quantity),
          variantId: String(variantId),
        }),
      }, true);
      await this.fetchCart();
    } catch (err) {
      throw err;
    }
  }

  async increment(variantId: number): Promise<void> {
    const item = this.items.find((i) => i.variantId === variantId);
    if (!item || item.quantity >= item.stockAvailable || this.pendingCalls.get(variantId)) return;

    this.pendingCalls.set(variantId, true);
    const originalItems = [...this.items];
    
    // Optimistic UI Update
    this.items = this.items.map((i) => i.variantId === variantId ? { ...i, quantity: i.quantity + 1 } : i);
    this.notify();

    try {
      await requestAPI(`/cart/item/${item.cartItemId}/increase`, { method: "PUT" }, true);
    } catch (err) {
      this.items = originalItems; // Revert on fail
      this.notify();
    } finally {
      this.pendingCalls.delete(variantId);
    }
  }

  async decrement(variantId: number): Promise<void> {
    const item = this.items.find((i) => i.variantId === variantId);
    if (!item || this.pendingCalls.get(variantId)) return;

    this.pendingCalls.set(variantId, true);
    const originalItems = [...this.items];

    if (item.quantity <= 1) {
      this.items = this.items.filter((i) => i.variantId !== variantId);
    } else {
      this.items = this.items.map((i) => i.variantId === variantId ? { ...i, quantity: i.quantity - 1 } : i);
    }
    this.notify();

    try {
      await requestAPI(`/cart/item/${item.cartItemId}/decrease`, { method: "PUT" }, true);
    } catch (err) {
      this.items = originalItems;
      this.notify();
    } finally {
      this.pendingCalls.delete(variantId);
    }
  }

  async removeItem(cartItemId: number): Promise<void> {
    const guestId = this.getGuestId();
    const originalItems = [...this.items];
    this.items = this.items.filter((i) => i.cartItemId !== cartItemId);
    this.notify();

    try {
      await requestAPI(`/cart/${guestId}/${cartItemId}`, { method: "DELETE" }, true);
    } catch (err) {
      this.items = originalItems;
      this.notify();
    }
  }
  
  async clearCart(): Promise<void> {
    const guestId = this.getGuestId();
    const originalItems = [...this.items];

    this.items = [];
    this.notify();

    try {
      await requestAPI(`/cart/${guestId}`, { method: "DELETE" }, true);
    } catch (err) {
      this.items = originalItems;
      this.notify();
      throw err;
    }
  }
  
  getTotalPrice(): number {
    return this.items.reduce((sum, i) => sum + i.currentPrice * i.quantity, 0);
  }
}

export const cartService = new CartService();