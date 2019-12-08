import { BasePage } from './base'

export class ContactUsForm extends BasePage {

    rootElement() {
        return $('#box-contact-us')
    }

    nameField() {
        return this.rootElement().$('input[name="name"]')
    }

    emailField() {
        return this.rootElement().$('input[name="email"]')
    }

    subjectField() {
        return this.rootElement().$('input[name="subject"]')
    }

    messageField() {
        return this.rootElement().$('textarea[name="message"]')
    }

    sendButton() {
        return this.rootElement().$('button[name="send"]')
    }

    getAlert(): string {
        const alert = $('.alert-success')
        return alert.getText()
    }

    fillForm(name, email, subject, message) {
        this.nameField().setValue(name)
        this.emailField().setValue(email)
        this.subjectField().setValue(subject)
        this.messageField().setValue(message)
        this.sendButton().click()
    }
}

export const contactUsForm = new ContactUsForm()