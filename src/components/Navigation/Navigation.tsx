import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const Navigation: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          אפליקציה לניהול תשלומים
        </Typography>
        <Button color="inherit" component={Link} to="/requests">
          בקשות תשלום
        </Button>
        <Button color="inherit" component={Link} to="/contacts">
          אנשי קשר
        </Button>
      </Toolbar>
    </AppBar>
  );
};
