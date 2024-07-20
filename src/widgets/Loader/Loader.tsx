import { classNames } from "shared/lib/classNames/classNames";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={classNames('Loader', {}, [className])}>
      {/* ринг лоадер если б стилев много было */}
    </div>
  );
};