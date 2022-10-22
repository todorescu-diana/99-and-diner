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

export default function ManagerItemContainer({
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
  const [isEditNameActive, setIsEditNameActive] = useState(false);
  const [isEditPriceActive, setIsEditPriceActive] = useState(false);

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
  }, [name, price, imageUrl]);

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
        </Box>
        <Box sx={{ width: 200, height: 130 }}>
          <CardMedia
            component="img"
            sx={{ height: "100%", width: "100%" }}
            image={require("../../assets/imagetest.jpg")}
            alt="alt"
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
          onClick={() => {}} // TODO selectare poza
        >
          Editare poza
        </Button>
      </Box>
      {hasItemChanged ? (
        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, color: themeColors.secondary }}
          >
            Salvare informatii produs
          </Button>
        </Box>
      ) : null}
    </Card>
  );
}
