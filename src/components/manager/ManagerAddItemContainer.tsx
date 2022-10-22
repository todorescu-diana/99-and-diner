import {
  Box,
  Button,
  Card,
  CardMedia,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { themeColors } from "../../theme";

export default function ManagerAddItemContainer() {
  const [imageUrl, setImageUrl] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await axios.get("http://localhost:3002/api/get");
    const { data } = await res;
    const totalNumberOfProducts = data.length;

    const newProduct = {
      productId: totalNumberOfProducts,
      productName: formData.get("itemName"),
      productPrice: formData.get("itemPrice"),
      productType: "food",
      // productType: formData.get("itemType"),
      // TODO daca nu se alege nimic
      productImageUrl: formData.get("itemUrl"),
    };

    const postResponseData = await axios.post(
      "http://localhost:3003/api/create",
      newProduct
    );
    const response = await postResponseData.data;
  };

  return (
    <Card
      sx={{
        backgroundColor: themeColors.secondary,
        display: "flex",
        flexDirection: "column",
        padding: 4,
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            p: 4,
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="itemName"
            label="Nume"
            name="itemName"
            autoComplete="itemName"
            autoFocus
            sx={{ backgroundColor: "#fefcf6" }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="itemPrice"
            label="Pret"
            name="itemPrice"
            autoComplete="itemPrice"
            sx={{ backgroundColor: "#fefcf6" }}
          />
          <TextField
            select
            label="Tip Produs"
            id="itemType"
            name="itemType"
            fullWidth
            sx={{ backgroundColor: "#fefcf6", mt: 2 }}
          >
            <MenuItem key={1} value="food">
              Mancare
            </MenuItem>
            <MenuItem key={2} value="drink">
              Bautura
            </MenuItem>
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            id="itemUrl"
            label="Url Imagine"
            name="itemUrl"
            sx={{ backgroundColor: "#fefcf6", mt: 3 }}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Box mt={2} sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, color: themeColors.secondary }}
              type="submit"
              // TODO selectare poza
            >
              Adaugare produs
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: 200, height: 130 }}>
          <CardMedia
            component="img"
            sx={{ height: "100%", width: "100%" }}
            src={imageUrl}
            alt="Invalid Image Url."
          />
        </Box>
      </Box>
    </Card>
  );
}
