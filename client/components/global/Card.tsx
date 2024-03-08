import clsx from "clsx";

export default function Card({
  classes,
  children,
}: {
  classes?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "h-fit w-full rounded bg-bg-100 p-6 text-text-100 shadow",
        classes,
      )}
    >
      {children}
    </div>
  );
}
