import { useEffect } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../configureStore";
import { OfficeInfos, SchoolInfos, TeacherInfos } from "../../../../../slice";

type SelectInputProps = {
  label: string;
  htmlFor: string;
  name: string;
  optionDefault: string;
  optionType: string;
  register: UseFormRegister<unknown>;
  initialValues: unknown;
  setValue: UseFormSetValue<unknown>;
  modalName: string;
};

export default function SelectInput(props: SelectInputProps) {
  const { label, htmlFor, name, optionDefault, optionType, register, initialValues, setValue, modalName } = props;
  const { allInfosSchool, allInfosTeacher, allInfosOffice } = useSelector((root: RootState) => root.Slice);

  useEffect(() => {
    if (initialValues !== undefined) {
      if (!initialValues?.edit) {
        setValue(name, 0);
      } else {
        if (modalName === "Lesson") {
          setValue(name, initialValues.registerTeacher.id);
          setValue(name, initialValues.registerSchool.id);
        } else if (modalName === "Teacher") {
          setValue(name, initialValues.thirst.id);
        }
      }
    }
  }, [initialValues, modalName, name, setValue]);

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-bold">
        {label}
      </label>
      <select id={name} className="border border-[#999] rounded-lg p-2 outline-none" {...register(name)}>
        <option key={`default ${optionType}`} value={0} className="outline-none border-none" defaultChecked={true}>
          {optionDefault}
        </option>

        {optionType === "School" ? (
          <>
            {[...allInfosSchool]
              ?.sort((info1: SchoolInfos, info2: SchoolInfos) => info1.name.localeCompare(info2.name))
              .map((school: SchoolInfos) => (
                <>
                  {school.inactive === false ? (
                    <option
                      key={`escola-${school.name}`}
                      value={school.id}
                      defaultChecked={true}
                      className="outline-none border-none"
                    >
                      {school.name}
                    </option>
                  ) : null}
                </>
              ))}
          </>
        ) : optionType === "Teacher" ? (
          <>
            {[...allInfosTeacher]
              ?.sort((info1: TeacherInfos, info2: TeacherInfos) => info1.name.localeCompare(info2.name))
              .map((teacher: TeacherInfos) => (
                <>
                  {teacher.inactive === false && (
                    <option key={`professor-${teacher.name}`} value={teacher.id} className="outline-none border-none">
                      {teacher.name}
                    </option>
                  )}
                </>
              ))}
          </>
        ) : optionType === "Office" ? (
          <>
            <option key="office-user" value={1} className="outline-none border-none">
              Usuário
            </option>
            <option key="office-teacher" value={2} className="outline-none border-none">
              Professor
            </option>
          </>
        ) : optionType === "OfficeUser" ? (
          <>
            {allInfosOffice?.map((office: OfficeInfos) => (
              <>
                {office.type === "1" && office.inactive === false ? (
                  <option key={`office-${office.name}`} value={office.id} className="outline-none border-none">
                    {office.name}
                  </option>
                ) : null}
              </>
            ))}
          </>
        ) : optionType === "permission" ? (
          <>
            <option key="permission-on" value={1} className="outline-none border-none">
              Permitido
            </option>
            <option key="permission-off" value={0} className="outline-none border-none">
              Não Permitido
            </option>
          </>
        ) : (
          <>
            <option key="mandatory-on" value={1} className="outline-none border-none">
              Obrigatório
            </option>
            <option key="mandatory-off" value={0} className="outline-none border-none">
              Não Obrigatório
            </option>
          </>
        )}
      </select>
    </div>
  );
}
