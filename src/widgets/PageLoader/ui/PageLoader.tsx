import { classNames } from "@/shared/lib/classNames/classNames";
import * as cl from './PageLoader.module.scss';
import { BeatLoader } from "react-spinners";

interface PageLoaderProps {
  className?: string;
}
export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={classNames(cl.PageLoader, {}, [className])}>
      <BeatLoader color="#f48dff" />
    </div>
  );
};