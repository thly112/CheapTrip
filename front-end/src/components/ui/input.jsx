export const Input = ({ className, ...props }) => (
    <input
      className={`w-full px-4 py-2 rounded bg-white text-black border border-gray-300 ${className}`}
      {...props}
    />
  );
  