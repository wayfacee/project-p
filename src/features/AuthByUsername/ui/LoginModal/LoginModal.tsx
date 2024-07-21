import { Modal } from "widgets/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import { classNames } from "shared/lib/classNames/classNames";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  return (
    <Modal
      className={classNames('', {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <LoginForm />
    </Modal>
  );
};