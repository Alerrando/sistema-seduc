import React from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { SubmitDataModal } from "../..";

type InputProps = {
	label: string,
	htmlFor: string,
	type: string,
	placeholder?: string,
	name: keyof SubmitDataModal,
	register: UseFormRegister<any>,
	setValue: UseFormSetValue<SubmitDataModal>
	maskHandleForm?: (value: string) => string,
	maxChars?: number,
}

export default function Input<T extends FieldValues>(props: InputProps) {
	const { label, htmlFor, type, placeholder, name, register, setValue, maskHandleForm, maxChars } = props;

	return (
		<div className="w-full flex flex-col gap-2">
			<label htmlFor={htmlFor} className="font-bold">{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				className="border border-[#999] rounded-lg p-2 outline-none"
				{...register(name)}
				onChange={e => handleMask(e)}
				maxLength={maxChars}
			/>
		</div>
	);

	function handleMask(e: React.ChangeEvent<HTMLInputElement>) {
		if (setValue && maskHandleForm) {
			const aux = maskHandleForm(e.target.value);
			setValue(`${name}`, aux);
		}
	}
}