import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from "./Button";

describe('button', () => {
  test('test with only first param', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText("TEST")).toBeInTheDocument();
  });

  // test('test clear theme', () => {
  //   render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
  //   const clss = screen.getByText('TEST');
  //   expect(clss).toHaveClass(cl.clear);
  //   screen.debug();
  // });
});