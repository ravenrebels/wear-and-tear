import RavencoinWallet from "@ravenrebels/ravencoin-jswallet";
import { getMnemonic } from "./mnemonicHandler";

const mnemonic = getMnemonic();
//Singleton every, always returns the same promise
const promise = RavencoinWallet.createInstance({
  mnemonic,
  network: "rvn",
});

export async function getWallet() {
  return promise;
}
