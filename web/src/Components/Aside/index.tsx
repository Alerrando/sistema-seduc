import { Book, School2, Siren, BookOpen, Users, PieChart, MenuSquare, AlignJustify, X, GraduationCap } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Aside() {
  const [menu, setMenu] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <AlignJustify className="absolute text-white top-3 sm:hidden" onClick={() => setMenu(true)} size={24} />
      <aside
        className={` ${menu ? "flex h-full w-full bg-modal" : "hidden sm:flex sm:w-1/6 sm:h-full bg-principal"
          } fixed top-0 left-0 flex flex-col gap-8 `}
      >
        <div className={`${menu ? "w-min" : "w-full"} h-full bg-principal `}>
          <header
            className={`w-full ${menu ? "flex" : "hidden sm:flex"
              } flex-col gap-2 items-center justify-start p-[22px] after:w-full after:h-1 after:border-b after:border-[#203F5C]`}
          >
            <div className="w-full flex flex-row gap-4 items-center text-white">
              <BookOpen className={`w-6 h-6 sm:w-7 sm:h-7`} />
              <span className="text-xl">Seduc</span>
              <X className={`w-6 h-6 sm:hidden`} onClick={() => setMenu(false)} />
            </div>
          </header>

          <section className={`w-full h-auto ${menu ? "block" : "hidden sm:block"}`}>
            <ul className="flex flex-col gap-4">
              <Link href="/" className="w-full block py-3 hover:bg-[#458ACE]">
                <li className="w-full flex flex-row items-center gap-3 px-5 text-white">
                  <PieChart size={26} />
                  <span>Dashboard</span>
                </li>
              </Link>

              <div className="w-full h-full flex flex-col gap-4 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                <li className="w-full h-full flex flex-row items-center gap-3 py-3 px-5 text-white hover:bg-[#458ACE]">
                  <Users size={26} />
                  <span>Cadastro</span>
                </li>
                {showDropdown && (
                    <ul className="flex flex-col gap-4">
                        <Link href="/cadastro-aula" className="w-full block py-3 hover:bg-[#458ACE]">
                            <li className="w-max flex flex-row items-center gap-3 px-10 text-white">
                                <Book size={22} />
                                <span>Aulas</span>
                            </li>
                        </Link>

                        <Link href="/cadastro-escola" className="w-full block py-3 hover:bg-[#458ACE]">
                            <li className="w-max flex flex-row items-center gap-3 px-10 text-white">
                                <School2 size={22} />
                                <span>Escolas</span>
                            </li>
                        </Link>

                        <Link href="/cadastro-professor" className="w-full block py-3 hover:bg-[#458ACE]">
                            <li className="w-max flex flex-row items-center gap-3 px-10 text-white">
                                <GraduationCap size={22} />
                                <span>Professores</span>
                            </li>
                        </Link>
                    </ul>
                )}
              </div>


              <Link href="/" className="w-full block py-3 hover:bg-[#458ACE]">
                <li className="w-full flex flex-row items-center gap-3 px-5 text-white">
                  <MenuSquare size={26} />
                  <span>Relátorio</span>
                </li>
              </Link>
            </ul>
          </section>
        </div>
      </aside>
    </>
  );
}
