import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ManagerPromotionContainer from "../../components/manager/ManagerPromotionContainer";
import { Promotion } from "../../models/Promotion";

export default function ManagerPromotionsContent() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    async function getPromotionItems() {
      try {
        const res = await axios.get("http://localhost:3005/api/get");
        const { data } = await res;
        const allPromotions: Promotion[] = data;

        setPromotions(allPromotions);
      } catch (err) {
        console.log(err);
      }
    }
    getPromotionItems();
  }, []);

  return (
    <Box>
      <Stack spacing={4} m={4} p={4} pb={8}>
        {promotions.map((promotion) => (
          <ManagerPromotionContainer
            key={promotion.promotion_id.toString()}
            itemId={promotion.promotion_id}
            itemName={promotion.promotion_name}
            itemPrice={promotion.promotion_price}
            products={promotions}
            setProducts={setPromotions}
          />
        ))}
      </Stack>
    </Box>
  );
}
