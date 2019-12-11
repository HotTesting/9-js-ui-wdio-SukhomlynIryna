import { expect } from 'chai'
import { productDetails } from '../../pages/product.details';
import { checkoutPage } from '../../pages/checkout'
import * as assert from "assert" 

describe("Order", function () {

    let customerDetails = {
        "address1": "New York",
        "address2": "New York New York",
        "city": "Manhattan",
        "company": "NASA",
        "country_code": "UA",
        "email": "sua@gmail.com",
        "firstname": "John",
        "lastname": "Travolta",
        "phone": "3333",
        "postcode": "88555",
        "tax_id": "123",
    }

    it("is successful for regular item", function () {
        productDetails.open('http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/red-duck-p-3')
        productDetails.addToCart()
        checkoutPage.open()
        expect(checkoutPage.isItemsInCart()).to.equal(true, 'The product is not added to the cart')
        const redDuckPrice = 20

        console.log('get total: ', checkoutPage.getTotalPrice())
        expect(checkoutPage.getTotalPrice()).to.equal(redDuckPrice, 'The total price is incorrect')

        checkoutPage.customerDetails.fillForm(customerDetails)
        checkoutPage.customerDetails.saveChanges()
        browser.pause(3000)
        checkoutPage.confirmOrder()

    });

    xit("is successful for discounted item", function () {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/blue-duck-p-4 
        // this duck always has discount 20%
        throw new Error("NOT IMPLEMENTED");
    });

    xit("is successful for sold out item", function () {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/purple-duck-p-5 
        // this duck always sold out
        throw new Error("NOT IMPLEMENTED");
    });

    xit("is successful for 2 same items in card", function () {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/red-duck-p-3
        // Just regular duck without discounts, parameters, or sold our
        throw new Error("NOT IMPLEMENTED");
    });

    xit("is successful for 2 different items in card", function () {
        throw new Error("NOT IMPLEMENTED");
    });

    xit("is successful for items with parameters", function () {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6 
        // this duck has 3 sizes - small, medium, large. Each size has own price. Verify that price calculated correctly
        throw new Error("NOT IMPLEMENTED");
    });
});