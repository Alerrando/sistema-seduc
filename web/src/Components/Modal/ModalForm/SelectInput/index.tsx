import React from "react"
import { registerTypes } from "../../../../../slice"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../configureStore"
import { FieldValues } from "react-hook-form"

type SelectInputProps<T> = {
    label: string,
    htmlFor: string,
    name: string,
    optionDefault: string,
    optionType: keyof typeof registerTypes,
    register: UseFormRegister<T>,
}

export default function SelectInput<T extends FieldValues>(props: SelectInputProps<T>){
    const { label, htmlFor, name, optionDefault, optionType, register } = props;
    const { allInfosLesson, allInfosSchool, allInfosTeacher } = useSelector((root: RootState) => root.Slice);
    
    return(
        <div className="w-full flex flex-col gap-2">
            <label htmlFor={htmlFor} className="font-bold">{label}</label>
            <select name={name} id="" className="border border-[#999] rounded-lg p-2 outline-none" { ...register(name) }>
                <option value="" defaultChecked className="text-[12px] md:text-base outline-none border-none">{optionDefault}</option>
                
                {optionType === "School" ? (
                    <>
                        {allInfosSchool?.map((school: SchoolInfos, index: Key) => (
                            <option key={`escola-${school.name}`} value={school.id} className="text-[12px] md:text-base outline-none border-none">{school.name}</option>
                        ))}
                    </>
                ) : (
                        <>
                            {allInfosTeacher?.map((teacher: TeacherInfos, index: Key) => (
                                <option key={`professor-${teacher.name}`} value={teacher.id} className="outline-none border-none">{teacher.name}</option>
                            ))}
                        </>
                    )
                )}
            </select>
        </div>
    )
}