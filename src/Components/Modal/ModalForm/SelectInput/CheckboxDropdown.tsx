import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { SubmitDataModal } from "../..";
import { StateContext } from "../../../../../slice";
import { OfficeInfos, SchoolInfos, TeachersOffice, TeachersThirst } from "../../../../utils/type";

type CheckboxDropdownOfficeTeacherProps = {
  infos: OfficeInfos[] | SchoolInfos[];
  control: Control<SubmitDataModal, unknown>;
  optionDefault: string;
  checkboxOptionType:
    | "name"
    | "adress"
    | "zip"
    | "type"
    | "fone"
    | "email"
    | "cpf"
    | "teachersThirst"
    | "teachersOffice"
    | "amountTime"
    | "registerTeacher"
    | "registerSchool"
    | "rg"
    | "office"
    | "password"
    | "mandatoryBulletin"
    | `teachersThirst.${number}`
    | `teachersOffice.${number}`;
  initalValuesId: number;
};

export default function CheckboxDropdown(props: CheckboxDropdownOfficeTeacherProps) {
  const { allInfosTeachersOffice, allInfosTeachersThirst } = useContext(StateContext);
  const { checkboxOptionType, control, infos, optionDefault } = props;
  const [defaultValueController, setDefaultValueController] = useState<OfficeInfos[] | SchoolInfos[]>([]);
  const [menuHandle, setMenuHandle] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (checkboxOptionType === "teachersOffice") {
        setDefaultValueController(
          allInfosTeachersOffice.map((officeTeacher: TeachersOffice) => officeTeacher.registerOffice),
        );
      } else if (checkboxOptionType === "teachersThirst") {
        setDefaultValueController(
          allInfosTeachersThirst.map((teacherThirst: TeachersThirst) => teacherThirst.registerSchool),
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="inline-block text-left">
      <div>
        <div
          onClick={() => setMenuHandle(!menuHandle)}
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {optionDefault}
        </div>
      </div>
      {menuHandle && (
        <div
          className="origin-top-right w-auto h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <Controller
            control={control}
            name={checkboxOptionType}
            defaultValue={defaultValueController.map((infos) => infos.id)}
            render={({ field: { onChange, value } }) => (
              <>
                {infos?.map((option: OfficeInfos | SchoolInfos) => (
                  <div
                    key={option.id}
                    className="flex flex-row items-center justify-between gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <label className="">{option.name}</label>
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      value={option.id}
                      checked={Array.isArray(value) && value.indexOf(option.id) !== -1}
                      name={checkboxOptionType}
                      onChange={(e) => handleSelectInfos(onChange, value, e, option.id)}
                    />
                  </div>
                ))}
              </>
            )}
          />
        </div>
      )}
    </div>
  );

  function handleSelectInfos(
    onChange: (...event: unknown[]) => void,
    value: string | number | number[],
    e: ChangeEvent<HTMLInputElement>,
    optionId: number,
  ) {
    const aux = Array.isArray(value) && value.indexOf(optionId) !== -1;

    if (aux) {
      const updatedOffices = value.filter((valueId: number) => valueId !== optionId);
      onChange(updatedOffices);
    } else {
      onChange([...(value as number[]), parseInt(e.target.value)]);
    }
  }
}
