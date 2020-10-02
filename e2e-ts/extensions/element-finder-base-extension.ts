import {browser, by, ElementFinder, protractor} from 'protractor';

declare module 'protractor/built/element' {

    export interface ElementFinder {

        slowTypingValue(text: string, delay?: number, hasTab?: boolean): Promise<void>

        waitUntilClickable(): Promise<void>;

        waitUntilPresent(timeOutInMiliseconds?: number): Promise<void>;

        // scrollIntoView(): Promise<void>;
        clickWhenClickable(): Promise<void>;

        selectDropDownListItem(item: string): Promise<void>;

        //#region expectation extension for ElementFinder
        elementTextShouldBe(expectedText: string): Promise<void>;

        //#endregion
    }
}

export class ElementFinderBaseExtension {
    protected static alreadyExtended = false;

    public static extend(): any {
        if (ElementFinderBaseExtension.alreadyExtended) {
            return;
        }
        ElementFinderBaseExtension.alreadyExtended = true;
        const selfElement = ElementFinder.prototype;

        selfElement.slowTypingValue = async function (text: string, delay: number = 1, hasTab: boolean = true): Promise<void> {
            await this.clear();
            for (const t of text) {
                await this.sendKeys(t);
                await browser.sleep(delay);
            }
            if (hasTab) {
                await this.sendKeys(protractor.Key.TAB);
            }
        };

        selfElement.waitUntilClickable = async function (): Promise<void> {
            await browser.wait(protractor.ExpectedConditions.elementToBeClickable(this), 5000);
        };

        selfElement.waitUntilPresent = async function (timeOutInMiliseconds: number = 5000): Promise<void> {
            await browser.wait(protractor.ExpectedConditions.presenceOf(this), timeOutInMiliseconds);
        };

        selfElement.clickWhenClickable = async function (timeOutInMiliseconds: number = 5000): Promise<void> {
            await this.waitUntilClickable();
            await this.click();
        };

        selfElement.selectDropDownListItem = async function (item: string): Promise<void> {
            await this.click();
            await this.element(by.cssContainingText('.dropdown-menu ul li', item)).click();
        };

        //#region expectation extension for ElementFinder
        selfElement.elementTextShouldBe = async function (expectedText: string): Promise<void> {
            // await expect(await this.getText()).toEqual(expectedText);
        };
        //#endregion expectation extension for ElementFinder

    }
}


export * from 'protractor';
