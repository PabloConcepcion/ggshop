import { Product } from "./Product";

export interface ShoppingCard {
    Id: string;
    Name: string;
    Products: Product[]
}

export const GetEmptyShoppingCard = (): ShoppingCard => {
    return {
        Id: '',
        Name: '',
        Products: []
    }
}