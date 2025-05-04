import { useCallback, useEffect, useState } from "react";
import { Contact } from "../../types/contact";
import { FirestoreClient } from "../../services/FirestoreClient";
import { toast } from "react-toastify";

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await FirestoreClient.find<Contact>("contacts");
      setContacts(data);
    } catch (err) {
      console.error(err);
      setError("שגיאה בטעינת אנשי קשר");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteContact = useCallback(
    async (id: string) => {
      try {
        await FirestoreClient.deleteOne("contacts", id);
        toast.success("איש הקשר נמחק בהצלחה");
        fetchContacts();
      } catch (err) {
        console.error(err);
        toast.error("שגיאה במחיקת איש הקשר");
      }
    },
    [fetchContacts]
  );

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    deleteContact,
  };
};
