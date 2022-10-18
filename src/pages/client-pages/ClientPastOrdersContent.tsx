import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { themeColors } from "../../theme";
import { Stack } from "@mui/system";
import ClientPastOrderContainer from "../../components/client/ClientPastOrderContainer";

export default function ClientPastOrdersContent() {
  return (
    <Stack spacing={4} m={4}>
      <ClientPastOrderContainer />
    </Stack>
  );
}
