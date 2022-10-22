import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { themeColors } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManagerItemContainer({
  itemId,
  itemName,
  itemPrice,
  itemType,
  imageUrl,
}: {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemType: "food" | "drink";
  imageUrl: string;
}) {
  const [isEditNameActive, setIsEditNameActive] = useState(false);
  const [isEditPriceActive, setIsEditPriceActive] = useState(false);
  const [isEditUrlActive, setIsEditUrlActive] = useState(false);

  const [name, setName] = useState(itemName);
  const [price, setPrice] = useState(itemPrice);
  const [url, setUrl] = useState(imageUrl);

  const [hasItemChanged, setHasItemChanged] = useState(false);

  useEffect(() => {
    if (name !== itemName || price !== itemPrice || url !== imageUrl) {
      if (!hasItemChanged) setHasItemChanged(true);
    } else if (name === itemName && price === itemPrice && url === imageUrl) {
      if (hasItemChanged) setHasItemChanged(false);
    }
  }, [name, price, url]);

  const handleItemNameTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handlePriceTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setPrice(parseInt(event.target.value));
  };

  const handleItemUrlTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newProductInfo = {
      productId: itemId,
      productNewName: name,
      productNewPrice: price,
      productNewImageUrl: url,
    };

    const putResponseData = await axios.put(
      `http://localhost:3003/api/updateProduct/:{$productId}`,
      newProductInfo
    );
    const response = await putResponseData.data;
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
      <Box component="form" onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {isEditNameActive ? (
              <TextField
                margin="normal"
                fullWidth
                id="itemName"
                label="Nume"
                name="itemName"
                autoComplete="itemName"
                autoFocus
                sx={{ backgroundColor: "#fefcf6" }}
                onChange={handleItemNameTextChange}
              />
            ) : (
              <Typography variant="h4">{name}</Typography>
            )}
            {isEditPriceActive ? (
              <TextField
                margin="normal"
                fullWidth
                id="itemPrice"
                label="Pret"
                name="itemPrice"
                autoComplete="itemPrice"
                autoFocus
                sx={{ backgroundColor: "#fefcf6" }}
                onChange={handlePriceTextChange}
              />
            ) : (
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                {price.toString()} lei
              </Typography>
            )}
            {isEditUrlActive ? (
              <TextField
                margin="normal"
                fullWidth
                id="itemUrl"
                label="Url Imagine"
                name="itemUrl"
                autoFocus
                sx={{ backgroundColor: "#fefcf6" }}
                onChange={handleItemUrlTextChange}
              />
            ) : null}
          </Box>
          <Box sx={{ width: 200, height: 130 }}>
            <CardMedia
              component="img"
              sx={{ height: "100%", width: "100%" }}
              src={imageUrl}
              alt="URL imagine invalid"
            />
          </Box>
        </Box>
        <Box mt={2} sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, mr: 2, color: themeColors.secondary }}
            onClick={() => setIsEditNameActive(!isEditNameActive)}
          >
            {isEditNameActive ? "Salvare nume" : "Editare nume"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, color: themeColors.secondary }}
            onClick={() => setIsEditPriceActive(!isEditPriceActive)}
          >
            {isEditPriceActive ? "Salvare pret" : "Editare pret"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, ml: 2, color: themeColors.secondary }}
            onClick={() => setIsEditUrlActive(!isEditUrlActive)} // TODO selectare poza
          >
            {isEditUrlActive ? "Salvare URL imagine" : "Editare URL imagine"}
          </Button>
        </Box>
        {hasItemChanged ? (
          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, color: themeColors.secondary }}
              type="submit"
            >
              Salvare informatii produs
            </Button>
          </Box>
        ) : null}
      </Box>
    </Card>
  );
}
