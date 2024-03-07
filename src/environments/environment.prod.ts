export const environment = {
  production: true,
  API: 'https://api.pay.cool/api/',
  GATEFI_API: 'https://api-sandbox.gatefi.com/onramp/v1/',
  GATEFI_PARTNER_ID: '0b9ddd1d-4c93-4d4c-a1aa-7d2051628f96',
  GATEFI_ACCESS_KEY: 'njlBEmLqRmYCtUphwBXFVOVsWvaZHuPO',
  COINPOOL_ADDRESS: '0x5932d8bf64067d31bf759e6e7f622c1d8da8707e',
  CHAINS: {
    ETH: {
      ID: 1,
      GAS_PRICE: 90,
      GAS_LIMIT: 200000,
      BOND_ADDRESS: '0x24344C80729E1D03F3B994aC7E2EE55b451287C3',
      ACCEPTED_TOKENS: [
        {
          ID: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          SYMBOL: 'USDT',
          DECIMALS: 6
        },
        {
          ID: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          SYMBOL: 'USDC',
          DECIMALS: 6
        },
      ]
    },
    BNB: {
      ID: 56,
      GAS_PRICE: 5,
      GAS_LIMIT: 200000,
      BOND_ADDRESS: '0x24344C80729E1D03F3B994aC7E2EE55b451287C3',
      ACCEPTED_TOKENS: [
        {
          ID: '0x55d398326f99059fF775485246999027B3197955',
          SYMBOL: 'USDT',
          DECIMALS: 18
        },
        {
          ID: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          SYMBOL: 'USDC',
          DECIMALS: 18
        }
      ]
    },
    KANBAN: {
      ID: 211,
      GAS_PRICE: 0.1,
      GAS_LIMIT: 20000000,
      BOND_ADDRESS: '0x649b20f352b1a58d9e8c9d57efb0da8c5f8903ad',
      ACCEPTED_TOKENS: [
        {
          ID: '196609',
          SYMBOL: 'USDT',
          DECIMALS: 18
        },
        {
          ID: '131074',
          SYMBOL: 'DUSD',
          DECIMALS: 18
        },
        {
          ID: '196632',
          SYMBOL: 'USDC',
          DECIMALS: 18
        }
      ]
    }
  },

  Is_Digital_Id_Project: true
};
