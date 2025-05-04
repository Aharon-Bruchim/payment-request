import React from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNewContactForm } from "../../../hooks/contacts/useNewContactForm";
import { ToastContainer } from "react-toastify";

const NewContactForm: React.FC = () => {
  const { name, email, loading, setName, setEmail, handleSubmit } =
    useNewContactForm();

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <ToastContainer position="top-center" />
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          יצירת איש קשר חדש
        </Typography>

        <TextField
          label="שם"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="אימייל"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "שומר..." : "שמור"}
        </Button>
      </Paper>
    </Box>
  );
};

export default NewContactForm;
