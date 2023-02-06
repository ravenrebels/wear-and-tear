import { getTokenName } from "./getTokenName";
import { getWallet } from "./getWallet";

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
    this.update();
  }
  async update() {
    const wallet = await getWallet();
    const rvnBalance = await wallet.getBalance();
    const assets = await wallet.getAssets();

    const asset = assets.find((asset) => asset.assetName === getTokenName());
    const amount = asset ? asset.balance / 1e8 : 0;

    const template = ` 
                <article>
                    <img 
                        alt="" 
                        id="logo" 
                        loading="lazy"
                        src="${getImageURL()}"/> 
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
  }
}

function getImageURL() {
  const assetName = getTokenName();
  const baseURL = "https://testnet.ting.finance/thumbnail?";
  const params = new URLSearchParams();
  params.set("assetName", assetName);
  return baseURL + params.toString();
}

customElements.define("rr-balance", Balance);
