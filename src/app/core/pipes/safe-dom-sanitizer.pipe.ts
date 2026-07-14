import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser'

@Pipe({
	name: 'safeDomSanitizer',
	pure: false,
	standalone: true
})
export class SafeDomSanitizerPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) { }
	public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
		switch (type) {
			case 'html': return this.sanitizer.sanitize(SecurityContext.HTML, value) || '';
			case 'style': return this.sanitizer.sanitize(SecurityContext.STYLE, value) || '';
			case 'script': return this.sanitizer.sanitize(SecurityContext.SCRIPT, value) || '';
			case 'url': return this.sanitizer.sanitize(SecurityContext.URL, value) || '';
			case 'resourceUrl': return this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, value) || '';
			default: throw new Error(`Invalid safe type specified: ${type}`);
		}
	}
}