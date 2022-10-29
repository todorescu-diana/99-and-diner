import ClientItemContainer from "../../components/client/ClientItemContainer";
import { Product } from "../../models/Product";
import { Box } from "@mui/material";
import StyledFooter from "../../components/StyledFooter";

export default function ClientDrinkMenuContent({
  drinkProducts,
}: {
  drinkProducts: Product[];
}) {
  return (
    <Box sx={{ width: "100%" }} height="100vh">
      <Box
        p={4}
        pl={0}
        pr={0}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {drinkProducts.map((drinkProduct, idx) => (
          <ClientItemContainer
            key={idx}
            itemName={drinkProduct.product_name}
            itemPrice={drinkProduct.product_price}
            itemType={drinkProduct.product_type}
            imageUrl={drinkProduct.product_image_url}
          />
        ))}
      </Box>
      <StyledFooter />
    </Box>
  );
}
