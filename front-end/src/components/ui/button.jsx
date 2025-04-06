export const Button = ({ children, className, ...props }) => (
    <button
      className={`w-full py-2 px-4 bg-white text-blue-900 rounded font-semibold hover:bg-gray-200 transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
  