import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UserInfos } from "../../../slice/LoginSlice";

type RenderUserColumnsProps = {
  user: UserInfos;
  index: number;
};

export default function RenderUserColumns({
  user,
  index,
}: RenderUserColumnsProps) {
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  return (
    <>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {user.name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {user.email}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {user.rg}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {user.office?.name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {user.registerSchool !== null
          ? user.registerSchool.name
          : "Não Atribuido"}
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {user.mandatoryBulletin === 1 ? "Obrigatório" : "Não Obrigatório"}
      </td>
      <td className="flex flex-row items-center gap-2 whitespace-nowrap p-4 font-medium text-gray-900">
        {!viewPassword ? (
          <EyeOff
            size={26}
            className="cursor-pointer"
            onClick={() => setViewPassword(true)}
          />
        ) : (
          <>
            {user.password}
            <Eye
              size={26}
              className="cursor-pointer"
              onClick={() => setViewPassword(false)}
            />
          </>
        )}
      </td>
    </>
  );
}
