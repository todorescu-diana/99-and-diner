import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ManagerItemContainer from "../../components/manager/ManagerItemContainer";
import { Product } from "../../models/Product";

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

  return (
    <Box>
      <Stack spacing={4} m={4} p={4} pb={8}>
        {foodProducts.map((foodProduct) => (
          <ManagerItemContainer
            key={foodProduct.product_id.toString()}
            itemId={foodProduct.product_id}
            itemName={foodProduct.product_name}
            itemPrice={foodProduct.product_price}
            imageUrl={foodProduct.product_image_url}
            products={foodProducts}
            setProducts={setFoodProducts}
          />
        ))}
      </Stack>
    </Box>
  );
}
