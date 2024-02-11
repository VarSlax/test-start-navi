import { useState, useEffect } from "react";
import { modesUrl } from "../constants";

const SelectMode = ({ setGridSize }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState();

  const getModeLabel = (
    mode = {
      name: "Pick mode: Default",
      field: 5,
    }
  ) => {
    return selectedMode
      ? `Mode: ${mode.name} - Field: ${mode.field}`
      : `${mode.name} - Field: ${mode.field}`;
  };

  const handleSelect = (mode) => {
    setIsOpen(false);
    setSelectedMode(mode);
    setGridSize(mode.field);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(modesUrl);
        const modes = await response.json();

        setModes(modes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative inline-block">
      <button
        className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-40"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {getModeLabel(selectedMode)}
        <svg
          className={`ml-auto -mr-1 h-5 w-5 transition-transform duration-300 transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-40 rounded-md bg-white shadow-lg">
          {modes.map((mode, i) => (
            <li
              key={i}
              className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={() => handleSelect(mode)}
            >
              {getModeLabel(mode)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectMode;
