import * as assert from "assert"
import * as randomString from "randomstring"

describe("Contact us form", function () {
    it("must send messages to shop administration", function () {
        browser.url('/customer-service-s-0')
        browser.pause(2000)

        const contactUsForm = $('#box-contact-us')
        const nameField = contactUsForm.$('input[name="name"]')
        const emailField = contactUsForm.$('input[name="email"]')
        const subjectField = contactUsForm.$('input[name="subject"]')
        const messageField = contactUsForm.$('textarea[name="message"]')
        const sendButton = contactUsForm.$('button[name="send"]')

        const name = randomString.generate(5)
        const email = `${randomString.generate(5)}@test.com`
        const subject = randomString.generate(5)
        const message = `${randomString.generate(5)}! ${randomString.generate(5)}, ${randomString.generate(5)}`

        if (contactUsForm.isDisplayed()) {
            nameField.setValue(name)
            emailField.setValue(email)
            subjectField.setValue(subject)
            messageField.setValue(message)
            sendButton.click()

            const alert = $('.alert-success')
            const actualAlertText  = alert.getText()
            const expectedAlertText = 'Your email has successfully been sent'

            assert(actualAlertText.includes(expectedAlertText) , 'Alert has incorrect text')
        } else {
            console.log('The form is not opened')
        }
    });
});