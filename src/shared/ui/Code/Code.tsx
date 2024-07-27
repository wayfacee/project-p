import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Code.module.scss';
import { memo, ReactNode, useCallback } from "react";
import { Button, ButtonTheme } from "../Button/Button";
import CopyIcon from 'widgets/assets/icons/copy.svg';
import { Icon } from "../Icon/Icon";

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const {
    className,
    text
  } = props;

  const onCopy = () => useCallback(() => {
    // copy text:
    navigator.clipboard.writeText(text);
  }, [text])

  // pre - позволяет сохранить пробелы, перенос строки, все, итд.
  return (
    <pre className={classNames(cl.Code, {}, [className])}>
      <Button onClick={onCopy} className={cl.copyBtn} theme={ButtonTheme.CLEAR}>
        <CopyIcon className={cl.copyIcon} />
      </Button>
      <code>
        {text}
      </code>
    </pre>
  );
});