import { Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ClientItemContainer from "../../components/client/ClientItemContainer";
import { Product } from "../../models/Product";

export default function ClientFoodMenuContent() {
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
        <ClientItemContainer
          key={idx}
          itemName={foodProduct.product_name}
          itemPrice={foodProduct.product_price}
          itemType={foodProduct.product_type}
          imageUrl={foodProduct.product_image_url}
        />
      ))}
    </Stack>
  );
}
