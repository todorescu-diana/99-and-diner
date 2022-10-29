import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ManagerItemContainer from "../../components/manager/ManagerItemContainer";
import { Product } from "../../models/Product";
import { themeColors } from "../../theme/theme";

export default function ManagerFoodMenuContent() {
  const [foodProducts, setFoodProducts] = useState<Product[]>([]);

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
    getFoodItems();
  }, []);

  const [open, setOpen] = useState(false);
  function handleDeletePress() {}

  return (
    <Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: themeColors.secondary,
            border: "2px solid #000",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sunteti sigur ca doriti sa stergeti produsul din meniul de mancare?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Aceasta actiune nu poate fi revocata.
          </Typography>
          <Box
            mt={2}
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              fullWidth
              variant="contained"
              sx={{ mt: 2, mr: 2, color: themeColors.secondary }}
            >
              Renuntare
            </Button>
            <Button
              onClick={handleDeletePress}
              fullWidth
              variant="contained"
              sx={{ mt: 2, color: themeColors.secondary }}
            >
              Stergere produs
            </Button>
          </Box>
        </Box>
      </Modal>
      <Stack spacing={4} m={4} p={4}>
        {foodProducts.map((foodProduct, idx) => (
          <ManagerItemContainer
            key={idx}
            itemId={foodProduct.product_id}
            itemName={foodProduct.product_name}
            itemPrice={foodProduct.product_price}
            itemType={foodProduct.product_type}
            imageUrl={foodProduct.product_image_url}
            setOpen={setOpen}
          />
        ))}
      </Stack>
    </Box>
  );
}
