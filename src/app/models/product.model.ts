export interface Product {
    /** Идентификатор товара */
    readonly id: string;
    /** Имя товара */
    readonly name: string;
    /** Описание товара */
    readonly description: string;
    /** Цена товара */
    readonly unitPrice: number;
    /** Рейтинг товара */
    readonly ranking: number;
}
