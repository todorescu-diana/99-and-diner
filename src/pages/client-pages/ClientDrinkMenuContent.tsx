import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import ClientItemContainer from "../../components/client/ClientItemContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../models/Product";

export default function ClientDrinkMenuContent() {
  let navigate = useNavigate();

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
    <Stack spacing={4} m={4}>
      {drinkProducts.map((drinkProduct, idx) => (
        <ClientItemContainer
          key={idx}
          itemName={drinkProduct.product_name}
          itemPrice={drinkProduct.product_price}
          itemType={drinkProduct.product_type}
          imageUrl={drinkProduct.product_image_url}
        />
      ))}
    </Stack>
  );
}
