import { getTokenName } from "./getTokenName";
import { getWallet } from "./getWallet";
import { getty } from "./utils";
const asset = getTokenName();

class Send extends HTMLElement {
  async connectedCallback() {
    const wallet = await getWallet();
    const listener = createSubmitListener(wallet);
    this.innerHTML = `<article>
      <h4>Pay / Send</h4>
      <form>
      <input type="text" id="send__input" />
      <button id="sendButton">Send one ${asset}</button>
      </form>
      </article>`;

    this.querySelector("form").addEventListener("submit", listener);
  }
}

function createSubmitListener(wallet) {
  const listener = (event) => {
    event.preventDefault();

    const toAddress = getty("send__input").value;
    const sendRequest = {
      toAddress,
      assetName: getTokenName(),
      amount: 1,
    };
    const promise = wallet.send(sendRequest);
    promise.then((a) => {
      openDialog("Token sent", "One " + getTokenName() + " is on its way");
      getty("send__input").value = "";
      scrollToTop();
    });
    promise.catch((error) => {
      console.log("sending and error is", error);
      openDialog("Something went wrong ", error + "");
    });

    return false;
  };
  return listener;
}

function openDialog(title, body) {
  const dialog = document.querySelector("dialog");
  dialog.removeAttribute("close");
  dialog.setAttribute("open", true);

  dialog.querySelector(".dialog__header").innerHTML = title;
  dialog.querySelector(".dialog__body").innerHTML = body;
  console.log("Setting", title, body);

  dialog.addEventListener("click", () => {
    dialog.removeAttribute("open");
  });
}

function scrollToTop() {
  try {
    document.body.scrollTop = 0; // For Safari
  } catch (e) {}

  try {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } catch (e) {}
}

customElements.define("rr-send", Send);
