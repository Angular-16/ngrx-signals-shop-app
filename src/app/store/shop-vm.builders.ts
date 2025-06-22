import { CartItemVm } from '../components/cart/view-model/cart-item.vm';
import { ProductItemVm } from '../components/items-list/view-model/product-item.vm';
import { Product } from '../models/product.model';
import { CartVm, ProductListVm } from './shop.vm';

export function buildProductListVm(
    products: Product[],
    searchWord: string,
    quantity: Record<string, number>
): ProductListVm {
    return {
        productItems: buildProductItems(),
    };

    function buildProductItems(): ProductItemVm[] {
        const word = searchWord.trim().toLocaleLowerCase();

        return products
            .filter((product) =>
                product.name.toLocaleLowerCase().includes(word)
            )
            .map((product) => ({
                ...product,
                quantity: quantity[product.id] || 0,
            }));
    }
}

export function buildCartVm(
    products: Product[],
    quantity: Record<string, number>,
    taxRate: number,
    cartVisible: boolean
): CartVm {
    const items = buildCartItems();
    const subtotal = items.reduce(
        (acc: number, item: CartItemVm) => acc + item.total,
        0
    );
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const itemsCount = items.length;
    const isActive = itemsCount > 0;
    const isVisible = cartVisible;

    return {
        items,
        subtotal,
        tax,
        total,
        isActive,
        isVisible,
    };

    function buildCartItems(): CartItemVm[] {
        return products
            .filter((product: Product) => quantity[product.id])
            .map((product: Product) => {
                const qty = quantity[product.id];
                const { id, name, unitPrice } = product;

                return {
                    id,
                    name,
                    price: unitPrice,
                    quantity: qty,
                    total: unitPrice * qty,
                };
            });
    }
}
