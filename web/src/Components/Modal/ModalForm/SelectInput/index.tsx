import React, { Key } from "react"
import { OfficeInfos, SchoolInfos, TeacherInfos, registerTypes } from "../../../../../slice"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../configureStore"
import { FieldValues, UseFormRegister } from "react-hook-form"

type SelectInputProps = {
    label: string,
    htmlFor: string,
    name: string,
    optionDefault: string,
    optionType: string,
    register: UseFormRegister<any>,
}

export default function SelectInput<T extends FieldValues>(props: SelectInputProps){
    const { label, htmlFor, name, optionDefault, optionType, register } = props;
    const { allInfosLesson, allInfosSchool, allInfosTeacher, allInfosOffice } = useSelector((root: RootState) => root.Slice);
    
    return(
        <div className="w-full flex flex-col gap-2">
            <label htmlFor={htmlFor} className="font-bold">{label}</label>
            <select id={name} className="border border-[#999] rounded-lg p-2 outline-none" { ...register(name) }>
                <option value="" className="outline-none border-none" defaultChecked>{optionDefault}</option>
                
                {optionType === "School" ? (
                    <>
                        {allInfosSchool?.map((school: SchoolInfos, index: Key) => (
                            <option key={`escola-${school.name}`} value={`${school.id}`} className="outline-none border-none">{school.name}</option>
                        ))}
                    </>
                ) : optionType === "Teacher" ? (
                        <>
                            {allInfosTeacher?.map((teacher: TeacherInfos, index: Key) => (
                                <option key={`professor-${teacher.name}`} value={teacher.id} className="outline-none border-none">{teacher.name}</option>
                            ))}
                        </>
                    ) : optionType === "Office" ? (
                        <>
                            <option key="office-user" value={1}  className="outline-none border-none">Usuário</option>
                            <option key="office-teacher" value={2} className="outline-none border-none">Professor</option>
                        </>
                    ) : optionType === "OfficeTeacher" ? (
                        <>
                            {allInfosOffice?.map((office: OfficeInfos, index: Key) => (
                                <>
                                    {office.type === "2" ? (
                                        <option key={`office-${office.name}`} value={office.name} className="outline-none border-none">{office.name}</option>
                                    ) : null}
                                </>
                            ))}
                        </>
                    ) : optionType == "permission" ?  (
                        <>
                            <option key="permission-on" value={1}  className="outline-none border-none">Permitido</option>
                            <option key="permission-off" value={0} className="outline-none border-none">Não Permitido</option>
                        </>
                    ) : (
                        <>
                            <option key="mandatory-on" value={1}  className="outline-none border-none">Obrigatório</option>
                            <option key="mandatory-off" value={0} className="outline-none border-none">Não Obrigatório</option>
                        </>
                    )
                }
            </select>
        </div>
    )
}