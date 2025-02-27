const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = solanaWeb3;

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

let walletConnected = false;
let publicKey;

document.getElementById('connect-wallet').addEventListener('click', async () => {
  if (window.solana && window.solana.isPhantom) {
    try {
      const resp = await window.solana.connect();
      publicKey = resp.publicKey; // Already a PublicKey object
      walletConnected = true;
      console.log('Connected:', publicKey.toString());
      alert('Connected: ' + publicKey.toString());
    } catch (err) {
      console.error('Connect failed:', err);
      alert('Failed to connect wallet: ' + err.message);
    }
  } else {
    alert('Please install Phantom Wallet!');
  }
});

async function mintNFT() {
  if (!walletConnected || !publicKey) {
    alert('Please connect your wallet first!');
    return;
  }

  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const projectKey = new PublicKey('5YTG39q61XTnsTWGcj7gAXfrcuoFjvb78yCNRE7NvNEs'); // Your wallet
  const amount = 1;
  const price = 0.1 * LAMPORTS_PER_SOL; // 0.1 SOL (1 SOL too high for devnet airdrop)

  try {
    console.log('Minting started...');
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: projectKey,
        lamports: price,
      })
    );

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;

    console.log('Signing transaction...');
    const signed = await window.solana.signTransaction(transaction);
    console.log('Sending transaction...');
    const signature = await connection.sendRawTransaction(signed.serialize());
    console.log('Confirming transaction...');
    await connection.confirmTransaction(signature);

    alert('Minted 1 NFT! Signature: ' + signature);
    console.log('Mint success:', signature);
  } catch (err) {
    console.error('Mint failed:', err);
    alert('Mint failed: ' + err.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const mintButton = document.querySelector('#project-detail .action-btn');
  if (mintButton) {
    mintButton.textContent = 'Mint NFTs (0.1 SOL)'; // Update button text
    mintButton.addEventListener('click', mintNFT);
    console.log('Mint button initialized');
  } else {
    console.error('Mint button not found!');
  }
});
