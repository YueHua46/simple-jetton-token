import { mnemonicToPrivateKey } from "@ton/crypto";
import { TonClient, WalletContractV3R2, WalletContractV4 } from "@ton/ton";
import dotenv from "dotenv";
dotenv.config();

export async function prepareClientWalletSender() {
  const tonCenterRPCURL = process.env.TON_CENTER_RPC_URL || "";
  const client = new TonClient({
    endpoint: tonCenterRPCURL,
  });
  const mnemonics = process.env.TON_MNEMONIC || "";
  const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  });
  console.log('wallet', wallet)
  const walletContract = client.open(wallet);
  const sender = walletContract.sender(keyPair.secretKey);
  return { client, wallet, sender };
}
