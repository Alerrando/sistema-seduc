import { useEffect, useState } from "react";
import { TeacherInfos, TeachersOffice } from "../../../slice";
import { findTeachersOfficeById } from "../../api";

type RenderTeacherColumnsProps = {
  teacher: TeacherInfos;
  index: number;
};

export default function RenderTeacherColumns({ teacher, index }: RenderTeacherColumnsProps) {
  const [officesTeacher, setOfficesTeacher] = useState<TeachersOffice[]>([]);

  useEffect(() => {
    async function fetchOffices() {
      try {
        const offices: TeachersOffice[] = await getOfficesTeacher(teacher.id);
        setOfficesTeacher(offices);
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    }

    fetchOffices();
  }, []);

  console.log(officesTeacher);

  return (
    <>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{teacher?.name}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{teacher?.cpf}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{teacher?.thirst.name}</td>

      <td className="flex flex-row whitespace-nowrap px-4 py-6 font-medium text-gray-900 divide-x-[1px] divide-gray-400">
        {officesTeacher.map((office: TeachersOffice, indexOffice: number) => (
          <span key={indexOffice} className="px-2">
            {office.registerOffice.name}
          </span>
        ))}
      </td>
    </>
  );

  async function getOfficesTeacher(id: number): Promise<TeachersOffice[]> {
    try {
      const results: TeachersOffice[] = await findTeachersOfficeById(id);
      return results;
    } catch (error) {
      console.error("Error fetching offices for teacher:", error);
      return [];
    }
  }
}
