import { provideHttpClient } from '@angular/common/http';
import { provideEnvironmentInitializer } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  Routes,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { environment } from '../../environments/environment';
import { API_URL, PAGE_SIZE_OPTIONS, TABLE_PAGE_SIZE } from './api/api-config';

export interface CoreOptions {
  routes: Routes;
}

export function provideCore({ routes }: CoreOptions) {
  return [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideEnvironmentInitializer(() => {}),
    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
    {
      provide: TABLE_PAGE_SIZE,
      useValue: 25,
    },
    {
      provide: PAGE_SIZE_OPTIONS,
      useValue: [25, 50, 100, 200],
    },
  ];
}
