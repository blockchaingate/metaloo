export interface Coin {
    _id: string;
    name: string;
    symbol: string;
    icon: string;
    total_supply: number;
    price?: number;
    available_balance?: number;
}