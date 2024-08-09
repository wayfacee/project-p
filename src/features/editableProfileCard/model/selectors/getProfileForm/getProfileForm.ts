import { StateSchema } from "@/app/providers/StoreProvider";

export const getProfileForm = (state: StateSchema) => state.profile?.form;

// происходит некоторое дулбирование данных в стейте, формы, запросов
// можно было избежать, но тогда нкжно было бы делать
// еще один запрос, чтобы получить данные сведие о профиле

// но мы пытаемся избежать этого
// лишних запросов надо избегать 