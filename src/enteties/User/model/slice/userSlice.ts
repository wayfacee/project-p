import { createSlice } from '@reduxjs/toolkit'
import { UserSchema } from '../types/user';

const initialState: UserSchema = {
}

const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
  }
})

export const { actions: userActions } = counterSlice;
export const { reducer: userReducer } = counterSlice;