import clsx from "clsx";
import { useField } from "formik";

export default function TextInput({
  label,
  props,
}: {
  label: string;
  props: {
    name: string;
    id?: string;
    type: string;
    autoComplete?: string;
    as?: "select" | "checkbox" | "textarea";
  };
}) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [field, meta] = useField(props.name);

  return (
    <div className="flex flex-grow flex-col items-start justify-start gap-2">
      <label className="font-medium" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={clsx(
          meta.error && meta.touched
            ? "border-error focus:border-error focus:ring-error"
            : "focus:border-accent-200 focus:ring-accent-200",
          "-mb-2 w-full",
        )}
      />

      <div className="min-h-[1.25rem] text-sm text-error">
        {meta.error && meta.touched ? meta.error : ""}
      </div>
    </div>
  );
}
