import { useEffect, useState } from "react";

function pad(n) {
  return String(n).padStart(2, "0");
}

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export default function Footer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const date = `${pad(now.getDate())} ${months[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <footer className="border-t-4 border-black bg-[#FFFDF9] py-4">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs uppercase tracking-wider">
        <span className="font-medium">{date}</span>
        <span className="font-normal">{time} WIB</span>
        <span className="font-medium">Banda Aceh, Indonesia</span>
      </div>
    </footer>
  );
}