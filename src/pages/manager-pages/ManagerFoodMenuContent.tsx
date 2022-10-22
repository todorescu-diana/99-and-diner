import { Box, Button, Stack } from "@mui/material";
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
    <Stack spacing={4} m={4}>
      {foodProducts.map((foodProduct, idx) => (
        <ManagerItemContainer
          key={idx}
          itemId={foodProduct.product_id}
          itemName={foodProduct.product_name}
          itemPrice={foodProduct.product_price}
          itemType={foodProduct.product_type}
          imageUrl={foodProduct.product_image_url}
        />
      ))}
    </Stack>
  );
}
