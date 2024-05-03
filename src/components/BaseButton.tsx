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
    danger: "btn-error",
    success: "btn-success",
    primary: "btn-primary",
    secondary: "btn-outline-primary",
    transparent: "hover:bg-transparent border-none shadow-none"
  }

  return (
    <button className={`btn flex items-center ${variantClassNames[variant]}`} onClick={(e) => {
      e.preventDefault();
      handleClick();
    }}>
      {children}
    </button>
  )
}

export default BaseButton;