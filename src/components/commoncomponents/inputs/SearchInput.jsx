import { MdOutlineSearch } from 'react-icons/md'

const SearchInput = ({name,placeholder,value,onChange}) => {
  return (
    <> <div className="relative w-full max-w-md flex items-center">
    <MdOutlineSearch
      size={20}
      className="absolute  text-gray-400 translate-x-[70%]"
    />

    <input
      type="text"
      id={name}
      name={name}
      className="border w-full border-gray-300 focus:ring-2 outline-none p-2 rounded-md ps-10 text-sm text-gray-900   focus:ring-blue-400  "
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div></>
  )
}

export default SearchInput