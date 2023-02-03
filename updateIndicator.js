import History from "@ravenrebels/ravencoin-history-list";
import { getWallet } from "./getWallet";
 

export async function updateIndicator() {
  const wallet = await getWallet();
  const mempool = await wallet.getMempool();
  const indicator = document.querySelector(
    "wallet-transaction-ongoing-indicator"
  );

  const history = History.getHistory(mempool);
  indicator.innerHTML = "";
  history.map((transaction) => {
    transaction.assets.map((asset) => {
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
