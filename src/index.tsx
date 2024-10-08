import '@/app/styles/index.scss';
import App from '@/app/App';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import i18next from './shared/config/i18n/i18n';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ForceUpdateProvider } from './shared/lib/render/forceUpdate';

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <I18nextProvider i18n={i18next}>
            <ForceUpdateProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </ForceUpdateProvider>
          </I18nextProvider>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>,
  );
} else {
  throw new Error("Could not find root element with id 'root'");
}
