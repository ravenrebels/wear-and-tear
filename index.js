import { updateIndicator } from "./updateIndicator";
import { getWallet } from "./getWallet";
import { getTokenName } from "./getTokenName";
import { updateBalance } from "./updateBalance";
import { getty, updateDOM } from "./utils";

async function work() {
  const wallet = await getWallet();
  updateGUIWithCorrectAssetName();

  setInterval(updateBalance, 10 * 1000);
  setInterval(updateReceive, 5 * 60 * 1000);
  updateIndicator();
  //Check for mempool transactions

  setInterval(updateIndicator, 5 * 1000);

  //Wait for udpateBalacne and updateReceive to get ready
  await Promise.all([updateBalance(), updateReceive()]);

  activateApp();

  document
    .querySelector("form")
    .addEventListener("submit", createSubmitListener());

  async function updateReceive() {
    const addy = await wallet.getReceiveAddress();
    updateDOM("receive__address", addy);

    const imageURL =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + addy;
    getty("receive__qr").setAttribute("src", imageURL);
    return addy;
  }

  function createSubmitListener() {
    const listener = (event) => {
      event.preventDefault();

      const toAddress = getty("send__input").value;
      const sendRequest = {
        toAddress,
        assetName: "LEMONADE",
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

function activateApp() {
  getty("intro").style.display = "none";
  getty("app").style.display = "block";
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
