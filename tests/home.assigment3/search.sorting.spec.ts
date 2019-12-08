import * as assert from "assert"
import { searchResultsPage } from "../../pages/search.results"
import { arrayHelper } from "../../helpers/array"

describe("Search results sorting", function () {

    before(function () {
        searchResultsPage.open('/')
        searchResultsPage.searchForProduct('duck')
    })

    it("correctly arranges items when using 'by price' sorting", function () {
        searchResultsPage.orderByCreteria('Price')

        assert(searchResultsPage.productsListSection().isDisplayed() == true, 'No search results found')

        const productPrices = []
        searchResultsPage.searchResultItems().forEach(function (item) {
            productPrices.push(Number(item.getAttribute('data-price')))
        })

        assert(arrayHelper.isSorted(productPrices) == true, 'The search results are not sorted by price correctly')
    });

    it("correctly arranges items when using 'by name' sorting", function () {
        searchResultsPage.orderByCreteria('Name')

        assert(searchResultsPage.productsListSection().isDisplayed() == true, 'No search results found')

        const productNames = []
        searchResultsPage.searchResultItems().forEach(function (item) {
            productNames.push(item.$('.name').getText())
        })

        assert(arrayHelper.isSorted(productNames) == true, 'The search results are not sorted by name correctly')
    });
});