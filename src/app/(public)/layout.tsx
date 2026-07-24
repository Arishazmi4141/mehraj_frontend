import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";
import { CartProvider } from "@/src/context/CartContext";
import CartDrawer from "@/src/components/cart/CartDrawer";
import FloatingCartButton from "@/src/components/cart/FloatingCartButton";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartProvider>
      <Navbar />
      {children}
      <Footer />
      <CartDrawer />
      <FloatingCartButton />
    </CartProvider>
  );
}