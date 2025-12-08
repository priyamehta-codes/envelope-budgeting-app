type CardProps = {
  title: string;
  children: React.ReactNode;
};

function Card({ title, children }: CardProps) {
  return (
    <section className="space-y-4 rounded-lg bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold text-zinc-800">{title}</h2>
      {children}
    </section>
  );
}

export default Card;
