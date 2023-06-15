import React, { useEffect } from "react";
import { TeacherInfos } from "../../../../slice";
import { Plus } from "lucide-react";
import Input from "@/Components/Input";
import { useForm } from "react-hook-form";

type FormRegisterTeacherProps = {
  infosInput: TeacherInfos;
  submit: (e) => void;
  setModal: (modal: boolean) => void;
};

export default function FormRegisterTeacher(props: FormRegisterTeacherProps) {
  const { infosInput, setModal, submit } = props;
  const { register, handleSubmit, setValue } = useForm<TeacherInfos>();

  useEffect(() => {
    if (infosInput.edit !== -1) {
      setValue("name", infosInput.name);
      setValue("titularidade", infosInput.titularidade);
    }
  }, [infosInput.edit]);

  return (
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
      </div>

      <div className="w-full flex flex-col gap-3">
        <Input
          htmlFor="name"
          label="Nome do Professor"
          name="name"
          placeholder="Ana Laura"
          register={register}
          type="text"
          key={"name-professor-input"}
        />
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
