import Link from "next/link";

export function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="mb-8 max-w-3xl">
        {eyebrow ? <p className="mb-3 text-sm font-semibold text-[#FF8A65]">{eyebrow}</p> : null}
        <h2 className="text-3xl font-bold tracking-normal text-[#1F2937] sm:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-sm shadow-slate-200/70 ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-[#FFE0B2] bg-[#FFF3E0] px-2.5 py-1 text-xs font-medium text-[#B45309]">
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-[#FF8A65] text-white shadow-sm shadow-orange-200 hover:bg-[#F9734E]"
      : "border border-[#E5E7EB] bg-white text-[#1F2937] hover:bg-[#FFF3E0]";

  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </Link>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 rounded-full bg-[#F3F4F6]">
      <div className="h-2 rounded-full bg-[#FF8A65]" style={{ width: `${value}%` }} />
    </div>
  );
}
