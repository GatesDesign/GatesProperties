const apartmentsData = [
    {
        id: 'apt1',
        name: 'Lagos Loft Lodge',
        location: 'Lagos Island',
        price: 2200,
        beds: 1,
        baths: 1,
        sqft: 850,
        description: 'A stylish loft with modern amenities, perfect for professionals seeking city life and vibrant surroundings.',
        imgSrc: 'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/Rent%20Apartment%20Booking%20Template/1.jpeg',
        amenities: ['gym', 'wifi', 'balcony'],
        rating: 4.8
    },
    {
        id: 'apt2',
        name: 'Ibadan Serenity Suite',
        location: 'Ibadan City',
        price: 1850,
        beds: 2,
        baths: 2,
        sqft: 1100,
        description: 'Enjoy peaceful river views from this beautifully appointed 2-bedroom suite. Ideal for relaxation.',
        imgSrc: 'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/Rent%20Apartment%20Booking%20Template/2.jpeg',
        amenities: ['pool', 'pet friendly', 'balcony'],
        rating: 4.5
    },
    {
        id: 'apt3',
        name: 'Lagos Family Home',
        location: 'Lagos City',
        price: 2900,
        beds: 3,
        baths: 2,
        sqft: 1500,
        description: 'Spacious 3-bedroom home with a garden, ideal for families. Close to parks and schools.',
        imgSrc: 'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/Rent%20Apartment%20Booking%20Template/3.jpeg',
        amenities: ['pet friendly', 'gym'],
        rating: 4.2
    },
    {
        id: 'apt4',
        name: 'Studio House',
        location: 'Osun City',
        price: 1450, // Adjusted price
        beds: 0, // Studio often means 0 dedicated bedrooms
        baths: 1,
        sqft: 550,
        description: 'A bright and modern studio apartment, perfect for solo travelers or couples. Compact and chic.',
        imgSrc: 'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/Rent%20Apartment%20Booking%20Template/4.jpeg',
        amenities: ['wifi', 'gym'],
        rating: 4.0
    },
    {
        id: 'apt5',
        name: 'Lekki Modern Flat',
        location: 'Lagos',
        price: 2600,
        beds: 2,
        baths: 2,
        sqft: 1250,
        description: 'Sleek and contemporary 2-bedroom flat in the bustling uptown area with great city views.',
        imgSrc: 'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/Rent%20Apartment%20Booking%20Template/5.jpeg',
        amenities: ['gym', 'pool', 'balcony'],
        rating: 4.7
    },
    {
        id: 'apt6',
        name: 'Garden City Studio',
        location: 'Parkside Suburb',
        price: 1350,
        beds: 1, // Can be a larger studio with a defined bed area
        baths: 1,
        sqft: 600,
        description: 'Charming studio with a private garden entrance. Offers a quiet retreat from city noise.',
        imgSrc: 'https://raw.githubusercontent.com/farazc60/Project-Images/refs/heads/main/Rent%20Apartment%20Booking%20Template/6.jpeg',
        amenities: ['pet friendly', 'wifi'],
        rating: 4.3
    }
];

// --- DOM ELEMENTS ---
const apartmentGrid = document.getElementById('apartment-grid');
const filterLocationSelect = document.getElementById('filter-location');
const filterPriceSelect = document.getElementById('filter-price');
const filterAmenitiesSelect = document.getElementById('filter-amenities');
const sortApartmentsSelect = document.getElementById('sort-apartments');

// --- RENDER FUNCTION ---
function renderApartments(apartmentsToRender) {
    apartmentGrid.innerHTML = ''; // Clear existing cards

    if (apartmentsToRender.length === 0) {
        apartmentGrid.innerHTML = 'No apartments match your criteria.';
        return;
    }

    apartmentsToRender.forEach(apt => {
        const card = `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
                <img src="${apt.imgSrc}" alt="${apt.name}" class="w-full object-cover group-hover:opacity-90 transition-opacity">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-slate-800 mb-2">${apt.name}</h3>
                    <p class="text-sm text-slate-500 mb-1 flex items-center">
                        <i class="fas fa-map-marker-alt mr-2 text-orange-500"></i>
                        ${apt.location}
                    </p>
                    <div class="flex flex-wrap justify-start items-center text-xs text-slate-600 mt-2 mb-3 space-x-3">
                        <span><i class="fas fa-bed mr-1 text-orange-500"></i> ${apt.beds === 0 ? 'Studio' : apt.beds + ' Bed'}</span>
                        <span><i class="fas fa-bath mr-1 text-orange-500"></i> ${apt.baths} Bath</span>
                        <span><i class="fas fa-ruler-combined mr-1 text-orange-500"></i> ${apt.sqft} sqft</span>
                    </div>
                    <p class="text-lg font-bold text-red-600 mb-3">
                        ₦${apt.price.toLocaleString()} 
                        <span class="text-sm font-normal text-slate-500">/month</span>
                    </p>
                    <p class="text-slate-600 text-sm mb-4 leading-relaxed apartment-card-description">${apt.description}</p>
                    <button onclick="scrollToBooking('${apt.name}')" 
                        class="w-full bg-orange-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                        Book Now
                    </button>
                </div>
            </div>
        `;
        apartmentGrid.innerHTML += card;
    });
}

// --- FILTER AND SORT LOGIC ---
function applyFiltersAndSort() {
    let filteredApartments = [...apartmentsData]; // Start with all apartments

    // Location Filter
    const selectedLocation = filterLocationSelect.value;
    if (selectedLocation) {
        filteredApartments = filteredApartments.filter(apt => apt.location === selectedLocation);
    }

    // Price Filter
    const selectedPriceRange = filterPriceSelect.value;
    if (selectedPriceRange) {
        const [minPriceStr, maxPriceStr] = selectedPriceRange.split('-');
        const minPrice = parseInt(minPriceStr);
        const maxPrice = parseInt(maxPriceStr);
        filteredApartments = filteredApartments.filter(apt => apt.price >= minPrice && apt.price < maxPrice);
    }

    // Amenities Filter
    const selectedAmenity = filterAmenitiesSelect.value;
    if (selectedAmenity) {
        filteredApartments = filteredApartments.filter(apt => apt.amenities.includes(selectedAmenity.toLowerCase()));
    }

    // Sorting
    const sortBy = sortApartmentsSelect.value;
    switch (sortBy) {
        case 'price-asc':
            filteredApartments.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredApartments.sort((a, b) => b.price - a.price);
            break;
        case 'rating-desc':
            filteredApartments.sort((a, b) => b.rating - a.rating);
            break;
        case 'featured': 
            filteredApartments.sort((a, b) => apartmentsData.findIndex(x => x.id === a.id) - apartmentsData.findIndex(x => x.id === b.id));
            break;
    }

    renderApartments(filteredApartments);
}

// --- EVENT LISTENERS ---
filterLocationSelect.addEventListener('change', applyFiltersAndSort);
filterPriceSelect.addEventListener('change', applyFiltersAndSort);
filterAmenitiesSelect.addEventListener('change', applyFiltersAndSort);
sortApartmentsSelect.addEventListener('change', applyFiltersAndSort);

// --- INITIAL RENDER ---
document.addEventListener('DOMContentLoaded', () => {
    renderApartments(apartmentsData);
});

// --- MOBILE MENU ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    } else {
        mobileMenu.style.maxHeight = "0px";
    }
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        mobileMenu.style.maxHeight = "0px";
    });
});

// --- BOOKING FORM & MODAL ---
const today = new Date().toISOString().split('T')[0];
document.getElementById('start-date').setAttribute('min', today);

const bookingForm = document.getElementById('bookingForm');
const bookingModal = document.getElementById('bookingModal');
const modalContent = document.getElementById('modalContent');
const closeModalButton = document.getElementById('closeModalButton');
const modalConfirmButton = document.getElementById('modalConfirmButton');

bookingForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const apartmentSelect = document.getElementById('apartment-select');
    const selectedOption = apartmentSelect.options[apartmentSelect.selectedIndex];
    const apartmentName = selectedOption.value;
    const apartmentPrice = parseFloat(selectedOption.dataset.price);
    const startDate = document.getElementById('start-date').value;
    const duration = parseInt(document.getElementById('duration').value);

    if (isNaN(apartmentPrice) || isNaN(duration) || !apartmentName) {
        alert("Please select a valid apartment and duration.");
        return;
    }
    const totalCost = apartmentPrice * duration;

    document.getElementById('summaryName').textContent = name;
    document.getElementById('summaryEmail').textContent = email;
    document.getElementById('summaryPhone').textContent = phone;
    document.getElementById('summaryApartmentName').textContent = apartmentName;
    document.getElementById('summaryMonthlyCost').textContent = `₦${apartmentPrice.toLocaleString()}`;
    document.getElementById('summaryDuration').textContent = duration;
    document.getElementById('summaryStartDate').textContent = new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('summaryTotalCost').textContent = `₦${totalCost.toLocaleString()}`;

    bookingModal.classList.remove('hidden');
    setTimeout(() => {
        bookingModal.classList.add('opacity-100');
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
});

function hideModal() {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    bookingModal.classList.remove('opacity-100');
    setTimeout(() => {
        bookingModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

closeModalButton.addEventListener('click', hideModal);
modalConfirmButton.addEventListener('click', () => {
    hideModal();
    bookingForm.reset();
});

bookingModal.addEventListener('click', function (event) {
    if (event.target === bookingModal) {
        hideModal();
    }
});

// --- SCROLL TO BOOKING ---
function scrollToBooking(apartmentName) {
    const bookingSection = document.getElementById('booking');
    const apartmentSelect = document.getElementById('apartment-select');
    for (let i = 0; i < apartmentSelect.options.length; i++) {
        if (apartmentSelect.options[i].value === apartmentName) {
            apartmentSelect.selectedIndex = i;
            break;
        }
    }
    bookingSection.scrollIntoView({ behavior: 'smooth' });
}

// --- CONTACT FORM ---
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// --- FOOTER YEAR ---
document.getElementById('currentYear').textContent = new Date().getFullYear();

// --- ANIMATIONS ---
const animationStyle = document.createElement('style');
animationStyle.innerHTML = `
    .animation-delay-300 { animation-delay: 0.3s; }
    .animation-delay-600 { animation-delay: 0.6s; }
    .animate-fade-in-down {
        animation: fadeInDown 0.8s ease-out forwards;
        opacity: 0;
    }
    .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
        opacity: 0;
    }
    @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(animationStyle);


// Setup canvas for rainfall in booking section
const canvasBooking = document.getElementById("rain-booking");
const ctxBooking = canvasBooking.getContext("2d");

canvasBooking.width = window.innerWidth;
canvasBooking.height = canvasBooking.offsetHeight;

let raindropsBooking = [];

for (let i = 0; i < 100; i++) {
    raindropsBooking.push({
        x: Math.random() * canvasBooking.width,
        y: Math.random() * canvasBooking.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 4 + 2,
    });
}

function drawRainBooking() {
    ctxBooking.clearRect(0, 0, canvasBooking.width, canvasBooking.height);
    ctxBooking.strokeStyle = "rgba(0,0,0,0.3)"; // softer rain for booking section
    ctxBooking.lineWidth = 2;
    ctxBooking.lineCap = "round";

    raindropsBooking.forEach((drop) => {
        ctxBooking.beginPath();
        ctxBooking.moveTo(drop.x, drop.y);
        ctxBooking.lineTo(drop.x, drop.y + drop.length);
        ctxBooking.stroke();
    });

    updateRainBooking();
}

function updateRainBooking() {
    raindropsBooking.forEach((drop) => {
        drop.y += drop.speed;
        if (drop.y > canvasBooking.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvasBooking.width;
        }
    });
}

function animateRainBooking() {
    drawRainBooking();
    requestAnimationFrame(animateRainBooking);
}

animateRainBooking();

// Resize canvas when window size changes
window.addEventListener("resize", () => {
    canvasBooking.width = window.innerWidth;
    canvasBooking.height = canvasBooking.offsetHeight;
});



// Setup canvas for rainfall
const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let raindrops = [];

for (let i = 0; i < 120; i++) {
    raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 5 + 2,
    });
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
    });

    updateRain();
}

function updateRain() {
    raindrops.forEach((drop) => {
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
        }
    });
}

function animateRain() {
    drawRain();
    requestAnimationFrame(animateRain);
}

animateRain();

// Resize canvas when window size changes
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
