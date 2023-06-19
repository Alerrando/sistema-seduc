import React, { useEffect } from "react";
import { TeacherInfos } from "../../../../slice";
import { Plus } from "lucide-react";
import Input from "../../../Components/Input";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState } from "../../../../system";

const createFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório!"),
  cpf: z.string().max(15).refine((value) => isValidCPF(value), {
    message: 'CPF inválido',
  }),
  sede: z.string().nonempty("Selecione qual a sede"),
  cargo: z.string().nonempty("Selecione qual o cargo"),
})

function isValidCPF(cpf: string): boolean {
  const cleanedCPF = cpf.replace(/\D/g, '');

  if (cleanedCPF.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cleanedCPF)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
  }
  let mod = sum % 11;
  const digit1 = mod < 2 ? 0 : 11 - mod;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
  }
  mod = sum % 11;
  const digit2 = mod < 2 ? 0 : 11 - mod;

  return (
    cleanedCPF.charAt(9) === digit1.toString() &&
    cleanedCPF.charAt(10) === digit2.toString()
  );
}

type FormRegisterTeacherProps = {
  infosInput: TeacherInfos;
  submit: (e) => void;
  setModal: (modal: boolean) => void;
};

type CreateFormData = z.infer<typeof createFormSchema>

export default function FormRegisterTeacher(props: FormRegisterTeacherProps) {
  const { infosInput, setModal, submit } = props;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema)
  });
  const { allInfosSchool } = useSelector((root: RootState) => root.Slice);

  useEffect(() => {
    if (infosInput.edit !== -1) {
      setValue("name", infosInput.name);
      setValue("cpf", infosInput.cpf);
      setValue("cargo", infosInput.cargo);
      setValue("sede", infosInput.sede);
    }
  }, [infosInput.edit]);

  return (
    <form className="w-full flex flex-col gap-8 py-2 px-4" onSubmit={handleSubmit(submit)}>
    
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2">
          <Input
            htmlFor="name"
            label="Nome do Professor"
            name="name"
            placeholder="Ana Laura"
            register={register}
            type="text"
            key={"name-professor-input"}
          />
          {errors.name && <span className="text-red-600">{errors.name.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-2">
          <Input 
            htmlFor="cpf"
            label="Cpf do Professor"
            name="cpf"
            placeholder="000.000.000-00"
            register={register}
            type="text"
            key={"cpf-professor-input"}
          />
          {errors.cpf && <span className="text-red-600">{errors.cpf.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-2">
            <label htmlFor="sede" className="font-bold">Escola</label>
            <select name="sede" id="" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("sede") }>
                <option value="" defaultChecked className="outline-none border-none">Selecione uma Sede</option>
                {allInfosSchool?.map((school: SchoolInfos, index: Key) => (
                    <option key={`escola-${school.name}`} value={school.id} className="outline-none border-none">{school.name}</option>
                ))}
            </select>

            {errors.sede && <span className='text-red-600'>{errors.sede.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-2">
            <label htmlFor="cargo" className="font-bold">Cargo</label>
            <select name="cargo" id="" className="border border-[#999] rounded-lg p-2 outline-none" { ...register("cargo") }>
                <option value="" defaultChecked className="outline-none border-none">Selecione um Cargo</option>
                <option key={`peb-I`} value={"PEB I - Pedagogia"} className="outline-none border-none">PEB I - Pedagogia</option>
                <option key={`peb-II-artes`} value={"PEB II - Artes"} className="outline-none border-none">PEB II - Artes</option>
                <option key={`peb-II-edFisica`} value={"PEB II - Educação Física"} className="outline-none border-none">PEB II - Educação Física</option>
                <option key={`peb-II-ingles`} value={"PEB II - Inglês"} className="outline-none border-none">PEB II - Inglês</option>
            </select>

            {errors.cargo && <span className='text-red-600'>{errors.cargo.message}</span>}
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
