import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import ManagerPastOrderContainer from "../../components/manager/ManagerPastOrderContainer";
import { Order } from "../../models/Order";
import { OrderResponse } from "../../models/OrderResponse";

export default function ManagerPastOrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function getRestaurantOrders() {
      try {
        const res = await axios.get("http://localhost:3004/api/get");
        const { data } = await res;
        const allOrders: OrderResponse[] = data;

        setOrders(
          allOrders.map((order) => ({
            order_id: order.order_id,
            order_user_id: order.order_user_id,
            order_products: JSON.parse(order.order_products).items,
            order_notes: order.order_notes,
            order_total_price: order.order_total_price,
            order_address: order.order_address,
            order_date: order.order_date,
            order_time: order.order_time,
          }))
        );
      } catch (err) {
        console.log(err);
      }
    }
    getRestaurantOrders();
  }, []);

  return (
    <Stack
      spacing={4}
      p={4}
      pt={8}
      pb={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      {orders.map((order) => (
        <ManagerPastOrderContainer order={order} />
      ))}
    </Stack>
  );
}
