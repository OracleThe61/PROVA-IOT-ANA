import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

function Layout() {

  return (
    <div className="min-vh-100 bg-light">
      <Navbar/>

      <section className="container mt-4 p-4 bg-white shadow-sm rounded">
        <Outlet />
      </section>
    </div>
  );
}

export default Layout;
