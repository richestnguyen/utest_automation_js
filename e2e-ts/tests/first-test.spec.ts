import {BasePage} from '../pages/base.page';
import {SignUpStep1Page} from "../pages/sign-up-step-1.page";
import {SignUpStep2Page} from "../pages/sign-up-step-2.page";

describe('Create account', () => {

    beforeEach(async () => {
        await BasePage.navigateToHome();
    });

    it('Verify invalid email format when creating an account', async () => {
        const signUpStep1Page = await BasePage.preparePage(SignUpStep1Page);

        //Enter Name
        await signUpStep1Page.firstNameTextInput.sendKeys('First');
        await signUpStep1Page.lastNameTextInput.sendKeys('Last');

        //Check valid email
        await signUpStep1Page.emailAddressTextInput.sendKeys('123');
        await signUpStep1Page.emailAddressErrorMessage.elementTextShouldBe('Enter valid email');
        await signUpStep1Page.emailAddressTextInput.sendKeys('123@12');
        await signUpStep1Page.emailAddressErrorMessage.elementTextShouldBe('Enter valid email');

        //Check Email already registered
        await signUpStep1Page.emailAddressTextInput.sendKeys('1@gmail.com');
        await signUpStep1Page.emailAddressErrorMessage.elementTextShouldBe('Email already registered');

        //Valid email
        await signUpStep1Page.emailAddressTextInput.sendKeys('Test_email@gmail.com');

        //Process next steps
        await signUpStep1Page.nextLocationButton.click();

        //Step #2 page should be displayed
        await BasePage.preparePage(SignUpStep2Page);
    });
});
