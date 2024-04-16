import { OfficeInfos } from "../../utils/type";

type RenderOtherColumnsProps = {
  office: OfficeInfos;
  index: number;
};

export default function RenderOtherColumns({ office, index }: RenderOtherColumnsProps) {
  return (
    <>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{"name" in office && office.name}</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {"type" in office && office.type === "1" ? "Usuário" : "Professor"}
      </td>
    </>
  );
}
