import { signalStore, withComputed, withState } from '@ngrx/signals';
import { initialShopSlice } from './shop.slice';
import { buildCartVm, buildProductListVm } from './shop-vm.builders';
import { computed } from '@angular/core';

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
    }))
);
