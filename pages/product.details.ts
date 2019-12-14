import { BasePage } from './base'
import { ProductDetailsModel } from '../objectModels/product.details';

export class ProductDetailsPage extends BasePage {
    public getProductPrice(): number {
        return parseFloat($('#box-product')
            .getAttribute('data-price'))
    }

    public getProductName(): string {
        return $('h1.title').getText()
    }

    public getProductDetails(): ProductDetailsModel {
        const productDetails = new ProductDetailsModel()

        productDetails.name = this.getProductName()
        productDetails.price = this.getProductPrice()

        return productDetails
    }

    public addToCart() {
        $('button[name="add_cart_product"]').click()
        browser.pause(3000);
    }

    public isAddToCartButtonEnabled() {
        return $('button[name="add_cart_product"]').isEnabled()
    }
}

export const productDetails = new ProductDetailsPage()