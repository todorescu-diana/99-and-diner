import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import { themeColors } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useClientOrderContext } from "../../contexts/ClientOrderContext";

export default function ClientItemContainer({
  itemName,
  itemPrice,
  itemType,
}: {
  itemName: string;
  itemPrice: number;
  itemType: "food" | "drink";
}) {
  const [itemQty, setItemQty] = useState(0);
  const [clientOrderState, setClientOrderState] = useClientOrderContext();

  function handleMinusPress() {
    const currentItemInOrderProductArray = clientOrderState.orderProducts.find(
      (orderProduct) => orderProduct.productName === itemName
    );
    if (itemQty > 0) {
      setItemQty(itemQty - 1);

      if (currentItemInOrderProductArray !== undefined) {
        setClientOrderState({
          orderProducts: clientOrderState.orderProducts.map((orderProduct) => {
            if (orderProduct.productName === itemName)
              return {
                productName: orderProduct.productName,
                productPrice: orderProduct.productPrice,
                productType: orderProduct.productType,
                productQty: orderProduct.productQty - 1,
              };
            return orderProduct;
          }),
          orderTotalPrice:
            clientOrderState.orderTotalPrice -
            currentItemInOrderProductArray.productPrice *
              (currentItemInOrderProductArray.productQty - 1),
        });
      }
    } else {
      if (currentItemInOrderProductArray !== undefined) {
        // delete item from order
        setClientOrderState({
          orderProducts: clientOrderState.orderProducts.filter(
            (orderProduct) => orderProduct.productName !== itemName
          ),
          orderTotalPrice:
            clientOrderState.orderTotalPrice -
            currentItemInOrderProductArray.productPrice *
              currentItemInOrderProductArray.productQty,
        });
      }
    }
  }

  function handlePlusPress() {
    setItemQty(itemQty + 1);

    const currentItemInOrderProductArray = clientOrderState.orderProducts.find(
      (orderProduct) => orderProduct.productName === itemName
    );
    if (currentItemInOrderProductArray !== undefined) {
      //item is already included in order
      setClientOrderState({
        orderProducts: clientOrderState.orderProducts.map((orderProduct) => {
          if (orderProduct.productName === itemName)
            return {
              productName: orderProduct.productName,
              productPrice: orderProduct.productPrice,
              productType: orderProduct.productType,
              productQty: orderProduct.productQty + 1,
            };
          return orderProduct;
        }),
        orderTotalPrice:
          clientOrderState.orderTotalPrice +
          currentItemInOrderProductArray.productPrice *
            (currentItemInOrderProductArray.productQty + 1),
      });
    } else {
      setClientOrderState({
        orderProducts: [
          ...clientOrderState.orderProducts,
          {
            productName: itemName,
            productPrice: itemPrice,
            productType: itemType,
            productQty: 1,
          },
        ],
        orderTotalPrice: clientOrderState.orderTotalPrice + itemPrice,
      });
    }
  }

  return (
    <Card
      sx={{
        backgroundColor: themeColors.secondary,
        display: "flex",
        flexDirection: "row",
        padding: 4,
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">{itemName}</Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {itemPrice.toString()} lei
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignSelf: "flex-start",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="minus"
            onClick={handleMinusPress}
            sx={{ mr: 2 }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{itemQty}</Typography>
          <IconButton
            aria-label="plus"
            onClick={handlePlusPress}
            sx={{ ml: 2 }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ width: 200, height: 130 }}>
        <CardMedia
          component="img"
          sx={{ height: "100%", width: "100%" }}
          image={require("../../assets/imagetest.jpg")}
          alt="alt"
        />
      </Box>
    </Card>
  );
}
