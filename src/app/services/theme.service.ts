import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    colorThemeStorageKey: string = 'color_theme';
    fontThemeStorageKey: string = 'font_theme';
    normalFontTheme: string = 'normal';
    lightTheme: string = 'light';
    darkTheme: string = 'dark';

    setInitTheme() {
        const colorTheme = localStorage.getItem(this.colorThemeStorageKey) || this.lightTheme
        const fontTheme = localStorage.getItem(this.fontThemeStorageKey) || this.normalFontTheme
        document.documentElement.setAttribute('data-bs-theme', colorTheme);
        document.body.setAttribute('data-fontSize', `fontSize-${fontTheme}`);
    }

    setColorTheme(colorTheme: string, toLocalStorage: boolean = true) {
        document.documentElement.setAttribute('data-bs-theme', colorTheme || this.lightTheme);
        toLocalStorage && localStorage.setItem(this.colorThemeStorageKey, colorTheme || this.lightTheme);
    }

    setFontTheme(fontTheme: string, toLocalStorage: boolean = true) {
        document.body.setAttribute('data-fontSize', `fontSize-${fontTheme || this.normalFontTheme}`);
        toLocalStorage && localStorage.setItem(this.fontThemeStorageKey, fontTheme || this.normalFontTheme);
    }

    getColorTheme() {
        const colorTheme = localStorage.getItem(this.colorThemeStorageKey) || this.lightTheme
        return colorTheme;
    }

    getFontTheme() {
        return localStorage.getItem(this.fontThemeStorageKey) || this.normalFontTheme
    }

    isLightTheme(): boolean {
        return this.getColorTheme() == this.lightTheme;
    }
}