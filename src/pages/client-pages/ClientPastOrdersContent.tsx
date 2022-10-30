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
    <Box>
      <Stack
        spacing={4}
        p={4}
        sx={!(userOrders.length > 0) ? { height: "65vh" } : null}
      >
        {userOrders.length > 0 ? (
          userOrders.map((userOrder, idx) => (
            <ClientPastOrderContainer key={idx} order={userOrder} />
          ))
        ) : (
          <Box m={4} sx={{ alignSelf: "center", mt: 21 }}>
            <Card
              sx={{
                backgroundColor: themeColors.secondary,
                display: "flex",
                flexDirection: "row",
                padding: 4,
                justifyContent: "center",
                height: "100%",
                borderRadius: 2,
                pr: 15,
                pl: 15,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4">
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
