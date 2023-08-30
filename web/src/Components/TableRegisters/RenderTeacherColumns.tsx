import { useSelector } from "react-redux";
import { RootState } from "../../../configureStore";
import { TeacherInfos, TeachersOffice } from "../../../slice";

type RenderTeacherColumnsProps = {
  teacher: TeacherInfos;
  index: number;
};

export default function RenderTeacherColumns({ teacher, index }: RenderTeacherColumnsProps) {
  const { allInfosTeachersOffice } = useSelector((root: RootState) => root.Slice);

  return (
    <>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{teacher?.name}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{teacher?.cpf}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{teacher?.thirst.name}</td>

      <td className="flex flex-row whitespace-nowrap px-4 py-6 font-medium text-gray-900 divide-x-[1px] divide-gray-400">
        {allInfosTeachersOffice?.map((office: TeachersOffice, indexOffice: number) => (
          <>
            {office.registerTeacher.id === teacher.id && (
              <span key={indexOffice} className="px-2">
                {office.registerOffice.name}
              </span>
            )}
          </>
        ))}
      </td>
    </>
  );
}
