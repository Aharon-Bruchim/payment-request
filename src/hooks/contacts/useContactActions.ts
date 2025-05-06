import { toast } from "react-toastify";
import { FirestoreClient } from "../../services/FirestoreClient";
import { useNavigate } from "react-router-dom";

export const useContactActions = () => {
  const navigate = useNavigate();

  const sendMessage = (name: string, email: string) => {
    navigate(
      "/requests?clientName=" +
        encodeURIComponent(name) +
        "&clientEmail=" +
        encodeURIComponent(email)
    );
  };

  const updateContact = async (
    id: string,
    name: string,
    email: string,
    onSuccess: () => void
  ) => {
    try {
      await FirestoreClient.updateOne("contacts", id, { name, email });
      toast.success(`${name} עודכן בהצלחה`);
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(`שגיאה בעדכון ${name}`);
    }
  };

  const deleteContact = async (
    id: string,
    name: string,
    onSuccess: () => void
  ) => {
    try {
      await FirestoreClient.deleteOne("contacts", id);
      toast.success(`${name} נמחק בהצלחה`);
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(`שגיאה במחיקת ${name}`);
    }
  };

  return {
    sendMessage,
    updateContact,
    deleteContact,
  };
};
