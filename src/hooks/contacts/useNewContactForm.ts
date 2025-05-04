import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirestoreClient } from "../../services/FirestoreClient";
import { toast } from "react-toastify";
import { Contact } from "../../types/contact";

export const useNewContactForm = (redirectTo: string = "/contacts") => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    if (!name.trim()) {
      toast.error("נא להזין שם");
      return false;
    }
    if (!email.trim() || !isValidEmail(email)) {
      toast.error("אימייל לא תקין");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      await FirestoreClient.insertOne<Contact>("contacts", { name, email });
      toast.success("איש הקשר נוסף בהצלחה");
      navigate(redirectTo);
    } catch (err) {
      console.error(err);
      toast.error("שגיאה בשמירת איש הקשר");
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    email,
    loading,
    setName,
    setEmail,
    handleSubmit,
  };
};
