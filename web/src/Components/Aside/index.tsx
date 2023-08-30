"use client";
import {
  AlignJustify,
  BookOpen,
  BookPlus,
  GraduationCap,
  MenuSquare,
  PieChart,
  School,
  School2,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Aside() {
  const [menu, setMenu] = useState<boolean>(false);
  const [showDropdownRegister, setShowDropdownRegister] = useState(false);
  const [showDropDownReport, setShowDropdownReport] = useState(false);

  return (
    <>
      <AlignJustify
        className="absolute text-white top-3 left-3 md:hidden close"
        onClick={() => setMenu(true)}
        size={24}
      />
      <aside
        className={` ${
          menu ? "flex h-full w-full bg-modal" : "hidden md:flex md:w-1/6 md:h-full bg-principal "
        } fixed top-0 left-0 flex-col gap-8 close`}
      >
        <div
          className={`${
            menu ? "w-[55%]" : "w-full"
          } h-full bg-principal flex flex-col justify-between py-[22px] relative`}
        >
          <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
            <header
              className={`w-10/12 ${
                menu ? "flex" : "hidden sm:flex"
              } flex-col gap-2 items-center justify-start after:w-full after:h-1 after:border-b after:border-[#203F5C]`}
            >
              <div className="w-full flex flex-row items-center justify-between text-white">
                <div className="w-auto flex flex-row items-center gap-4">
                  <BookOpen className={"w-7 h-7"} />
                  <span className="text-2xl">Seduc</span>
                </div>
                <X className={"w-6 h-6 sm:hidden"} onClick={() => setMenu(false)} />
              </div>
            </header>

            <section className={`w-full h-auto ${menu ? "block" : "hidden sm:block"}`}>
              <ul className="flex flex-col flex-wrap gap-4">
                <Link
                  onClick={() => setMenu(false)}
                  href="/dashboard"
                  className="w-full flex flex-row justify-center items-center py-2 hover:bg-[#458ACE]"
                >
                  <li className="w-10/12 flex flex-row items-center gap-3 text-white">
                    <PieChart size={26} />
                    <span>Dashboard</span>
                  </li>
                </Link>

                <Link
                  onClick={() => setMenu(false)}
                  href="/controle-aulas-eventuais"
                  className="w-full flex flex-row justify-center items-center py-2 hover:bg-[#458ACE]"
                >
                  <li className="w-10/12 flex flex-row items-center gap-3 text-white">
                    <BookPlus className="min-w-[22px] min-h-[22px]" />
                    <span className="whitespace-normal">Controle de Aulas Eventuais</span>
                  </li>
                </Link>

                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-4 cursor-pointer"
                  onClick={() => setShowDropdownRegister(!showDropdownRegister)}
                >
                  <div className="w-full flex flex-row justify-center items-center py-2 hover:bg-[#458ACE]">
                    <li className="w-10/12 flex flex-row items-center gap-3 text-white">
                      <Users size={26} />
                      <span>Cadastro</span>
                    </li>
                  </div>
                  {showDropdownRegister && (
                    <ul className="w-full flex flex-col gap-4">
                      <Link
                        onClick={() => setMenu(false)}
                        href="/cadastro-escola"
                        className="w-full flex flex-row justify-center items-center py-2 hover:bg-[#458ACE]"
                      >
                        <li className="w-8/12 flex flex-row items-center gap-3 text-white">
                          <School2 size={22} />
                          <span>Escolas</span>
                        </li>
                      </Link>

                      <Link
                        onClick={() => setMenu(false)}
                        href="/cadastro-professor"
                        className="w-full flex flex-row justify-center items-center py-2 hover:bg-[#458ACE]"
                      >
                        <li className="w-8/12 flex flex-row items-center gap-3 text-white">
                          <GraduationCap size={22} />
                          <span>Professores</span>
                        </li>
                      </Link>
                    </ul>
                  )}
                </div>

                <div
                  className="w-full h-full flex flex-col gap-4 cursor-pointer"
                  onClick={() => setShowDropdownReport(!showDropDownReport)}
                >
                  <div className="w-full flex flex-row justify-center items-center py-2 hover:bg-[#458ACE]">
                    <li className="w-10/12 flex flex-row items-center gap-3 text-white">
                      <MenuSquare size={26} />
                      <span>Boletim</span>
                    </li>
                  </div>

                  {showDropDownReport && (
                    <ul className="w-full flex flex-col gap-4">
                      <Link
                        onClick={() => setMenu(false)}
                        href="/boletim-substituicao"
                        className="w-full flex flex-row justify-center items-center py-2 hover:bg-[#458ACE]"
                      >
                        <li className="w-8/12 flex flex-row items-center gap-3 text-white">
                          <School size={22} />
                          <span>Substituição</span>
                        </li>
                      </Link>

                      <Link
                        onClick={() => setMenu(false)}
                        href="/boletim-controle-aulas-eventuais"
                        className="w-full flex flex-row justify-center items-center py-2 hover:bg-[#458ACE]"
                      >
                        <li className="w-8/12 flex flex-row items-center gap-3 text-white">
                          <GraduationCap size={22} />
                          <span>Aulas Eventuais</span>
                        </li>
                      </Link>
                    </ul>
                  )}
                </div>
              </ul>
            </section>

            <footer className={"w-10/12 flex flex-col gap-2 items-center justify-start absolute bottom-0"}>
              <span className="text-base text-white opacity-40 cursor-default">
                Alerrando © 2023 Obrigado por acessar
              </span>
            </footer>
          </div>
        </div>
      </aside>
    </>
  );
}
