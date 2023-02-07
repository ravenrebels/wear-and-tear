import { updateIndicator } from "./updateIndicator";

import { getWallet } from "./getWallet";

import "./customelements/Receive";
import "./customelements/Balance";
import "./customelements/Send";
import "./customelements/Words";

async function work() {
  const wallet = await getWallet();
  setInterval(updateIndicator, 5 * 1000);
  updateIndicator();
}

work();
