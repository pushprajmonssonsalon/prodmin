const SelectInput = ({ name, value, handleChange, options }) => {
    
  return (
    <>
      <select
     
        className="border  capitalize w-full max-w-sm border-gray-300 focus:ring-2 outline-none p-2 rounded-md  text-sm text-gray-900   focus:ring-blue-400  "
        name={name}
        value={value}
        onChange={handleChange}
      >
      <option className="" value="">select {name}</option>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectInput;
