const KEY = "MNEMONIC";
import RavencoinKey from "@ravenrebels/ravencoin-key";

export function getMnemonic() {
  const defaultMnemonic =
    "fish divorce have gadget trip token furnace marine little learn sheriff insect";
  const m = localStorage.getItem(KEY);

  if (!m) {
    return defaultMnemonic;
  }
  return localStorage.getItem(KEY);
}

export function setMnemonic(mnemonic) {
  //Validate mnemonic
  const isValid = RavencoinKey.isMnemonicValid(mnemonic);

  if (isValid) {
    //Warn if user is over-writing existing mnemonic
    if (getMnemonic()) {
      const conf = confirm(
        "Do you really want to over-write your existing 12 words?"
      );
      if (conf) {
        localStorage.setItem(KEY, mnemonic);

        //Reload the app
        window.location.reload();
      }
    }
  }
}
