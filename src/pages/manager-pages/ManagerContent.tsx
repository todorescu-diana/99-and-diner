import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../../theme";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useUserGlobalContext } from "../../contexts/UserGlobalContext";
import ManagerFoodMenuContent from "./ManagerFoodMenuContent";
import ManagerDrinkMenuContent from "./ManagerDrinkMenuContent";
import ManagerPastOrdersContent from "./ManagerPastOrdersContent";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    centered
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: themeColors.primary,
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.4)",
  "&.Mui-selected": {
    color: themeColors.secondary,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

export default function ManagerContent() {
  const [value, setValue] = React.useState(0);
  let navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [userGlobalState, setUserGlobalState] = useUserGlobalContext();

  return (
    <Box sx={{ width: "100%" }} height="100vh">
      <Box
        sx={{
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "row",
          p: 2,
          justifyContent: "center",
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Meniu Mancare" />
          <StyledTab label="Meniu Bauturi" />
          <StyledTab label="Comenzi anterioare" />
        </StyledTabs>
        <IconButton
          sx={{ "&:hover": { color: themeColors.secondary } }}
          aria-label="minus"
          onClick={() => {
            setUserGlobalState({
              email: "",
              password: "",
              role: "",
              firstName: "",
              lastName: "",
            });
            navigate("/");
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Box>

      {value === 0 ? <ManagerFoodMenuContent /> : null}
      {value === 1 ? <ManagerDrinkMenuContent /> : null}
      {value === 2 ? <ManagerPastOrdersContent /> : null}
    </Box>
  );
}