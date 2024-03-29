export class ShoppingCart {
    private get container(): WebdriverIO.Element {
        return $('#box-checkout-cart')
    }

    public get items(): Item[] {
        return this.container.$$('table.items tr.item')
            .map(item => {
                return new Item(item)
            })
    }

    public getItemByName(name: string): Item {
        return this.items.find(item => item.getProductName().includes(name))
    }


    public getQuantityOfProduct(name: string): number {
        return this.getItemByName(name).getProductQuantity()
    }

    public getTotalProductsQuantity(): number {
        let productsQuantities = 0
        this.items.forEach(item => {
            productsQuantities = productsQuantities + item.getProductQuantity()
        })
        return productsQuantities
    }
}

class Item {
    container

    constructor(itemContainer) {
        this.container = itemContainer
    }

    public getProductName(): string {
        return this.container.getAttribute('data-name')
    }

    public getProductPrice(): number {
        return parseFloat(this.container.getAttribute('data-price'))
    }

    public getProductQuantity(): number {
        return Number(this.container.getAttribute('data-quantity'))
    }
}