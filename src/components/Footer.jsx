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
    <footer className="max-w-7xl mx-auto w-full border-t-2 border-black py-4 px-4 md:px-8 flex items-center justify-between bg-transparent mt-12">
      <span className="font-normal text-sm text-gray-600 uppercase tracking-wider">
        {date}
      </span>
      <span className="font-semibold text-base text-black tracking-widest">
        {time} WIB
      </span>
      <span className="font-normal text-sm text-gray-600 uppercase tracking-wider">
        Banda Aceh, Indonesia
      </span>
    </footer>
  );
}
