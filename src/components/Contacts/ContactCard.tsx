import React from "react";
import { Paper, Stack, Button, Typography, Box } from "@mui/material";
import { Send, Edit, Delete } from "@mui/icons-material";
import { Contact } from "../../types/contact";
import EditContactDialog from "./EditContactDialog";
import DeleteContactDialog from "./DeleteContactDialog";
import { useEditContactDialog } from "../../hooks/contacts/useEditContactDialog";
import { useDeleteContactDialog } from "../../hooks/contacts/useDeleteContactDialog";
import { useContactActions } from "../../hooks/contacts/useContactActions";

interface Props {
  contact: Contact;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

const ContactCard: React.FC<Props> = ({ contact, onDelete, onUpdate }) => {
  const edit = useEditContactDialog(contact.name, contact.email);
  const del = useDeleteContactDialog();
  const actions = useContactActions();

  const handleConfirmUpdate = async () => {
    await actions.updateContact(contact.id, edit.name, edit.email, () => {
      onUpdate();
      edit.closeDialog();
    });
  };

  const handleConfirmDelete = async () => {
    await actions.deleteContact(contact.id, () => {
      onDelete(contact.id);
      del.closeDialog();
    });
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row-reverse" },
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderRadius: 3,
          gap: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: { xs: "center", sm: "right" },
            flexGrow: 1,
            ml: { sm: 4 },
            mt: { xs: 1, sm: 0 },
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {contact.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {contact.email}
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            flexShrink: 0,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => actions.sendMessage(contact.name, contact.email)}
            startIcon={<Send />}
            sx={{
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            שלח
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="info"
            onClick={edit.openDialog}
            startIcon={<Edit />}
            sx={{
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            ערוך
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={del.openDialog}
            startIcon={<Delete />}
            sx={{
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            מחק
          </Button>
        </Stack>
      </Paper>

      <EditContactDialog
        open={edit.open}
        name={edit.name}
        email={edit.email}
        onChangeName={edit.setName}
        onChangeEmail={edit.setEmail}
        onClose={edit.closeDialog}
        onConfirm={handleConfirmUpdate}
      />

      <DeleteContactDialog
        open={del.open}
        contactName={contact.name}
        onClose={del.closeDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ContactCard;
