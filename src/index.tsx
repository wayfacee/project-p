import App from 'app/App';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import i18next from './shared/config/i18n/i18n';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';

createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <ErrorBoundary>
        <I18nextProvider i18n={i18next}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );