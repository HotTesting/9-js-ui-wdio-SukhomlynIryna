import { BasePage } from './base';

export class SearchResultsPage extends BasePage {

    serchResultsBox() {
        return $('#box-search-results')
    }

    productsListSection() {
        return this.serchResultsBox().$('.products')
    }

    searchResultItems() {
        return this.productsListSection().$$('.product')
    }

    product() {
        return $('#box-product.box')
    }

    orderCreteriaButton(creteria) {
        return this.serchResultsBox().$(`=${creteria}`)
    }

    orderByCreteria(creteria) {
        this.orderCreteriaButton(creteria).click()
    }

    noSearchResultsMessage() {
        return this.serchResultsBox().$('h1.title')
    }

    getNoSearchResultsAlert(): string {
        return this.noSearchResultsMessage().getText()
    }

    getProductPrices(): number[] {
        console.log('[Get] produts prices ');
        const productPrices = []
        this.searchResultItems().forEach(function (item) {
            productPrices.push(Number(item.getAttribute('data-price')))
        })
        return productPrices
    }

    getProductNames(): string[] {
        console.log('[Get] produts names ');
        const productNames = []
        searchResultsPage.searchResultItems().forEach(function (item) {
            productNames.push(item.$('.name').getText())
        })
        return productNames
    }
}
export const searchResultsPage = new SearchResultsPage()