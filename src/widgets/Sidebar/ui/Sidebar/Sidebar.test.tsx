import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from './Sidebar';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';

describe('sidebar', () => {
  test('test with only first param', () => {
    // const SidebarWithTranslation = withTranslation()(Sidebar);
    // renderWithTranslations(<SidebarWithTranslation />);

    componentRender(<Sidebar />)
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  // test('test toggle', () => {
  //   // const SidebarWithTranslation = withTranslation()(Sidebar);
  //   // renderWithTranslations(<SidebarWithTranslation />);

  //   componentRender(<Sidebar />);
  //   const toggleBtn = screen.getByTestId('sidebar-toggle');
  //   fireEvent.click(toggleBtn);
  //   expect(screen.getByTestId('sidebar')).toHaveClass(cl.collapsed);
  // });
});