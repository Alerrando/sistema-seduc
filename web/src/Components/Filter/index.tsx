import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../system";
import { TeacherInfos, refreshInfosTeacher } from '../../../slice';
import { readAllTeacher } from '@/api';
import { X, ChevronsUpDownIcon, CheckIcon } from 'lucide-react';
import { Combobox, Transition } from '@headlessui/react'
import dynamic from 'next/dynamic';
import 'react-calendar/dist/Calendar.css';

type FilterProps = {
    setFilter: (filter: boolean) => void;
}

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function Filter({ setFilter }: FilterProps){
    const { allInfosTeacher } = useSelector((root: RootState) => root.Slice);
    const [selected, setSelected] = useState<TeacherInfos>({} as TeacherInfos);
    const [query, setQuery] = useState('');
    const [datas, setDatas] = useState({
        dataInicial: new Date() | "",
        dataFinal: new Date() | "",
    });
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosTeacher(await readAllTeacher()));
            setSelected(allInfosTeacher[0]);
        })()
    }, [])

    const filteredPeople = query === '' ? allInfosTeacher : allInfosTeacher
    .filter((person) =>  person.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')))

    console.log(datas);

    return(
        <div className="w-screen h-full fixed flex items-center justify-end bg-modal top-0 left-0 ">
            <div className="w-[35%] h-full flex flex-col gap-6 bg-white p-3 overflow-y-auto">
                <header className="w-full h-auto grid grid-cols-2 items-center justify-between gap-1 after:block after:w-full after:h-1 after:border-b after:border-[#E0E0E0] after:col-span-2">
                    <h2 className="text-3xl font-bold">Filtro</h2>

                    <X size={36} className="cursor-pointer ml-auto" onClick={() => setFilter(false)} />
                </header>

                <div className="w-full h-auto flex flex-col gap-1">
                    <span className='text-lg font-bold'>Professor: </span>
                    
                    <Combobox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left drop-shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                <Combobox.Input
                                    className="w-full border border-[#e5e5e5] py-2 pl-3 pr-10 rounded-lg text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
                                    displayValue={(person) => person.name}
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronsUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                </Combobox.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery('')}
                            >
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                { filteredPeople.length === 0 && query !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                    </div>
                                ) : (
                                    filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                        }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                        <>
                                            <span
                                            className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                            }`}
                                            >
                                            {person.name}
                                            </span>
                                            {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                active ? 'text-white' : 'text-teal-600'
                                                }`}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            ) : null}
                                        </>
                                        )}
                                    </Combobox.Option>
                                    ))
                                )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                </div>

                <div className="w-full h-auto flex flex-col gap-1">
                    <span className='text-lg font-bold'>Data Inicial: </span>
                    <Calendar className="w-[100%!important] calendar shadow-md rounded-md calendar" value={datas.dataInicial} onChange={e => setDatas({ ...datas, dataInicial: new Date(e).toString()})}  />
                </div>

                <div className="w-full h-auto flex flex-col gap-1">
                    <span className='text-lg font-bold'>Data Final: </span>
                    <Calendar className="w-[100%!important] calendar shadow-md rounded-md calendar" value={datas.dataFinal} onChange={e => setDatas({ ...datas, dataFinal: new Date(e).toString()})}  />
                </div>

                <div className="w-full h-auto flex items-center justify-center">
                    <button type='submit' className="w-[80%] py-2 text-center border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                        Filtrar
                    </button>
                </div>
            </div>
        </div>
    )
}