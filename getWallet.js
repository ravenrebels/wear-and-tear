import RavencoinWallet from "@ravenrebels/ravencoin-jswallet";
import { getMnemonic } from "./mnemonicHandler";

const mnemonic = getMnemonic();
//Singleton every, always returns the same
const promise = RavencoinWallet.createInstance({
  mnemonic,
  network: "rvn-test",
});

export async function getWallet() {
  return promise;
}
