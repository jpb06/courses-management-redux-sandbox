import React from "react";

interface SelectOption {
  value?: string | number;
  text: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  name: string;
  value?: string | number;
  error?: string;
  handleChange: (event: React.FormEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  defaultOption?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  name,
  value,
  error = "",
  handleChange,
  options,
  defaultOption
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="field">
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">{defaultOption}</option>
          {options.map(el => (
            <option value={el.value} key={el.value}>
              {el.text}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectInput;
