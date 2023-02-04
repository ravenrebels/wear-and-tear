import { getWallet } from "./getWallet";
import { updateDOM } from "./utils";

export async function updateReceive() {
  const wallet = await getWallet();
  updateDOM("receive__address", addy);

  const imageURL =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + addy;
  getty("receive__qr").setAttribute("src", imageURL);
  return addy;
}
