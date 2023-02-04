import { updateIndicator } from "./updateIndicator";
import { updateReceive } from "./updateReceive";
import { getWallet } from "./getWallet";
import { getTokenName } from "./getTokenName";
import { updateBalance } from "./updateBalance";
import { getty, updateDOM } from "./utils";

async function work() {
  const wallet = await getWallet();
  updateGUIWithCorrectAssetName();
  setLogo();

  setInterval(updateIndicator, 5 * 1000);
  setInterval(updateBalance, 10 * 1000);
  setInterval(updateReceive, 5 * 60 * 1000);
  updateReceive();
  updateBalance();
  updateIndicator();

  document
    .querySelector("form")
    .addEventListener("submit", createSubmitListener());

  //In case of transaction, update balance
  document.body.addEventListener("transaction-cleared", updateBalance);

  //Handle save mnemonic button
  getty("saveMnemonicButton").addEventListener("click", function (event) {
    alert("Should save");
  });

  function createSubmitListener() {
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
    };
    return listener;
  }
}

work();

function updateGUIWithCorrectAssetName() {
  updateDOM("title", getTokenName());
  getty("sendButton").innerText = "Send one " + getTokenName();
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

function setLogo() {
  const logo = getty("logo");
  const baseURL = "https://testnet.ting.finance/thumbnail";
  const searchParams = new URLSearchParams("?");
  searchParams.set("assetName", getTokenName());
  const URL = baseURL + "?" + searchParams.toString();
  logo.setAttribute("src", URL);
}
