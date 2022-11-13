import { Box, Card, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ClientPromotionContainer from "../../components/client/ClientPromotionContainer";
import StyledFooter from "../../components/StyledFooter";
import { Promotion } from "../../models/Promotion";
import { themeColors } from "../../theme/theme";

export default function ClientPromotionsContent({
  promotionProducts,
}: {
  promotionProducts: Promotion[];
}) {
  const [t] = useTranslation("common");

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
        {promotionProducts.length > 0 ? (
          promotionProducts.map((promotionProduct, idx) => (
            <ClientPromotionContainer
              key={idx}
              itemName={promotionProduct.promotion_name}
              itemPrice={promotionProduct.promotion_price}
            />
          ))
        ) : (
          <Box m={4} sx={{ alignSelf: "center", mt: 21, mb: 21 }}>
            <Card
              sx={{
                backgroundColor: themeColors.secondary,
                display: "flex",
                flexDirection: "row",
                padding: 4,
                justifyContent: "center",
                height: "100%",
                borderRadius: 2,
                pr: 15,
                pl: 15,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4">
                  {t("clientpromotionscontent.nopromotionsfound")}
                </Typography>
              </Box>
            </Card>
          </Box>
        )}
      </Box>
      <StyledFooter />
    </Box>
  );
}
