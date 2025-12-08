type SelectProps = React.ComponentPropsWithRef<"select">;

function Select({ className = "", ...rest }: SelectProps) {
  const baseClasses = "rounded border border-zinc-300 px-4 py-2";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <select className={combinedClasses} {...rest} />
  );
}

export default Select;
