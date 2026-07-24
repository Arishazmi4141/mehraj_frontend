// src/services/admin.service.ts
import { requestAPI } from "@/src/lib/api-client";
import { ProductPage } from "@/src/types/product";

export interface OrderSummaryDto {
  orderId: number;
  name: string;
  phone: number | null;
  amount: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  email?: string | null;
  trckngKey?: string;
  dtOfOps?: number;
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  dispatchedOrders: number;
  totalProducts: number;
  totalCategories: number;
  totalRevenue: number;
}

const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("admin_token") || "";
  return { Authorization: `Bearer ${token}` };
};

export const adminService = {
  // ✅ EXACT PURANE ANGULAR EXECUTION PATTERN PAR PARALLEL CALL MATRIX
  getDashboardMetrics: async (): Promise<{
    stats: DashboardStats;
    recentOrders: OrderSummaryDto[];
    allOrdersForChart: OrderSummaryDto[];
  }> => {
    const headers = getAuthHeaders();

    try {
      const [pendingRes, dispatchedRes, productsRes, catsRes] = await Promise.all([
        requestAPI<any>("/admin/orders?status=PENDING&page=0&size=50", { headers }),
        requestAPI<any>("/admin/orders?status=DISPATCHED&page=0&size=1", { headers }),
        requestAPI<ProductPage>("/product/getallproducts?page=0&size=1"),
        requestAPI<any[]>("/categories/getAllCategories").catch(() => []),
      ]);

      const pendingContent = pendingRes?.content || [];
      
      // Revenue configuration algorithm strictly synced from your current code
      const totalRevenue = pendingContent.reduce((sum: number, o: any) => sum + (o.amount || 0), 0);

      return {
        stats: {
          totalOrders: pendingRes?.totalElements || 0,
          pendingOrders: pendingRes?.totalElements || 0,
          dispatchedOrders: dispatchedRes?.totalElements || 0,
          totalProducts: productsRes?.totalElements || 0,
          totalCategories: Array.isArray(catsRes) ? catsRes.length : 0,
          totalRevenue,
        },
        recentOrders: pendingContent.slice(0, 5), // Slice top 5 exactly as configured
        allOrdersForChart: pendingContent,
      };
    } catch (error) {
      console.error("Dashboard parallel sequence metrics breakdown:", error);
      throw error;
    }
  },

  dispatchOrder: (orderId: number): Promise<string> => {
    return requestAPI<string>(`/admin/dispatch/${orderId}`, {
      method: "POST",
      headers: getAuthHeaders(),
    }, true);
  }
};