import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import ClientItemContainer from "../../components/client/ClientItemContainer";

export default function ClientDrinkMenuContent() {
  let navigate = useNavigate();

  return (
    <Stack spacing={4} m={4}>
      <ClientItemContainer itemName={"nume"} itemPrice={10} itemType={"food"} />
    </Stack>
  );
}
