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
      publicKey = new PublicKey(resp.publicKey.toString());
      walletConnected = true;
      alert('Connected: ' + publicKey.toString());
    } catch (err) {
      alert('Failed to connect wallet: ' + err.message);
    }
  } else {
    alert('Please install Phantom Wallet!');
  }
});

document.getElementById('launch-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Minting Project... (Mock)');
  showScreen('homepage');
});

document.getElementById('vote-yes').addEventListener('click', () => {
  alert('Voted Yes! (Mock)');
});

document.getElementById('vote-no').addEventListener('click', () => {
  alert('Voted No! (Mock)');
});

document.getElementById('profile-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Profile Updated! (Mock)');
});

async function mintNFT() {
  if (!walletConnected || !publicKey) {
    alert('Please connect your wallet first!');
    return;
  }

  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const programId = new PublicKey('BFST111111111111111111111111111111111111'); // Mock
  const projectKey = new PublicKey('5YTG39q61XTnsTWGcj7gAXfrcuoFjvb78yCNRE7NvNEs'); // Your wallet
  const amount = 1;
  const price = 5 * LAMPORTS_PER_SOL;

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
    await connection.confirmTransaction(signature);

    alert('Minted 1 NFT! Signature: ' + signature);
  } catch (err) {
    alert('Mint failed: ' + err.message);
    console.error(err);
  }
}

// Wait for DOM to load, then attach listener
document.addEventListener('DOMContentLoaded', () => {
  const mintButton = document.querySelector('#project-detail .action-btn');
  if (mintButton) {
    mintButton.addEventListener('click', mintNFT);
  } else {
    console.error('Mint button not found!');
  }
});
