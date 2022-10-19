import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../../theme";
import ClientDrinkMenuContent from "./ClientDrinkMenuContent";
import ClientCheckoutContent from "./ClientCheckoutContent";
import ClientPastOrdersContent from "./ClientPastOrdersContent";
import ClientFoodMenuContent from "./ClientFoodMenuContent";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Typography } from "@mui/material";
import { useUserGlobalContext } from "../../contexts/UserGlobalContext";

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

export default function ClientContent() {
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
          <StyledTab label="Cos" />
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

      <Typography ml={5} mt={5} variant="h4">
        Buna, {userGlobalState.firstName}
      </Typography>

      {value === 0 ? <ClientFoodMenuContent /> : null}
      {value === 1 ? <ClientDrinkMenuContent /> : null}
      {value === 2 ? <ClientPastOrdersContent /> : null}
      {value === 3 ? <ClientCheckoutContent setValue={setValue} /> : null}
    </Box>
  );
}
