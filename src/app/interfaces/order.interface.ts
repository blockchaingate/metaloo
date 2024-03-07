// export interface Order {
//     quantity: number;
//     coin: string;
//     price: number;
//     amount: number;
//     paymentMethod: string;
// }


export interface Order {
    _id: string;
    user: string;
    bondId: string;
    quantity: number;
    status: string;
    KYCverified: boolean;
    created_at: string;
}