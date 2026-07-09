import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const slides = [
  {
    category: "Cemilan",
    badge: "Promo Spesial",
    title: "PROMO JUMAT BERKAH: DISKON 20% UNTUK CEMILAN SEHAT!",
    bg: "bg-[#EAF2E8]",
    badgeBg: "bg-emerald-600",
    icon: "🍪",
  },
  {
    category: "Makanan",
    badge: "Diskon Harian",
    title: "DISKON 15% MAKANAN ENAK TIAP HARI!",
    bg: "bg-[#FFF3E0]",
    badgeBg: "bg-orange-600",
    icon: "🍜",
  },
  {
    category: "Minuman",
    badge: "Beli 2 Gratis 1",
    title: "BELI 2 GRATIS 1: MINUMAN SEGAR!",
    bg: "bg-[#E3F2FD]",
    badgeBg: "bg-blue-600",
    icon: "🥤",
  },
  {
    category: "Semua",
    badge: "Flash Sale",
    title: "FLASH SALE: DISKON 50% UNTUK SEMUA!",
    bg: "bg-[#FCE4EC]",
    badgeBg: "bg-pink-600",
    icon: "⚡",
  },
  {
    category: "Semua",
    badge: "Menu Baru",
    title: "PRODUK BARU TELAH TIBA, COBA SEKARANG!",
    bg: "bg-[#F3E5F5]",
    badgeBg: "bg-purple-600",
    icon: "✨",
  },
];

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
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

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

      <div className="relative my-6">
        <div className="overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                onClick={() => setCategory(slide.category)}
                className={`min-w-full h-48 md:h-64 ${slide.bg} border-2 border-black rounded-3xl 
                           shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between 
                           p-8 cursor-pointer hover:translate-y-[-2px] transition-all select-none`}
              >
                <div className="flex flex-col gap-3 max-w-md">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full ${slide.badgeBg} inline-block w-fit`}
                  >
                    {slide.badge}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight text-black">
                    {slide.title}
                  </h2>
                  <span className="text-sm font-bold text-gray-700">
                    Klik untuk melihat promo →
                  </span>
                </div>
                <div className="hidden md:flex items-center justify-center w-48 h-48 bg-white/40 border-2 border-black rounded-2xl">
                  <span className="text-7xl">{slide.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-black 
                     rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center 
                     text-lg font-bold hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none 
                     transition-all z-10"
          aria-label="Slide sebelumnya"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-black 
                     rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center 
                     text-lg font-bold hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none 
                     transition-all z-10"
          aria-label="Slide berikutnya"
        >
          →
        </button>

        <div className="flex items-center justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full border-2 border-black transition-all ${
                i === currentSlide
                  ? "bg-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white"
              }`}
              aria-label={`Ke slide ${i + 1}`}
            />
          ))}
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
