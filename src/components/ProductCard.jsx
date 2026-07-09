import { useCart } from "../context/CartContext";

const star = (rating) => {
  const full = Math.floor(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
};

const categoryColors = {
  Makanan: "bg-emerald-200",
  Cemilan: "bg-orange-200",
  Minuman: "bg-sky-200",
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const inStock = product.stock > 0;
  const catColor = categoryColors[product.category] || "bg-gray-200";

  return (
    <div className="border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white flex flex-col overflow-hidden">
      <div className="aspect-video overflow-hidden bg-gray-100 border-b-2 border-black">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-black tracking-tight uppercase text-black leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border border-black rounded-full ${catColor}`}>
            {product.category}
          </span>
          <span className="text-yellow-500 text-sm">{star(product.rating)}</span>
        </div>

        <p className="text-xl font-black mt-auto text-black">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        <p className={`text-[10px] font-bold uppercase ${inStock ? "text-green-700" : "text-red-600"}`}>
          {inStock ? `STOK: ${product.stock}` : "STOK HABIS"}
        </p>

        <button
          onClick={() => addToCart(product)}
          disabled={!inStock}
          className="w-full py-2.5 font-bold text-sm uppercase border-2 border-black rounded-full 
                     bg-yellow-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                     hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none 
                     transition-all disabled:opacity-50 disabled:cursor-not-allowed 
                     disabled:hover:translate-x-0 disabled:hover:translate-y-0 
                     disabled:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          TAMBAH KE KERANJANG
        </button>
      </div>
    </div>
  );
}
