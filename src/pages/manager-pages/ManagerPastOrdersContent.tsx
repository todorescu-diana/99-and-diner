import { Stack } from "@mui/system";
import ManagerPastOrderContainer from "../../components/manager/ManagerPastOrderContainer";

export default function ManagerPastOrdersContent() {
  return (
    <Stack spacing={4} m={4}>
      <ManagerPastOrderContainer />
    </Stack>
  );
}
