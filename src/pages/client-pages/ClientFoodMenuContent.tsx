import { Stack } from "@mui/material";
import ClientItemContainer from "../../components/ClientItemContainer";

export default function ClientFoodMenuContent() {
  return (
    <Stack spacing={4} m={4}>
      <ClientItemContainer itemName={"nume"} itemPrice={10} itemType={"food"} />
    </Stack>
  );
}
