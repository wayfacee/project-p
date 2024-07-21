import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';
import userEvent from '@testing-library/user-event';

describe('Counter', () => {
  test('test with only first param', () => {
    // ругается на исдев, в жесте есть globals
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    })
    expect(screen.getByTestId("value-title")).toHaveTextContent('10');
  });

  test('increment', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    });
    userEvent.click(screen.getByTestId('increment-btn'));
    expect(screen.getByTestId("value-title")).toHaveTextContent('11');
  });

  test('decrement', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } }
    });
    userEvent.click(screen.getByTestId('decrement-btn'));
    expect(screen.getByTestId("value-title")).toHaveTextContent('9');
  });
});