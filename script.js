// Script logic for Sahabat Tiket Landing Page (Aligned with velotiket.com/sahabatiket)

document.addEventListener('DOMContentLoaded', () => {
    initSearchForm();
    initMobileMenu();
    initFAQAccordion();
    initNavbarScroll();
});

let currentCategory = 'pesawat';

// Location presets aligned with Velotiket
const locationPresets = {
    pesawat: {
        labelOrigin: 'Kota Asal / Bandara',
        labelDest: 'Kota Tujuan / Bandara',
        iconDest: 'fa-plane-arrival',
        labelPassenger: 'Jumlah Penumpang',
        origins: ['Jakarta (CGK)', 'Surabaya (SUB)', 'Kendari (KDI)', 'Makassar (UPG)', 'Balikpapan (BPN)', 'Denpasar Bali (DPS)'],
        dests: ['Surabaya (SUB)', 'Jakarta (CGK)', 'Denpasar Bali (DPS)', 'Makassar (UPG)', 'Singapore (SIN)', 'Kendari (KDI)']
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
        origins: ['Tijili Seminyak Bali', 'voco Bandung Setiabudi', 'Jakarta Pusat', 'Yogyakarta / Malioboro', 'Surabaya', 'Kendari'],
        dests: ['Deluxe Room', 'Superior Suite', 'Executive Family', 'Standard Double', 'Villa Pool Side']
    }
};

function initSearchForm() {
    const dateInput = document.getElementById('search-date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }

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

    if (originSelect) {
        originSelect.innerHTML = config.origins.map(o => `<option value="${o}">${o}</option>`).join('');
    }
    if (destSelect) {
        destSelect.innerHTML = config.dests.map(d => `<option value="${d}">${d}</option>`).join('');
    }

    const resultBox = document.getElementById('simulation-result');
    if (resultBox) resultBox.classList.add('hidden');
}

// Trigger simulation search with Velotiket pricing standards (Nett incl Tax & Fuel Surcharge)
function triggerSearchSimulation() {
    const origin = document.getElementById('origin-select').value;
    const dest = document.getElementById('dest-select').value;
    const date = document.getElementById('search-date').value;

    const resultBox = document.getElementById('simulation-result');
    const resultsContainer = document.getElementById('results-container');
    const routeTitle = document.getElementById('result-route-title');

    if (!resultBox || !resultsContainer) return;

    routeTitle.textContent = `${origin} ➔ ${dest} (${date})`;

    let mocks = [];
    if (currentCategory === 'pesawat') {
        mocks = [
            { provider: 'TransNusa', icon: 'fa-plane text-sky-500', time: '07:30 - 09:15', class: 'Ekonomi (Nett + IWJR)', price: 'Rp 720.000', badge: 'Promo TransNusa' },
            { provider: 'Batik Air', icon: 'fa-plane text-brand-500', time: '08:00 - 10:15', class: 'Ekonomi (Sudah Pajak)', price: 'Rp 845.000', badge: 'Harga Nett' },
            { provider: 'Garuda Indonesia', icon: 'fa-plane text-sky-600', time: '11:30 - 13:45', class: 'Ekonomi Premium (GOTF Edition)', price: 'Rp 1.150.000', badge: 'GOTF Promo' },
            { provider: 'Lion Air', icon: 'fa-plane text-amber-500', time: '16:10 - 18:25', class: 'Ekonomi (Bagasi Sesuai Agent News)', price: 'Rp 680.000', badge: 'Best Seller' }
        ];
    } else if (currentCategory === 'pelni') {
        mocks = [
            { provider: 'KM. NGGAPULU', icon: 'fa-ship text-blue-600', time: 'Berangkat 14:00 WITA', class: 'Kelas Ekonomi (Sudah Termasuk Asuransi Jasa Raharja)', price: 'Rp 480.000', badge: 'Resmi PELNI' },
            { provider: 'KM. DOBONSOLO', icon: 'fa-ship text-blue-600', time: 'Berangkat 21:30 WITA', class: 'Kamar Kabin 1A (Nett)', price: 'Rp 720.000', badge: 'Terfavorit' }
        ];
    } else if (currentCategory === 'kereta') {
        mocks = [
            { provider: 'Argo Bromo Anggrek', icon: 'fa-train text-emerald-600', time: '08:20 - 16:25', class: 'Eksekutif SS (Nett + Pajak)', price: 'Rp 540.000', badge: 'Kereta Cepat' },
            { provider: 'Gaya Baru Malam', icon: 'fa-train text-emerald-600', time: '11:00 - 20:10', class: 'Ekonomi Premium KAI', price: 'Rp 290.000', badge: 'Hemat' }
        ];
    } else if (currentCategory === 'bus') {
        mocks = [
            { provider: 'PO. Sinar Jaya', icon: 'fa-bus text-amber-600', time: '17:00 - 05:00', class: 'Executive Class (2+2) Nett', price: 'Rp 230.000', badge: 'Terjangkau' },
            { provider: 'PO. Rosalia Indah', icon: 'fa-bus text-amber-600', time: '18:30 - 06:15', class: 'First Class Double Decker', price: 'Rp 380.000', badge: 'VIP Lounge' }
        ];
    } else {
        mocks = [
            { provider: 'Tijili Seminyak Bali', icon: 'fa-hotel text-purple-600', time: 'Check-in 14:00 WITA', class: 'Bintang 4 - Deluxe Room (Promo Velosita)', price: 'Rp 580.000/malam', badge: 'Promo Spesial' },
            { provider: 'voco Bandung Setiabudi', icon: 'fa-hotel text-purple-600', time: 'Check-in 14:00 WIB', class: 'Bintang 4 - Premium King Room', price: 'Rp 790.000/malam', badge: 'Hotel Choice' }
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
                    <div class="text-[10px] text-emerald-600 font-extrabold uppercase">Termasuk Pajak & Fuel Surcharge</div>
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
