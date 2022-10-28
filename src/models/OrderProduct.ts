export interface OrderProduct {
  product_id: number;
  product_name: string;
  product_price: number;
  product_type: "food" | "drink";
  product_image_url: string;
  product_qty: number;
}
