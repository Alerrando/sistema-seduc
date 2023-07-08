import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps<T> = {
    label: string,
    htmlFor: string,
    type: string,
    placeholder?: string,
    name: string,
    register: UseFormRegister<T>
}

export default function Input<T extends FieldValues>(props: InputProps<T>){
    const { label, htmlFor, type, placeholder, name, register } = props;

    return(
        <div className="w-full flex flex-col gap-2">
            <label htmlFor={htmlFor} className="font-bold">{label}</label>
            <input type={type} placeholder={placeholder} name={name} className="border border-[#999] rounded-lg p-2 outline-none" { ...register(name) } />
        </div>
    )
}