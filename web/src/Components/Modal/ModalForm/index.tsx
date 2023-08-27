"use client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ZodType } from "zod";
import { SubmitDataModal } from "..";
import { RootState } from "../../../../configureStore";
import { InputConfig, OfficeInfos } from "../../../../slice";
import Input from "./Input";
import SelectInput from "./SelectInput";
import CheckboxDropdownOfficeTeacher from "./SelectInput/CheckboxDropdownOfficeTeacher";

type ModalFormProps = {
  schema: ZodType<any, any, any>;
  inputs: InputConfig[];
  initialValues: any;
  setInfosInput?: (initalValues: any) => void;
  onSubmit: (data: SubmitDataModal, officesTeacher?: number[]) => void;
  modalName: string;
};

export function ModalForm(props: ModalFormProps) {
  const { allInfosOffice } = useSelector((root: RootState) => root.Slice);
  const { schema, inputs, initialValues, setInfosInput, onSubmit, modalName } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    control,
  } = useForm<SubmitDataModal>({
    resolver: zodResolver(schema),
    defaultValues: initialValues as (typeof schema)["_input"],
  });

  function handleFormSubmit(data: SubmitDataModal) {
    if (modalName === "Lesson") {
      setValue("name", "");
      setValue("registerSchool", 0);
      setValue("amountTime", "");
    } else if (modalName === "Teacher") {
      setValue("name", "");
      setValue("cpf", "");
    } else {
      reset();
    }
    onSubmit(data);
  }

  return (
    <>
      {initialValues && "lessonDay" in initialValues && setInfosInput && (
        <Calendar
          className="w-[100%!important] calendar shadow-md rounded-md calendar"
          value={initialValues.lessonDay}
          onChange={(e) =>
            setInfosInput({
              ...initialValues,
              lessonDay: e ? (typeof e === "string" ? e : e instanceof Date ? e.toISOString() : e.toString()) : "",
            })
          }
        />
      )}
      <form className="w-full flex flex-col gap-8 py-2 px-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="w-full flex flex-col gap-3">
          {inputs?.map((input: InputConfig, indexInputs: number) => (
            <div key={input.name} className="w-full flex flex-col gap-2">
              {input?.optionType === "OfficeTeacher" ? (
                <CheckboxDropdownOfficeTeacher
                  offices={allInfosOffice.filter((office: OfficeInfos) => office.type === "2")}
                  control={control}
                  values={initialValues.id}
                  key={`input-checkbox-dropdown-office-teacher`}
                />
              ) : input?.input === "select" && input?.optionType !== undefined ? (
                <SelectInput
                  name={input.name}
                  htmlFor={input.htmlFor}
                  label={input.label}
                  optionDefault={input.optionDefault}
                  optionType={input.optionType}
                  register={register}
                  key={`select-${input.name}`}
                />
              ) : (
                <Input
                  htmlFor={input.htmlFor}
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  setValue={setValue}
                  maskHandleForm={input.maskHandleForm}
                  register={register}
                  maxChars={input.maxChars}
                  key={`input-${input.name}`}
                />
              )}

              <ErrorMessage
                errors={errors}
                name={input.name}
                render={({ message }) => <span className="text-red-600">{message}</span>}
                key={`error-mensagge-${indexInputs}`}
              />
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
