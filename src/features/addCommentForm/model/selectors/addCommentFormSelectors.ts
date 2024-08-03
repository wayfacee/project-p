import { StateSchema } from "app/providers/StoreProvider"

// чтоб был управляемым ''
// оч части исп. ИЛИ (но когда введут 0 (false) - сломается)
// лучше исп ?? - проиниц. если левый оперант, налл или undefined
export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;