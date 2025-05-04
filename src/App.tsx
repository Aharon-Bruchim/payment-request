import React from "react";
import { ToastContainer } from "react-toastify";
import { Layout } from "./components/Layout/Layout";
import AppRoutes from "./components/AppRoutes/AppRoutes";

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <AppRoutes />
      </Layout>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default App;
