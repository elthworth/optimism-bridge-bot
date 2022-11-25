export type ConfigPerTokenParam = {
  address: string;
  optimismWallet: string;
  ratePerDay: number;
};

export type ConfigParams = ConfigPerTokenParam[];

export type TokenListItem = {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  logoURI: string;
  extensions: {
    optimismBridgeAddress: string;
  };
};
