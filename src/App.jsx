import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Splash from "./pages/Splash";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";

function Layout({ children }) {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/admin";

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF9]">
      {!hideNav && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideNav && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/catalog" element={<Layout><Catalog /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}