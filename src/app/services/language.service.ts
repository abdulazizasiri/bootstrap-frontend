import { Injectable, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Constants } from '../models/constants';

//---------Our App Models---------//

export interface Locale {
  lang: string;
  data: Object;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private lang: BehaviorSubject<string>;

  constructor(public translateService: TranslateService) {
    if (!localStorage.getItem(Constants.lang_ls_var)) {
      const defaultLang = 'ar';
      this.lang = <BehaviorSubject<string>>new BehaviorSubject(defaultLang);
      localStorage.setItem(Constants.lang_ls_var, this.lang.value);
      this.translateService.setDefaultLang(this.lang.value);
    } else {
      this.lang = <BehaviorSubject<string>>(new BehaviorSubject(localStorage.getItem(Constants.lang_ls_var)));
      this.translateService.setDefaultLang(this.lang.value);
    }
  }

  translate(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach(locale => {
      // use setTranslation() with the third argument value as true to append translations instead of replacing them
      this.translateService.setTranslation(locale.lang, locale.data, true);
    });
  }

  setLang(lang: string, renderer: Renderer2) {
    // Store the language preference in localStorage
    localStorage.setItem(Constants.lang_ls_var, lang);

    // Update the TranslateService to use the selected language
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);

    // Update the document direction without reloading the page
    this.setDirection(renderer, lang);

    // Update the BehaviorSubject value for reactive components
    this.lang.next(lang);
  }


  getLangInitially() {
    var lang = localStorage.getItem(Constants.lang_ls_var);
    if (!lang) {
      localStorage.setItem(Constants.lang_ls_var, 'ar');
      lang = 'ar';
    }
    return lang;
  };

  getLangPromise() {
    return this.translateService.currentLang;
  }

  getLang() {
    return this.lang;
  }

  getDefault() {
    return this.translateService.getDefaultLang();
  }

  setDirection(renderer: Renderer2, lang: string) {
    if (lang === 'ar') {
      // Set document direction to RTL for Arabic
      renderer.setAttribute(document.body, 'dir', 'rtl');
    } else {
      // Set document direction to LTR for English or other LTR languages
      renderer.setAttribute(document.body, 'dir', 'ltr');
    }
  }


  getKeyValue(key: string) {
    return this.translateService.instant(key);
  }
}
