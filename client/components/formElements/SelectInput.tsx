import clsx from "clsx";
import { useField } from "formik";

export default function SelectInput({
  label,
  props,
  children,
}: {
  label: string;
  props: {
    name: string;
    id?: string;
    type: string;
    autoComplete?: string;
    as?: "select" | "checkbox" | "textarea";
  };
  children: React.ReactNode;
}) {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <label className="font-medium" htmlFor={props.id || props.name}>
        {label}
      </label>

      <select
        className={clsx(
          meta.error && meta.touched
            ? "border-error focus:border-error focus:ring-error"
            : "focus:border-accent-200 focus:ring-accent-200",
          "-mb-2 w-full bg-base-100",
        )}
        {...field}
        {...props}
      >
        {children}
      </select>

      <div className="min-h-[1.25rem] text-sm text-error">
        {meta.error && meta.touched ? meta.error : ""}
      </div>
    </div>
  );
}
