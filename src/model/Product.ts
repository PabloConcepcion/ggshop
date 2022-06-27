export interface Product {
    Id: string;
    Name: string;
    Price: string;
    Description: string;
    Category: string;
    Images: string
}

export const GetEmptyProduct = (): Product => {
    return {
        Id: '',
        Name: '',
        Price: '',
        Description: '',
        Category: "",
        Images: ""
    }
}