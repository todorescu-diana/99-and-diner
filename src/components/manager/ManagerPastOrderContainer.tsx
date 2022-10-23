import { Box, Card, Typography } from "@mui/material";
import { themeColors } from "../../theme";
import ManagerPastOrderContainerRow from "./ManagerPastOrderContainerRow";
// TODO DACA NU SUNT COMENZI + DACA COSUL ESTE GOL + DACA NU SE GASESC ITEME IN MENIU + FONT + LOGO

export default function ManagerPastOrderContainer() {
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
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ManagerPastOrderContainerRow
            leftContent={<Typography variant="h4">Nume client:</Typography>}
            rightContent={<Typography variant="h5">nume test</Typography>}
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography sx={{ flex: 1 }} mt={3} variant="h4">
                Produse:
              </Typography>
            }
            rightContent={
              <Box mt={3}>
                <Typography variant="h5">exemplu produs1 x 1</Typography>
                <Typography variant="h5">exemplu produs2 x 4</Typography>
              </Box>
            }
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h4">
                Indicatii speciale
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h5">
                indicatii
              </Typography>
            }
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h4">
                Pret total:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h5">
                pret test
              </Typography>
            }
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h4">
                Data plasarii comenzii:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h5">
                data
              </Typography>
            }
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h4">
                Ora plasarii comenzii:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h5">
                ora
              </Typography>
            }
          />
          <ManagerPastOrderContainerRow
            leftContent={
              <Typography mt={3} variant="h4">
                Adresa livrarii:
              </Typography>
            }
            rightContent={
              <Typography mt={3} variant="h5">
                adresa
              </Typography>
            }
          />
        </Box>
      </Card>
    </Box>
  );
}
