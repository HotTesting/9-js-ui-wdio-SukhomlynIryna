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
        "taxId": "123",
    }

    const redDuckPrice = 20, blueDuckPrice = 16

    it("is successful for regular item", function () {
        productDetails.open('/rubber-ducks-c-1/red-duck-p-3')
        productDetails.addToCart()
        checkoutPage.open()

        expect(checkoutPage.isItemsInCart()).to.equal(true, 'The product is not added to the cart')
        expect(checkoutPage.getTotalPrice()).to.equal(redDuckPrice, 'The total price is incorrect')

        checkoutPage.customerDetails.fillForm(customerDetails)
        checkoutPage.customerDetails.saveChanges()
        
        checkoutPage.orderSummary.confirmOrder()

        expect(orderSuccessPage.getAlert()).to.contain('is successfully completed!', 'The alert message is incorrect')
    });

    xit("is successful for discounted item", function () {
        const orderSummary = { "subtotal": blueDuckPrice, "deliveryFee": 5, "paymentSum": 21 }

        productDetails.open('/rubber-ducks-c-1/blue-duck-p-4')
        productDetails.addToCart()
        checkoutPage.open()

        expect(checkoutPage.isItemsInCart()).to.equal(true, 'The product is not added to the cart')
        expect(checkoutPage.getTotalPrice()).to.equal(blueDuckPrice, 'The total price is incorrect')

        checkoutPage.customerDetails.fillForm(customerDetails)
        checkoutPage.customerDetails.saveChanges()

        expect(checkoutPage.orderSummary.getOrderSummary()).to.deep.include(orderSummary, 'The order summary is invalid')

        checkoutPage.orderSummary.confirmOrder()
    
        expect(orderSuccessPage.getAlert()).to.contain('is successfully completed!', 'The alert message is incorrect')
    });

    xit("is successful for sold out item", function () {             //test fails because sold product can be added to cart 
        productDetails.open('/rubber-ducks-c-1/purple-duck-p-5')

        expect(productDetails.isAddToCartButtonEnabled()).to.be.false

        productDetails.addToCart()
        checkoutPage.open()

        expect(checkoutPage.isItemsInCart()).to.equal(false, 'The sold out product is added to the cart')
    });

    xit("is successful for 2 same items in card", function () {
        const orderSummary = { "subtotal": redDuckPrice *2, "deliveryFee": 5, "paymentSum": 45 }

        productDetails.open('/rubber-ducks-c-1/red-duck-p-3')
        productDetails.addToCart()
        productDetails.addToCart()
        checkoutPage.open()

        expect(checkoutPage.shoppingCart.getQuantityOfProduct('Red Duck')).to.equal(2)
        expect(checkoutPage.getTotalPrice()).to.equal(orderSummary.subtotal, 'The total price is incorrect')

        checkoutPage.customerDetails.fillForm(customerDetails)
        checkoutPage.customerDetails.saveChanges()
    
        expect(checkoutPage.orderSummary.getOrderSummary()).to.deep.include(orderSummary, 'The order summary is invalid')

        checkoutPage.orderSummary.confirmOrder()

        expect(orderSuccessPage.getAlert()).to.contain('is successfully completed!', 'The alert message is incorrect')
    });

    xit("is successful for 2 different items in card", function () {
        const orderSummary = { "subtotal": redDuckPrice + blueDuckPrice, "deliveryFee": 5, "paymentSum": 41 }

        productDetails.open('/rubber-ducks-c-1/red-duck-p-3')
        productDetails.addToCart()
        productDetails.open('/rubber-ducks-c-1/blue-duck-p-4')
        productDetails.addToCart()
        checkoutPage.open()

        expect(checkoutPage.shoppingCart.getTotalProductsQuantity()).to.equal(2)
        expect(checkoutPage.getTotalPrice()).to.equal(orderSummary.subtotal, 'The total price is incorrect')

        checkoutPage.customerDetails.fillForm(customerDetails)
        checkoutPage.customerDetails.saveChanges()

        expect(checkoutPage.orderSummary.getOrderSummary()).to.deep.include(orderSummary, 'The order summary is invalid')

        checkoutPage.orderSummary.confirmOrder()

        expect(orderSuccessPage.getAlert()).to.contain('is successfully completed!', 'The alert message is incorrect')
    });

    xit("is successful for items with parameters", function () {
        const orderSummary = { "subtotal": 447, "deliveryFee": 5, "paymentSum": 452 }
        let yellowDucksList = new Map([[99, 'Small'], [149, 'Medium'], [199, 'Large']])

        productDetails.open('/rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6')

        yellowDucksList.forEach(productDetails.slectDuckSizeAndAddToCart)
        checkoutPage.open()
        expect(checkoutPage.shoppingCart.getTotalProductsQuantity()).to.equal(3)
        expect(checkoutPage.getTotalPrice()).to.equal(orderSummary.subtotal, 'The total price is incorrect')

        checkoutPage.customerDetails.fillForm(customerDetails)
        checkoutPage.customerDetails.saveChanges()
    
        expect(checkoutPage.orderSummary.getOrderSummary()).to.deep.include(orderSummary, 'The order summary is invalid')

        checkoutPage.orderSummary.confirmOrder()

        expect(orderSuccessPage.getAlert()).to.contain('is successfully completed!', 'The alert message is incorrect')
    });
});