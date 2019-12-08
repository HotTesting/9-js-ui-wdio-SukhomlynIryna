import { productDetails } from './product.details'
import { Checkout } from './checkout';

export class Application {
    product = productDetails
    checkout = Checkout
}

export const App: Application = new Application()