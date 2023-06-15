import React, { Key, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { LessonsInfos, SchoolInfos, TeacherInfos } from '@/slice';
import Input from '@/Components/Input';
import { Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/system';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createFormSchema = z.object({
    horaAulas: z.string().nonempty("Digite a quantidade de aulas!"),
    cadastroProfessor: z.string().nonempty("Selecione um professor ou adicione!"),
    titularidade: z.string().nonempty("Selecione uma titularidade"),
    cadastroEscola: z.string().nonempty("Selecione uma escola ou adicione!"),
})

type FormRegisterLessonProps = {
    infosInput: LessonsInfos,
    submit: (e) => void,
    setModal: (modal: boolean) => void,
}

type CreateFormData = z.infer<typeof createFormSchema>


export default function FormRegisterLesson(props: FormRegisterLessonProps){
    const { infosInput, setModal, submit } = props;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateFormData>({
        resolver: zodResolver(createFormSchema)
    });
    const { allInfosSchool, allInfosTeacher } = useSelector((root: RootState) => root.Slice);

    useEffect(() => {
		if (infosInput.edit !== -1) {
			const parsedDate = parse(infosInput.diaAula, "dd/MM/yyyy", new Date());
			setValue("diaAula", parsedDate);
			setValue("horaAulas", infosInput.horaAulas);
			setValue("cadastroProfessor", infosInput.cadastroProfessor);
			setValue("titularidade", infosInput.titularidade);
			setValue("cadastroEscola", infosInput.cadastroEscola);
		}
	}, [infosInput.edit]);

    return(
        <form className="w-full flex flex-col gap-8 py-2 px-4" onSubmit={handleSubmit(submit)}>
            <div className="w-full flex flex-col">
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="w-auto flex flex-row items-center gap-2">
                        <input type="radio" name="titularidade" className="w-4 h-4" id="titular" value="Titular" { ...register("titularidade", { value: "" }) } />
                        <span className="text-xl font-bold">Titular</span>
                    </div>

                    <div className="w-auto flex flex-row items-center gap-2">
                        <input type="radio" name="titularidade" className="w-4 h-4" id="titular" value="Substituo" { ...register("titularidade", { value: "" }) } />
                        <span className="text-xl font-bold">Substituo</span>
                    </div>
                </div>
                {errors.titularidade && <span className='text-red-600'>{errors.titularidade.message}</span>}
            </div>
            
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-col gap-2 px-2">
                    <label htmlFor="professores" className="font-bold">Professores</label>
                    <select name="cadastroProfessor" id="" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("cadastroProfessor") }>
                        <option value="" defaultChecked className="outline-none border-none">Selecione um Professor</option>
                        {allInfosTeacher?.map((teacher: TeacherInfos, index: Key) => (
                            <option key={`professor-${teacher.name}`} value={teacher.id} className="outline-none border-none">{teacher.name}</option>
                        ))}
                    </select>

                    {errors.cadastroProfessor && <span className='text-red-600'>{errors.cadastroProfessor.message}</span>}
                </div>

                <div className="w-full flex flex-col gap-2 px-2">
                    <label htmlFor="cadastroEscola" className="font-bold">Escola</label>
                    <select name="cadastroEscola" id="" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("cadastroEscola") }>
                        <option value="" defaultChecked className="outline-none border-none">Selecione uma Escola</option>
                        {allInfosSchool?.map((school: SchoolInfos, index: Key) => (
                            <option key={`escola-${school.name}`} value={school.id} className="outline-none border-none">{school.name}</option>
                        ))}
                    </select>

                    {errors.cadastroEscola && <span className='text-red-600'>{errors.cadastroEscola.message}</span>}
                </div>

                <Input htmlFor="horas-aulas" label="Horas de aula dadas" name="horaAulas" placeholder="1" register={register} type="number" key={"horaAulas-input"} />
                {errors.horaAulas && <span className='text-red-600'>{errors.horaAulas.message}</span>}

            </div>

            <div className="w-full flex items-center justify-end">
                <button type="submit" className="flex flex-row items-center gap-2 py-2 px-4 border border-[#22C55E] text-[#22C55E] cursor-pointer rounded-lg group hover:bg-[#22C55E] transition-colors" onClick={() => setModal(true)}>
                    <Plus size={26} className="group-hover:text-white" />
                    <span className="text-lg group-hover:text-white">Cadastro</span>
                </button>
            </div>
        </form>
    )
}
