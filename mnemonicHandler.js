const KEY = "MNEMONIC";
import RavencoinKey from "@ravenrebels/ravencoin-key";
//Example  "fish divorce have gadget trip token furnace marine little learn sheriff insect";
//Example few seminar drill peace insect object say parrot point forest also cotton
export function getMnemonic() {
  const m = localStorage.getItem(KEY);

  if (!m) {
    const newWords = RavencoinKey.generateMnemonic();
    localStorage.setItem(KEY, newWords);
    return newWords;
  }
  return localStorage.getItem(KEY);
}

export function setMnemonic(mnemonic) {
  //Validate mnemonic
  const isValid = RavencoinKey.isMnemonicValid(mnemonic);

  if (isValid) {
    //Warn if user is over-writing existing mnemonic
    if (getMnemonic() !== mnemonic) {
      const conf = confirm(
        "Do you really want to over-write your existing 12 words?"
      );
      if (conf) {
        localStorage.setItem(KEY, mnemonic);

        //Reload the app
        window.location.reload();
      }
    }
  } else {
    alert(mnemonic + " does not seem to be valid");
  }
}
