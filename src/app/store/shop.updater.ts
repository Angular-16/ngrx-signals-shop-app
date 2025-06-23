import { PartialStateUpdater } from '@ngrx/signals';
import { ShopSlice } from './shop.slice';

export function searchWordUpdater(
    word: string
): PartialStateUpdater<ShopSlice> {
    return (state: ShopSlice) => ({
        ...state,
        searchWord: word,
    });
}

export function addProductToCartUpdater(
    productId: string
): PartialStateUpdater<ShopSlice> {
    return (state: ShopSlice) => {
        const cartQty = { ...state.cartQuantity };
        cartQty[productId] = cartQty[productId] + 1 || 1;

        return {
            ...state,
            cartQuantity: cartQty,
        };
    };
}

export function showCartUpdater(): PartialStateUpdater<ShopSlice> {
    return () => ({
        cardVisible: true,
    });
}

export function hideCartUpdater(): PartialStateUpdater<ShopSlice> {
    return () => ({
        cardVisible: false,
    });
}

export function incrementQtyUpdater(
    productId: string
): PartialStateUpdater<ShopSlice> {
    return addProductToCartUpdater(productId);
}

export function decrementQtyUpdater(
    productId: string
): PartialStateUpdater<ShopSlice> {
    return (state: ShopSlice) => {
        const cartQty = { ...state.cartQuantity };
        const newQty = cartQty[productId] - 1;

        if (newQty > 0) {
            cartQty[productId] = newQty;
        } else {
            delete cartQty[productId];
        }

        return {
            ...state,
            cartQuantity: cartQty,
        };
    };
}

export function checkoutUpdater(): PartialStateUpdater<ShopSlice> {
    return (state: ShopSlice) => ({
        ...state,
        cartQuantity: {},
        cardVisible: false,
    });
}
