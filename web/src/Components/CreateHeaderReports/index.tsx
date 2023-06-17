import { SlidersHorizontal, Search } from 'lucide-react';
import React from 'react'

type CreateHeaderReportsProps = {
    setSearch: (search: string) => void,
    totalRegister: number,
}

export default function CreateHeaderReports({ setSearch, totalRegister }: CreateHeaderReportsProps) {

  return (
    <div className="h-auto border border-[#DDD] rounded-lg">
        <header className="flex items-center justify-between px-2 sm:px-5 py-4">
            <div className="flex flex-row items px-4 py-2 bg-principal text-white rounded-lg">
                <span className="hidden sm:block">Total de registros: {totalRegister}</span>
                <span className="sm:hidden block">Total: {totalRegister}</span>
            </div>

            <div className="w-36 sm:w-auto flex flex-row items-center gap-2 px-3 py-2 border border-zinc-500 rounded-full">
                <Search size={26} />
                <input
                    type="text"
                    className="w-full outline-none border-none"
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <SlidersHorizontal size={32} className="cursor-pointer" />
        </header>
    </div>
  );
}
