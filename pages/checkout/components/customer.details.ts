export class CustomerDetailsComponent {

    private get rootElement() {
        return $('#box-checkout-customer')
    }

    private get companyField() {
        return this.rootElement.$('input[name="company"]')
    }

    private get taxIdField() {
        return this.rootElement.$('input[name="tax_id"]')
    }

    private get firstNameField() {
        return this.rootElement.$('input[name="firstname"]')
    }

    private get lastNameField() {
        return this.rootElement.$('input[name="lastname"]')
    }

    private get address1Field() {
        return this.rootElement.$('input[name="address1"]')
    }

    private get postalCodeField() {
        return this.rootElement.$('input[name="postcode"]')
    }

    private get cityField() {
        return this.rootElement.$('input[name="city"]')
    }

    private get emailField() {
        return this.rootElement.$('input[name="email"]')
    }

    private get phoneField() {
        return this.rootElement.$('input[name="phone"]')
    }

    public get saveChangesButton() {
        return $('[name="save_customer_details"]')
    }

    public saveChanges() {
        console.log('[Save] customer details chnages ');
        this.saveChangesButton.click()
    }

    public fillForm(customerDetails) {
        console.log('[Enter] customer details form ');

        this.companyField.setValue(customerDetails.company)
        this.taxIdField.setValue(customerDetails.taxId)
        this.firstNameField.setValue(customerDetails.firstname)
        this.firstNameField.$('[value]').waitForExist(null,null, 'The value has been set')    // I can't find out by first test fails because this field is not set   
        this.lastNameField.setValue(customerDetails.lastname)
        this.address1Field.setValue(customerDetails.address1)
        this.postalCodeField.setValue(customerDetails.postcode)
        this.cityField.setValue(customerDetails.city)
        this.emailField.setValue(customerDetails.email)
        this.phoneField.setValue(customerDetails.phone)
    }
}

export const customerDetails = new CustomerDetailsComponent()