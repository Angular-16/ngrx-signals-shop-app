import { ALL_PRODUCTS } from '../data/all-products';
import { Product } from '../models/product.model';

export interface ShopSlice {
    readonly products: Product[];
    readonly searchWord: string;
    readonly cartQuantity: Record<string, number>;
    readonly cardVisible: boolean;
    readonly taxRate: number;
}

export const initialShopSlice: ShopSlice = {
    products: ALL_PRODUCTS,
    searchWord: 'signal',
    cartQuantity: { 'reactive-refresher': 1, 'signal-splicer': 2 },
    cardVisible: false,
    taxRate: 0.08,
};
