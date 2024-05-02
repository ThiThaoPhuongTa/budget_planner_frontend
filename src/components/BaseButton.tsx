export enum Variant {
  Danger="danger",
  Success="success",
  Primary="primary",
  Secondary="secondary",
  Transparent="transparent"
}
interface Props {
  handleClick: () => void,
  children: React.ReactNode,
  variant: Variant;
}
function BaseButton({ variant, handleClick, children }: Props) {
  const variantClassNames = {
    danger: "btn-danger",
    success: "btn-success",
    primary: "btn-primary",
    secondary: "btn-outline-primary",
    transparent: "btn-transparent"
  }

  return (
    <button className={`btn ${variantClassNames[variant]}`} onClick={(e) => {
      e.preventDefault();
      handleClick();
    }}>
      {children}
    </button>
  )
}

export default BaseButton;