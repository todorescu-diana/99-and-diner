import { Box, Typography } from "@mui/material";
import { themeColors } from "../theme/theme";

export default function StyledFooter() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "primary.main",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
      p={2}
    >
      <Typography variant="h4" sx={{ color: themeColors.secondary }}>
        99 & diner
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        p={2}
      >
        <Typography variant="h5" sx={{ color: themeColors.background }}>
          Adresa:
        </Typography>
        <Typography variant="subtitle1" sx={{ color: themeColors.background }}>
          filler adresa
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        p={2}
      >
        <Typography variant="h5" sx={{ color: themeColors.background }}>
          Contact:
        </Typography>
        <Typography variant="subtitle1" sx={{ color: themeColors.background }}>
          filler telefon
        </Typography>
        <Typography variant="subtitle1" sx={{ color: themeColors.background }}>
          filler email
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        p={2}
      >
        <Typography variant="h5" sx={{ color: themeColors.background }}>
          Orar:
        </Typography>
        <Typography variant="subtitle1" sx={{ color: themeColors.background }}>
          filler orar
        </Typography>
      </Box>
    </Box>
  );
}
