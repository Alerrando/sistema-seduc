"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ZodTypeAny } from 'zod';
import Input from "./Input";

type InputType = "text" | "number" | "email";

type InputConfig = {
  label: string;
  htmlFor: string;
  type: InputType;
  placeholder: string;
  name: string;
};

type ModalFormProps<T> = {
  title: string;
  schema: ZodTypeAny;
  inputs: InputConfig[];
  initialValues?: T;
  onSubmit: (data: T) => void;
  onClose: () => void;
};

export function ModalForm<T>(props: ModalFormProps<T>) {
  const { title, schema, inputs, initialValues, onSubmit, onClose } = props;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => { setValue(key, value); });
    }
  }, [initialValues]);

  function handleClose(){
    onClose();
  };

  function handleFormSubmit(data: T){
    onSubmit(data);
  };

  return (
    <form className="w-full flex flex-col gap-8 py-2 px-4" onSubmit={handleSubmit(submitFormTeacher)}>
      <div className="w-full flex flex-col gap-3">
        {inputs.map((input) => (
            <div key={input.name} className="w-full flex flex-col gap-2">
              <label htmlFor={input.htmlFor}>{input.label}</label>
              {input.type === "textarea" ? (
                <textarea
                  name={input.name}
                  placeholder={input.placeholder}
                  {...register(input.name)}
                />
              ) : (
                <Input
                  htmlFor={input.name}
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
          onClick={() => setModal(true)}
        >
          <span className="text-lg group-hover:text-white">Ok</span>
        </button>
      </div>
    </form>
  );
}
