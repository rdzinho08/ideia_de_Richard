
if (window.lucide) {
    lucide.createIcons();
}


const openProfileBtn = document.getElementById('open-profile-btn');
const closeDrawerBtn = document.getElementById('close-drawer-btn');
const profileDrawer = document.getElementById('profile-drawer');

const openLoginBtn = document.getElementById('open-login-btn');
const closeLoginBtn = document.getElementById('close-login-btn');
const loginModal = document.getElementById('login-modal');

const drawerOverlay = document.getElementById('drawer-overlay');

function toggleDrawer() {
    profileDrawer.classList.toggle('-translate-x-full');
    drawerOverlay.classList.toggle('hidden');
}

function toggleLoginModal() {
    loginModal.classList.toggle('hidden');
    drawerOverlay.classList.toggle('hidden');
}

function closeEverything() {
    if (profileDrawer) profileDrawer.classList.add('-translate-x-full');
    if (loginModal) loginModal.classList.add('hidden');
    if (drawerOverlay) drawerOverlay.classList.add('hidden');
}

if (openProfileBtn) openProfileBtn.addEventListener('click', toggleDrawer);
if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', toggleDrawer);

if (openLoginBtn) openLoginBtn.addEventListener('click', toggleLoginModal);
if (closeLoginBtn) closeLoginBtn.addEventListener('click', toggleLoginModal);

if (drawerOverlay) drawerOverlay.addEventListener('click', closeEverything);


async function loadProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let products = [];

    
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (response.ok) {
            products = await response.json();
        }
    } catch (error) {
        console.log('Aviso: Backend offline. A utilizar lista de dados local.');
    }

   

   
    grid.innerHTML = products.slice(0, 9).map(product => `
        <div class="border-2 border-gray-400 rounded-2xl h-44 bg-white p-3 relative flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <!-- Botão do Coração -->
            <button class="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition z-10">
                <i data-lucide="heart" class="w-5 h-5"></i>
            </button>
            
            <!-- Imagem do Produto -->
            <div class="flex items-center justify-center h-24 overflow-hidden rounded-lg">
                <img src="${product.image_url}" 
                     alt="${product.name}" 
                     class="max-h-full max-w-full object-contain"
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/150?text=Sem+Imagem';">
            </div>
            
            <!-- Detalhes do Produto -->
            <div class="flex justify-between items-end border-t pt-2">
                <span class="text-xs font-bold text-gray-800 truncate w-32">${product.name}</span>
                <span class="text-xs font-bold text-blue-600">R$ ${product.price}</span>
            </div>
        </div>
    `).join('');

    
    if (window.lucide) lucide.createIcons();
}


async function loadCarousel() {
    const carouselWrapper = document.getElementById('carousel-wrapper');
    if (!carouselWrapper) return;

  
    carouselWrapper.innerHTML = items.map(item => `
        <div class="min-w-[140px] border border-gray-300 rounded-xl p-3 bg-gray-50 flex-shrink-0 shadow-sm">
            <p class="text-xs font-bold truncate text-gray-800">${item.name}</p>
            <p class="text-xs text-green-600 font-bold mt-1">R$ ${item.price}</p>
        </div>
    `).join('');
}


document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCarousel();
});