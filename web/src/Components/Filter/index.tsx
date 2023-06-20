import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../system";
import { TeacherInfos, refreshInfosTeacher } from '../../../slice';
import { readAllTeacher } from '@/api';
import Combobox from './Combobox';
import { X } from 'lucide-react';

type FilterProps = {
    setFilter: (filter: boolean) => void;
}

export default function Filter({ setFilter }: FilterProps){
    const { allInfosTeacher } = useSelector((root: RootState) => root.Slice);
    const [selected, setSelected] = useState<TeacherInfos>({} as TeacherInfos)
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosTeacher(await readAllTeacher()));
            setSelected(allInfosTeacher[0]);
        })()
    }, [])

    const filteredPeople = query === '' ? allInfosTeacher
        : allInfosTeacher.filter((person) =>
            person.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

    return(
        <div className="w-screen h-full fixed flex items-center justify-end bg-modal top-0 left-0">
            <div className="w-[35%] h-full flex flex-col gap-6 bg-white p-3">
                <header className="w-full h-auto grid grid-cols-2 items-center justify-between gap-1 after:block after:w-full after:h-1 after:border-b after:border-[#E0E0E0] after:col-span-2">
                    <h2 className="text-3xl font-bold">Filtro</h2>

                    <X size={36} className="cursor-pointer ml-auto" onClick={() => setFilter(false)} />
                </header>

                <div className="w-full h-auto flex flex-col gap-1">
                    <span>Professor: </span>
                    
                    <Combobox 
                        filteredPeople={filteredPeople} 
                        selected={selected} 
                        setSelected={setSelected}
                        query={query}
                        setQuery={setQuery}
                        key={"combobox-teacher"}
                    />
                </div>
            </div>
        </div>
    )
}