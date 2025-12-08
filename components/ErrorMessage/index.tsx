interface ErrorMessageProps {
  error?: string | null;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return <p className="text-red-600">{error}</p>;
}

export default ErrorMessage;
