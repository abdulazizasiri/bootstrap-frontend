import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { InjectionToken } from '@angular/core';

export const DYNAMIC_CONFIG = new InjectionToken<any>('DYNAMIC_CONFIG');
// let serviceUrl = null;
// async function fetchConfig(): Promise<any> {
//   const configResponse = await fetch('/assets/config.json');
//   if (!configResponse.ok) {
//     throw new Error(`Failed to load config.json: ${configResponse.statusText}`);
//   }
//   const config = await configResponse.json();
//   const response = await fetch(`${config.apiBaseUrl}/api/SysSettings/settings`)
//   if (!response.ok) {
//     throw new Error(`Failed to load configuration: ${response.statusText}`);
//   }
//   serviceUrl = config.apiBaseUrl;
//   return response.json();
// }

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
