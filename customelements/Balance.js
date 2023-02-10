import { getTokenName } from "../getTokenName";
import { getWallet } from "../getWallet";
import RavencoinReader from "@ravenrebels/ravencoin-reader";

class Balance extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `<article>
    <h2 id="title" aria-busy="true">Loading...</h2>
    </article>`;

    //In case of transaction, update balance

    const up = () => {
      this.update();
    };
    document.body.addEventListener("transaction-cleared", up);
    document.title = getTokenName();
    this.update();
  }
  async update() {
    const wallet = await getWallet();
    const rvnBalance = await wallet.getBalance();
    const assets = await wallet.getAssets();

    const asset = assets.find((asset) => asset.assetName === getTokenName());
    const amount = asset ? asset.balance / 1e8 : 0;
    const imageURL = await getImageURL();
    const template = ` 
                <article>
                    <img 
                        alt="" 
                        id="logo" 
                        loading="lazy"
                        src="${imageURL}"/> 
                     <h2 id="title">${getTokenName()}</h2>
                    <h1 class="box" id="balance__asset">
                    ${amount} 
                    </h1>
                    <div style="font-size: 60%">RVN 
                    <span id="balance__rvn">
                    ${rvnBalance}
                    </span>
                    </div>
                </article>
  `;
    console.log("Balance update and this is", this);
    this.innerHTML = template;

    //Add click listener to image
    this.querySelector("img").addEventListener("click", async () => {
      const data = await RavencoinReader.getAsset(getTokenName());
      if (data.ipfs_hash) {
        window.open(
          "https://cloudflare-ipfs.com/ipfs/" + data.ipfs_hash
        );
      }
    });
  }
}

async function getImageURL() {
  //mainnet and testnet images need different "thumbnail" services
  const urls = {
    rvn: "https://rvn-explorer-mainnet.ting.finance/thumbnail?",
    "rvn-test": "https://testnet.ting.finance/thumbnail?",
  };
  const wallet = await getWallet();
  const network = wallet.network;
  const baseURL = urls[network];

  const assetName = getTokenName();

  const params = new URLSearchParams();
  params.set("assetName", assetName);
  return baseURL + params.toString();
}

customElements.define("rr-balance", Balance);
