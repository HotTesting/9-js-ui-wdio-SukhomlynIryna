import { orderSummaryModel } from './../../../objectModels/order.summary'

class OrderSummaryComponent {
    private get rootElement() { return $('#box-checkout-summary') }
    get subtotal() { return this.rootElement.$('tbody').$$('tr')[0].$$('td')[1] }
    private get deliveryFee() { return this.rootElement.$$('tbody tr')[1].$$('td')[1] }
    private get paymentSum()  { return this.rootElement.$$('tfoot tr')[0].$$('td')[1] }

    public getOrderSummary(): orderSummaryModel {
        const orderSummary = new orderSummaryModel()

        orderSummary.subtotal = Number(this.subtotal.getText().replace('$',''))
        orderSummary.deliveryFee = Number(this.deliveryFee.getText().replace('$',''))
        orderSummary.paymentSum = Number(this.paymentSum.getText().replace('$',''))

        return orderSummary
    }

    public confirmOrder() {
        this.rootElement.$('[name="confirm_order"]').click()
    }
}
export const orderSummary = new OrderSummaryComponent()
