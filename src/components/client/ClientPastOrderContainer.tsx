import { Box, Card, Typography } from "@mui/material";
import { useEffect } from "react";
import { Order } from "../../models/Order";
import { themeColors } from "../../theme";
// TODO DACA NU SUNT COMENZI + DACA COSUL ESTE GOL + DACA NU SE GASESC ITEME IN MENIU + FONT + LOGO

export default function ClientPastOrderContainer({ order }: { order: Order }) {
  useEffect(() => console.log(order.order_products), [])
  return (
    <Box m={4}>
      <Card
        sx={{
          backgroundColor: themeColors.secondary,
          display: "flex",
          flexDirection: "row",
          padding: 4,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Produse:</Typography>
            <Typography mt={3} variant="h4">
              Pret total:
            </Typography>
            <Typography mt={3} variant="h4">
              Data plasarii comenzii:
            </Typography>
            <Typography mt={3} variant="h4">
              Ora plasarii comenzii:
            </Typography>
            <Typography mt={3} variant="h4">
              Adresa livrarii:
            </Typography>
          </Box>
          <Box
            ml={20}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {order.order_products.map((product, idx) => (
              <Box key={idx}>
                <Typography variant="h5">
                  {product.product_name} x {product.product_qty}
                </Typography>
              </Box>
            ))}

            <Typography variant="h5">{order.order_total_price}</Typography>
            <Typography mt={3} variant="h5">
              {order.order_date}
            </Typography>
            <Typography mt={3} variant="h5">
              {order.order_time}
            </Typography>
            <Typography mt={3} variant="h5">
              {order.order_address}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
