import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PaymentRequestsPage from "../../pages/PaymentRequestsPage/PaymentRequestsPage";
import ContactsPage from "../../pages/ContactsPage/ContactsPage";
import NewContactForm from "../../components/Contacts/NewContactForm/NewContactForm";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts" replace />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/contacts/new" element={<NewContactForm />} />
      <Route path="/requests" element={<PaymentRequestsPage />} />
    </Routes>
  );
};

export default AppRoutes;
