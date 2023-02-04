import { updateIndicator } from "./updateIndicator";

import { getWallet } from "./getWallet";

import "./Receive";
import "./Balance";
import "./Send";

async function work() {
  const wallet = await getWallet();

  setInterval(updateIndicator, 5 * 1000);

  updateIndicator();
}

work();
