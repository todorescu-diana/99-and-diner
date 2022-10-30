import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Order } from "../../models/Order";
import { User } from "../../models/User";
import { themeColors } from "../../theme/theme";
import ManagerPastOrderContainerRow from "./ManagerPastOrderContainerRow";
// TODO DACA NU SUNT COMENZI + DACA COSUL ESTE GOL + DACA NU SE GASESC ITEME IN MENIU + FONT + LOGO

export default function ManagerPastOrderContainer({ order }: { order: Order }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getClientInfo() {
      try {
        // const res = await axios.get(
        //   `http://localhost:3002/api/getFromId/:${order.order_user_id}`,
        //   { params: { userId: order.order_user_id } }
        // );
        const res = await axios.get("http://localhost:3002/api/get");
        const { data } = await res;
        const allUsers: User[] = data;

        const orderUser: User | undefined = allUsers.find(
          (user) => user.user_id === order.order_user_id
        );

        setUserName(
          orderUser?.user_last_name + " " + orderUser?.user_first_name
        );
      } catch (err) {
        console.log(err);
      }
    }
    getClientInfo();
  }, []);
  return (
    <Box
      sx={{
        width: "90%",
        alignSelf: "center",
      }}
    >
      <Card
        sx={{
          backgroundColor: themeColors.secondary,
          flex: 1,
          display: "flex",
          flexDirection: "row",
          padding: 4,
          justifyContent: "space-between",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Nume client:
              </Typography>
            }
            rightContent={<Typography variant="h6">{userName}</Typography>}
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography
                sx={{ flex: 1, fontWeight: "bold" }}
                mt={3}
                variant="h5"
              >
                Produse:
              </Typography>
            }
            rightContent={
              <Box mt={3}>
                {order.order_products.map((orderProduct) => (
                  <Typography variant="h6">
                    {orderProduct.product_name} x {orderProduct.product_qty}
                  </Typography>
                ))}
              </Box>
            }
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h5" sx={{ fontWeight: "bold" }}>
                Indicatii speciale:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h6">
                {order.order_notes !== "" ? order.order_notes : "-"}
              </Typography>
            }
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h5" sx={{ fontWeight: "bold" }}>
                Pret total:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h6">
                {order.order_total_price} lei
              </Typography>
            }
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h5" sx={{ fontWeight: "bold" }}>
                Data plasarii comenzii:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h6">
                {order.order_date}
              </Typography>
            }
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h5" sx={{ fontWeight: "bold" }}>
                Ora plasarii comenzii:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h6">
                {order.order_time}
              </Typography>
            }
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h5" sx={{ fontWeight: "bold" }}>
                Adresa livrarii:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h6">
                {order.order_address}
              </Typography>
            }
          />
        </Box>
      </Card>
    </Box>
  );
}
