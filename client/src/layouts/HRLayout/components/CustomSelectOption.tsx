import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function CustomSelectOption({
  label,
  labelColor = "#A9ACAF",
  list = [],
  value,
  width = "auto",
  onChange = () => {},
}: {
  label: string;
  labelColor?: string;
  list?: { name: string; value: string }[];
  value?: any;
  width?: string;
  onChange?: (e: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        id="dropdownHoverButton"
        className="bg-white border border-gray-200  px-3 py-1 flex justify-between"
        type="button"
        style={{
          width: width,
          color: "#A9ACAF",
          marginLeft: "12px",
          minWidth: "170px",
        }}
        onClick={handleToggle}
      >
        <span style={{ color: value != null ? "black" : labelColor }}>
          {" "}
          {value != null ? value.name : label}
        </span>
        <ChevronDown className="ml-2" size={24} />
      </button>
      {isOpen && (
        <ul
          className="absolute bg-white border border-gray-200 z-10"
          style={{
            width: "100%",
            marginLeft: "12px",
          }}
        >
          {list.map((item, index) => (
            <li
              key={index}
              className="px-2 py-2 font-normal hover-green"
              onClick={() => {
                onChange(item);
                handleToggle();
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelectOption;
