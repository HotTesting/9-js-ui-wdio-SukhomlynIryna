import { BasePage } from '../base';
import { ShoppingCart } from './components/shoppingCart';
import { customerDetails } from './components/customer.details'
import { orderSummary } from './components/order.summary'

export class CheckoutPage extends BasePage {
    shoppingCart: ShoppingCart = new ShoppingCart()
    customerDetails = customerDetails
    orderSummary = orderSummary

    private get noItemsLabel() { return $('.cart.wrapper em') }

    public open() {
        super.open('/checkout')
    }

    public isNoItemsInCart() {
        if (this.noItemsLabel.isDisplayed()) {
            return this.noItemsLabel.getText()
                .includes('There are no items in your cart.')
        } else {
            return false
        }
    }

    public isItemsInCart() {
        return !this.isNoItemsInCart()
    }


    public getTotalPrice(): number {
        return parseFloat($('tfoot .formatted-value').getText().replace("$", ""))
    }
}

export const checkoutPage = new CheckoutPage()