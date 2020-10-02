import {$, browser, ElementFinder} from 'protractor';
import {ElementFinderBaseExtension} from '../extensions/element-finder-base-extension'

/**
 * The base class for all page objects.
 */
export abstract class BasePage {

    public readonly logo = $('.brand');
    public readonly loginButton = $('.button-login-cont');

    public static async preparePage<P extends BasePage>(pageClass: {new(): P; }): Promise<P> {
        const page = new pageClass();
        await page.forPageAvailable();
        return Promise.resolve(page);
    }

    public constructor() {
        ElementFinderBaseExtension.extend();
    }

    public async forPageAvailable(): Promise<any> {
        const marker = await this.getPagePresenceMarker();
        if (marker) {
            await marker.waitUntilPresent();
            return;
        }
        return Promise.resolve(null);
    }

    protected abstract getPagePresenceMarker(): ElementFinder;

    public static async navigateToHome(): Promise<void> {
        await browser.waitForAngularEnabled(false);
        await browser.get(browser.baseUrl);
    }
}
