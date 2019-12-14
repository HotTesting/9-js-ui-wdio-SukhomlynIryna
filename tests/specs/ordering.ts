import { expect } from 'chai'
import { productDetails } from '../../pages/product.details';
import { checkoutPage } from '../../pages/checkout'
import { orderSuccessPage } from '../../pages/order.success'

describe("Order", function () {

    beforeEach(function () {
        browser.deleteCookies()
    })

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

    const redDuckPrice = 20

    it("is successful for regular item", function () {

        productDetails.open('/rubber-ducks-c-1/red-duck-p-3')
        productDetails.addToCart()
        checkoutPage.open()

        expect(checkoutPage.isItemsInCart()).to.equal(true, 'The product is not added to the cart')
        expect(checkoutPage.getTotalPrice()).to.equal(redDuckPrice, 'The total price is incorrect')

        checkoutPage.customerDetails.fillForm(customerDetails)
        checkoutPage.customerDetails.saveChanges()
        browser.pause(3000)
        checkoutPage.orderSummary.confirmOrder()
        browser.pause(3000)

        expect(orderSuccessPage.getAlert()).to.contain('is successfully completed!', 'The alert message is incorrect')
    });

    it("is successful for discounted item", function () {
        const blueDuckPrice = 16
        const orderSummary = { "subtotal": 16, "deliveryFee": 5, "paymentSum": 21 }

        productDetails.open('/rubber-ducks-c-1/blue-duck-p-4 ')
        productDetails.addToCart()
        checkoutPage.open()

        expect(checkoutPage.isItemsInCart()).to.equal(true, 'The product is not added to the cart')
        expect(checkoutPage.getTotalPrice()).to.equal(blueDuckPrice, 'The total price is incorrect')

        checkoutPage.customerDetails.fillForm(customerDetails)
        checkoutPage.customerDetails.saveChanges()
        browser.pause(3000)

        expect(checkoutPage.orderSummary.getOrderSummary()).to.deep.include(orderSummary, 'The order summary is invalid')

        checkoutPage.orderSummary.confirmOrder()
        browser.pause(3000)

        expect(orderSuccessPage.getAlert()).to.contain('is successfully completed!', 'The alert message is incorrect')
    });

    it("is successful for sold out item", function () {             //test fails because sold product can be added to cart 
        productDetails.open('/rubber-ducks-c-1/purple-duck-p-5 ')

        expect(productDetails.isAddToCartButtonEnabled()).to.be.false

        productDetails.addToCart()
        checkoutPage.open()

        expect(checkoutPage.isItemsInCart()).to.equal(false, 'The sold out product is added to the cart')
    });

    it("is successful for 2 same items in card", function () {
        const orderSummary = { "subtotal": 40, "deliveryFee": 5, "paymentSum": 45 }

        productDetails.open('/rubber-ducks-c-1/red-duck-p-3')
        productDetails.addToCart()
        browser.pause(1000)
        productDetails.addToCart()
        checkoutPage.open()

        expect(checkoutPage.shoppingCart.getQuantityOfProduct('Red Duck')).to.equal(2)
        expect(checkoutPage.getTotalPrice()).to.equal(redDuckPrice * 2, 'The total price is incorrect')

        checkoutPage.customerDetails.fillForm(customerDetails)
        checkoutPage.customerDetails.saveChanges()
        browser.pause(3000)

        expect(checkoutPage.orderSummary.getOrderSummary()).to.deep.include(orderSummary, 'The order summary is invalid')

        checkoutPage.orderSummary.confirmOrder()
        browser.pause(3000)

        expect(orderSuccessPage.getAlert()).to.contain('is successfully completed!', 'The alert message is incorrect')
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