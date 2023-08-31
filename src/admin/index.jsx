import { useState, useEffect } from "react";
import Loader from "../components/loader";
import { LoginAdmin } from "./loginAdmin";
import ClientListing from "./clientListing";

const AdminLogin = () => {
  const [isAdminLogged, setIsAdminLogin] = useState(false);
  useEffect(() => {
    let data = sessionStorage.getItem("adminKey");
    if (data) {
      setIsAdminLogin(true);
    }
  }, []);
  return (
    <main className="mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <Loader open={false} />
      <section className="mt-4 bg-white px-2 py-8 rounded shadow-lg text-black w-full">
        {!isAdminLogged && (
          <LoginAdmin handlePostRequest={() => setIsAdminLogin(true)} />
        )}
        {isAdminLogged && <ClientListing handlePostRequest={() => {}} />}
      </section>
    </main>
  );
};

export default AdminLogin;
