import React from "react";
import { Paper, Button, Typography, Box } from "@mui/material";
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
          alignItems: { xs: "stretch", sm: "center" },
          p: 2,
          borderRadius: 3,
          gap: 2,
        }}
      >
        <Box
          sx={{
            textAlign: { xs: "left", sm: "right" },
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {contact.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {contact.email}
          </Typography>
        </Box>

        {/* כפתורי הפעולה - בצד שמאל בדסקטופ */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => actions.sendMessage(contact.name, contact.email)}
            startIcon={<Send />}
          >
            שלח
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={edit.openDialog}
            startIcon={<Edit />}
          >
            ערוך
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={del.openDialog}
            startIcon={<Delete />}
          >
            מחק
          </Button>
        </Box>
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
