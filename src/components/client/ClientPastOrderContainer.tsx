import { Box, Card, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { Order } from "../../models/Order";
import { themeColors } from "../../theme";
import ClientPastOrderContainerRow from "./ClientPastOrderContainerRow";
// TODO DACA NU SUNT COMENZI + DACA COSUL ESTE GOL + DACA NU SE GASESC ITEME IN MENIU + FONT + LOGO

export default function ClientPastOrderContainer({ order }: { order: Order }) {
  return (
    <Box>
      <Card
        sx={{
          backgroundColor: themeColors.secondary,
          display: "flex",
          flexDirection: "row",
          padding: 4,
          justifyContent: "space-between",
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
          <ClientPastOrderContainerRow
            leftContent={
              <Typography sx={{ flex: 1 }} variant="h4">
                Produse:
              </Typography>
            }
            rightContent={
              <>
                {order.order_products.map((product, idx) => {
                  console.log("PRODUCT: " + JSON.stringify(product));

                  return (
                    <Box key={idx}>
                      <Typography sx={{ textAlign: "center" }} variant="h5">
                        {product.product_name} x {product.product_qty}
                      </Typography>
                    </Box>
                  );
                })}
              </>
            }
          />
          <ClientPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h4">
                Pret total:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h5">
                {order.order_total_price}
              </Typography>
            }
          />

          <ClientPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h4">
                Indicatii speciale:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h5">
                {order.order_notes}
              </Typography>
            }
          />

          <ClientPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h4">
                Data plasarii comenzii:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h5">
                {order.order_date}
              </Typography>
            }
          />

          <ClientPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h4">
                Ora plasarii comenzii:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h5">
                {order.order_time}
              </Typography>
            }
          />

          <ClientPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h4">
                Adresa livrarii:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h5">
                {order.order_address}
              </Typography>
            }
          />
        </Box>
      </Card>
    </Box>
  );
}
