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
      toast.success("איש הקשר עודכן");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("שגיאה בעדכון");
    }
  };

  const deleteContact = async (id: string, onSuccess: () => void) => {
    try {
      await FirestoreClient.deleteOne("contacts", id);
      toast.success("איש הקשר נמחק");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("שגיאה במחיקה");
    }
  };

  return {
    sendMessage,
    updateContact,
    deleteContact,
  };
};
