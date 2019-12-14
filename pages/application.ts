import { productDetails } from './product.details'
import { checkoutPage } from './checkout';

export class Application {
    product = productDetails
    checkout = checkoutPage
}

export const App: Application = new Application()