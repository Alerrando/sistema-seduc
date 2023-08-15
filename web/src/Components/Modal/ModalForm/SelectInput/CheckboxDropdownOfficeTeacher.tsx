import { ChangeEvent, useState } from "react";
import { OfficeInfos } from "../../../../../slice";

type CheckboxDropdownOfficeTeacherProps = {
  offices: OfficeInfos;
  officesTeacher: number[];
  setOfficesTeacher: (officesTeacher: number) => void;
};

export default function CheckboxDropdownOfficeTeacher({
  offices,
  officesTeacher,
  setOfficesTeacher,
}: CheckboxDropdownOfficeTeacherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="inline-block text-left">
      <div>
        <div
          onClick={toggleDropdown}
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Select Options
        </div>
      </div>
      {isOpen && (
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
                onChange={(e) => handleOfficesTeacher(e)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function handleOfficesTeacher(e: ChangeEvent<HTMLInputElement>) {
    if (officesTeacher.indexOf(e.target.value) === -1) {
      setOfficesTeacher([...officesTeacher, e.target.value]);
    } else {
      const aux = officesTeacher.filter(
        (office: OfficeInfos) => office.id !== e.target.value,
      );

      setOfficesTeacher(aux);
    }
  }
}
