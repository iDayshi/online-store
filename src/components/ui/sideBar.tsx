import React from "react";
import CheckBoxField from "../common/form/checkBoxField";
import SearchForm from "../common/form/search";
import SelectField from "../common/form/selectField";
import colorPhone from "../../api/colorPhone";
import { useDispatch } from "react-redux";
import { phonesFilterReset } from "../../store/phonesStore";

function SideBar() {
  const dispatch = useDispatch();

  const handleResetFilter = () => {
    // @ts-ignore
    dispatch(phonesFilterReset());
  };
  return (
    <aside className="w-64 h-screen-100" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 h-full bg-gray-50 rounded ">
        <ul>
          <li>
            <SearchForm />
          </li>
          <li>
            <SelectField label="Sort by" />
          </li>
          <li>
            <CheckBoxField
              options={[
                { name: "Sony Ericsson", value: "Sony Ericsson" },
                { name: "Nokia", value: "Nokia" },
                { name: "Motorola", value: "Motorola" },
              ]}
              value={""}
              name="brand"
              label="Brand"
            />
          </li>

          <li>
            <CheckBoxField
              options={[
                { name: "sensor", value: "sensor" },
                { name: "TFT", value: "TFT" },
              ]}
              value={""}
              name="typeDisplay"
              label="Type Display"
            />
          </li>
          <li>
            <CheckBoxField
              options={[
                { name: "smartphone", value: "smartphone" },
                { name: "phone", value: "phone" },
                { name: "slider", value: "slider" },
                { name: "rotator", value: "rotator" },
                { name: "flip", value: "flip" },
              ]}
              value={""}
              name="type"
              label="Type Phone"
            />
          </li>
          <li>
            <CheckBoxField options={[...Object.values(colorPhone)]} value={""} name="color" label="Color" />
          </li>
          <li>
            <CheckBoxField options={[{ name: "best", value: "true" }]} value={""} name="best" label="Best phones" />
          </li>
        </ul>

        <button
          onClick={handleResetFilter}
          type="button"
          className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 "
        >
          Reset
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
