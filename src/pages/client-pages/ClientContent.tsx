import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../../theme/theme";
import ClientDrinkMenuContent from "./ClientDrinkMenuContent";
import ClientCheckoutContent from "./ClientCheckoutContent";
import ClientPastOrdersContent from "./ClientPastOrdersContent";
import ClientFoodMenuContent from "./ClientFoodMenuContent";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useUserGlobalContext } from "../../contexts/UserGlobalContext";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Product } from "../../models/Product";
import { OrderResponse } from "../../models/OrderResponse";
import { Order } from "../../models/Order";
import { useTranslation } from "react-i18next";
import ChangeLanguageSelect from "../../components/ChangeLanguageSelect";

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

  const [foodProducts, setFoodProducts] = useState<Product[]>([]);
  const [drinkProducts, setDrinkProducts] = useState<Product[]>([]);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function getFoodItems() {
      try {
        const res = await axios.get("http://localhost:3003/api/get");
        const { data } = await res;
        const allProducts: Product[] = data;

        setFoodProducts(
          allProducts.filter((product) => product.product_type === "food")
        );
      } catch (err) {
        console.log(err);
      }
    }
    async function getDrinkItems() {
      try {
        const res = await axios.get("http://localhost:3003/api/get");
        const { data } = await res;
        const allProducts: Product[] = data;

        setDrinkProducts(
          allProducts.filter((product) => product.product_type === "drink")
        );
      } catch (err) {
        console.log(err);
      }
    }
    async function getUserOrders() {
      try {
        const res = await axios.get("http://localhost:3004/api/get");
        const { data } = await res;
        const allOrders: OrderResponse[] = data;

        setUserOrders(
          allOrders
            .filter((order) => order.order_user_id === userGlobalState.id)
            .map((order) => ({
              order_id: order.order_id,
              order_user_id: order.order_user_id,
              order_products: JSON.parse(order.order_products).items,
              order_notes: order.order_notes,
              order_total_price: order.order_total_price,
              order_address: order.order_address,
              order_date: order.order_date,
              order_time: order.order_time,
            }))
        );
      } catch (err) {
        console.log(err);
      }
    }
    getFoodItems();
    getDrinkItems();
    getUserOrders();
  }, [value]);

  const [t] = useTranslation("common");

  return (
    <Box sx={{ width: "100%" }} height="100vh">
      <Box
        sx={{
          bgcolor: "primary.dark",
          display: "flex",
          flexDirection: "row",
          p: 2,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: themeColors.secondary,
            flex: 0.5,
            marginLeft: 5,
          }}
        >
          99 & diner
        </Typography>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs"
        >
          <StyledTab label={t("clienttabnavigator.foodmenu")} />
          <StyledTab label={t("clienttabnavigator.drinkmenu")} />
          <StyledTab label={t("clienttabnavigator.orders")} />
          <StyledTab label={t("clienttabnavigator.cart")} />
        </StyledTabs>
        <IconButton
          sx={{ "&:hover": { color: themeColors.secondary } }}
          aria-label="minus"
          onClick={() => {
            setUserGlobalState({
              id: -1,
              email: "",
              password: "",
              role: "",
              firstName: "",
              lastName: "",
            });
            window.sessionStorage.clear();
            navigate("/");
          }}
        >
          <LogoutIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            flex: 0.5,
          }}
        >
          <Box>
            <ChangeLanguageSelect />
          </Box>
        </Box>
      </Box>

      {value === 0 || value === 1 ? (
        <>
          <Typography ml={8} mt={5} variant="h4" sx={{ fontWeight: "bold" }}>
            {t("clientcontent.greeting")}, {userGlobalState.firstName}!{" "}
          </Typography>
          {(value === 0 && foodProducts.length > 0) ||
          (value === 1 && drinkProducts.length > 0) ? (
            <Typography ml={8} mt={3} variant="h5">
              {value === 0
                ? t("clientcontent.choosefromfoodmenu")
                : t("clientcontent.choosefromdrinkmenu")}
            </Typography>
          ) : (
            <Typography ml={8} mt={3} variant="h5">
              {t("clientcontent.noproductsfound")}
            </Typography>
          )}
        </>
      ) : null}

      {value === 0 ? (
        <ClientFoodMenuContent foodProducts={foodProducts} />
      ) : null}
      {value === 1 ? (
        <ClientDrinkMenuContent drinkProducts={drinkProducts} />
      ) : null}
      {value === 2 ? <ClientPastOrdersContent userOrders={userOrders} /> : null}
      {value === 3 ? <ClientCheckoutContent setValue={setValue} /> : null}
    </Box>
  );
}
