import History from "@ravenrebels/ravencoin-history-list";
import { getTokenName } from "./getTokenName";
import { getWallet } from "./getWallet";

//When transaction in mempool is cleared, balance should be updated
//trigger an event if we go from "having" to "not having" something in mempool
let hasPendingTransactions = false;
export async function updateIndicator() {
  const wallet = await getWallet();
  const mempool = await wallet.getMempool();

  if (hasPendingTransactions === true && mempool.length === 0) {
    const event = new Event("transaction-cleared");
    // Dispatch the event.
    document.body.dispatchEvent(event);
  }
  hasPendingTransactions = mempool.length > 0;
  const indicator = document.querySelector(
    "wallet-transaction-ongoing-indicator"
  );

  if (!indicator) {
    console.log("no indicator element");
    return;
  }
  console.log("indicator", indicator);
  const history = History.getHistory(mempool);
  indicator.innerHTML = "";

  function isValid(asset) {
    if (!asset) {
      return false;
    }
    const name = asset.assetName;
    return name === "RVN" || name === getTokenName();
  }
  history.map((transaction) => {
    transaction.assets.map((asset) => {
      if (isValid(asset) === false) {
        return true;
      }
      const direction = transaction.isSent ? "Sending" : "Receiving";
      indicator.innerHTML += `<div aria-busy="true">${direction} ${Math.abs(
        asset.value
      )}  ${asset.assetName} </div>`;
    });
  });
  /*
    [
    {
        "address": "mfsWWNdbCDNXyUGP3cpGbFu8q9hHVzCtTA",
        "assetName": "LEMONADE",
        "txid": "1240d0fd044194f96da09c1db7afc6c322f727f9b06522f34b8612f118b551b4",
        "index": 0,
        "satoshis": 200000000,
        "timestamp": 1675438722
    }
]
*/

  return mempool;
}
