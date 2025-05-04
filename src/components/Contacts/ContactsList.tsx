import React from "react";
import { Stack, Typography } from "@mui/material";
import { Contact } from "../../types/contact";
import ContactCard from "./ContactCard";

interface Props {
  contacts: Contact[];
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

const ContactsList: React.FC<Props> = ({ contacts, onDelete, onUpdate }) => {
  if (contacts.length === 0) {
    return <Typography>לא נמצאו אנשי קשר.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </Stack>
  );
};

export default ContactsList;
