import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import { themeColors } from "../theme";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

export default function ClientItemContainer({
  itemName,
  itemPrice,
}: {
  itemName: string;
  itemPrice: string;
}) {
  const [itemQty, setItemQty] = useState(0);
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
          {itemPrice} lei
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
            onClick={() => setItemQty(itemQty - 1)}
            sx={{ mr: 2 }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{itemQty}</Typography>
          <IconButton
            aria-label="plus"
            onClick={() => setItemQty(itemQty + 1)}
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
          image={require("../assets/imagetest.jpg")}
          alt="alt"
        />
      </Box>
    </Card>
  );
}
