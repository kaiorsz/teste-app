export interface Props
  extends Omit<React.HTMLProps<HTMLInputElement>, "onChange"> {
  label?: string;
  name: string;
  value?: string | number;
  onChange?(newVal: string): void;
}

export const Input = (props: Props) => {
  const { onChange, name, label, ...rest } = props;

  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>

      <input
        onChange={(event) => props.onChange?.(event.target.value)}
        name={name}
        {...rest}
      />
    </div>
  );
};
