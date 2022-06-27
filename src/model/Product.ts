export interface Product {
    Id: string;
    Name: string;
    Price: string;
    Description: string;
    PurchasedTimes: number;
    Images: string[]
}

export const GetEmptyProduct = (): Product => {
    return {
        Id: '',
        Name: '',
        Price: '',
        Description: '',
        PurchasedTimes: 0,
        Images: []
    }
}