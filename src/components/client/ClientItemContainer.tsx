import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import { themeColors } from "../../theme/theme";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import { useClientOrderContext } from "../../contexts/ClientOrderContext";

export default function ClientItemContainer({
  itemName,
  itemPrice,
  itemType,
  imageUrl,
}: {
  itemName: string;
  itemPrice: number;
  itemType: "food" | "drink";
  imageUrl: string;
}) {
  const [itemQty, setItemQty] = useState(0);
  const [clientOrderState, setClientOrderState] = useClientOrderContext();

  useEffect(() => {
    const currentProduct = clientOrderState.order_products.find(
      (orderProduct) => orderProduct.product_name === itemName
    );
    if (currentProduct !== undefined) {
      setItemQty(currentProduct.product_qty);
    }
  }, []);

  function handleMinusPress() {
    const currentItemInOrderProductArray = clientOrderState.order_products.find(
      (orderProduct) => orderProduct.product_name === itemName
    );
    if (itemQty > 1) {
      setItemQty(itemQty - 1);

      if (currentItemInOrderProductArray !== undefined) {
        setClientOrderState({
          order_products: clientOrderState.order_products.map(
            (orderProduct) => {
              if (orderProduct.product_name === itemName)
                return {
                  product_name: orderProduct.product_name,
                  product_price: orderProduct.product_price,
                  product_type: orderProduct.product_type,
                  product_qty: orderProduct.product_qty - 1,
                };
              return orderProduct;
            }
          ),
          order_total_price:
            clientOrderState.order_total_price -
            currentItemInOrderProductArray.product_price,
          order_notes: clientOrderState.order_notes,
        });
      }
    } else {
      if (currentItemInOrderProductArray !== undefined) {
        // delete item from order
        setClientOrderState({
          order_products: clientOrderState.order_products.filter(
            (orderProduct) => orderProduct.product_name !== itemName
          ),
          order_total_price:
            clientOrderState.order_total_price -
            currentItemInOrderProductArray.product_price *
              currentItemInOrderProductArray.product_qty,
          order_notes: clientOrderState.order_notes,
        });
      }
    }
  }

  function handlePlusPress() {
    setItemQty(itemQty + 1);

    const currentItemInOrderProductArray = clientOrderState.order_products.find(
      (orderProduct) => orderProduct.product_name === itemName
    );
    if (currentItemInOrderProductArray !== undefined) {
      //item is already included in order
      setClientOrderState({
        order_products: clientOrderState.order_products.map((orderProduct) => {
          if (orderProduct.product_name === itemName)
            return {
              product_name: orderProduct.product_name,
              product_price: orderProduct.product_price,
              product_type: orderProduct.product_type,
              product_qty: orderProduct.product_qty + 1,
            };
          return orderProduct;
        }),
        order_total_price:
          clientOrderState.order_total_price +
          currentItemInOrderProductArray.product_price,
        order_notes: clientOrderState.order_notes,
      });
    } else {
      setClientOrderState({
        order_products: [
          ...clientOrderState.order_products,
          {
            product_name: itemName,
            product_price: itemPrice,
            product_type: itemType,
            product_qty: 1,
          },
        ],
        order_total_price: clientOrderState.order_total_price + itemPrice,
        order_notes: clientOrderState.order_notes,
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
        justifyContent: "flex-start",
        width: "35%",
        height: 250,
        alignSelf: "center",
        margin: 2,
        borderRadius: 2,
      }}
    >
      <Box sx={{ width: 200, height: 130, alignSelf: "center" }} mr={5}>
        <CardMedia
          component="img"
          sx={{ height: "100%", width: "100%", borderRadius: 2 }}
          src={imageUrl}
          alt="alt"
        />
      </Box>
      <Box
        maxWidth={250}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            wordWrap: "break-word",
            fontWeight: "bold",
            color: "primary.dark",
          }}
        >
          {itemName}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 3 }}>
          {itemPrice.toString()} lei
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          mt={2}
        >
          <IconButton
            aria-label="minus"
            onClick={handleMinusPress}
            sx={{ mr: 2 }}
          >
            <RemoveIcon color={"primary"} />
          </IconButton>
          <Typography>{itemQty}</Typography>
          <IconButton
            aria-label="plus"
            onClick={handlePlusPress}
            sx={{ ml: 2 }}
          >
            <AddIcon color={"primary"} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
