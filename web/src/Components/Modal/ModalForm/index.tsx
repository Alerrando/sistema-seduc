"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ZodTypeAny } from 'zod';
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "./SelectInput";
import Calendar from "react-calendar";

type InputType = "text" | "number" | "email";

type InputConfig = {
  label: string;
  htmlFor: string;
  type: InputType;
  placeholder: string;
  name: string;
};

type ModalFormProps<T> = {
  schema: ZodTypeAny;
  inputs: InputConfig[];
  initialValues: LessonsInfos | SchoolInfos | TeacherInfos;
  setInfosInput: (initalValues: LessonsInfos | SchoolInfos | TeacherInfos) => void;
  onSubmit: (data: T) => void;
  modalName: string;
};

export function ModalForm<T>(props: ModalFormProps<T>) {
  const { schema, inputs, initialValues, setInfosInput, onSubmit, modalName } = props;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues.edit) {
      Object.entries(initialValues).forEach(([key, value]) => { setValue(key, value); });
    }
  }, [initialValues]);

  function handleFormSubmit(data: T){
    setValue("name", "");

    if(modalName === "Lesson"){
      setValue("cadastroEscola", "");
      setValue("horaAulas", "");
    }
    else if(modalName === "Teacher"){
      setValue("name", "");
      setValue("cpf", "");
      setValue("cargo", "");
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
                    placeholder={input.placeholder}
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
