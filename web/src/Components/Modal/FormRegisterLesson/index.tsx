import React, { Key, useEffect } from 'react'
import dynamic from "next/dynamic";
import { useForm } from 'react-hook-form';
import { LessonsInfos, SchoolInfos, TeacherInfos } from '../../../../slice';
import Input from '../../../Components/Input';
import { Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../system';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { parse } from 'date-fns';
import Calendar from 'react-calendar';

const createFormSchema = z.object({
    horaAulas: z.string().nonempty("Digite a quantidade de aulas!"),
    cadastroProfessor: z.string().nonempty("Selecione um professor ou adicione!"),
    cadastroEscola: z.string().nonempty("Selecione uma escola ou adicione!"),
})

type FormRegisterLessonProps = {
    infosInput: LessonsInfos,
    setInfosInput: (infosInput: LessonsInfos) => void,
    submit: (e) => void,
    setModal: (modal: boolean) => void,
}

type CreateFormData = z.infer<typeof createFormSchema>

export default function FormRegisterLesson(props: FormRegisterLessonProps){
    const { infosInput, setInfosInput, setModal, submit } = props;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateFormData>({
        resolver: zodResolver(createFormSchema)
    });
    const { allInfosSchool, allInfosTeacher } = useSelector((root: RootState) => root.Slice);

    useEffect(() => {
		if (infosInput.edit) {
			const parsedDate = parse(infosInput.diaAula, "dd/MM/yyyy", new Date());
			setValue("diaAula", parsedDate);
			setValue("horaAulas", infosInput.horaAulas);
			setValue("cadastroProfessor", String(infosInput.cadastroProfessor));
			setValue("cadastroEscola", String(infosInput.cadastroEscola));
		}
	}, [infosInput.edit]);

    return(
        <>
            <Calendar className="w-[100%!important] calendar shadow-md rounded-md calendar" value={infosInput.diaAula} onChange={e => setInfosInput({ ...infosInput, diaAula: new Date(e).toString()})}  />
            <form className="w-full flex flex-col gap-8 py-2 px-4" onSubmit={handleSubmit(submitFormLesson)}>
                <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="professores" className="font-bold">Professores</label>
                        <select id="cadastroProfessor" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("cadastroProfessor") }>
                            <option value="" defaultChecked className="outline-none border-none">Selecione um Professor</option>
                            {allInfosTeacher?.map((teacher: TeacherInfos, index: Key) => (
                                <option key={`professor-${teacher.name}`} value={teacher.id} className="outline-none border-none">{teacher.name}</option>
                            ))}
                        </select>

                        {errors.cadastroProfessor && <span className='text-red-600'>{errors.cadastroProfessor.message}</span>}
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="cadastroEscola" className="font-bold">Escola</label>
                        <select id="cadastroEscola" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("cadastroEscola") }>
                            <option value="" defaultChecked className="outline-none border-none">Selecione uma Escola</option>
                            {allInfosSchool?.map((school: SchoolInfos, index: Key) => (
                                <option key={`escola-${school.name}`} value={school.id} className="outline-none border-none">{school.name}</option>
                            ))}
                        </select>

                        {errors.cadastroEscola && <span className='text-red-600'>{errors.cadastroEscola.message}</span>}
                    </div>

                    <Input htmlFor="horas-aulas" label="Horas de aula dadas" name="horaAulas" placeholder="1" register={register} type="string" key={"horaAulas-input"} />
                    {errors.horaAulas && <span className='text-red-600'>{errors.horaAulas.message}</span>}

                </div>

                <div className="w-full flex items-center justify-end">
                    <button type="submit" className="w-20 flex flex-row items-center justify-center py-2 px-4 border border-[#22C55E] text-[#22C55E] cursor-pointer rounded-lg group hover:bg-[#22C55E] transition-colors" onClick={() => setModal(true)}>
                        <span className="text-lg group-hover:text-white">Ok</span>
                    </button>
                </div>
            </form>
        </>
    );

    function submitFormLesson(e){
        if (infosInput.edit === -1) {
            setValue("cadastroEscola", "");
            setValue("horaAulas", "");
        }

        submit(e);
    }
}
