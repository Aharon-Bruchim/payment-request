import React from "react";
import { Box } from "@mui/material";
import { Blinds as Violin } from "lucide-react";

export const Logo: React.FC = () => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={3}>
      <Violin size={48} color="primary" />
    </Box>
  );
};
