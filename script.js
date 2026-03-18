// Simulasi Saldo Awal
let currentBalance = 0;

// Fungsi saat game diklik
function playGame(gameName) {
    console.log("Membuka game: " + gameName);
    alert("Maaf Tuan Derr, Game " + gameName + " sedang dalam tahap pengembangan!");
}

// Simulasi Update Saldo (Nanti bisa disambungkan ke Supabase kamu)
function updateUIBalance(amount) {
    const balanceElement = document.getElementById('balance');
    currentBalance = amount;
    balanceElement.innerText = currentBalance.toLocaleString();
}

// Contoh penggunaan: Set saldo ke 50,000 koin
updateUIBalance(50000);

// Efek sederhana saat hover kartu
const cards = document.querySelectorAll('.game-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        console.log("Pilih game...");
    });
});
  
