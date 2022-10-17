import { Box, Card, Typography } from "@mui/material";
import { themeColors } from "../theme";
    // TODO DACA NU SUNT COMENZI + DACA COSUL ESTE GOL + DACA NU SE GASESC ITEME IN MENIU + FONT + LOGO

export default function ClientPastOrderContainer() {
  return (
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
          </Box>
          <Box
            ml={20}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h5">exemplu produs1 x 1</Typography>
              <Typography variant="h5">exemplu produs2 x 4</Typography>
            </Box>

            <Typography variant="h5">pret test</Typography>
            <Typography mt={3} variant="h5">
              data
            </Typography>
            <Typography mt={3} variant="h5">
              ora
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
