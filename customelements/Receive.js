import { getWallet } from "../getWallet";

class Receive extends HTMLElement {
  async connectedCallback() {
    this.innerHTML =
      "<article><h4 aria-busy='true'>Creating QR code...</h4></article>";
    this.update();
    //Get new receive address eatch time the wallet is opened
    setInterval(this.update, 60 * 1000);
  }
  async update() {
    this.wallet = await getWallet();
    const addy = await this.wallet.getReceiveAddress();
    this.innerHTML = getHTML(addy);
    const copy = (event) => {
      event.preventDefault();
      navigator.clipboard.writeText(addy);

      copyButton.innerHTML = `<i style="font-size: 150%" class="fas fa-smile"></i>`;
      setTimeout(() => {
        copyButton.innerHTML = "Copy";
      }, 2000);
    };
    const copyButton = document.getElementById("receive__copy");
    copyButton.addEventListener("click", copy);
  }
}

function getHTML(addy) {
  return `
<article>
    <h4>Receive</h4> 
    <img 
        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${addy}"
        alt="Receive address" /> 
    <div id="receive__address">${addy}</div>
    <a href="#" role="button" id="receive__copy">Copy</a>
</article>
  `;
}
customElements.define("rr-receive", Receive);
