import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { OfficeInfos } from "../../../../../slice";

type CheckboxDropdownOfficeTeacherProps = {
  offices: OfficeInfos;
  register: UseFormRegister<any>;
};

export default function CheckboxDropdownOfficeTeacher({
  offices,
  register,
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
          {offices.map((option: OfficeInfos) => (
            <div
              key={option.id}
              className="flex flex-row-reverse items-center justify-end gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <label className="">
                {option.name}
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  value={option.id}
                  {...register(`office`)}
                />
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
