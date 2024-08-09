import { classNames } from "@/shared/lib/classNames/classNames";
import * as cl from './AddCommentForm.module.scss';
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getAddCommentFormError, getAddCommentFormText } from "../../model/selectors/addCommentFormSelectors";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { addCommentFormActions, addCommentFormReducer } from "../../model/slices/addCommentFormSlice";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { HStack } from "@/shared/ui/Stack";

export interface AddCommentFormProps {
  className?: string;
  // форма изолтрована, а вот функц. за отпр. комм. / к статье / к профилю
  // будем принимать из вне
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const {
    className,
    onSendComment,
  } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);

  // по скоку передаем пропсом - юз каллбэк
  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onSendComment, onCommentTextChange, text])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <HStack justify="between" max className={classNames(cl.AddCommentForm, {}, [className])}>
        <Input
          className={cl.input}
          value={text}
          onChange={onCommentTextChange}
          placeholder={t('Введите текст комментария')}
        />
        <Button
          onClick={onSendHandler}
        >
          {t('Отправить')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;