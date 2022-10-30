import { Box } from "@mui/material";
import ClientItemContainer from "../../components/client/ClientItemContainer";
import StyledFooter from "../../components/StyledFooter";
import { Product } from "../../models/Product";

export default function ClientFoodMenuContent({
  foodProducts,
}: {
  foodProducts: Product[];
}) {
  return (
    <Box>
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
        {foodProducts.map((foodProduct, idx) => (
          <ClientItemContainer
            key={idx}
            itemName={foodProduct.product_name}
            itemPrice={foodProduct.product_price}
            itemType={foodProduct.product_type}
            imageUrl={foodProduct.product_image_url}
          />
        ))}
      </Box>
      <StyledFooter />
    </Box>
  );
}
