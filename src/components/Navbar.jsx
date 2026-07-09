import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <div className="max-w-7xl mx-auto w-full pt-6 px-4 md:px-8 flex items-center justify-between">
      <Link
        to="/catalog"
        className="bg-white border-2 border-black rounded-full px-5 py-2 
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-start no-underline"
      >
        <span className="text-xl font-black uppercase tracking-tight text-black leading-none">
          E-TOKO
        </span>
        <span className="text-xs text-gray-500 font-medium mt-0.5">
          Katalog
        </span>
      </Link>

      <Link
        to="/cart"
        className="bg-black text-white rounded-full px-6 py-3 text-sm font-bold 
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-800 
                   flex items-center gap-2 no-underline"
      >
        🛒 Keranjang ({cart.length})
      </Link>
    </div>
  );
}
