import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import WalletConnectProvider from "https://esm.sh/@walletconnect/ethereum-provider";
import { SiweMessage } from "https://esm.sh/siwe";

let provider;
let signer;

export async function connectWallet() {
  // MOBILE FIX: detect injected provider first
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
  } else {
    // WalletConnect fallback
    provider = new ethers.providers.Web3Provider(
      await WalletConnectProvider.init({
        projectId: "YOUR_PROJECT_ID", // walletconnect v2 project id
        chains: [1],
        showQrModal: true
      })
    );
    await provider.provider.enable();
  }

  signer = provider.getSigner();
  const address = await signer.getAddress();

  localStorage.setItem("walletConnected", "true");

  await signInWithEthereum(address);

  return { address, provider, signer };
}

async function signInWithEthereum(address) {
  const domain = window.location.host;
  const origin = window.location.origin;

  const message = new SiweMessage({
    domain,
    address,
    statement: "Sign in to Naïveté",
    uri: origin,
    version: "1",
    chainId: 1
  });

  const signature = await signer.signMessage(message.prepareMessage());

  localStorage.setItem("siwe", JSON.stringify({ message, signature }));
}

export async function autoReconnect() {
  if (!localStorage.getItem("walletConnected")) return null;

  try {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      const address = await signer.getAddress();
      return { address, provider, signer };
    }
  } catch {
    return null;
  }
}
