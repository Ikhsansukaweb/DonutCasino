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
  
                const SUPABASE_URL = "https://alpiwaraxijqguwunroa.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFscGl3YXJheGlqcWd1d3Vucm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MjY2MjMsImV4cCI6MjA4OTQwMjYyM30.WBaZGe4bEOcKdUXHEUe9nCtgfGO_ego6j0IfTcpiPY0";

// --- FUNGSI DAFTAR ---
async function handleRegister() {
    const email = document.getElementById('reg-email').value;
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;
    const btn = document.getElementById('btn-reg');

    if (!email || !user || !pass) return alert("Isi semua data dulu, Bos!");

    btn.innerText = "Proses Daftar...";
    btn.disabled = true;

    try {
        const response = await fetch(`${SUPABASE_URL}/users`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ email: email, username: user, password: pass })
        });

        if (response.ok) {
            alert("Pendaftaran Sukses! Silakan login.");
            window.location.href = "login.html";
        } else {
            alert("Gagal daftar. Email atau Username mungkin sudah terpakai.");
        }
    } catch (err) {
        alert("Terjadi kesalahan koneksi.");
    } finally {
        btn.innerText = "DAFTAR SEKARANG";
        btn.disabled = false;
    }
}

// --- FUNGSI LOGIN ---
async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    const btn = document.getElementById('btn-login');

    if (!email || !pass) return alert("Email & Password wajib diisi!");

    btn.innerText = "Mengecek Akun...";
    btn.disabled = true;

    try {
        const response = await fetch(`${SUPABASE_URL}/users?email=eq.${email}&password=eq.${pass}`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        const data = await response.json();

        if (data && data.length > 0) {
            // SIMPAN DATA KE STORAGE (PENTING!)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', data[0].email);
            localStorage.setItem('userIGN', data[0].username); // Ini Username Minecraft-nya

            alert("Login Sukses! Mengalihkan...");
            window.location.href = "index.html"; // Langsung ke dashboard
        } else {
            alert("Email atau Password salah!");
        }
    } catch (err) {
        alert("Koneksi gagal!");
    } finally {
        btn.innerText = "MASUK SEKARANG";
        btn.disabled = false;
    }
}
// --- FUNGSI TAMPILKAN DATA DI INDEX ---
function displayUserData() {
    // Cek apakah user sudah login
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userIGN = localStorage.getItem('userIGN');

    if (isLoggedIn !== 'true') {
        // Jika belum login, tendang balik ke login.html
        window.location.href = "login.html";
        return;
    }

    // Tampilkan Nama di Dashboard (Jika ada elemen dengan id="display-name")
    const nameElement = document.getElementById('user-name'); 
    if (nameElement) {
        nameElement.innerText = userIGN;
    }

    // Panggil fungsi ambil saldo dari database balances
    loadUserBalance(userIGN);
}

// Fungsi Ambil Saldo Real-time dari Supabase
async function loadUserBalance(username) {
    try {
        const response = await fetch(`${SUPABASE_URL}/balances?username=eq.${username}`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        const data = await response.json();
        if (data.length > 0) {
            document.getElementById('balance').innerText = data[0].koin_balance.toLocaleString();
        }
    } catch (err) {
        console.log("Gagal memuat saldo");
    }
}

// Jalankan pengecekan setiap kali halaman dimuat
window.onload = function() {
    // Jika kita berada di halaman index.html
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        displayUserData();
    }
};

// Fungsi Logout
function handleLogout() {
    localStorage.clear(); // Hapus semua data login
    window.location.href = "login.html";
                }
