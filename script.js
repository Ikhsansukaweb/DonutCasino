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

    if (!email || !user || !pass) {
        return alert("Woi! Isi semua kolomnya dulu.");
    }

    btn.innerText = "Sabar, lagi daftar...";
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
            body: JSON.stringify({
                email: email,
                username: user,
                password: pass
            })
        });

        if (response.ok) {
            alert("Pendaftaran Berhasil! Sekarang silakan Login.");
            window.location.href = "login.html";
        } else {
            const errorText = await response.text();
            console.error(errorText);
            alert("Gagal Daftar! Cek lagi apakah Email/Username sudah dipakai.");
        }
    } catch (err) {
        alert("Error: Gagal konek ke internet atau database.");
    } finally {
        btn.innerText = "DAFTAR SEKARANG";
        btn.disabled = false;
    }
}

// --- FUNGSI LOGIN ---
async function handleLogin() {
    const email = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const btn = document.getElementById('btn-login');

    if (!email || !pass) return alert("Email dan Password jangan dikosongin!");

    btn.innerText = "Lagi masuk...";
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
            localStorage.setItem('donutsmp_user', data[0].username);
            alert("Login Sukses! Gaspol.");
            window.location.href = "index.html";
        } else {
            alert("Email atau Password salah, cek lagi kawan!");
        }
    } catch (err) {
        alert("Ada gangguan koneksi!");
    } finally {
        btn.innerText = "MASUK SEKARANG";
        btn.disabled = false;
    }
}
