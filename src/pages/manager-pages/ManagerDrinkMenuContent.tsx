import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ManagerItemContainer from "../../components/manager/ManagerItemContainer";
import { Product } from "../../models/Product";

export default function ManagerDrinkMenuContent() {
  const [drinkProducts, setDrinkProducts] = useState<Product[]>([]);

  useEffect(() => {
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
    getDrinkItems();
  }, []);

  return (
    <Box>
      <Stack spacing={4} m={4} p={4} pb={8}>
        {drinkProducts.map((drinkProduct) => (
          <ManagerItemContainer
            key={drinkProduct.product_id.toString()}
            itemId={drinkProduct.product_id}
            itemName={drinkProduct.product_name}
            itemPrice={drinkProduct.product_price}
            imageUrl={drinkProduct.product_image_url}
            products={drinkProducts}
            setProducts={setDrinkProducts}
          />
        ))}
      </Stack>
    </Box>
  );
}
