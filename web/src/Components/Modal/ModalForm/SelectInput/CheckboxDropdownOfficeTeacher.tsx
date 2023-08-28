import { ChangeEvent, useEffect } from "react";
import { Control, useController } from "react-hook-form";
import { SubmitDataModal } from "../..";
import { OfficeInfos, TeachersOffice } from "../../../../../slice";
import { findTeachersOfficeById } from "../../../../api";
import { createFormSchema } from "../../../../app/(cadastros)/cadastro-professor/page";

type CheckboxDropdownOfficeTeacherProps = {
  offices: OfficeInfos[];
  control: Control<SubmitDataModal, any>;
  values: number[];
};

export default function CheckboxDropdownOfficeTeacher({
  offices,
  control,
  values,
}: CheckboxDropdownOfficeTeacherProps) {
  const {
    field: { value, onChange },
  } = useController({
    name: "officesTeacher",
    control,
    rules: { validate: (value) => createFormSchema.safeParse(value).success },
    defaultValue: [],
  });

  useEffect(() => {
    (async () => {
      const fetchedOffices: TeachersOffice[] = await findTeachersOfficeById(values);
      const updatedOffices = fetchedOffices.map((officeTeacher: TeachersOffice) => officeTeacher.registerOffice.id);
      onChange(updatedOffices);
    })();
  }, []);

  return (
    <div className="inline-block text-left">
      <div>
        <div
          onClick={() => onChange([])}
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Select Options
        </div>
      </div>
      <div
        className="origin-top-right absolute w-auto h-fill-available rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {offices?.map((option: OfficeInfos) => (
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
              name="office"
              checked={value?.includes(option.id)}
              onChange={(e) => handleOfficesTeacher(e, value, onChange)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function handleOfficesTeacher(
  e: ChangeEvent<HTMLInputElement>,
  value: number[] | undefined,
  onChange: (...event: any[]) => void,
) {
  const selectedOffice = parseInt(e.target.value);
  if (value) {
    if (value.includes(selectedOffice)) {
      const updatedOffices = value.filter((office: number) => office !== selectedOffice);
      onChange(updatedOffices);
    } else {
      onChange([...value, selectedOffice]);
    }
  } else {
    onChange([selectedOffice]);
  }
}
