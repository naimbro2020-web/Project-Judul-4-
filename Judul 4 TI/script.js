// Ambil tempat untuk menampilkan data
const tempatData = document.getElementById('daftar-item');

// Nama kunci di LocalStorage
const STORAGE_KEY = 'dataSaya';

// Fungsi untuk mengambil data dari LocalStorage atau JSON default
function ambilData() {
    const dataTersimpan = localStorage.getItem(STORAGE_KEY);
    
    if (dataTersimpan) {
        // Kalau ada data tersimpan, pakai itu
        const data = JSON.parse(dataTersimpan);
        tampilkanData(data.items);
    } else {
        // Kalau belum ada, ambil dari data.json
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                tampilkanData(data.items);
                // Simpan ke LocalStorage
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            })
            .catch(error => console.error('Error:', error));
    }
}

// Tampilkan data ke layar
function tampilkanData(items) {
    tempatData.innerHTML = '';
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.nama}</h3>
            <p>${item.deskripsi}</p>
            <span class="kategori">${item.kategori}</span>
        `;
        tempatData.appendChild(card);
    });
}

// Fungsi untuk menambah item baru
function tambahItem(nama, deskripsi, kategori) {
    // Ambil data yang sudah ada
    const dataTersimpan = localStorage.getItem(STORAGE_KEY);
    let data;
    
    if (dataTersimpan) {
        data = JSON.parse(dataTersimpan);
    } else {
        // Kalau belum ada, ambil dari data.json dulu
        fetch('data.json')
            .then(response => response.json())
            .then(jsonData => {
                data = jsonData;
                tambahkan();
            })
            .catch(error => console.error('Error:', error));
        return;
    }
    
    function tambahkan() {
        // Tambah item baru
        data.items.push({
            nama: nama,
            deskripsi: deskripsi,
            kategori: kategori
        });
        
        // Simpan lagi ke LocalStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        
        // Tampilkan ulang
        tampilkanData(data.items);
    }
    
    if (data) tambahkan();
}

// Buat form sederhana untuk menambah data
function buatFormTambah() {
    const formContainer = document.createElement('div');
    formContainer.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 20px;
        margin-top: 30px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    
    formContainer.innerHTML = `
        <h2 style="margin-top:0;">➕ Tambah Item Baru</h2>
        <input type="text" id="inputNama" placeholder="Nama item" style="width:100%; padding:10px; margin:10px 0; border-radius:10px; border:1px solid #ddd;">
        <input type="text" id="inputDeskripsi" placeholder="Deskripsi" style="width:100%; padding:10px; margin:10px 0; border-radius:10px; border:1px solid #ddd;">
        <input type="text" id="inputKategori" placeholder="Kategori (contoh: Buku, Makanan, Film)" style="width:100%; padding:10px; margin:10px 0; border-radius:10px; border:1px solid #ddd;">
        <button id="btnTambah" style="background:#667eea; color:white; border:none; padding:10px 20px; border-radius:10px; cursor:pointer;">✨ Tambahkan</button>
    `;
    
    document.querySelector('.container').appendChild(formContainer);
    
    document.getElementById('btnTambah').addEventListener('click', () => {
        const nama = document.getElementById('inputNama').value;
        const deskripsi = document.getElementById('inputDeskripsi').value;
        const kategori = document.getElementById('inputKategori').value;
        
        if (nama && deskripsi && kategori) {
            tambahItem(nama, deskripsi, kategori);
            document.getElementById('inputNama').value = '';
            document.getElementById('inputDeskripsi').value = '';
            document.getElementById('inputKategori').value = '';
            alert('✅ Item berhasil ditambahkan!');
        } else {
            alert('⚠️ Semua kolom harus diisi!');
        }
    });
}

// Jalankan semua
ambilData();
buatFormTambah();