import { themeColors } from "../../theme/theme";
import { Stack } from "@mui/system";
import ClientPastOrderContainer from "../../components/client/ClientPastOrderContainer";
import { Order } from "../../models/Order";
import { Box, Card, Typography } from "@mui/material";
import StyledFooter from "../../components/StyledFooter";

export default function ClientPastOrdersContent({
  userOrders,
}: {
  userOrders: Order[];
}) {
  return (
    <Box sx={{ width: "100%" }} height="100vh">
      <Stack spacing={4} p={4}>
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
      <StyledFooter />
    </Box>
  );
}
