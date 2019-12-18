import { BasePage } from './base'
import { ProductDetailsModel } from '../objectModels/product.details';

export class ProductDetailsPage extends BasePage {
    public getProductPrice(): number {
        console.log('[Get] product price ');
        return parseFloat($('#box-product')
            .getAttribute('data-price'))
    }

    public getProductName(): string {
        console.log('[Get] product name ');
        return $('h1.title').getText()
    }

    public getProductDetails(): ProductDetailsModel {
        console.log('[Get] product detils ');
        const productDetails = new ProductDetailsModel()

        productDetails.name = this.getProductName()
        productDetails.price = this.getProductPrice()

        return productDetails
    }

    public addToCart() {
        console.log('[Add] product to cart ');
        const currentItemsInCart = this.header.getQuantity()
        $('button[name="add_cart_product"]').click()
        browser.waitUntil(() => {
            return this.header.getQuantity() > currentItemsInCart
        }, null, `Expected items in cart to be changed. 
        Current items: ${this.header.getQuantity()} items before ${currentItemsInCart}`)
    }

    public isAddToCartButtonEnabled() {
        return $('button[name="add_cart_product"]').isEnabled()
    }

    public selectDuckSize(size) {
        console.log('[Select] the size of duck ');
        $('.select-wrapper').click()
        $(`.select-wrapper [value="${size}"]`).click()
    }

    public slectDuckSizeAndAddToCart(key) {
        console.log(`${key} duck is added to card`)
        productDetails.selectDuckSize(key)
        productDetails.addToCart()
    }
}

export const productDetails = new ProductDetailsPage()