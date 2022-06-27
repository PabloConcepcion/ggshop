export interface User {
    Id: string;
    Email: string;
    Name: string;
    PurchasedProducts: number;
    ShoppingCardId: string;
}

export const GetEmptyUser = (): User =>{
    return  {
        Id: '',
        Email: '',
        Name: '',
        PurchasedProducts: 0,
        ShoppingCardId: ''
    }
}