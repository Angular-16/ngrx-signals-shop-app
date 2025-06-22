export interface CartItemVm {
    /** Идентификатор товара в корзине */
    readonly id: string;
    /** Имя товара в корзине */
    readonly name: string;
    /** Цена товара в корзине */
    readonly price: number;
    /** Колличество товара в корзине */
    readonly quantity: number;
    /** ?? */
    readonly total: number;
}
