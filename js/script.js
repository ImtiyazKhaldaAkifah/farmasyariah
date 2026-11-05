// --- NAVIGASI ---
function openApp() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    window.scrollTo(0,0);
}

function closeApp() {
    document.getElementById('app-section').style.display = 'none';
    document.getElementById('landing-page').style.display = 'block';
    window.scrollTo(0,0);
}

function switchAppView(viewId, element) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    document.getElementById('app-view-' + viewId).classList.add('active');
    document.querySelectorAll('.dash-nav-item').forEach(n => n.classList.remove('active'));
    if(element) element.classList.add('active');
}

// --- FITUR SCAN ---
function startScan() {
    document.getElementById('scan-line').style.display = 'block';
    document.getElementById('scan-icon').className = 'fa-solid fa-spinner fa-spin';
    document.getElementById('scan-text').innerText = "Memproses barcode...";
    document.getElementById('btn-scan').style.display = 'none';

    setTimeout(() => {
        document.getElementById('scan-line').style.display = 'none';
        document.getElementById('scan-icon').className = 'fa-solid fa-barcode';
        document.getElementById('scan-icon').style.color = 'var(--sage-dark)';
        document.getElementById('scan-text').innerText = "Scan Berhasil!";
        document.getElementById('scan-result').style.display = 'block';
    }, 1500);
}

// --- FITUR RETUR ---
function requestRetur() {
    showToast('Pengajuan retur dikirim ke PBF!');
    
    // Tambah notif ke PBF
    document.getElementById('pbf-notif').style.display = 'block';
    
    const tbody = document.getElementById('pbf-table-body');
    document.getElementById('pbf-empty').style.display = 'none';
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>Apotek Sehat</td>
        <td><span class="badge badge-red">Retur Expired</span></td>
        <td>Paracetamol (5 Box) <br><span style="font-size:10px; color:var(--danger);">Exp: Des 2026</span></td>
        <td><span class="badge badge-yellow">Menunggu Review</span></td>
        <td><button class="btn-outline" onclick="alert('Retur disetujui! Barang akan dijemput.')">Setujui Retur</button></td>
    `;
    tbody.prepend(newRow);
}

// --- FITUR RESTOCK KE PBF ---
function openRestockModal(obat) {
    document.getElementById('modal-obat').value = obat;
    openModal('modal-restock');
}

function submitRestock() {
    const obat = document.getElementById('modal-obat').value;
    const jumlah = document.getElementById('modal-jumlah').value;
    
    closeModal('modal-restock');
    showToast('Pesanan terkirim ke PBF!');

    // 1. Tandai notif merah di menu PBF
    document.getElementById('pbf-notif').style.display = 'block';
    
    // 2. Tambah baris ke tabel PBF
    const tbody = document.getElementById('pbf-table-body');
    document.getElementById('pbf-empty').style.display = 'none';
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>Apotek Sehat</td>
        <td><span class="badge badge-blue">Restock Syariah</span></td>
        <td>${obat} (${jumlah} Box)</td>
        <td><span class="badge badge-yellow">Perlu Dikirim</span></td>
        <td><button class="btn-aesthetic" onclick="processOrder(this)">Proses & Kirim</button></td>
    `;
    tbody.prepend(newRow);

    // 3. Pindah ke halaman Financing untuk lihat jadwal
    switchAppView('financing', document.querySelectorAll('.dash-nav-item')[2]);
}

// --- PBF PROSES PESANAN ---
function processOrder(btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading';
    btn.disabled = true;
    
    setTimeout(() => {
        const row = btn.closest('tr');
        const badge = row.querySelector('.badge-yellow');
        badge.className = 'badge badge-green';
        badge.innerText = 'Sudah Dikirim';
        btn.style.display = 'none';
        
        // Hapus notif
        document.getElementById('pbf-notif').style.display = 'none';
        showToast('Barang berhasil dikirim ke Apotek!');
    }, 1500);
}

// --- MODAL & TOAST ---
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').innerText = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}
