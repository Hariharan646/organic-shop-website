// ===================================
//  KBS ORGANIC SHOP — main.js
// ===================================

// ---- Premium Product Data ----
const products = [
  {
    id: 1, category: "oils", 
    image: "https://5.imimg.com/data5/SELLER/Default/2022/12/ZZ/XL/IG/24056520/groundnut-oil-1000x1000.jpg",
    name: "Groundnut Oil", price: 350, unit: "500ml",
    desc: "Cold-pressed peanut oil rich in Vitamin E. Perfect for traditional cooking.",
    badge: "Best Seller"
  },
  {
    id: 2, category: "oils", 
    image: "https://happyspicyhour.com/wp-content/uploads/2023/07/does-thai-food-use-sesame-oil.jpg",
    name: "Sesame Oil", price: 420, unit: "500ml",
    desc: "Premium gingelly oil for holistic health. High in calcium and natural minerals.",
    badge: "Signature"
  },
{
    id: 3, category: "oils", 
    image: "https://www.healthbenefitstimes.com/9/gallery/coconut-oil/Coconut-oil-1.jpg",
    name: "Coconut Oil", price: 380, unit: "500ml",
    desc: "Pure wood-pressed coconut oil. Ideal for culinary artistry and skin care.",
    badge: null
  },
  {
    id: 4, category: "oils", 
    image: "https://healthsea.com/wp-content/uploads/2024/01/castor-oil-what-is-nutritional-value-benefits-uses-and-side-effects-074951.jpg",
    name: "Castor Oil", price: 290, unit: "200ml",
    desc: "Authentic castor oil revered for hair growth and natural moisturizing.",
    badge: null
  },
  {
    id: 5, category: "millets", 
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    name: "Foxtail Millet", price: 180, unit: "1 kg",
    desc: "Nutrient-dense ancient grains ideal for modern wellness management.",
    badge: "Organic"
  },
  {
    id: 6, category: "millets", 
    image: "https://cdn.shopify.com/s/files/1/1751/6601/products/Barnyard_Millet_DSC5318_800x.jpg?v=1527358961",
    name: "Barnyard Millet", price: 160, unit: "1 kg",
    desc: "A powerhouse of iron and calcium. Suitable for daily dietary needs.",
    badge: null
  },
  {
    id: 7, category: "rice", 
    image: "https://img.freepik.com/premium-photo/rustic-red-rice-elegance_1115006-3092.jpg",
    name: "Heritage Red Rice", price: 120, unit: "1 kg",
    desc: "Unpolished traditional rice packed with essential fibre and antioxidants.",
    badge: "Heritage"
  },
  {
    id: 8, category: "soap", 
    image: "https://soapmakingguide.site/wp-content/uploads/2026/01/ethical_palm_oil_soapmaking_rckem-1.jpg.webp",
    name: "Sandle wood Soap", price: 90, unit: "250g",
    desc: "Pure sandalwood soap, 100% premiuim quality",
    badge: null
  }
];

function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  
  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.05}s" data-id="${p.id}">
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      </div>
      <div class="product-body">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div class="product-price">₹${p.price}<span class="per"> /${p.unit}</span></div>
          <button class="add-btn" onclick="addToCart(${p.id}, this)">Add</button>
        </div>
      </div>
    </div>
  `).join("");
}

function filterProducts(cat, el) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
  renderProducts(cat);
}

function addToCart(id, btn) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  btn.textContent = "Added";
  btn.classList.add("added");
  setTimeout(() => {
    btn.textContent = "Add";
    btn.classList.remove("added");
  }, 1200);

  updateCartUI();
  showToast(`🛒 ${product.name} added to basket`);
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  }
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

function renderCartItems() {
  const container = document.getElementById("cartItems");
  const footer = document.getElementById("cartFooter");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 60px 0; color:var(--text-light); font-weight:300;">Your basket is empty</div>`;
    if (footer) footer.style.display = "none";
    return;
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div style="flex:1;">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} × ${item.qty}</div>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span style="font-weight:600; font-size:0.9rem;">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join("");

  const totalEl = document.getElementById("cartTotal");
  if (totalEl) totalEl.textContent = `₹${total}`;
  if (footer) footer.style.display = "block";
}

function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  if (!sidebar) return;
  const isOpen = sidebar.classList.contains("open");
  if (!isOpen) renderCartItems();
  sidebar.classList.toggle("open", !isOpen);
  overlay.classList.toggle("open", !isOpen);
  document.body.style.overflow = !isOpen ? "hidden" : "";
}

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
});

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
});