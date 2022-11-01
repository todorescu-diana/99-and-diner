import { Box, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import Flags from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

export default function ChangeLanguageSelect() {
  const [, i18n] = useTranslation("common");
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  return (
    <TextField
      select
      label=""
      sx={{ backgroundColor: "#fefcf6", borderRadius: 2 }}
      value={currentLanguage}
      onChange={(t) => {
        setCurrentLanguage(t.target.value);
        i18n.changeLanguage(t.target.value);
      }}
      fullWidth
      InputLabelProps={{ shrink: false }}
      SelectProps={{ MenuProps: { disableScrollLock: true } }}
    >
      <MenuItem key={1} value="ro">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Flags.RO width={15} height={25} />
        </Box>
      </MenuItem>
      <MenuItem key={2} value="en">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Flags.GB width={15} height={25} />
        </Box>
      </MenuItem>
    </TextField>
  );
}
