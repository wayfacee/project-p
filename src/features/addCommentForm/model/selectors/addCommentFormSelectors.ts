import { StateSchema } from "app/providers/StoreProvider"

export const getaddCommentFormText = (state: StateSchema) => state.addCommentForm?.text;
export const getaddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;