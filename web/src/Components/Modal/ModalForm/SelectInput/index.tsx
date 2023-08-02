import { UseFormRegister } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../configureStore";
import { OfficeInfos, SchoolInfos, TeacherInfos } from "../../../../../slice";

type SelectInputProps = {
    label: string,
    htmlFor: string,
    name: string,
    optionDefault: string,
    optionType: string,
    register: UseFormRegister<any>,
}

export default function SelectInput(props: SelectInputProps){
	const { label, htmlFor, name, optionDefault, optionType, register } = props;
	const { allInfosSchool, allInfosTeacher, allInfosOffice } = useSelector((root: RootState) => root.Slice);
    
	return(
		<div className="w-full flex flex-col gap-2">
			<label htmlFor={htmlFor} className="font-bold">{label}</label>
			<select id={name} className="border border-[#999] rounded-lg p-2 outline-none" { ...register(name) }>
				<option key={`default ${optionType}`} value="" className="outline-none border-none" defaultChecked={true}>{optionDefault}</option>
                
				{optionType === "School" ? (
					<>
						{allInfosSchool?.map((school: SchoolInfos) => (
							<>
								{school.inactive === false ? (
									<option key={`escola-${school.name}`} value={school.id.toString()} defaultChecked={true} className="outline-none border-none">{school.name}</option>
								) : null}
							</>
						))}
					</>
				) : optionType === "Teacher" ? (
					<>
						{allInfosTeacher?.map((teacher: TeacherInfos) => (
							<>
								{teacher.inactive === false && (
									<option key={`professor-${teacher.name}`} value={teacher.id} className="outline-none border-none">{teacher.name}</option>
								)}
							</>
						))}
					</>
				) : optionType === "Office" ? (
					<>
						<option key="office-user" value={1}  className="outline-none border-none">Usuário</option>
						<option key="office-teacher" value={2} className="outline-none border-none">Professor</option>
					</>
				) : optionType === "OfficeTeacher" ? (
					<>
						{allInfosOffice?.map((office: OfficeInfos) => (
							<>
								{office.type === "2" && office.inactive === false ? (
									<option key={`office-${office.name}`} value={office.id} className="outline-none border-none">{office.name}</option>
								) : null}
							</>
						))}
					</>
				) : optionType === "OfficeUser" ? (
					<>
						{allInfosOffice?.map((office: OfficeInfos) => (
							<>
								{office.type === "1" && office.inactive === false ? (
									<option key={`office-${office.name}`} value={office.id} className="outline-none border-none">{office.name}</option>
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
	);
}