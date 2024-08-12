import { bindActionCreators, createSlice } from "@reduxjs/toolkit";
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useAppDispatch } from "../lib/hooks/useAppDispatch/useAppDispatch";
import { useMemo } from "react";
// dist - куда билидтся сам редакс, тут так делать можно, пошта они нам нужны
/**
 * хотим тянуть данные без useDispatch and useSelector
 * 
 * обертка которая позволяет виндить useDispatch, useSelector
 * к нашим данным
 */

export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  // чтобы типы подхватывались правильно:
  const slice = createSlice(options);

  // чтобы типы подхв. правильно:
  const useActions = (): typeof slice.actions => {
    const dispatch = useAppDispatch();

    /**
       * reduxjs bindActionCreators,
       * диспатч прибиндит, и action cretorы исп. без dispatch
       */

    // чтобы были статичными:
    // 1) actions 2) dispatch
    return useMemo(() => {
      return bindActionCreators(slice.actions, dispatch);
    }, [dispatch]);
  }

  // exmp: counterSlice.ts
  return {
    ...slice,
    useActions,
  }
}