import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './PageLoader.module.scss';
import { RingLoader } from 'react-spinners';

interface PageLoaderProps {
  className?: string;
}
export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={classNames(cl.PageLoader, {}, [className])}>
      <RingLoader color={"#ffea00"} />
    </div>
  );
};