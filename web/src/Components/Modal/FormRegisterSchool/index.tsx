import React, { useEffect } from "react";
import { SchoolInfos } from "../../../../slice";
import { Plus } from "lucide-react";
import Input from "../../../Components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'

const createFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório!"),
  classificação: z.string().nonempty("Selecione uma titularidade!"),
})

type FormRegisterSchoolProps = {
  infosInput: SchoolInfos;
  submit: (e) => void;
  setModal: (modal: boolean) => void;
};

type CreateFormData = z.infer<typeof createFormSchema>

export default function FormRegisterSchool(props: FormRegisterSchoolProps) {
  const { infosInput, setModal, submit } = props;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema)
  });

  useEffect(() => {
    if (infosInput.edit !== -1) {
      setValue("classificação", getClassificacaoFromName(infosInput.name));
    }
  }, [infosInput.edit]);

  function getClassificacaoFromName(name: string) {
    if (name.includes("Escola Estadual")) {
      setValue("name", name.replace("Escola Estadual", "").trim());
      return "Escola Estadual";
    }
    else if (name.includes("Creche")) {
      setValue("name", name.replace("Creche", "").trim());
      return "Creche";
    }
    else if(name.includes("Pré-Escola")){
      setValue("name", name.replace("Pré-Escola", "").trim());
      return "Pré-Escola";
    }
    else if(name.includes("Distrito")){
      setValue("name", name.replace("Distrito", "").trim());
      return "Distrito";
    }
    return "";
  }

  return (
    <form className="w-full flex flex-col gap-8 py-2 px-4" onSubmit={handleSubmit(submit)}>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="w-auto flex flex-row items-center gap-2">
              <input
                type="radio"
                name="classificação"
                className="w-4 h-4"
                id="escola-municipal"
                value="Escola Municipal"
                {...register("classificação", { value: "" })}
              />
              <span className="text-xl font-bold">Escola Municipal</span>
            </div>

            <div className="w-auto flex flex-row items-center gap-2">
              <input
                type="radio"
                name="classificação"
                className="w-4 h-4"
                id="creche"
                value="Creche"
                {...register("classificação", { value: "" })}
              />
              <span className="text-xl font-bold">Creche</span>
            </div>

            <div className="w-auto flex flex-row items-center gap-2">
              <input
                type="radio"
                name="classificação"
                className="w-4 h-4"
                id="pre-escola"
                value="Pré Escola"
                {...register("classificação", { value: "" })}
              />
              <span className="text-xl font-bold">Pré Escola</span>
            </div>

            <div className="w-auto flex flex-row items-center gap-2">
              <input
                type="radio"
                name="classificação"
                className="w-4 h-4"
                id="distrito"
                value="Distrito"
                {...register("classificação", { value: "" })}
              />
              <span className="text-xl font-bold">Distrito</span>
            </div>
          </div>
          {errors.classificação && <span className="text-red-600">{errors.classificação.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-2">
          <Input
            htmlFor="name"
            label="Nome da Escola"
            name="name"
            placeholder="Escola Municipal Mario Fiorante"
            register={register}
            type="text"
            key={"name-escola-input"}
          />
          {errors.name && <span className="text-red-600">{errors.name.message}</span>}
        </div>
      </div>

      <div className="w-full flex items-center justify-end">
        <button
          type="submit"
          className="flex flex-row items-center gap-2 py-2 px-4 border border-[#22C55E] text-[#22C55E] cursor-pointer rounded-lg group hover:bg-[#22C55E] transition-colors"
          onClick={() => setModal(true)}
        >
          <Plus size={26} className="group-hover:text-white" />
          <span className="text-lg group-hover:text-white">Cadastro</span>
        </button>
      </div>
    </form>
  );
}
