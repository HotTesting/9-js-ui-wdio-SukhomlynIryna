export class BasePage {

    public searchForProduct(product: string) {
        $('[type=search]').setValue(product);
        browser.keys('Enter');
        browser.pause(1000);
    }

    public open(path: string) {
        browser.url(path)
    }
}

export const basePage = new BasePage()