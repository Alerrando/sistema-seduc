import React, { useState, useEffect, Key } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form'
import { RootState } from "../../../system";
import { refreshAllFilterInfosTeacher, refreshFilterInfosTeacher } from '../../../slice/TeacherFilterSlice';
import { getNameByIdTeacher, getReportsTeacher, readAllTeacher } from '../../api'
import { X } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns';
import { refreshInfosTeacher, TeacherDTOInfos, TeacherInfos } from '../../../slice';

const createFormSchema = z.object({
    cadastroProfessor: z.string().nonempty("Selecione um professor ou adicione!"),
})

type FilterProps = {
    setFilter: (filter: boolean) => void;
}

export type DatasTypes = {
    dataInicial: string | Date,
    dataFinal: string | Date,
}

type CreateFormData = z.infer<typeof createFormSchema>

export default function Filter({ setFilter }: FilterProps){
    const { allInfosTeacher } = useSelector((root: RootState) => root.Slice);
    const { allFilterInfosTeacher, filterInfosTeacher } = useSelector((root: RootState) => root.SliceTeacher)
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: zodResolver(createFormSchema),
    })
    const [datas, setDatas] = useState<DatasTypes>({} as DatasTypes);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(refreshInfosTeacher(await readAllTeacher()));
        })()
    }, [])


    return(
        <div className="w-screen h-full fixed flex items-center justify-end bg-modal top-0 left-0 ">
            <form className="w-full md:w-[35%] h-full flex flex-col gap-6 bg-white p-3 overflow-y-auto" onSubmit={handleSubmit(submit)}>
                <header className="w-full h-auto grid grid-cols-2 items-center justify-between gap-1 after:block after:w-full after:h-1 after:border-b after:border-[#E0E0E0] after:col-span-2">
                    <h2 className="text-3xl font-bold">Filtro</h2>

                    <X size={36} className="cursor-pointer ml-auto" onClick={() => setFilter(false)} />
                </header>

                <div className="w-full h-auto flex flex-col gap-1">                    
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="professores" className="text-lg font-bold">Professores</label>
                        <select id="cadastroProfessor" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("cadastroProfessor") }>
                            <option value="" defaultChecked className="outline-none border-none">Selecione um Professor</option>
                            {allInfosTeacher?.map((teacher: TeacherInfos, index: Key) => (
                                <option key={`professor-${teacher.name}`} value={teacher.id} className="text-sm md:text-base outline-none border-none">{teacher.name}</option>
                            ))}
                        </select>

                        {errors.cadastroProfessor && <span className='text-red-600'>{errors.cadastroProfessor.message}</span>}
                    </div>
                </div>

                <div className="w-full h-auto flex flex-col gap-1">
                    <span className='text-lg font-bold'>Data Inicial: </span>
                    <Calendar
                        className="w-[100%!important] calendar shadow-md rounded-md calendar"
                        value={datas.dataInicial ? new Date(datas.dataInicial) : null}
                        onChange={(e) =>
                            setDatas({
                            ...datas,
                            dataInicial: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
                            })
                        }
                    />
                </div>

                <div className="w-full h-auto flex flex-col gap-1">
                    <span className='text-lg font-bold'>Data Final: </span>
                    <Calendar
                        className="w-[100%!important] calendar shadow-md rounded-md calendar"
                        value={datas.dataFinal ? new Date(datas.dataFinal) : null}
                        onChange={(e) =>
                            setDatas({
                            ...datas,
                            dataFinal: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
                            })
                        }
                    />
                </div>

                <div className="w-full h-auto flex items-center justify-center">
                    <button type='submit' className="w-[80%] py-2 text-center border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                        Filtrar
                    </button>
                </div>
            </form>
        </div>
    );

    async function submit(e: CreateFormData){
        let aux: TeacherDTOInfos[] = [];
        aux = await getReportsTeacher(e.cadastroProfessor, new Date(datas.dataInicial), new Date(datas.dataFinal));

        if(typeof aux === "object") {
            dispatch(refreshAllFilterInfosTeacher(aux.sort((data1: TeacherDTOInfos, data2: TeacherDTOInfos) => new Date(data1.dataAula) - new Date(data2.dataAula))))
            dispatch(refreshFilterInfosTeacher(await getNameByIdTeacher(e.cadastroProfessor)));
        }

        setFilter(false);
    }
}
