import RavencoinWallet from "@ravenrebels/ravencoin-jswallet";

//Singleton every, always returns the same
const promise = RavencoinWallet.createInstance({
  mnemonic:
    "fish divorce have gadget trip token furnace marine little learn sheriff insect",
  network: "rvn-test",
});

export async function getWallet() {
  return promise;
}
