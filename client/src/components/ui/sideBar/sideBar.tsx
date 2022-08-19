import React from "react";
import CheckBoxField from "../../common/form/checkBoxField";
import SearchForm from "../../common/form/search";
import SelectField from "../../common/form/selectField";
import { useDispatch } from "react-redux";
import { phonesFilterReset } from "../../../store/phones";

function SideBar() {
  const dispatch = useDispatch();

  const handleResetFilter = () => {
    // const box = document.querySelectorAll<HTMLInputElement>("input[type=checkbox]");
    // box.forEach((el) => (el.checked = false));
    // @ts-ignore
    dispatch(phonesFilterReset());
  };

  return (
    <aside className="w-64 h-screen-100" aria-label="Sidebar">
      <div className="sidebar_container ">
        <ul>
          <li>
            <SearchForm />
          </li>
          <li>
            <SelectField />
          </li>
          <div className="flex">
            <button onClick={handleResetFilter} type="button" className="sidebar_btn">
              Reset Filter
            </button>
          </div>
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
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
