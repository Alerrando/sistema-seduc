import { BookOpen, Users, PieChart, MenuSquare, AlignJustify, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Aside() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <AlignJustify className="block sm:hidden" onClick={() => setMenu(true)} />
      <aside className={`${menu ? "flex  w-full" : "hidden sm:flex w-1/6"} h-full bg-modal fixed top-0 left-0 flex flex-col gap-8`}>
        <div className={`${menu ? "w-min" : "w-full"} h-full bg-principal`}>
          <header className={`w-full ${menu ? "flex" : "hidden sm:flex"} flex-col gap-2 items-center justify-start p-[22px] after:w-full after:h-1 after:border-b after:border-[#203F5C]`}>
            <div className="w-full flex flex-row gap-4 items-center text-white">
              <BookOpen className={`w-6 h-6 sm:w-7 sm:h-7`} />
              <span className="text-xl">Seduc</span>
              <X className={`w-6 h-6 sm:hidden`} onClick={() => setMenu(false)} />
            </div>
          </header>

          <section className={`w-full h-auto ${menu ? "flex" : "hidden sm:flex"}`}>
            <ul className="w-full grid gap-4">
              <Link href="/" className="w-full block py-3 hover:bg-[#458ACE]">
                <li className="flex flex-row items-center gap-3 px-5 text-white">
                  <PieChart size={26} />
                  <span>Dashboard</span>
                </li>
              </Link>

              <Link href="/" className="w-full block py-3 hover:bg-[#458ACE]">
                <li className="flex flex-row items-center gap-3 px-5 text-white">
                  <Users size={26} />
                  <span>Cadastro</span>
                </li>
              </Link>

              <Link href="/" className="w-full block py-3 hover:bg-[#458ACE]">
                <li className="flex flex-row items-center gap-3 px-5 text-white">
                  <MenuSquare size={26} />
                  <span>Relatório</span>
                </li>
              </Link>
            </ul>
          </section>
        </div>
      </aside>
    </>
  );
}
