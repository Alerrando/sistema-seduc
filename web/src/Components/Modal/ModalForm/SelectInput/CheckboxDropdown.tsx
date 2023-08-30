import { ChangeEvent, useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";
import { SubmitDataModal } from "../..";
import { OfficeInfos, TeacherInfos, TeachersOffice } from "../../../../../slice";
import { findTeachersOfficeById } from "../../../../api";
import { createFormSchema } from "../../../../app/(cadastros)/cadastro-professor/page";

type CheckboxDropdownOfficeTeacherProps = {
  infos: OfficeInfos[] | TeacherInfos[];
  control: Control<SubmitDataModal, any>;
  values: number[];
  optionDefault: string;
  checkboxOptionType: string;
  checkboxName: string;
};

export default function CheckboxDropdown({
  infos,
  control,
  values,
  optionDefault,
  checkboxOptionType,
  checkboxName,
}: CheckboxDropdownOfficeTeacherProps) {
  const [menuHandle, setMenuHandle] = useState<boolean>(false);
  const {
    field: { value, onChange },
  } = useController({
    name: checkboxOptionType,
    control,
    rules: { validate: (value) => createFormSchema.safeParse(value).success },
    defaultValue: [],
  });

  useEffect(() => {
    (async () => {
      if (checkboxOptionType === "office") {
        const fetchedOffices: TeachersOffice[] = await findTeachersOfficeById(values);
        const updatedOffices = fetchedOffices.map((officeTeacher: TeachersOffice) => officeTeacher.registerOffice.id);
        onChange(updatedOffices);
      }
    })();
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
          {infos?.map((option: OfficeInfos | TeacherInfos) => (
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
                name={checkboxName}
                checked={value?.includes(option.id)}
                onChange={(e) => handleSelectInfos(e, value, onChange)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function handleSelectInfos(
  e: ChangeEvent<HTMLInputElement>,
  value: number[] | undefined,
  onChange: (...event: any[]) => void,
) {
  const selectedInfo = parseInt(e.target.value);
  if (value) {
    if (value.includes(selectedInfo)) {
      const updatedInfo = value.filter((info: number) => info !== selectedInfo);
      onChange(updatedInfo);
    } else {
      onChange([...value, selectedInfo]);
    }
  } else {
    onChange([selectedInfo]);
  }
}
