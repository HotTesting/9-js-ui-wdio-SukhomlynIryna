import * as assert from "assert"

function isArraySorted(array) {
    let isSorted = true
    for (let i = 0; i <= array.length; i++) {
        if (array[i + 1] < array[i]) {
            isSorted = false
            break
        }
    }
    return isSorted
}

describe("Search results sorting", function () {

    before(function () {
        browser.url('/')
        browser.pause(2000)
        const searchField = $('[type=search]')
        const searchValue = 'Duck'

        searchField.setValue(searchValue)
        browser.keys('Enter')
    })

    it("correctly arranges items when using 'by price' sorting", function () {

        const serchResultsBox = $('#box-search-results')
        const productsList = serchResultsBox.$('.products')
        const searchResultItems = productsList.$$('.product')
        const priceSortCreteria = serchResultsBox.$('=Price')

        priceSortCreteria.click()

        const productPrices = []

        if (productsList.isDisplayed()) {
            searchResultItems.forEach(function (item) {
                productPrices.push(Number(item.getAttribute('data-price')))
            })

            console.log('prices:', productPrices)
            let isSorted = isArraySorted(productPrices)
            assert(isSorted == true, 'The search results are not sorted by price correctly')
        } else {
            console.log('No search results found')
        }
    });

    it("correctly arranges items when using 'by name' sorting", function () {

        const serchResultsBox = $('#box-search-results')
        const productsList = serchResultsBox.$('.products')
        const searchResultItems = productsList.$$('.product')
        const nameSortCreteria = serchResultsBox.$('=Name')

        nameSortCreteria.click()

        const productNames = []

        if (productsList.isDisplayed()) {
            searchResultItems.forEach(function (item) {
                productNames.push(item.$('.name').getText())
            })

            let isSorted = isArraySorted(productNames)
            assert(isSorted == true, 'The search results are not sorted by name correctly')
        } else {
            console.log('No search results found')
        }
    });
});