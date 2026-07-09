import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const allCategories = ["Semua", "Makanan", "Cemilan", "Minuman"];
const sortOptions = [
  { label: "Default", val: "" },
  { label: "Rating ↑", val: "rating_asc" },
  { label: "Rating ↓", val: "rating_desc" },
  { label: "Harga ↑", val: "price_asc" },
  { label: "Harga ↓", val: "price_desc" },
];
const stockOptions = ["Semua", "Tersedia", "Habis"];

export default function Catalog() {
  const { products } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("");
  const [stockFilter, setStockFilter] = useState("Semua");

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "Semua") {
      list = list.filter((p) =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    if (stockFilter === "Tersedia") list = list.filter((p) => p.stock > 0);
    else if (stockFilter === "Habis") list = list.filter((p) => p.stock === 0);

    if (sortBy === "rating_asc") list.sort((a, b) => a.rating - b.rating);
    else if (sortBy === "rating_desc") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, category, sortBy, stockFilter]);

  const chipClass =
    "px-3 py-1 text-xs font-bold uppercase border-2 border-black rounded-full cursor-pointer " +
    "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Cari produk…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 border-black rounded-full px-5 py-3 text-sm font-bold 
                     outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                     focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none transition-all"
        />
      </div>

      <div
        onClick={() => setCategory("Cemilan")}
        className="w-full h-48 md:h-64 bg-[#EAF2E8] border-2 border-black rounded-3xl 
                   shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between 
                   p-8 my-6 overflow-hidden cursor-pointer hover:translate-y-[-2px] transition-all"
      >
        <div className="flex flex-col gap-2 max-w-md">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
            Promo Spesial
          </span>
          <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight text-black">
            PROMO JUMAT BERKAH: DISKON 20% UNTUK CEMILAN SEHAT!
          </h2>
          <span className="text-sm font-bold text-gray-700">
            Klik untuk melihat promo →
          </span>
        </div>
        <div className="hidden md:flex items-center justify-center w-48 h-48 bg-[#D4E8D0] border-2 border-black rounded-2xl">
          <span className="text-6xl">🛍️</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        {allCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`${chipClass} ${category === c ? "bg-black text-white shadow-none" : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
          >
            {c}
          </button>
        ))}
        <span className="w-px h-5 bg-gray-300" />
        {stockOptions.map((s) => (
          <button
            key={s}
            onClick={() => setStockFilter(s)}
            className={`${chipClass} ${stockFilter === s ? "bg-black text-white shadow-none" : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
          >
            {s}
          </button>
        ))}
        <span className="w-px h-5 bg-gray-300" />
        {sortOptions.map((o) => (
          <button
            key={o.val}
            onClick={() => setSortBy(o.val)}
            className={`${chipClass} ${sortBy === o.val ? "bg-black text-white shadow-none" : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center font-bold uppercase py-12 mt-6 border-2 border-black rounded-2xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Tidak ada produk yang cocok.
        </p>
      )}
    </div>
  );
}
