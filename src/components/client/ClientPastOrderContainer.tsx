import { Box, Card, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Order } from "../../models/Order";
import { themeColors } from "../../theme/theme";
import ClientPastOrderContainerRow from "./ClientPastOrderContainerRow";

export default function ClientPastOrderContainer({ order }: { order: Order }) {
  const [t] = useTranslation("common");
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
                {t("clientpastordercontainer.products")}:
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
                {t("clientpastordercontainer.totalprice")}:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h6">
                {order.order_total_price} lei
              </Typography>
            }
          />

          <ClientPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h5" sx={{ fontWeight: "bold" }}>
                {t("clientpastordercontainer.specialindications")}:
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
                {t("clientpastordercontainer.orderdate")}:
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
                {t("clientpastordercontainer.ordertime")}:
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
                {t("clientpastordercontainer.orderaddress")}:
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
