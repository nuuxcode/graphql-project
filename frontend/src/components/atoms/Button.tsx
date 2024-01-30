import { Button as BootstrapButton } from 'react-bootstrap';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children, type = 'button' }) => (
  <BootstrapButton onClick={onClick} className={className} type={type}>
    {children}
  </BootstrapButton>
);

export default Button;
