export class CustomerDetailsComponent {

    private get rootElement() {
        return $('#box-checkout-customer')
    }

    public get companyField() {
        return this.rootElement.$('input[name="company"]')
    }

    public get taxIdField() {
        return this.rootElement.$('input[name="tax_id"]')
    }

    public get firstNameField() {
        return this.rootElement.$('input[name="firstname"]')
    }

    public get lastNameField() {
        return this.rootElement.$('input[name="lastname"]')
    }

    public get address1Field() {
        return this.rootElement.$('input[name="address1"]')
    }

    public get postalCodeField() {
        return this.rootElement.$('input[name="postcode"]')
    }

    public get cityField() {
        return this.rootElement.$('input[name="city"]')
    }

    public get emailField() {
        return this.rootElement.$('input[name="email"]')
    }

    public get phoneField() {
        return this.rootElement.$('input[name="phone"]')
    }

    public saveChanges() {
        $('[name="save_customer_details"]').click()
    }

    public fillForm(customerDetails) {
        this.companyField.setValue(customerDetails.company)
        this.taxIdField.setValue(customerDetails.taxId)
        this.firstNameField.setValue(customerDetails.firstname)
        this.lastNameField.setValue(customerDetails.lastname)
        this.address1Field.setValue(customerDetails.address1)
        this.postalCodeField.setValue(customerDetails.postcode)
        this.cityField.setValue(customerDetails.city)
        this.emailField.setValue(customerDetails.email)
        this.phoneField.setValue(customerDetails.phone)
    }
}

export const customerDetails = new CustomerDetailsComponent()