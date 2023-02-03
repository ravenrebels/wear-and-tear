import { getWallet } from "./getWallet";
import { getTokenName } from "./getTokenName";
import { getty, updateDOM } from "./utils";

export async function updateBalance() {
  const wallet = await getWallet();
  const rvnBalance = await wallet.getBalance();
  const assets = await wallet.getAssets();

  const asset = assets.find((asset) => asset.assetName === getTokenName());
  const amount = asset ? asset.balance / 1e8 : 0;
  updateDOM("balance__asset", amount);

  getty("balance__rvn").innerHTML = rvnBalance;
}
