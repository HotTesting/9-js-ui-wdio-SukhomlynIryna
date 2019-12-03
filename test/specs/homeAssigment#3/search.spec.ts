import * as assert from "assert"
import * as randomString from "randomstring"

describe("Items search", function () {
  before(function () {
    browser.url('/');
    browser.pause(2000);
  });

  it("should show results in case multiple items matches", function () {
    const searchField = $('[type=search]')
    const searchValue = 'Duck';
    searchField.setValue(searchValue);
    browser.keys('Enter');

    const productsList = $('#box-search-results').$('div.products')
    const searchResultsList = productsList.$$('.product')

    if (productsList.isDisplayed()) {
      assert(searchResultsList.length >= 2, 'There are less than 2 elements found ')
    } else {
      console.log('Search result products are not displayed')
    }
  });

  it("should redirect to item page in case only one result matches", function () {
    const searchField = $('[type=search]')
    const searchValue = 'Blue Duck';
    searchField.setValue(searchValue);
    browser.keys('Enter');

    const product = $('#box-product.box')

    if (product.isDisplayed()) {
      const productName = product.$('#box-product.box .title')
      assert(productName.getText() == searchValue, 'The serch result doesnt much')
    } else {
      console.log('No search results are displayed')
    }
  });

  it("should redirect to 'no matching results' in case no items matched", function () {
    const searchField = $('[type=search]')
    const searchValue = randomString.generate(5)
    searchField.setValue(searchValue);
    browser.keys('Enter');

    const noSearchResultMessage = $('#box-search-results').$('h1.title')

    if (noSearchResultMessage.isDisplayed()) {
      const message = `Search Results for "${searchValue}"`
      assert(noSearchResultMessage.getText() == message)
      browser.pause(2000);
    }
  });
});
