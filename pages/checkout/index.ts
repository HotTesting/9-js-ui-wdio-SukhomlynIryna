import { BasePage } from '../base';
import { ShoppingCart } from './components/shoppingCart';
import { customerDetails } from './components/customer.details'
import { orderSummary } from './components/order.summary'

export class CheckoutPage extends BasePage {
    shoppingCart: ShoppingCart = new ShoppingCart()
    customerDetails = customerDetails
    orderSummary = orderSummary

    private get noItemsLabel() { return $('.cart.wrapper em') }

    open() {
        super.open('/checkout')
    }

    isNoItemsInCart() {
        if (this.noItemsLabel.isDisplayed()) {
            return this.noItemsLabel.getText()
                .includes('There are no items in your cart.')
        } else {
            return false
        }
    }

    isItemsInCart() {
        return !this.isNoItemsInCart()
    }

    public getTotalPrice(): number {
        return parseFloat($('tfoot .formatted-value').getText().replace("$", ""))
    }


    public confirmOrder() {
        $('[name="confirm_order"]').click()

    }
}

export const checkoutPage = new CheckoutPage()