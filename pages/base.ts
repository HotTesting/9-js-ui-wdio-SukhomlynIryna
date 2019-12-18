import { Header } from './components/header';
export class BasePage {

    header = new Header();

    public searchForProduct(product: string) {
        console.log('[Search] for product by name: ', product);

        $('[type=search]').setValue(product)
        browser.keys('Enter')
        browser.pause(1000)
    }

    public open(path: string) {
        console.log('[Navigate] Open page by given link: ', path);

        browser.url(path)
    }
}

export const basePage = new BasePage()