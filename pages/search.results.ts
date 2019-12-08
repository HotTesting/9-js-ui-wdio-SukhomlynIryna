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

    orderByCreteria(creteria){
        this.orderCreteriaButton(creteria).click()
    }

    noSearchResultsMessage() {
        return this.serchResultsBox().$('h1.title')
    }

    getNoSearchResultsAlert(): string {
        return this.noSearchResultsMessage().getText()
    }
}
export const searchResultsPage = new SearchResultsPage()