import { Plus, Search } from 'lucide-react';
import React from 'react'

type CreateHeaderProps = {
    setModal: (modal: boolean) => void,
    setSearch: (search: string) => void,
    totalRegiter: number,
}

export default function CreateHeader(props: CreateHeaderProps) {
    const { setModal, setSearch, totalRegiter } = props;

  return (
    <div className="h-auto border border-[#DDD] rounded-lg">
      <header className="flex items-center justify-between px-2 sm:px-5 py-4">
        <div
          className="flex flex-row items-center gap-2 py-2 px-2 sm:px-4 border border-[#22C55E] text-[#22C55E] cursor-pointer rounded-lg group hover:bg-[#22C55E] transition-colors"
          onClick={() => setModal(true)}
        >
          <Plus size={26} className="group-hover:text-white" />
          <span className="hidden sm:block text-lg group-hover:text-white">
            Cadastro
          </span>
        </div>

        <div className="w-36 sm:w-auto flex flex-row items-center gap-2 px-3 py-2 border border-zinc-500 rounded-full">
          <Search size={26} />
          <input
            type="text"
            className="w-full outline-none border-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-row items px-4 py-2 bg-principal text-white rounded-lg">
          <span className="hidden sm:block">Total de registros: {totalRegiter}</span>
          <span className="sm:hidden block">Total: {totalRegiter}</span>
        </div>
      </header>
    </div>
  );
}
