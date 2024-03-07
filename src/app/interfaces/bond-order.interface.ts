

export interface BondOrder {
    symbol: String;
    quantity: number;
    paymentCoin: String;
    paymentChain: String;
    paymentAmount: number;
    paymentCoinAmount: number;
}

// {
//     "symbol": "DNB",
//     "quantity": 100,
//     "paymentCoin": "USDT",
//     "paymentChain": "ETH",
//     "paymentAmount": 10000,
//     "paymentCoinAmount": 10000
//   }