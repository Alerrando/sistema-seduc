"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ZodTypeAny } from 'zod';
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "./SelectInput";
import Calendar from "react-calendar";
import { UserInfos } from "../../../../slice/LoginSlide";
import { LessonsInfos, OfficeInfos, SchoolInfos, TeacherInfos } from "../../../../slice";
import { CreateFormDataSchool } from "../../../app/(cadastros)/cadastro-escola/page";
import { CreateFormDataTeacher } from "../../../app/(cadastros)/cadastro-professor/page";
import { CreateFormDataLesson } from "../../../app/(cadastros)/controle-aulas-eventuais/page";
import { CreateFormDataOffice } from "../../../app/admin/AsideAdmin/RegisterOffice";
import { CreateFormDataUser } from "../../../app/admin/AsideAdmin/UsersList";

type InputType = "text" | "number" | "email";

type InputConfig = {
  label: string;
  htmlFor: string;
  type: InputType;
  placeholder: string;
  name: string;
};

type ModalFormProps = {
  schema: CreateFormDataSchool | CreateFormDataTeacher | CreateFormDataLesson | CreateFormDataOffice | CreateFormDataUser;
  inputs: InputConfig[];
  initialValues: LessonsInfos | SchoolInfos | TeacherInfos | UserInfos | OfficeInfos;
  setInfosInput: (initalValues: LessonsInfos | SchoolInfos | TeacherInfos | UserInfos | OfficeInfos) => void;
  onSubmit: (data: CreateFormDataSchool | CreateFormDataTeacher | CreateFormDataLesson | CreateFormDataOffice | CreateFormDataUser) => void;
  modalName: string;
};

export function ModalForm(props: ModalFormProps) {
  const { schema, inputs, initialValues, setInfosInput, onSubmit, modalName } = props;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateFormDataSchool | CreateFormDataTeacher | CreateFormDataLesson | CreateFormDataOffice | CreateFormDataUser>({
    resolver: zodResolver(schema),
    defaultValues: initialValues as typeof schema['_input'],
  });
  

  function handleFormSubmit(data: CreateFormDataSchool | CreateFormDataTeacher | CreateFormDataLesson | CreateFormDataOffice | CreateFormDataUser) {
    if (modalName === "Lesson") {
      reset({
        name: "",
        cadastroEscola: "",
        horaAulas: "",
      });
    } else if (modalName === "Teacher") {
      reset({
        name: "",
        cpf: "",
        cargo: "",
      });
    } else {
      reset();
    }
  
    onSubmit(data);
  };

  return (
    <>
      {modalName === "Lesson" && (
        <Calendar className="w-[100%!important] calendar shadow-md rounded-md calendar" value={initialValues.diaAula} onChange={e => setInfosInput({ ...initialValues, diaAula: new Date(e).toString()})}  />
      )}
      <form className="w-full flex flex-col gap-8 py-2 px-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="w-full flex flex-col gap-3">
          {inputs?.map((input: InputConfig) => (
              <div key={input.name} className="w-full flex flex-col gap-2">
                {input.input === "select" ? (
                  <SelectInput
                    name={input.name}
                    htmlFor={input.htmlFor}
                    label={input.label}
                    optionDefault={input.optionDefault}
                    optionType={input.optionType}
                    key={`select-${input.name}`}
                    register={register}
                  />
                ) : (
                  <Input
                    htmlFor={input.htmlFor}
                    label={input.label}
                    type={input.type}
                    key={`input-${input.name}`}
                    name={input.name}
                    placeholder={input.placeholder}
                    register={register}
                  />
                )}
                {errors[input.name] && <span className="text-red-600">{errors[input.name].message}</span>}
              </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-end">
          <button
            type="submit"
            className="w-20 flex flex-row items-center justify-center gap-2 py-2 px-4 border border-[#22C55E] text-[#22C55E] cursor-pointer rounded-lg group hover:bg-[#22C55E] transition-colors"
          >
            <span className="text-lg group-hover:text-white">Ok</span>
          </button>
        </div>
      </form>
    </>
  );
}
