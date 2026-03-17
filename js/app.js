// ============================================
// 818 LABS - Main Application JS
// ============================================

// --- AGE GATE (site-wide) ---
(function() {
  if (localStorage.getItem('818labs-age-verified') === 'true') return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'ageGateOverlay';
  overlay.innerHTML = `
    <div class="age-gate-backdrop"></div>
    <div class="age-gate-modal">
      <img src="images/logo.png" alt="818 Labs" class="age-gate-logo">
      <h2>Age Verification Required</h2>
      <p>You must be 21 years or older to enter this website. By clicking "Yes" you confirm that you are of legal age.</p>
      <p class="age-gate-question">Are you 21 or older?</p>
      <div class="age-gate-buttons">
        <button id="ageGateYes" class="age-gate-btn age-gate-yes">Yes, I am 21+</button>
        <button id="ageGateNo" class="age-gate-btn age-gate-no">No</button>
      </div>
    </div>
  `;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    .age-gate-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 99998;
    }
    .age-gate-modal {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);
      background: #111; border: 1px solid rgba(0,200,150,0.3); border-radius: 16px;
      padding: 48px 40px; text-align: center; z-index: 99999;
      max-width: 440px; width: 90%; box-shadow: 0 0 60px rgba(0,200,150,0.15);
    }
    .age-gate-logo { height: 60px; margin-bottom: 24px; }
    .age-gate-modal h2 {
      font-size: 1.5rem; color: #fff; margin-bottom: 12px; font-weight: 700;
    }
    .age-gate-modal p {
      color: #aaa; font-size: 0.95rem; line-height: 1.6; margin-bottom: 8px;
    }
    .age-gate-question {
      color: #fff !important; font-size: 1.1rem !important; font-weight: 600;
      margin-top: 20px !important; margin-bottom: 24px !important;
    }
    .age-gate-buttons { display: flex; gap: 16px; justify-content: center; }
    .age-gate-btn {
      padding: 14px 36px; border: none; border-radius: 8px; font-size: 1rem;
      font-weight: 600; cursor: pointer; transition: all 0.2s;
    }
    .age-gate-yes {
      background: linear-gradient(135deg, #00c896, #00a67d); color: #fff;
    }
    .age-gate-yes:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,200,150,0.4); }
    .age-gate-no {
      background: transparent; color: #888; border: 1px solid #333;
    }
    .age-gate-no:hover { border-color: #666; color: #ccc; }
    body.age-gate-active { overflow: hidden; }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);
  document.body.classList.add('age-gate-active');

  document.getElementById('ageGateYes').addEventListener('click', function() {
    localStorage.setItem('818labs-age-verified', 'true');
    overlay.remove();
    document.body.classList.remove('age-gate-active');
  });

  document.getElementById('ageGateNo').addEventListener('click', function() {
    window.location.href = 'https://www.google.com';
  });
})();

// --- CART STATE ---
let cart = JSON.parse(localStorage.getItem('818labs-cart') || '[]');

function saveCart() {
  localStorage.setItem('818labs-cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, variantLabel, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let price, name;
  if (variantLabel && product.variants) {
    const variant = product.variants.find(v => v.label === variantLabel);
    if (!variant) return;
    price = variant.price;
    name = `${product.name} - ${variant.label}`;
  } else {
    price = product.price;
    name = product.name;
  }

  const existing = cart.find(item => item.id === productId && item.variant === variantLabel);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, variant: variantLabel || null, name, price, qty });
  }

  saveCart();
  showToast(`${name} added to cart`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

function updateQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

// --- CART UI ---
function updateCartUI() {
  // Update cart count badges
  document.querySelectorAll('.cart-count').forEach(el => {
    const count = getCartCount();
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });

  // Update sidebar
  const cartItemsEl = document.querySelector('.cart-items');
  const cartFooter = document.querySelector('.cart-footer');
  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<div class="cart-empty"><p>Your cart is empty</p></div>';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (cartFooter) cartFooter.style.display = 'block';

  cartItemsEl.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-image">
        <div style="font-size:1.5rem;">🧪</div>
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <button onclick="updateQty(${i}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${i}, 1)">+</button>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${i})">Remove</button>
      </div>
    </div>
  `).join('');

  // Update total
  const totalEl = document.querySelector('.cart-total .amount');
  if (totalEl) totalEl.textContent = `$${getCartTotal().toFixed(2)}`;

  // Update checkout page if present
  updateCheckoutSummary();
}

function toggleCart() {
  document.querySelector('.cart-overlay')?.classList.toggle('open');
  document.querySelector('.cart-sidebar')?.classList.toggle('open');
}

// --- TOAST ---
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">✓</span> ${message}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  });
}

// --- PRODUCT RENDERING ---
function getDisplayPrice(product) {
  if (product.variants && product.variants.length > 0) {
    const prices = product.variants.map(v => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max) return `$${min.toFixed(2)}`;
    return `$${min.toFixed(2)} – $${max.toFixed(2)}`;
  }
  return `$${product.price.toFixed(2)}`;
}

function renderProductCard(product) {
  const hasVariants = product.variants && product.variants.length > 0;
  const displayPrice = getDisplayPrice(product);

  let badgeHTML = '';
  if (product.badge === 'sale') {
    badgeHTML = '<div class="badge">Sale!</div>';
  } else if (product.badge === 'best-seller') {
    badgeHTML = '<div class="badge best-seller">Best Seller</div>';
  } else if (product.onSale) {
    badgeHTML = '<div class="badge">Sale!</div>';
  }

  let priceHTML = `<span class="price">${displayPrice}</span>`;
  if (product.originalPrice && !hasVariants) {
    priceHTML = `<span class="original-price">$${product.originalPrice.toFixed(2)}</span> <span class="price">$${product.price.toFixed(2)}</span>`;
  }

  const addToCartBtn = hasVariants
    ? `<a href="product.html?id=${product.id}" class="btn-add-cart">Select Options</a>`
    : `<button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${product.id}')">Add to Cart</button>`;

  return `
    <div class="product-card" onclick="window.location='product.html?id=${product.id}'">
      ${badgeHTML}
      <div class="product-image">
        <img src="images/products/${product.id}.png" alt="${product.name}" loading="lazy" onerror="this.src='images/products/${product.id}.svg'">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        ${product.subtitle ? `<div class="product-desc">${product.subtitle}</div>` : ''}
        <div class="product-pricing">${priceHTML}</div>
        <div class="product-actions">
          ${addToCartBtn}
        </div>
      </div>
    </div>
  `;
}

function renderProducts(containerId, filter = 'all', limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  if (limit) filtered = filtered.slice(0, limit);

  container.innerHTML = filtered.map(p => renderProductCard(p)).join('');
}

// --- PRODUCT DETAIL ---
function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    const detailEl = document.querySelector('.product-detail');
    if (detailEl) detailEl.innerHTML = '<div class="container"><h2>Product not found</h2><p><a href="shop.html">Back to shop</a></p></div>';
    return;
  }

  document.title = `${product.name} — 818 Labs`;

  const hasVariants = product.variants && product.variants.length > 0;
  const defaultPrice = hasVariants ? product.variants[0].price : product.price;

  let variantHTML = '';
  if (hasVariants) {
    variantHTML = `
      <div class="variant-select">
        <label>Select Size</label>
        <select id="variantSelect" onchange="updateDetailPrice()">
          ${product.variants.map(v => `<option value="${v.label}" data-price="${v.price}">${v.label} — $${v.price.toFixed(2)}</option>`).join('')}
        </select>
      </div>
    `;
  }

  let priceHTML = `<span>$${defaultPrice.toFixed(2)}</span>`;
  if (product.originalPrice && !hasVariants) {
    priceHTML = `<span>$${product.price.toFixed(2)}</span><span class="original">$${product.originalPrice.toFixed(2)}</span>`;
  }

  const specsHTML = Object.entries(product.specs).map(([key, val]) => `
    <div class="spec-row"><dt>${key.charAt(0).toUpperCase() + key.slice(1)}</dt><dd>${val}</dd></div>
  `).join('');

  const container = document.querySelector('.product-detail .container');
  if (!container) return;

  container.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-image">
        <img src="images/products/${product.id}.png" alt="${product.name}" onerror="this.src='images/products/${product.id}.svg'">
      </div>
      <div class="product-detail-info">
        <h1>${product.name}</h1>
        ${product.subtitle ? `<div class="subtitle">${product.subtitle}</div>` : ''}
        <div class="detail-price" id="detailPrice">${priceHTML}</div>
        <p class="detail-description">${product.description}. For in vitro research use only.</p>

        <div class="product-specs">
          <h3>Specifications</h3>
          <div class="specs-grid">
            ${specsHTML}
          </div>
        </div>

        ${variantHTML}

        <div class="qty-selector">
          <button onclick="changeQty(-1)">−</button>
          <input type="number" id="qtyInput" value="1" min="1" max="99" readonly>
          <button onclick="changeQty(1)">+</button>
        </div>

        <button class="btn btn-primary detail-add-btn" onclick="addDetailToCart()">Add to Cart</button>

        <div class="detail-notice">
          <p><strong>Research Use Only.</strong> This product is intended for in vitro research by qualified professionals only. Not for human consumption. By purchasing, you affirm you are a qualified researcher.</p>
        </div>
      </div>
    </div>
  `;
}

function changeQty(delta) {
  const input = document.getElementById('qtyInput');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 99) val = 99;
  input.value = val;
}

function updateDetailPrice() {
  const select = document.getElementById('variantSelect');
  if (!select) return;
  const price = parseFloat(select.selectedOptions[0].dataset.price);
  document.getElementById('detailPrice').innerHTML = `<span>$${price.toFixed(2)}</span>`;
}

function addDetailToCart() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const qty = parseInt(document.getElementById('qtyInput')?.value || 1);
  const select = document.getElementById('variantSelect');
  const variant = select ? select.value : null;
  addToCart(id, variant, qty);
}

// --- FILTER BAR ---
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts('productGrid', btn.dataset.filter);
    });
  });
}

// --- FAQ ---
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

// --- MOBILE NAV ---
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// --- CHECKOUT ---
function updateCheckoutSummary() {
  const summaryEl = document.getElementById('orderSummary');
  if (!summaryEl) return;

  if (cart.length === 0) {
    summaryEl.innerHTML = '<p style="color:var(--text-muted);">Your cart is empty. <a href="shop.html">Shop now</a></p>';
    return;
  }

  const linesHTML = cart.map(item => `
    <div class="order-line">
      <div>
        <div class="item-name">${item.name}</div>
        <div class="item-qty">Qty: ${item.qty}</div>
      </div>
      <div class="item-price">$${(item.price * item.qty).toFixed(2)}</div>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 250 ? 0 : 15.00;
  const total = subtotal + shipping;

  summaryEl.innerHTML = `
    <h3>Order Summary</h3>
    ${linesHTML}
    <div class="order-totals">
      <div class="total-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="total-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
      </div>
      <div class="total-row grand-total">
        <span>Total</span>
        <span class="amount">$${total.toFixed(2)}</span>
      </div>
    </div>
  `;
}

// --- PAYMENT METHOD SELECTION ---
function initPaymentMethods() {
  const options = document.querySelectorAll('.payment-method-option');
  const instructions = document.getElementById('paymentInstructions');
  if (!options.length) return;

  const instructionText = {
    crypto: `<h4>💰 Cryptocurrency Payment</h4><p style="color:var(--text-muted);">Cryptocurrency payments are <strong>temporarily unavailable</strong>. Please select another payment method. We apologize for the inconvenience.</p>`,
    venmo: `<h4>🟦 Venmo Payment</h4><p>Send payment via Venmo after placing your order. Click the link below or search <strong>@Labs-818</strong> on Venmo. Please include your order number in the payment note.</p><p style="margin-top:12px;"><a href="https://venmo.com/Labs-818" target="_blank" rel="noopener" style="display:inline-block;background:#008CFF;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.95rem;">Pay with Venmo →</a></p><p style="margin-top:10px;font-size:0.85rem;color:var(--text-muted);">Orders are processed after payment confirmation.</p>`,
    paypal: `<h4>🅿️ PayPal Payment</h4><p style="color:var(--text-muted);">PayPal payments are <strong>temporarily unavailable</strong>. Please select another payment method. We apologize for the inconvenience.</p>`,
    card: `<h4>💳 Credit / Debit Card</h4><p style="color:var(--text-muted);">Credit and debit card payments are <strong>temporarily unavailable</strong>. Please select another payment method. We apologize for the inconvenience.</p>`
  };

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      if (instructions) {
        instructions.innerHTML = instructionText[opt.dataset.method] || '';
        instructions.style.display = 'block';
      }
    });
  });
}

// --- AGE VERIFICATION ---
function getAge(dobString) {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function initDobField() {
  const dobInput = document.getElementById('dobInput');
  if (!dobInput) return;
  // Set max date to today (no future dates)
  const today = new Date().toISOString().split('T')[0];
  dobInput.setAttribute('max', today);
}

// --- PLACE ORDER ---
function placeOrder(e) {
  e.preventDefault();

  // Age verification
  const dobInput = document.getElementById('dobInput');
  if (dobInput) {
    const dob = dobInput.value;
    if (!dob) {
      showToast('Please enter your date of birth');
      dobInput.focus();
      return;
    }
    const age = getAge(dob);
    if (age < 21) {
      showToast('You must be 21 or older to place an order');
      dobInput.focus();
      return;
    }
  }

  const method = document.querySelector('.payment-method-option.selected');
  if (!method) {
    showToast('Please select a payment method');
    return;
  }
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }

  const form = document.getElementById('checkoutForm');
  const inputs = form.querySelectorAll('input, select, textarea');
  const orderNum = 'ORD-' + Date.now().toString(36).toUpperCase();

  // Collect form data
  const formFields = {};
  inputs.forEach(input => {
    const label = input.closest('.form-group')?.querySelector('label')?.textContent?.replace(' *', '').trim();
    if (label && input.value) {
      formFields[label] = input.value;
    }
  });

  // Build order items text
  const subtotal = getCartTotal();
  const shipping = subtotal >= 250 ? 0 : 15.00;
  const total = subtotal + shipping;

  const itemLines = cart.map(item =>
    `${item.name} × ${item.qty} — $${(item.price * item.qty).toFixed(2)}`
  ).join('\n');

  const orderDetails = {
    'Order Number': orderNum,
    '_subject': `New 818 Labs Order: ${orderNum}`,
    ...formFields,
    'Payment Method': method.dataset.method.charAt(0).toUpperCase() + method.dataset.method.slice(1),
    'Order Items': itemLines,
    'Subtotal': `$${subtotal.toFixed(2)}`,
    'Shipping': shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`,
    'Total': `$${total.toFixed(2)}`,
    '_template': 'table',
    '_captcha': 'false'
  };

  // Send order to email via Formsubmit
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Placing Order...';
  }

  fetch('https://formsubmit.co/ajax/support.818labs@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(orderDetails)
  })
  .then(response => response.json())
  .then(data => {
    showToast(`Order ${orderNum} placed! Check your email for payment instructions.`);
    cart = [];
    saveCart();
    setTimeout(() => { window.location.href = 'index.html'; }, 3000);
  })
  .catch(err => {
    console.error('Order email error:', err);
    // Still place the order even if email fails
    showToast(`Order ${orderNum} placed! Check your email for payment instructions.`);
    cart = [];
    saveCart();
    setTimeout(() => { window.location.href = 'index.html'; }, 3000);
  })
  .finally(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Place Order';
    }
  });
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  initMobileNav();
  initFAQ();
  initFilters();
  initPaymentMethods();
  initDobField();

  // Cart overlay close
  document.querySelector('.cart-overlay')?.addEventListener('click', toggleCart);
  document.querySelector('.cart-close')?.addEventListener('click', toggleCart);

  // Checkout form
  document.getElementById('checkoutForm')?.addEventListener('submit', placeOrder);
});
