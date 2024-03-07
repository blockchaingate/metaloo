// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API: 'https://api.pay.cool/api/',
  API: 'https://testapi.fundark.com/api/',
  // API: 'http://localhost:3000/api/',
  GATEFI_API: 'https://api-sandbox.gatefi.com/onramp/v1/',
  GATEFI_PARTNER_ID: '0b9ddd1d-4c93-4d4c-a1aa-7d2051628f96',
  GATEFI_ACCESS_KEY: 'njlBEmLqRmYCtUphwBXFVOVsWvaZHuPO',
  COINPOOL_ADDRESS: '0x8d65fc45de848e650490f1ffcd51c6baf52ea595',
  CHAINS: {
    ETH: {
      ID: 5,
      GAS_PRICE: 10,
      GAS_LIMIT: 200000,
      BOND_ADDRESS: '0x4a22a0733711329c374deb2e2f7d743f791a753b',
      ACCEPTED_TOKENS: [
        {
          ID: '0x3908eaeeb2aee3f5fccbb01b35596a9acae87f7d',
          SYMBOL: 'USDT',
          DECIMALS: 6
        }
      ]
    },
    BNB: {
      ID: 97,
      GAS_PRICE: 10,
      GAS_LIMIT: 200000,
      BOND_ADDRESS: '0x52c9c3c5f9d0bbc36f07382a3fe15f514dba7c41',
      ACCEPTED_TOKENS: [
        {
          ID: '0x4db5d28f758d32d8294389f30289d4413e1aef8c',
          SYMBOL: 'USDT',
          DECIMALS: 6
        }
      ]
    },
    KANBAN: {
      ID: 212,
      GAS_PRICE: 0.1,
      GAS_LIMIT: 20000000,
      BOND_ADDRESS: '0xfad8e1268ad45aa4da92574954cf4280b2ea2969',
      ACCEPTED_TOKENS: [
        {
          ID: '0x346a5afa3497d6d0718a056605c11b6cc316f321',
          SYMBOL: 'USDT',
          DECIMALS: 6
        },
        {
          ID: '0xd460fc433493e744e28210a0e3dc71896eb25774',
          SYMBOL: 'USDC',
          DECIMALS: 6
        }
      ]
    }
  },
  Is_Digital_Id_Project: true

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.