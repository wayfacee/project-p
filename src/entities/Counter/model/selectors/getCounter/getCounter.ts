// импортируем из выше стоящ. слоя, хотя по методологии 
// так не надо. но на типах искл., но так тож не стоит делать
import { StateSchema } from "@/app/providers/StoreProvider";

export const getCounter = (state: StateSchema) => state.counter;