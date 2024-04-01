export interface Props {
  children?: string;
  type?: 'button' | 'submit';
  form?: string
  onClick?(): void;
}

export const Button = (props: Props) => {
  return (
    <button type={props.type} onClick={props.onClick} form={props.form}>
      {props.children}
    </button>
  );
};
