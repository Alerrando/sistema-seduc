import { SchoolInfos } from "../../utils/type";

type RenderSchoolColumnsProps = {
  school: SchoolInfos;
  indeX: number;
};

export default function RenderSchoolColumns({ school, index }: RenderSchoolColumnsProps) {
  return (
    <>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{school.name}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{school.adress}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{school.zip}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{school.fone}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{school.email}</td>
    </>
  );
}
