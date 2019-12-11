import * as assert from "assert"
import * as randomString from "randomstring"
import { productDetails } from "../../pages/product.details"
import { searchResultsPage } from "../../pages/search.results"

describe("Items search", function () {
  before(function () {
    searchResultsPage.open('/')
  });

  it("should show results in case multiple items matches", function () {
    const searchValue = 'Duck'
    searchResultsPage.searchForProduct(searchValue)

    assert(searchResultsPage.productsListSection().isDisplayed() == true, 'Search result products are not displayed')
    assert(searchResultsPage.searchResultItems().length >= 2, 'There are less than 2 elements found ')
  });

  it("should redirect to item page in case only one result matches", function () {
    const searchValue = 'Blue';
    searchResultsPage.searchForProduct(searchValue)

    assert(searchResultsPage.product().isDisplayed() == true, 'No search results are displayed')
    assert(productDetails.getProductName() == `${searchValue} Duck`, 'The serch result doesnt much')
  });

  it("should redirect to 'no matching results' in case no items matched", function () {
    const searchValue = randomString.generate(5)
    const message = `Search Results for "${searchValue}"`
    searchResultsPage.searchForProduct(searchValue)
    
    assert(searchResultsPage.noSearchResultsMessage().isDisplayed() == true, 'Alert is not displayed')
    assert(searchResultsPage.getNoSearchResultsAlert() == message)
  });
});
