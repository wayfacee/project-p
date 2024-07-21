import 'app/styles/index.scss';
import { Decorator } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
// чтобы определять толькот конкрет. кусочки стейта:
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreDecorator = (state: DeepPartial<StateSchema>): Decorator => (StoryComponent) => (
  <StoreProvider initialState={state}>
    <StoryComponent />
  </StoreProvider>
);