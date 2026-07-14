import { Inject, Injectable } from "@angular/core";
import { ISystemSettingsDto } from "../models/system-settings.model";
import { DYNAMIC_CONFIG } from "src/main";

@Injectable({
    providedIn: 'root'
})
export class SystemSettingsService {

    constructor(@Inject(DYNAMIC_CONFIG) private dynamicConfig: any) {
    }

    getConfig(): ISystemSettingsDto {
        return this.dynamicConfig;
    }

    getRecaptchaSiteKey(): string {
        return this.dynamicConfig?.reCaptchaSettings?.siteKey || null;
    }

    isRecaptchaEnabled():boolean{
        return this.dynamicConfig?.reCaptchaSettings?.isEnabled || false;
    }

}
