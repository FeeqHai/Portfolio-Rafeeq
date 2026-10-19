export default function SectionLabel({ number, children, aside }) {
  return <div className="section-label"><h2><span>{number}</span>{children}</h2>{aside}</div>;
}
