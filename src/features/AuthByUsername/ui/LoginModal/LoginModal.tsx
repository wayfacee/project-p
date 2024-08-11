import { Modal } from "@/widgets/Modal";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Suspense } from "react";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import { BeatLoader } from "react-spinners";

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
      <Suspense fallback={<BeatLoader color="#f48dff" />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};