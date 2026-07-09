import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const methods = [
  { id: "tunai", label: "Tunai", icon: "💵" },
  { id: "kartu", label: "Credit Card", icon: "💳" },
  { id: "qris", label: "QRIS", icon: "📱" },
];

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("tunai");
  const [step, setStep] = useState("form");
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });

  /* ---------- empty cart ---------- */
  if (cart.length === 0 && step !== "done") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center border-4 border-black bg-white shadow-[4px_4px_0px_#000] p-8 space-y-4">
          <p className="text-3xl">🛒</p>
          <p className="font-bold uppercase text-lg">Keranjang Kosong</p>
          <button
            onClick={() => navigate("/catalog")}
            className="px-6 py-3 font-black uppercase border-4 border-black bg-yellow-300 
                       shadow-[4px_4px_0px_#000] 
                       hover:translate-x-[2px] hover:translate-y-[2px] 
                       hover:shadow-none transition-all"
          >
            Belanja Sekarang
          </button>
        </div>
      </div>
    );
  }

  /* ---------- confirmation modal ---------- */
  if (step === "confirm") {
    const method = methods.find((m) => m.id === payment);
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="border-4 border-black bg-white shadow-[6px_6px_0px_#000] p-8 max-w-md mx-auto space-y-4 text-center">
          <p className="text-3xl">{method?.icon || "💳"}</p>
          <p className="font-black uppercase text-lg">Konfirmasi Pembayaran</p>
          <p className="text-sm font-bold">
            Metode: <span className="uppercase">{method?.label}</span>
          </p>
          <p className="text-2xl font-black">
            Rp{cartTotal.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
          </p>

          {payment === "qris" && (
            <div className="border-4 border-black bg-white p-4 mx-auto w-48 h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="grid grid-cols-8 gap-0.5 mx-auto w-32 h-32">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        [0, 1, 6, 7, 8, 15, 48, 55, 56, 57, 62, 63, 9, 14, 16, 23, 24, 31, 32, 39, 40, 47, 49, 54].includes(i)
                          ? "bg-black"
                          : "bg-white"
                      } border border-gray-300`}
                    />
                  ))}
                </div>
                <p className="text-[8px] font-bold uppercase mt-2">Scan untuk bayar</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                clearCart();
                setStep("done");
                setTimeout(() => navigate("/catalog"), 1500);
              }}
              className="flex-1 py-3 font-black uppercase border-2 border-black bg-yellow-300 
                         shadow-[3px_3px_0px_#000] 
                         hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              ✅ Ya, Bayar
            </button>
            <button
              onClick={() => setStep("form")}
              className="flex-1 py-3 font-black uppercase border-2 border-black bg-white 
                         shadow-[3px_3px_0px_#000] 
                         hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- done ---------- */
  if (step === "done") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="border-4 border-black bg-green-200 shadow-[6px_6px_0px_#000] p-8">
          <p className="text-4xl mb-2">✅</p>
          <p className="text-3xl font-black mb-2">Pembayaran Berhasil!</p>
          <p className="text-2xl font-black">
            Rp{cartTotal.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    );
  }

  /* ---------- checkout form ---------- */
  const inputClass =
    "w-full border-2 border-black p-3 font-bold text-sm outline-none focus:shadow-[2px_2px_0px_#000] transition-shadow";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl font-black uppercase">Checkout</h2>

      {/* Customer details */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000] p-4 space-y-3">
        <h3 className="font-black uppercase text-sm">Data Pelanggan</h3>
        <input
          placeholder="Nama Lengkap"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className={inputClass}
          required
        />
        <input
          placeholder="Nomor HP"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          className={inputClass}
          required
        />
        <textarea
          placeholder="Alamat"
          rows={3}
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          className={inputClass + " resize-none"}
          required
        />
      </div>

      {/* Order summary */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000] p-4 space-y-3">
        <h3 className="font-black uppercase text-sm">Ringkasan Pesanan</h3>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm font-bold">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>
              Rp{(item.price * item.quantity).toLocaleString("id-ID", { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
        <div className="border-t-2 border-black pt-2 flex justify-between text-lg font-black">
          <span>Total</span>
          <span>
            Rp{cartTotal.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Payment method */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000] p-4 space-y-3">
        <h3 className="font-black uppercase text-sm">Metode Pembayaran</h3>
        <div className="grid grid-cols-3 gap-3">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setPayment(m.id)}
              className={`py-4 font-bold uppercase text-sm border-4 border-black 
                          shadow-[3px_3px_0px_#000] transition-all text-center
                          hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none
                          ${payment === m.id ? "bg-yellow-300" : "bg-white"}`}
            >
              <div className="text-2xl mb-1">{m.icon}</div>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setStep("confirm")}
        disabled={!customer.name || !customer.phone || !customer.address}
        className="w-full py-3 font-black uppercase text-lg border-4 border-black 
                   bg-yellow-300 shadow-[4px_4px_0px_#000] 
                   hover:translate-x-[2px] hover:translate-y-[2px] 
                   hover:shadow-none transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 
                   disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_#000]"
      >
        Bayar Sekarang —
        Rp{cartTotal.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
      </button>
    </div>
  );
}