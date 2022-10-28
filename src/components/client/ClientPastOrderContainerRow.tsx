import { Box } from "@mui/material";

export default function ClientPastOrderContainerRow({
  leftContent,
  rightContent,
}: {
  leftContent: JSX.Element;
  rightContent: JSX.Element;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ width: "30%" }}>{leftContent}</Box>

      <Box
        ml={4}
        sx={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "70%",
        }}
      >
        {rightContent}
      </Box>
    </Box>
  );
}
