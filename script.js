// Script logic for Sahabat Tiket Landing Page

document.addEventListener('DOMContentLoaded', () => {
    initSearchForm();
    initMobileMenu();
    initFAQAccordion();
    initNavbarScroll();
});

let currentCategory = 'pesawat';

// City & Port presets per category
const locationPresets = {
    pesawat: {
        labelOrigin: 'Kota Asal / Bandara',
        labelDest: 'Kota Tujuan / Bandara',
        iconDest: 'fa-plane-arrival',
        labelPassenger: 'Jumlah Penumpang',
        origins: ['Jakarta (CGK)', 'Surabaya (SUB)', 'Kendari (KDI)', 'Makassar (UPG)', 'Balikpapan (BPN)', 'Medan (KNO)'],
        dests: ['Surabaya (SUB)', 'Jakarta (CGK)', 'Makassar (UPG)', 'Bali (DPS)', 'Yogyakarta (YIA)', 'Kendari (KDI)']
    },
    kereta: {
        labelOrigin: 'Stasiun Keberangkatan',
        labelDest: 'Stasiun Tujuan',
        iconDest: 'fa-train-subway',
        labelPassenger: 'Jumlah Penumpang',
        origins: ['Jakarta - Gambir (GMR)', 'Jakarta - Pasar Senen (PSE)', 'Surabaya - Gubeng (SGU)', 'Bandung (BD)', 'Yogyakarta (YK)'],
        dests: ['Surabaya - Pasarturi (SBI)', 'Yogyakarta (YK)', 'Semarang - Tawang (SMT)', 'Solo - Balapan (SLO)', 'Malang (ML)']
    },
    pelni: {
        labelOrigin: 'Pelabuhan Asal',
        labelDest: 'Pelabuhan Tujuan',
        iconDest: 'fa-anchor',
        labelPassenger: 'Jumlah Penumpang',
        origins: ['Pelabuhan Kendari', 'Pelabuhan Makassar (Soekarno Hatta)', 'Pelabuhan Surabaya (Tanjung Perak)', 'Pelabuhan Jakarta (Tanjung Priok)', 'Pelabuhan Bitung'],
        dests: ['Pelabuhan Surabaya (Tanjung Perak)', 'Pelabuhan Makassar', 'Pelabuhan Ambon', 'Pelabuhan Balikpapan', 'Pelabuhan Sorong']
    },
    bus: {
        labelOrigin: 'Kota Asal / Terminal',
        labelDest: 'Kota Tujuan / Terminal',
        iconDest: 'fa-bus-simple',
        labelPassenger: 'Jumlah Kursi',
        origins: ['Jakarta (Pulo Gebang)', 'Bandung (Cicaheum)', 'Surabaya (Bungurasih)', 'Semarang (Terboyo)', 'Yogyakarta (Giwangan)'],
        dests: ['Surabaya (Bungurasih)', 'Yogyakarta (Giwangan)', 'Solo (Tirtonadi)', 'Malang (Arjosari)', 'Denpasar (Ubung)']
    },
    hotel: {
        labelOrigin: 'Kota / Lokasi Menginap',
        labelDest: 'Pilihan Tipe Kamar',
        iconDest: 'fa-bed',
        labelPassenger: 'Jumlah Tamu & Kamar',
        origins: ['Bali / Seminyak', 'Jakarta Pusat', 'Bandung City Center', 'Yogyakarta / Malioboro', 'Surabaya', 'Kendari'],
        dests: ['Deluxe Room', 'Superior Suite', 'Executive Family', 'Standard Double', 'Villa Pool Side']
    }
};

function initSearchForm() {
    // Set default date to tomorrow
    const dateInput = document.getElementById('search-date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    // Tab buttons event listeners
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const targetCategory = btn.getAttribute('data-target');
            currentCategory = targetCategory;
            updateCategoryInputs(targetCategory);
        });
    });

    // Initial load preset
    updateCategoryInputs('pesawat');
}

function updateCategoryInputs(category) {
    const config = locationPresets[category] || locationPresets.pesawat;

    const labelOrigin = document.getElementById('label-origin');
    const labelDest = document.getElementById('label-destination');
    const iconDest = document.getElementById('icon-dest');
    const labelPassenger = document.getElementById('label-passenger');
    
    const originSelect = document.getElementById('origin-select');
    const destSelect = document.getElementById('dest-select');

    if (labelOrigin) labelOrigin.textContent = config.labelOrigin;
    if (labelDest) labelDest.textContent = config.labelDest;
    if (labelPassenger) labelPassenger.textContent = config.labelPassenger;

    if (iconDest) {
        iconDest.className = `fa-solid ${config.iconDest} text-slate-400`;
    }

    // Populate selects
    if (originSelect) {
        originSelect.innerHTML = config.origins.map(o => `<option value="${o}">${o}</option>`).join('');
    }
    if (destSelect) {
        destSelect.innerHTML = config.dests.map(d => `<option value="${d}">${d}</option>`).join('');
    }

    // Hide result container when category switches
    const resultBox = document.getElementById('simulation-result');
    if (resultBox) resultBox.classList.add('hidden');
}

// Trigger simulation search and generate realistic mock results
function triggerSearchSimulation() {
    const origin = document.getElementById('origin-select').value;
    const dest = document.getElementById('dest-select').value;
    const date = document.getElementById('search-date').value;
    const passenger = document.getElementById('passenger-select').value;

    const resultBox = document.getElementById('simulation-result');
    const resultsContainer = document.getElementById('results-container');
    const routeTitle = document.getElementById('result-route-title');

    if (!resultBox || !resultsContainer) return;

    routeTitle.textContent = `${origin} ➔ ${dest} (${date})`;

    // Generate mock items per category
    let mocks = [];
    if (currentCategory === 'pesawat') {
        mocks = [
            { provider: 'Batik Air', icon: 'fa-plane text-brand-500', time: '08:00 - 10:15', class: 'Ekonomi (Langsung)', price: 'Rp 845.000', badge: 'Termurah' },
            { provider: 'Garuda Indonesia', icon: 'fa-plane text-sky-600', time: '11:30 - 13:45', class: 'Ekonomi Premium', price: 'Rp 1.250.000', badge: 'Rekomendasi' },
            { provider: 'Lion Air', icon: 'fa-plane text-amber-500', time: '16:10 - 18:25', class: 'Ekonomi (Direct)', price: 'Rp 790.000', badge: 'Promo' }
        ];
    } else if (currentCategory === 'pelni') {
        mocks = [
            { provider: 'KM. NGGAPULU', icon: 'fa-ship text-blue-600', time: 'Keberangkatan 14:00 WITA', class: 'Kelas Ekonomi / Dek', price: 'Rp 480.000', badge: 'Resmi PELNI' },
            { provider: 'KM. DOBONSOLO', icon: 'fa-ship text-blue-600', time: 'Keberangkatan 21:30 WITA', class: 'Kamar Kabin 1A', price: 'Rp 720.000', badge: 'Terfavorit' }
        ];
    } else if (currentCategory === 'kereta') {
        mocks = [
            { provider: 'Argo Bromo Anggrek', icon: 'fa-train text-emerald-600', time: '08:20 - 16:25', class: 'Eksekutif SS', price: 'Rp 540.000', badge: 'Kereta Cepat' },
            { provider: 'Gaya Baru Malam', icon: 'fa-train text-emerald-600', time: '11:00 - 20:10', class: 'Ekonomi Premium', price: 'Rp 290.000', badge: 'Hemat' }
        ];
    } else if (currentCategory === 'bus') {
        mocks = [
            { provider: 'PO. Sinar Jaya', icon: 'fa-bus text-amber-600', time: '17:00 - 05:00', class: 'Executive Class (2+2)', price: 'Rp 230.000', badge: 'Nyaman' },
            { provider: 'PO. Rosalia Indah', icon: 'fa-bus text-amber-600', time: '18:30 - 06:15', class: 'First Class Double Decker', price: 'Rp 380.000', badge: 'VIP' }
        ];
    } else {
        mocks = [
            { provider: 'Grand Mercure Hotel', icon: 'fa-hotel text-purple-600', time: 'Check-in 14:00', class: 'Deluxe Room + Breakfast', price: 'Rp 650.000/malam', badge: 'Bintang 4' },
            { provider: 'Amaris Hotel Center', icon: 'fa-hotel text-purple-600', time: 'Check-in 14:00', class: 'Smart Twin Room', price: 'Rp 340.000/malam', badge: 'Hemat' }
        ];
    }

    resultsContainer.innerHTML = mocks.map(m => `
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white hover:shadow-md transition-all">
            <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shadow-sm">
                    <i class="fa-solid ${m.icon}"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900 text-sm sm:text-base">${m.provider}</span>
                        <span class="bg-brand-100 text-brand-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">${m.badge}</span>
                    </div>
                    <div class="text-xs text-slate-500 font-medium">${m.time} &bull; <span class="text-slate-700 font-semibold">${m.class}</span></div>
                </div>
            </div>
            
            <div class="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                <div class="text-left sm:text-right">
                    <div class="text-xs text-slate-400 font-medium">Tarif Estimasi</div>
                    <div class="text-base font-extrabold text-brand-600">${m.price}</div>
                </div>
                <button onclick="openBookingModal('${origin} - ${dest}', '${m.provider} (${currentCategory.toUpperCase()})', '${m.price}')" 
                        class="bg-slate-900 hover:bg-brand-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition-colors flex items-center gap-1.5">
                    <span>Pesan Tiket</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
            </div>
        </div>
    `).join('');

    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Modal Handlers
function openBookingModal(route, category, price) {
    const modal = document.getElementById('booking-modal');
    const routeElem = document.getElementById('modal-route-name');
    const catElem = document.getElementById('modal-category');
    const priceElem = document.getElementById('modal-price');

    if (routeElem) routeElem.textContent = route;
    if (catElem) catElem.textContent = category;
    if (priceElem) priceElem.textContent = price;

    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// FAQ Accordion Toggle
function initFAQAccordion() {
    const toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');

            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                content.classList.add('hidden');
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Mobile Menu Handler
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar?.classList.add('shadow-md');
        } else {
            navbar?.classList.remove('shadow-md');
        }
    });
}
