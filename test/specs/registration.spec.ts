import * as assert from 'assert'

describe('Website', function () {
    it('Can register', function () {
        browser.url('/create_account')
        const registrationForm = $('#box-create-account')
        registrationForm.$('input[name="firstname"]').setValue('test')
        registrationForm.$('input[name="lastname"]').setValue('test')
        const countrySelect= registrationForm.$('select[name="country_code"]')
        countrySelect.selectByVisibleText('Ukraine')
        const email = `test${new Date().getTime()/1000}@test.com`
        registrationForm.$('input[name="email"]').setValue(email)
        registrationForm.$('input[name="phone"]').setValue('+1233444545')

        registrationForm.$('input[name="password"]').setValue(email)
        registrationForm.$('input[name="confirmed_password"]').setValue(email)
        registrationForm.$('button[name=create_account]').click()

        browser.pause(2000)
        const alert = $('#notices .alert-success')
 
        assert(alert.isDisplayed(),'Expected success alert to be visible after registration')

        const alertText = alert.getText();
        const expectedText  = 'Your customer account has been created.'
        assert(alertText.includes(expectedText), 'Alert has incorrect text ')
    })
})
    