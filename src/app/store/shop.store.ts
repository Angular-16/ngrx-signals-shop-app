import {
    patchState,
    signalStore,
    withComputed,
    withHooks,
    withMethods,
    withState,
} from '@ngrx/signals';
import { initialShopSlice, PersistedShopSlice } from './shop.slice';
import { buildCartVm, buildProductListVm } from './shop-vm.builders';
import { computed, effect, Signal } from '@angular/core';
import * as updaters from './shop.updater';

export const ShopStore = signalStore(
    { providedIn: 'root' },
    withState(initialShopSlice),
    withComputed((store) => ({
        productListVm: computed(() =>
            buildProductListVm(
                store.products(),
                store.searchWord(),
                store.cartQuantity()
            )
        ),
        cartVm: computed(() =>
            buildCartVm(
                store.products(),
                store.cartQuantity(),
                store.taxRate(),
                store.cardVisible()
            )
        ),
    })),
    withMethods((store) => ({
        showCart: () => patchState(store, updaters.showCartUpdater()),
        hideCart: () => patchState(store, updaters.hideCartUpdater()),
        addProductToCart: (productId: string) =>
            patchState(store, updaters.addProductToCartUpdater(productId)),
        setWord: (word: string) =>
            patchState(store, updaters.searchWordUpdater(word)),
        incrementQty: (id: string) =>
            patchState(store, updaters.incrementQtyUpdater(id)),
        decrementQty: (id: string) =>
            patchState(store, updaters.decrementQtyUpdater(id)),
        checkout: () => patchState(store, updaters.checkoutUpdater()),
    })),
    withHooks((store) => ({
        onInit() {
            const ITEM_NAME = 'cartShop';
            const persisted: Signal<PersistedShopSlice> = computed(() => ({
                cartQuantity: store.cartQuantity(),
            }));

            const persistedRawData = localStorage.getItem(ITEM_NAME);
            if (persistedRawData) {
                const persistedData = JSON.parse(
                    persistedRawData
                ) as PersistedShopSlice;
                patchState(store, persistedData);
            }

            effect(() => {
                const persistedValue = persisted();
                localStorage.setItem(ITEM_NAME, JSON.stringify(persistedValue));
            });
        },
    }))
);
