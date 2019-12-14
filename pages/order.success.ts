import { BasePage } from './base'

export class OrderSuccessPage extends BasePage {

    private get rootElement() { return $('#box-order-success') }

    private get title() { return this.rootElement.$('h1') }
    private get text() { return this.rootElement.$('=*Thank you for') }
    private get totalPrice() { return this.rootElement.$('p')[1] }

    public getAlert(): string {
        return this.title.getText()
    }

}

export const orderSuccessPage = new OrderSuccessPage()