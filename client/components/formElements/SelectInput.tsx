import clsx from "clsx";
import { useField } from "formik";

export default function SelectInput({
  label,
  props,
  children,
  classes,
}: {
  label: string;
  props: {
    name: string;
    id?: string;
    autoComplete?: string;
    multiple?: boolean;
  };
  children: React.ReactNode;
  classes?: string;
}) {
  const [field, meta] = useField(props);

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <label className="font-medium" htmlFor={props.id || props.name}>
        {label}
      </label>

      <select
        className={clsx(
          meta.error && meta.touched
            ? "border-error focus:border-error focus:ring-error"
            : "focus:border-primary focus:ring-primary",
          "-mb-2 w-full bg-base-100",
          { classes },
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
