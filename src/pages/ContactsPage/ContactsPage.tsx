import React from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ContactsList from "../../components/Contacts/ContactsList";
import NewContactButton from "../../components/Contacts/NewContactButton/NewContactButton";
import { useContacts } from "../../hooks/contacts/useContacts";

const ContactsPage: React.FC = () => {
  const { contacts, loading, error, deleteContact, fetchContacts } =
    useContacts();

  return (
    <>
      <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
        <ToastContainer position="top-center" />
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            רשימת אנשי קשר
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <ContactsList
              contacts={contacts}
              onDelete={deleteContact}
              onUpdate={fetchContacts}
            />
          )}
        </Paper>
      </Box>

      <NewContactButton />
    </>
  );
};

export default ContactsPage;
