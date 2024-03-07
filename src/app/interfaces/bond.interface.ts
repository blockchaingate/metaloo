// "_id": "64badd004ff72c6514903787",
// "symbol": "DNB",
// "__v": 0,
// "coupon_frequency": 1,
// "coupon_rate": 8,
// "description": "Digital National Bond is a digital bond issued by the government of El Salvador",
// "face_value": 100,
// "issue_price": 100,
// "issuer": "Government of El Salvador",
// "maturity": 10,
// "name": "Digital National Bond",
// "redemption_price": 100,
// "total_supply": 1000000

export interface Bond {
    // _id: string;
    symbol: string;
    coupon_frequency: number;
    coupon_rate: number;
    description: string;
    face_value: number;
    issue_price: number;
    issuer: string;
    maturity: number;
    name: string;
    redemption_price: number;
    total_supply: number;
}