import { $, ElementFinder } from 'protractor/built';
import { BasePage } from './base.page';

export class SignUpStep1Page extends BasePage {

    public readonly firstNameTextInput = $('input#firstName');
    public readonly lastNameTextInput = $('input#lastName');
    public readonly emailAddressTextInput = $('input#email');
    public readonly emailAddressErrorMessage = $('#emailError');
    public readonly dateOfBirthMonthSelect = $('select#birthMonth');
    public readonly dateOfBirthDaySelect = $('select#birthDay');
    public readonly dateOfBirthYearSelect = $('select#birthYear');
    public readonly nextLocationButton = $('[aria-label="Next step - define your location"]');


    protected getPagePresenceMarker(): ElementFinder {
        return this.firstNameTextInput;
    }
}
