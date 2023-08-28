import { Pencil, Trash, X } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../configureStore";
import {
  LessonsInfos,
  OfficeInfos,
  SchoolInfos,
  TeacherInfos,
  refreshInfosSchool,
  refreshInfosTeacher,
} from "../../../slice";
import { UserInfos } from "../../../slice/LoginSlice";
import { readAllSchool, readAllTeacher } from "../../api";
import RenderLessonColumns from "./RenderLessonColumns";
import RenderOtherColumns from "./RenderOtherColumns";
import RenderSchoolColumns from "./RenderSchoolColumns";
import RenderTeacherColumns from "./RenderTeacherColumns";
import RenderUserColumns from "./RenderUserColumns";

export type InfosTableRegisterData = LessonsInfos | SchoolInfos | TeacherInfos | OfficeInfos | UserInfos;

type TableRegistersProps = {
  tableHead: string[];
  editInfo: (info: InfosTableRegisterData, inactive: boolean) => void;
  deleteInfo: (info: InfosTableRegisterData) => void;
  infosAll: InfosTableRegisterData[];
};

export default function TableRegisters(props: TableRegistersProps) {
  const { tableHead, editInfo, deleteInfo, infosAll } = props;
  const { registerType } = useSelector((root: RootState) => root.Slice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      dispatch(refreshInfosSchool(await readAllSchool()));
      dispatch(refreshInfosTeacher(await readAllTeacher()));
    })();
  }, []);

  return (
    <div className="w-full overflow-x-auto border border-gray-200">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            {tableHead.map((head) => (
              <th key={head} scope="col" className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {infosAll !== null &&
            [...infosAll]
              ?.sort((info1: InfosTableRegisterData, info2: InfosTableRegisterData) =>
                info1.name !== undefined
                  ? info1.name.localeCompare(info2.name)
                  : info1.registerTeacher.name.localeCompare(info2.registerTeacher.name),
              )
              .map((info: InfosTableRegisterData, index: number) => (
                <>
                  {info.inactive === false && (
                    <tr key={info.id}>
                      {registerType === "Lesson" && "registerTeacher" in info && "registerSchool" in info ? (
                        <RenderLessonColumns lesson={info} index={index} />
                      ) : registerType === "School" &&
                        "name" in info &&
                        "adress" in info &&
                        "zip" in info &&
                        "fone" in info &&
                        "email" in info ? (
                        <RenderSchoolColumns school={info} index={index} />
                      ) : registerType === "Teacher" && "thirst" in info ? (
                        <RenderTeacherColumns teacher={info} index={index} />
                      ) : registerType === "User" &&
                        "name" in info &&
                        "email" in info &&
                        "rg" in info &&
                        "office" in info &&
                        "password" in info &&
                        "registerSchool" in info &&
                        "mandatoryBulletin" in info ? (
                        <RenderUserColumns user={info} index={index} />
                      ) : (
                        <RenderOtherColumns office={info} index={index} />
                      )}
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        <div
                          className="h-10 w-10 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                          onClick={() => editInfo(info, true)}
                        >
                          <X size={28} />
                        </div>
                      </td>
                      <td className="px-2">
                        <div className="flex flex-row gap-4 items-center justify-between">
                          <div
                            className="flex items-center gap-2 px-2 py-1 border border-blue-500 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
                            onClick={() => editInfo(info, false)}
                          >
                            <Pencil size={18} />
                            <span>Edit</span>
                          </div>
                          <div
                            className="flex items-center gap-2 px-2 py-1 border border-red-500 text-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
                            onClick={() => deleteInfo(info)}
                          >
                            <Trash size={18} />
                            <span>Delete</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
        </tbody>
      </table>
    </div>
  );
}
