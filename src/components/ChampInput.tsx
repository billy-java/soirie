interface ChampInputProps {
    type: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
  }


const ChampInput: React.FC<ChampInputProps> = ({ type, name, value, onChange, placeholder }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="p-2 border border-gray-300 rounded-md w-full"
  />
);
  

  export default ChampInput;