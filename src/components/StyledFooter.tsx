import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { themeColors } from "../theme/theme";

export default function StyledFooter() {
  const [t] = useTranslation("common");
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
      p={4}
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
          {t("footer.address")}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: themeColors.background }}>
          Strada Amforei, nr. 9, Zona Circumvalaţiunii, Timişoara, România
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
          {t("footer.contact")}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: themeColors.background }}>
          +40 364 413 422
        </Typography>
        <Typography variant="subtitle1" sx={{ color: themeColors.background }}>
          support@99&diner.ro
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
          {t("footer.openinghours")}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: themeColors.background }}>
          {t("footer.mondayfriday")} 08 - 22
        </Typography>
        <Typography variant="subtitle1" sx={{ color: themeColors.background }}>
          {t("footer.saturdaysunday")} Nonstop
        </Typography>
      </Box>
    </Box>
  );
}
