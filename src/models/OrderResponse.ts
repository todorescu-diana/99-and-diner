export interface OrderResponse {
  order_id: number;
  order_user_id: number;
  order_products: string;
  order_notes: string;
  order_total_price: number;
  order_address: string;
  order_date: string;
  order_time: string;
}
