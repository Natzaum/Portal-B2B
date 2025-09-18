
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const { pathname } = useLocation();
  const noPaddingRoutes = ["/login"]; 

  const content = (
    <Outlet />
  );

  return (
    <>
      <Navbar />
      {/* aplica padding só se NÃO estiver no /login */}
      <main style={!noPaddingRoutes.includes(pathname) ? { padding: 20 } : undefined}>
        {content}
      </main>
    </>
  );
}
