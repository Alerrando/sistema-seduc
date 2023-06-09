import React, { useEffect } from "react"
import { SchoolInfos } from "../../../../slice";
import { Plus } from "lucide-react";
import Input from "@/Components/Input";
import { useForm } from "react-hook-form";

type FormRegisterSchoolProps = {
    infosInput: SchoolInfos,
    submit: (e) => void,
    setModal: (modal: boolean) => void
}

export default function FormRegisterSchool(props: FormRegisterSchoolProps){
    const { infosInput, setModal, submit } = props;
    const { register, handleSubmit, setValue } = useForm<SchoolInfos>();

    useEffect(() => {
		if (infosInput.edit !== -1) {
			setValue("name", infosInput.name);
			setValue("diretor", infosInput.diretor);
            setValue("classificação", infosInput.classificação)
		}
	}, [infosInput.edit]);

    return(
        <form className="w-full flex flex-col gap-8 py-2 px-4" onSubmit={handleSubmit(submit)}>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="w-auto flex flex-row items-center gap-2">
                        <input type="radio" name="classificação" className="w-4 h-4" id="escola-municipal" value="Escola Municipal" { ...register("classificação") } />
                        <span className="text-xl font-bold">Escola Municipal</span>
                    </div>

                    <div className="w-auto flex flex-row items-center gap-2">
                        <input type="radio" name="classificação" className="w-4 h-4" id="escola-estadual" value="Escola Estadual" { ...register("classificação") } />
                        <span className="text-xl font-bold">Escola Estadual</span>
                    </div>

                    <div className="w-auto flex flex-row items-center gap-2">
                        <input type="radio" name="classificação" className="w-4 h-4" id="creche" value="Creche" { ...register("classificação") } />
                        <span className="text-xl font-bold">Creche</span>
                    </div>
                </div>

                <Input htmlFor="name" label="Nome da Escola" name="name" placeholder="Escola Municipal Mario Fiorante" register={register} type="text" key={"name-escola-input"} />
                
                <div className="w-full flex flex-col gap-2 px-2">
                    <label htmlFor="diretor" className="font-bold">Diretor</label>
                    <select name="nameDirector" id="name" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("diretor") }>
                        <option value="" defaultChecked className="outline-none border-none">Selecione um Diretor</option>
                        <option value="Alerrando" className="outline-none border-none">Alerrando</option>
                        <option value="Breno" className="outline-none border-none">Breno</option>
                    </select>
                </div>

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