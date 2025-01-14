export const Inputbox = ({ placeholder, label, type, onChange }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full px-2 py-1 border"
        type={type}
        onChange={onChange}
      ></input>
    </div>
  );
};
