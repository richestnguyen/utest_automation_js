import { $, ElementFinder } from 'protractor/built';
import { BasePage } from './base.page';

export class SignUpStep2Page extends BasePage {

    public readonly cityTextInput = $('input#city');


    protected getPagePresenceMarker(): ElementFinder {
        return this.cityTextInput;
    }
}
