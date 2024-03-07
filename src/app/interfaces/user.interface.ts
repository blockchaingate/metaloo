export interface User {
    _id: string;
    id: number;
    email: string;
    level1_referral_count: number;
    level2_referral_count: number;
    referral_code: string;
    registerPlatform: string;
    role: string;
    created_at: string;
    kyc_level: number;
    isEmailVerified: boolean;
}