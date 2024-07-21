import { createSelector } from "@reduxjs/toolkit";
import { getCounter } from "../getCounter/getCounter";
import { CounterSchema } from "../../types/counterSchema";

// позволяет переисп. селекторы, которые уже есть
// этот селектор, знач. меморизирует, работ. так же как и
// useMemo, измен. тока когда что то измен в массиве deepen.
export const getCounterValue = createSelector(
  getCounter,
  (counter: CounterSchema) => counter.value,
);