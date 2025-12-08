type InputProps = React.ComponentPropsWithRef<"input">;

function Input({ className = "", ...rest }: InputProps) {
  const baseClasses = "rounded border border-zinc-300 px-4 py-2";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return <input className={combinedClasses} {...rest} />;
};

export default Input;
