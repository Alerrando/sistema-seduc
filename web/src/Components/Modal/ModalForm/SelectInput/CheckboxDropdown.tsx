import { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { SubmitDataModal } from "../..";
import { OfficeInfos, TeacherInfos } from "../../../../../slice";

type CheckboxDropdownOfficeTeacherProps = {
  infos: OfficeInfos[] | TeacherInfos[];
  control: Control<SubmitDataModal, any>;
  optionDefault: string;
  checkboxOptionType: string;
};

export default function CheckboxDropdown(props: CheckboxDropdownOfficeTeacherProps) {
  const { checkboxOptionType, control, infos, optionDefault } = props;
  const [defaultValueController, setDefaultValueController] = useState<OfficeInfos[] | TeacherInfos[]>([]);
  const [menuHandle, setMenuHandle] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (checkboxOptionType === "office") {
        setDefaultValueController(infos);
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
          <Controller
            control={control}
            name={checkboxOptionType === "office" ? "teachersOffice" : "teachersThirst"}
            defaultValue={defaultValueController}
            render={({ field: { onChange, value } }) => (
              <>
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
                      name={checkboxOptionType === "office" ? "teachersOffice" : "teachersThirst"}
                      onChange={(e) => onChange([...value, parseInt(e.target.value)])}
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
}
