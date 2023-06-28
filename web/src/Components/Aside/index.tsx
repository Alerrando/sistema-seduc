"use client"
import { BookPlus, School2, Siren, BookOpen, Users, PieChart, MenuSquare, AlignJustify, X, GraduationCap, School, LogOut } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Aside() {
  const [menu, setMenu] = useState<boolean>(false);
  const [showDropdownRegister, setShowDropdownRegister] = useState(false);
  const [showDropDownReport, setShowDropdownReport] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <AlignJustify className="absolute text-white top-3 left-3 md:hidden close" onClick={() => setMenu(true)} size={24} />
      <aside className={` ${menu ? "flex h-full w-full bg-modal" : "hidden md:flex md:w-1/6 md:h-full bg-principal" } fixed top-0 left-0 flex flex-col gap-8 close`}>
        <div className={`${menu ? "w-[55%]" : "w-full"} h-full bg-principal flex flex-col justify-between py-[22px]`}>
          <div className="w-full h-auto flex flex-col">
            <header className={`w-full ${menu ? "flex" : "hidden sm:flex" } flex-col gap-2 items-center justify-start px-[22px] after:w-full after:h-1 after:border-b after:border-[#203F5C]`}>
              <div className="w-full flex flex-row items-center justify-between text-white">
                <div className="w-auto flex flex-row items-center gap-4">
                  <BookOpen className={`w-7 h-7`} />
                  <span className="text-2xl">Seduc</span>
                </div>
                <X className={`w-6 h-6 sm:hidden`} onClick={() => setMenu(false)} />
              </div>
            </header>

            <section className={`w-full h-auto ${menu ? "block" : "hidden sm:block"}`}>
              <ul className="flex flex-col flex-wrap gap-4">
                <Link onClick={() => setMenu(false)} href="/dashboard" className="w-full block py-3 hover:bg-[#458ACE]">
                  <li className="w-full flex flex-row items-center gap-3 px-5 text-white">
                    <PieChart size={26} />
                    <span>Dashboard</span>
                  </li>
                </Link>

                <Link onClick={() => setMenu(false)} href="/controle-aulas-eventuais" className="w-full block py-3 hover:bg-[#458ACE]">
                  <li className="w-full flex flex-row items-center gap-3 px-5 text-white">
                    <BookPlus className="min-w-[22px] min-h-[22px]" />
                    <span className="whitespace-normal">Controle de Aulas Eventuais</span>
                  </li>
                </Link>


                <div className="w-full h-full flex flex-col gap-4 cursor-pointer" onClick={() => setShowDropdownRegister(!showDropdownRegister)}>
                  <li className="w-full h-full flex flex-row items-center gap-3 py-3 px-5 text-white hover:bg-[#458ACE]">
                    <Users size={26} />
                    <span>Cadastro</span>
                  </li>
                  {showDropdownRegister && (
                      <ul className="flex flex-col gap-4">
                          <Link onClick={() => setMenu(false)} href="/cadastro-escola" className="w-full block py-3 hover:bg-[#458ACE]">
                              <li className="w-max flex flex-row items-center gap-3 px-10 text-white">
                                  <School2 size={22} />
                                  <span>Escolas</span>
                              </li>
                          </Link>

                          <Link onClick={() => setMenu(false)} href="/cadastro-professor" className="w-full block py-3 hover:bg-[#458ACE]">
                              <li className="w-max flex flex-row items-center gap-3 px-10 text-white">
                                  <GraduationCap size={22} />
                                  <span>Professores</span>
                              </li>
                          </Link>
                      </ul>
                  )}
                </div>


                <div className="w-full h-full flex flex-col gap-4 cursor-pointer" onClick={() => setShowDropdownReport(!showDropDownReport)}>
                  <li className="w-full h-full flex flex-row items-center gap-3 py-3 px-5 text-white hover:bg-[#458ACE]">
                    <MenuSquare size={26} />
                    <span>Boletim</span>
                  </li>

                  {showDropDownReport && (
                      <ul className="flex flex-col gap-4">
                          <Link onClick={() => setMenu(false)} href="/relatorio-escola" className="w-full block py-3 hover:bg-[#458ACE]">
                              <li className="w-max flex flex-row items-center gap-3 px-8 text-white">
                                  <School size={22} />
                                  <span>Escolas</span>
                              </li>
                          </Link>

                          <Link onClick={() => setMenu(false)} href="/boletim-controle-aulas-eventuais" className="w-full block py-3 hover:bg-[#458ACE]">
                              <li className="w-max flex flex-row items-center gap-3 px-8 text-white">
                                  <GraduationCap size={22} />
                                  <span>Aulas Eventuais</span>
                              </li>
                          </Link>
                      </ul>
                  )}
                </div>
              </ul>
            </section>
          </div>

          <div className="w-min h-auto flex flex-col text-white px-5 cursor-pointer relative bar">
            <div className="flex flex-row items-center gap-4" onClick={() => logOut()}>
              <span>Sair</span>
              <LogOut size={22} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );

  function logOut(){
    if(window.confirm("Quer realmente sair?")){
      dispatch(changeLoginLogout({}))
    }
  }
}
