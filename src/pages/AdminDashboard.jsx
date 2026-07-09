import { useState } from "react";
import { useCart } from "../context/CartContext";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const defaultProduct = {
  name: "",
  price: "",
  category: "Makanan",
  rating: 4,
  stock: "",
  image: "",
};
const categoryOptions = ["Makanan", "Cemilan", "Minuman", "Buah"];
const inputClass =
  "w-full border-2 border-black p-2 font-bold text-sm outline-none focus:shadow-[2px_2px_0px_#000] transition-shadow";
const btnClass =
  "px-3 py-1 text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_#000] " +
  "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all";

/* ------------------------------------------------------------------ */
/*  Bar Chart component                                                */
/* ------------------------------------------------------------------ */
function StockBarChart({ products }) {
  const top = [...products].sort((a, b) => b.stock - a.stock).slice(0, 6);
  const maxStock = Math.max(...top.map((p) => p.stock), 1);

  return (
    <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000] p-4">
      <p className="text-xs font-black uppercase mb-3">Stok per Produk</p>
      <div className="relative h-40 border-l-2 border-b-2 border-black ml-1">
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <div
            key={f}
            className="absolute left-0 w-full border-t border-gray-200 text-[8px] font-bold text-gray-400 pl-1"
            style={{ bottom: `${f * 100}%` }}
          >
            {Math.round(maxStock * f)}
          </div>
        ))}
        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-around pb-1">
          {top.map((p) => (
            <div key={p.id} className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-black">{p.stock}</span>
              <div
                className="w-7 bg-yellow-300 border-2 border-black"
                style={{ height: `${(p.stock / maxStock) * 100}%` }}
              />
              <span className="text-[7px] font-bold uppercase text-center leading-tight max-w-14 truncate">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Donut chart component (SVG)                                        */
/* ------------------------------------------------------------------ */
function DonutChart({ pct, label, sub }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(pct, 100) / 100) * circ;

  return (
    <div className="flex flex-col items-center">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#ddd" strokeWidth="10" />
        <circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke="#000"
          strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="square"
          transform="rotate(-90 55 55)"
        />
        <text x="55" y="52" textAnchor="middle" className="text-xs font-black" fill="#000">
          {Math.round(pct)}%
        </text>
        <text x="55" y="66" textAnchor="middle" className="text-[8px] font-bold" fill="#000">
          {sub || ""}
        </text>
      </svg>
      <p className="text-[10px] font-black uppercase mt-1">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AdminDashboard() {
  const { products, addProduct, updateProduct, deleteProduct } = useCart();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultProduct);
  const [modalOpen, setModalOpen] = useState(false);

  const resetForm = () => {
    setForm(defaultProduct);
    setEditing(null);
  };
  const openModal = (product = null) => {
    if (product) {
      setEditing(product.id);
      setForm({
        ...product,
        price: String(product.price),
        stock: String(product.stock),
      });
    } else resetForm();
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
    };
    if (editing) updateProduct(editing, data);
    else addProduct(data);
    closeModal();
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    if (editing === id) closeModal();
  };

  /* ---- stats ---- */
  const total = products.length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const invValue = products.reduce((s, p) => s + p.price * p.stock, 0);
  const capacity = Math.min((total / 20) * 100, 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-2">
        Admin Dashboard
      </h2>

      {/* ---------- Stat cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_#000] p-4">
          <p className="text-xs font-black uppercase">Total Produk</p>
          <p className="text-3xl font-black mt-1">{total}</p>
        </div>
        <div className="bg-orange-300 border-4 border-black shadow-[4px_4px_0px_#000] p-4">
          <p className="text-xs font-black uppercase">Stok Menipis</p>
          <p className="text-3xl font-black mt-1">{lowStock}</p>
        </div>
        <div className="bg-red-300 border-4 border-black shadow-[4px_4px_0px_#000] p-4">
          <p className="text-xs font-black uppercase">Habis</p>
          <p className="text-3xl font-black mt-1">{outOfStock}</p>
        </div>
        <div className="bg-green-300 border-4 border-black shadow-[4px_4px_0px_#000] p-4">
          <p className="text-xs font-black uppercase">Nilai Inventaris</p>
          <p className="text-3xl font-black mt-1">${invValue.toLocaleString()}</p>
        </div>
      </div>

      {/* ---------- Charts row ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <StockBarChart products={products} />
        </div>
        <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000] p-4 flex flex-col items-center justify-center">
          <p className="text-xs font-black uppercase mb-3">Kapasitas Inventaris</p>
          <DonutChart pct={capacity} label="Terpakai" sub={`${total}/20`} />
        </div>
      </div>

      {/* ---------- Add button ---------- */}
      <button
        onClick={() => openModal()}
        className="px-6 py-3 font-black uppercase text-lg border-4 border-black 
                   bg-yellow-300 shadow-[4px_4px_0px_#000] 
                   hover:translate-x-[2px] hover:translate-y-[2px] 
                   hover:shadow-none transition-all"
      >
        + Tambah Produk Baru
      </button>

      {/* ---------- Modal ---------- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="border-4 border-black bg-white shadow-[6px_6px_0px_#000] p-6 w-full max-w-lg mx-4">
            <h3 className="font-black uppercase text-lg mb-4">
              {editing ? "Edit Produk" : "Tambah Produk Baru"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                placeholder="Nama Produk"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Harga"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className={inputClass}
                  required
                />
                <input
                  placeholder="Stok"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                {categoryOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input
                placeholder="URL Gambar"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className={inputClass}
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 font-bold uppercase border-2 border-black 
                             bg-yellow-300 shadow-[2px_2px_0px_#000] 
                             hover:translate-x-[1px] hover:translate-y-[1px] 
                             hover:shadow-none transition-all"
                >
                  {editing ? "Update" : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 font-bold uppercase border-2 border-black bg-white 
                             shadow-[2px_2px_0px_#000] 
                             hover:translate-x-[1px] hover:translate-y-[1px] 
                             hover:shadow-none transition-all"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------- Product table ---------- */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000] overflow-x-auto">
        <table className="w-full text-sm font-bold">
          <thead>
            <tr className="border-b-4 border-black bg-yellow-100">
              {["ID", "Nama", "Harga", "Kategori", "Stok", "Rating", "Aksi"].map((h) => (
                <th key={h} className="p-3 text-left uppercase text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b-2 border-black last:border-b-0 hover:bg-gray-50">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price.toFixed(2)}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 border-2 border-black text-xs ${
                      p.stock === 0 ? "bg-red-200" : p.stock <= 10 ? "bg-orange-200" : "bg-green-200"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="p-3">{p.rating}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => openModal(p)} className={`${btnClass} bg-blue-200`}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} className={`${btnClass} bg-red-200`}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}