import { Box, Card, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { Order } from "../../models/Order";
import { themeColors } from "../../theme/theme";
import ClientPastOrderContainerRow from "./ClientPastOrderContainerRow";

export default function ClientPastOrderContainer({ order }: { order: Order }) {
  return (
    <Box sx={{ width: "50%", alignSelf: "center" }}>
      <Card
        sx={{
          backgroundColor: themeColors.secondary,
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
          <ClientPastOrderContainerRow
            leftContent={
              <Typography sx={{ flex: 1, fontWeight: "bold" }} variant="h5">
                Produse:
              </Typography>
            }
            rightContent={
              <>
                {order.order_products.map((product, idx) => (
                  <Box key={idx}>
                    <Typography sx={{ textAlign: "center" }} variant="h6">
                      {product.product_name} x {product.product_qty}
                    </Typography>
                  </Box>
                ))}
              </>
            }
          />
          <ClientPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h5" sx={{ fontWeight: "bold" }}>
                Pret total:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h6">
                {order.order_total_price}
              </Typography>
            }
          />

          <ClientPastOrderContainerRow
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

          <ClientPastOrderContainerRow
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

          <ClientPastOrderContainerRow
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

          <ClientPastOrderContainerRow
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
