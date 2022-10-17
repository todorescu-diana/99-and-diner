import { Stack } from "@mui/material";
import ManagerItemContainer from "../../components/manager/ManagerItemContainer";

export default function ManagerFoodMenuContent() {
  return (
    <Stack spacing={4} m={4}>
      <ManagerItemContainer
        itemName={"nume"}
        itemPrice={10}
        itemType={"food"}
      />
    </Stack>
  );
}
