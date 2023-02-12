# wear-and-tear
A simple web wallet for Ravencoin tokens/assets

The wallet is meant to be used as an on-ramp or drop-off, meaning that this wallet is NOT used for long term storage.

It is highly experimental: When transfering assets the wallet uses RPC to communicate with a Ravencoin node and the wallet exposes the private keys to the node to be able to sign transactions. This is not safe.
It works OK if you just send someone a BEER token, and the user later transfers the BEER token to his or her real Ravencoin wallet.

## Use case

### Quickly distribute tokens at a conference
Bob attends a conference and he wants to be able to send LEMONADE tokens to people he meet.
Bob hosts this wallet on is site www.bob.com/wallet?asset=LEMONADE.

Here comes the happy flow: 
* Bob wants to send a LEMONADE token to Alice, Alice has never heard about Ravencoin before.
* Bob shows Alice a QR code with the link to his web wallet.
* Alice opens the link on your smartphone.
* Alice shows her receive QR code for Bob.
* Bob transfers a LEMONADE token to Alice and a small amount of RVN so Alice can transfer her token later.
* DONE
* Alice can now sit down, have a cup of coffee, install a real any Ravencoin wallet on her smartphone and transfer the LEMONADE token to her self.
At the end of this story, Alice is no longer holding any tokens in the hot wear-and-tear wallet, her tokens are safe in her real wallet.


Bob wants to be able to send tokens to folks he meet.
Bob talks to Alice
- Bob owns the asset LEMONADE on Ravencoin, he is attending a conference and want to be able to transfer LEMONADE tokens to any nice person he meats.
Bob only needs to show a QR code (with the URL to the site where Bob hosts this wallet), the person opens sen


## Purpose of this app
This web application is built as a demo, as a proof of concept, showing how to use 
@ravenrebels/ravencoin-jswallet


## How to install and build
- Clone the git repository
- change directory to wear-and-tear (the repo)
- run `npm install` to install dependencies
- run `npm run build` to build the web app
- run `npm start` to start a local server
