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
  
// Konfigurasi Supabase Baru dari Tuan Derr
const SUPABASE_URL = "https://alpiwaraxijqguwunroa.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFscGl3YXJheGlqcWd1d3Vucm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MjY2MjMsImV4cCI6MjA4OTQwMjYyM30.WBaZGe4bEOcKdUXHEUe9nCtgfGO_ego6j0IfTcpiPY0";

async function handleLogin() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const btn = document.getElementById('btn-login');

    if (!user || !pass) return alert("Woi, isi dulu username sama passwordnya!");

    btn.innerText = "Sabar, lagi dicek...";
    btn.disabled = true;

    try {
        // Mencocokkan username dan password di tabel 'users'
        const response = await fetch(`${SUPABASE_URL}/users?username=eq.${user}&password=eq.${pass}`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.length > 0) {
            // LOGIN BERHASIL
            localStorage.setItem('donutsmp_user', user);
            alert("Login Berhasil! Selamat datang, " + user);
            window.location.href = "index.html"; // Pindah ke menu game
        } else {
            // LOGIN GAGAL
            alert("Username atau Password salah, Tuan!");
            btn.innerText = "MASUK SEKARANG";
            btn.disabled = false;
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Waduh, gagal konek ke database Supabase!");
        btn.innerText = "COBA LAGI";
        btn.disabled = false;
    }
}

// Fungsi untuk ambil saldo pemain yang sedang login
async function loadBalance() {
    const user = localStorage.getItem('donutsmp_user');
    const balanceElement = document.getElementById('balance');
    
    if (!user || !balanceElement) return;

    try {
        const response = await fetch(`${SUPABASE_URL}/balances?username=eq.${user}`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        const data = await response.json();
        
        if (data.length > 0) {
            let saldo = data[0].koin_balance || 0;
            balanceElement.innerText = saldo.toLocaleString();
        }
    } catch (error) {
        console.log("Gagal ambil saldo");
    }
}

// Jalankan pengecekan saldo otomatis saat halaman index terbuka
window.onload = () => {
    if (document.getElementById('balance')) {
        loadBalance();
    }
};
                
