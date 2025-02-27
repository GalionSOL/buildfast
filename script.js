function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

document.getElementById('connect-wallet').addEventListener('click', () => {
  alert('Connecting Phantom Wallet... (Mock)');
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