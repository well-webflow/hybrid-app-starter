interface CardProps {
  children: React.ReactNode;
}
export default function Card({ children }: CardProps) {
  return <div className="bg-wf-almostBlack rounded-md p-3">{children}</div>;
}
