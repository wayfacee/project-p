import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copyD.svg';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import cls from './Code.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../Icon';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  // copy text:
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  // pre - позволяет сохранить пробелы, перенос строки, все, итд.
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
          <Icon
            clickable
            onClick={onCopy}
            className={cls.copyBtn}
            Svg={CopyIconNew}
          />
          <code>{text}</code>
        </pre>
      }
      off={
        <pre className={classNames(cls.Code, {}, [className])}>
          <Button
            onClick={onCopy}
            className={cls.copyBtn}
            theme={ButtonTheme.CLEAR}
          >
            <CopyIcon className={cls.copyIcon} />
          </Button>
          <code>{text}</code>
        </pre>
      }
    />
  );
});
