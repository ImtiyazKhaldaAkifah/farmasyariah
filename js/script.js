        // --- SET TANGGAL OTOMATIS ---
        document.addEventListener('DOMContentLoaded', () => {
            const opsiTanggal = { day: 'numeric', month: 'long', year: 'numeric' };
            const hariIni = new Date();
            document.getElementById('tanggal-otomatis').innerText = hariIni.toLocaleDateString('id-ID', opsiTanggal);

            const tglExpired = new Date(hariIni);
            tglExpired.setMonth(hariIni.getMonth() + 3);

            const opsiExpired = { month: 'long', year: 'numeric' };
            const teksExpired = tglExpired.toLocaleDateString('id-ID', opsiExpired);

            document.getElementById('info-expired').innerText = `${teksExpired} (3 Bulan Lagi)`;
        });

        // --- FUNGSI UNTUK UBAH LABEL FORM SAAT DROPDOWN DIGANTI ---
        function updateFormLabels() {
            const role = document.getElementById('input-role').value;
            const labelUser = document.getElementById('label-nama-user');
            const labelInst = document.getElementById('label-nama-inst');
            const inputUser = document.getElementById('input-nama-user');
            const inputInst = document.getElementById('input-nama-inst');

            if (role === 'pbf') {
                labelUser.innerText = "Nama Admin / PIC PBF";
                labelInst.innerText = "Nama Perusahaan PBF (PT)";
                inputUser.value = "Admin PBF";
                inputInst.value = "PT Kimia Farma Trading";
            } else {
                labelUser.innerText = "Nama Pengguna / Apoteker";
                labelInst.innerText = "Nama Apotek";
                inputUser.value = "Apoteker Imtiyaz";
                inputInst.value = "Apotek Sehat Sejahtera";
            }
        }

        // --- NAVIGASI ---
        function openApp() {
            document.getElementById('landing-page').style.display = 'none';
            document.getElementById('login-screen').style.display = 'flex';
            document.getElementById('app-section').style.display = 'none';
            window.scrollTo(0,0);
        }

        function closeApp() {
            document.getElementById('app-section').style.display = 'none';
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('landing-page').style.display = 'block';
            window.scrollTo(0,0);
        }

        // --- LOGIKA LOGIN ---
        function handleLogin() {
            const role = document.getElementById('input-role').value;
            const namaUser = document.getElementById('input-nama-user').value;
            const namaInst = document.getElementById('input-nama-inst').value;

            document.getElementById('pbf-nama-apotek').innerText = namaInst;
            document.getElementById('akad-nama-apotek').innerText = namaInst.toUpperCase();

            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app-section').style.display = 'block';

            if (role === 'apotek') {
                document.getElementById('menu-apotek').style.display = 'block';
                document.getElementById('menu-pbf').style.display = 'none';
                switchAppView('scan', document.querySelector('#menu-apotek .dash-nav-item'));
                showToast(`Berhasil masuk sebagai ${namaUser}`);
            } else {
                document.getElementById('menu-apotek').style.display = 'none';
                document.getElementById('menu-pbf').style.display = 'block';
                switchAppView('pbf', document.querySelector('#menu-pbf .dash-nav-item'));
                showToast(`Berhasil masuk sebagai ${namaInst}`);
            }
        }

        function logout() {
            document.getElementById('app-section').style.display = 'none';
            document.getElementById('login-screen').style.display = 'flex';
            document.getElementById('input-role').value = "apotek";
            updateFormLabels();
            window.scrollTo(0,0);
        }

        // --- NAVIGASI DALAM DASHBOARD ---
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
                document.getElementById('btn-scan').style.display = 'inline-block';
            }, 1500);
        }

        // --- MODAL & AKAD ---
        function openAkad() {
            document.getElementById('modal-akad').classList.add('active');
            document.getElementById('signature-area').style.display = 'block';
            document.getElementById('signed-area').style.display = 'none';
        }

        function closeModal(id) { document.getElementById(id).classList.remove('active'); }

        function signAkad() {
            document.getElementById('signature-area').style.display = 'none';
            document.getElementById('signed-area').style.display = 'block';
            showToast('Akad Murabahah Berhasil Ditandatangani!');
        }

        // --- TOAST ---
        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').innerText = message;
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 3000);
        }
