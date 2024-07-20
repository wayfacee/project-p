import { lazy } from "react";

// нельзя так делать!!:
export const AboutPageAsync = lazy(() => import('./AboutPage'));