import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";

export const getScrollSave = (state: StateSchema) => state.scrollSave.scroll;

// Этот селектор использует createSelector из @reduxjs/toolkit для создания мемоизированного селектора. 
// Он позволяет получать и кэшировать данные на основе переданных аргументов.
// криейтСеллект можно было не исп., особо ниче не мемо
export const getScrollSaveByPath = createSelector(
  getScrollSave, // весь объект
  (state: StateSchema, path: string) => path, // передаем путь
  (scroll, path) => scroll[path] || 0, // возв. участок скролла по пути
);
