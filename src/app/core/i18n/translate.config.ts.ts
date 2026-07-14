// core/i18n/translate.config.ts
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Create translation loader factory
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Translation configuration
export const translateConfig = {
  defaultLanguage: 'ar',
  supportedLanguages: ['ar', 'en'],
  fallbackLanguage: 'en'
};
