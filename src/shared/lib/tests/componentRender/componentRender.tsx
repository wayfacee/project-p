import { ReducersMapObject } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18nForTests from "@/shared/config/i18n/i18nForTests";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Theme } from "@/shared/const/theme";
// это тест, поэтому можно
import '@/app/styles/index.scss';

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

// редюсер вмонтируется в момент моунте комп.
// в теории мб возник. ситуац: когда тест. влож.
// комп., а стейт монтируется в род. комп.
// и поэтому как в сторибуке, добав. эти редюс. ассинх.
// на этапе тест.

interface TestProviderProps {
  children: ReactNode;
  options?: ComponentRenderOptions;
}

// чтобы в е2е могли исп.
export function TestProvider(props: TestProviderProps) {
  const {
    children,
    options = {}, // чтобы ошибка с undefined не была
  } = props;

  const {
    route = '/',
    initialState,
    asyncReducers,
    theme = Theme.LIGHT,
  } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState as StateSchema}>
        <I18nextProvider i18n={i18nForTests}>
          {/* в ртл нет стилей, но в е2е есть
          надо так же стили импорт */}
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
              {children}
            </div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}

export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
  return render(
    <TestProvider options={options}>
      {component}
    </TestProvider>
  )
}