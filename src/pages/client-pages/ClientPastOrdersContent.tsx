import { themeColors } from "../../theme";
import { Stack } from "@mui/system";
import ClientPastOrderContainer from "../../components/client/ClientPastOrderContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "../../models/Order";
import { useUserGlobalContext } from "../../contexts/UserGlobalContext";
import { Box, Card, Typography } from "@mui/material";
import { OrderResponse } from "../../models/OrderResponse";

export default function ClientPastOrdersContent() {
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  const [userGlobalState] = useUserGlobalContext();

  useEffect(() => {
    async function getUserOrders() {
      try {
        const res = await axios.get("http://localhost:3004/api/get");
        const { data } = await res;
        const allOrders: OrderResponse[] = data;

        setUserOrders(
          allOrders
            .filter((order) => order.order_user_id === userGlobalState.id)
            .map((order) => ({
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
    getUserOrders();
  }, []);

  // useEffect(() => {
  //   if (userOrders.length > 0) {
  //     console.log("AICI:" + userOrders[0].order_products);
  //     console.log("AICI:" + JSON.parse(userOrders.order_products).items);
  //   }
  // }, [userOrders]);

  return (
    <Stack spacing={4}>
      {userOrders.length > 0 ? (
        userOrders.map((userOrder, idx) => (
          <ClientPastOrderContainer key={idx} order={userOrder} />
        ))
      ) : (
        <Box m={4}>
          <Card
            sx={{
              backgroundColor: themeColors.secondary,
              display: "flex",
              flexDirection: "row",
              padding: 4,
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography mb={4} variant="h3">
                Nu s-au gasit comenzi anterioare.
              </Typography>
            </Box>
          </Card>
        </Box>
      )}
    </Stack>
  );
}
