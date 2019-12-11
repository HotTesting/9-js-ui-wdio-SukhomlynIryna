import * as assert from "assert"
import * as randomString from "randomstring"
import { contactUsForm } from "../../pages/contact.us"

describe("Contact us form", function () {
    it("must send messages to shop administration", function () {

        contactUsForm.open('/customer-service-s-0')

        const name = randomString.generate(5)
        const email = `${randomString.generate(5)}@test.com`
        const subject = randomString.generate(5)
        const message = `${randomString.generate(5)}! ${randomString.generate(5)}, ${randomString.generate(5)}`

        assert(contactUsForm.rootElement().isDisplayed() == true, 'The form is not displayed')

        contactUsForm.fillForm(name, email, subject, message)

        const expectedAlertText = 'Your email has successfully been sent'
        assert(contactUsForm.getAlert().includes(expectedAlertText), 'Alert has incorrect text')
    });
});