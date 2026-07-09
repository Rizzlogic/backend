import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function toRupiah(n) {
  return "Rp" + n.toLocaleString("id-ID", { minimumFractionDigits: 2 });
}

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-center font-bold uppercase text-lg border-4 border-black bg-white p-8 shadow-[4px_4px_0px_#000]">
          Keranjang masih kosong.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase">Keranjang ({cartCount})</h2>
        <button
          onClick={clearCart}
          className="px-4 py-2 font-bold uppercase text-sm border-2 border-black 
                     bg-red-200 shadow-[2px_2px_0px_#000] 
                     hover:translate-x-[1px] hover:translate-y-[1px] 
                     hover:shadow-none transition-all"
        >
          Kosongkan
        </button>
      </div>

      <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000] overflow-hidden">
        <table className="w-full text-sm font-bold">
          <thead>
            <tr className="border-b-4 border-black bg-yellow-100">
              {["Produk", "Harga", "Qty", "Subtotal", ""].map((h) => (
                <th key={h} className="p-3 text-left uppercase text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b-2 border-black last:border-b-0 hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover border-2 border-black"
                  />
                  <span className="font-black uppercase text-xs">{item.name}</span>
                </td>
                <td className="p-3">{toRupiah(item.price)}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3 font-black">{toRupiah(item.price * item.quantity)}</td>
                <td className="p-3">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1 text-xs font-bold uppercase border-2 border-black 
                               bg-red-200 shadow-[2px_2px_0px_#000] 
                               hover:translate-x-[1px] hover:translate-y-[1px] 
                               hover:shadow-none transition-all"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000] p-4 flex items-center justify-between">
        <span className="text-xl font-black uppercase">Total</span>
        <span className="text-2xl font-black">{toRupiah(cartTotal)}</span>
      </div>

      <Link
        to="/checkout"
        className="block w-full py-3 text-center font-black uppercase text-lg border-4 border-black 
                   bg-yellow-300 shadow-[4px_4px_0px_#000] 
                   hover:translate-x-[2px] hover:translate-y-[2px] 
                   hover:shadow-none transition-all"
      >
        Lanjut ke Pembayaran
      </Link>
    </div>
  );
}