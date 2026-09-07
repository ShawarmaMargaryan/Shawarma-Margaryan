/* ==========================================================================
   SHAWARMA MARGARYAN - LÓGICA DE INTERACCIÓN, CARRITO Y WHATSAPP
   ========================================================================== */

const PHONE_NUMBER = "541150360400";

// Estado del carrito: { [sku]: { name, price, qty, img, category } }
const cart = {};

// Configuración del checkout
let checkoutConfig = {
  deliveryType: 'takeaway', // 'takeaway' | 'delivery'
  paymentMethod: 'cash_transfer', // 'cash_transfer'
  customerName: '',
  customerAddress: '',
  customerNotes: ''
};

document.addEventListener('DOMContentLoaded', () => {
  initCartListeners();
  initCategoryPills();
  initSearch();
  initCheckoutModal();
});

/* ==========================================
   GESTIÓN DEL CARRITO
   ========================================== */
function initCartListeners() {
  document.addEventListener('click', (e) => {
    // Botón inicial "Agregar"
    if (e.target.closest('.btn-add-initial')) {
      const btn = e.target.closest('.btn-add-initial');
      const card = btn.closest('.dish-card');
      const sku = card.dataset.sku;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const img = card.dataset.img;
      const category = card.dataset.category;

      updateItemQty(sku, 1, { name, price, img, category });
      return;
    }

    // Botón + en tarjeta o modal
    if (e.target.closest('.qty-btn-plus')) {
      const btn = e.target.closest('.qty-btn-plus');
      const card = btn.closest('.dish-card') || btn.closest('.order-item-row');
      const sku = card.dataset.sku;
      const currentQty = cart[sku] ? cart[sku].qty : 0;
      updateItemQty(sku, currentQty + 1);
      return;
    }

    // Botón - en tarjeta o modal
    if (e.target.closest('.qty-btn-minus')) {
      const btn = e.target.closest('.qty-btn-minus');
      const card = btn.closest('.dish-card') || btn.closest('.order-item-row');
      const sku = card.dataset.sku;
      const currentQty = cart[sku] ? cart[sku].qty : 0;
      if (currentQty > 0) {
        updateItemQty(sku, currentQty - 1);
      }
      return;
    }
  });
}

function updateItemQty(sku, newQty, fallbackData = null) {
  if (newQty <= 0) {
    delete cart[sku];
  } else {
    if (!cart[sku] && fallbackData) {
      cart[sku] = { ...fallbackData, qty: newQty };
    } else if (cart[sku]) {
      cart[sku].qty = newQty;
    } else {
      const card = document.querySelector(`.dish-card[data-sku="${sku}"]`);
      if (card) {
        cart[sku] = {
          name: card.dataset.name,
          price: parseFloat(card.dataset.price),
          img: card.dataset.img,
          category: card.dataset.category,
          qty: newQty
        };
      }
    }
  }

  syncCardUI(sku);
  renderFloatingBar();
  renderCheckoutSheetItems();
}

function syncCardUI(sku) {
  const card = document.querySelector(`.dish-card[data-sku="${sku}"]`);
  if (!card) return;

  const currentQty = cart[sku] ? cart[sku].qty : 0;
  const initialBtn = card.querySelector('.btn-add-initial');
  const controller = card.querySelector('.qty-controller');
  const display = card.querySelector('.qty-display');

  if (currentQty > 0) {
    card.classList.add('in-cart');
    if (initialBtn) initialBtn.style.display = 'none';
    if (controller) controller.style.display = 'flex';
    if (display) display.textContent = currentQty;
  } else {
    card.classList.remove('in-cart');
    if (initialBtn) initialBtn.style.display = 'inline-flex';
    if (controller) controller.style.display = 'none';
    if (display) display.textContent = '0';
  }
}

function calculateTotal() {
  return Object.values(cart).reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function calculateTotalCount() {
  return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
}

function renderFloatingBar() {
  const bar = document.getElementById('floatingCartBar');
  const totalCountEl = document.getElementById('cartTotalCount');
  const totalAmountEl = document.getElementById('cartTotalAmount');

  const count = calculateTotalCount();
  const total = calculateTotal();

  if (count > 0) {
    bar.classList.add('visible');
    totalCountEl.textContent = count;
    totalAmountEl.textContent = `$${total.toLocaleString('es-AR')}`;
  } else {
    bar.classList.remove('visible');
    closeCheckoutModal();
  }
}

/* ==========================================
   MODAL DE CHECKOUT & RESUMEN DE PEDIDO
   ========================================== */
function initCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  const openBtn = document.getElementById('btnOpenCart');
  const closeBtn = document.getElementById('btnCloseSheet');
  const sendBtn = document.getElementById('btnSendWhatsapp');

  if (openBtn) {
    openBtn.addEventListener('click', openCheckoutModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCheckoutModal);
  }

  // Cerrar al clickear en backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCheckoutModal();
    });
  }

  // Tecla Escape para cerrar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCheckoutModal();
    }
  });

  // Selector de Entrega (Retiro vs Delivery)
  document.querySelectorAll('.delivery-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.delivery-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      checkoutConfig.deliveryType = btn.dataset.value;

      const addressGroup = document.getElementById('addressGroup');
      if (checkoutConfig.deliveryType === 'delivery') {
        addressGroup.style.display = 'flex';
      } else {
        addressGroup.style.display = 'none';
      }
    });
  });

  // Selector de Pago (Efectivo / Transferencia)
  document.querySelectorAll('.payment-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.payment-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      checkoutConfig.paymentMethod = btn.dataset.value;
    });
  });

  // Botón Enviar a WhatsApp
  if (sendBtn) {
    sendBtn.addEventListener('click', submitOrder);
  }
}

function openCheckoutModal() {
  const count = calculateTotalCount();
  if (count === 0) return;

  renderCheckoutSheetItems();
  updateModalTotals();

  const modal = document.getElementById('checkoutModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function renderCheckoutSheetItems() {
  const listContainer = document.getElementById('orderItemsList');
  if (!listContainer) return;

  const items = Object.entries(cart);
  if (items.length === 0) {
    listContainer.innerHTML = '<p style="text-align:center; color:#888; padding:16px;">Tu carrito está vacío.</p>';
    return;
  }

  listContainer.innerHTML = items.map(([sku, item]) => `
    <div class="order-item-row" data-sku="${sku}">
      <div class="item-info">
        <img class="item-thumb" src="${item.img}" alt="${item.name}" loading="lazy" />
        <div>
          <div class="item-name">${item.name}</div>
          <div style="font-size:12px; color:#78716c;">$${item.price.toLocaleString('es-AR')} c/u</div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="qty-controller" style="display:flex;">
          <button type="button" class="qty-btn qty-btn-minus" aria-label="Disminuir">−</button>
          <span class="qty-display">${item.qty}</span>
          <button type="button" class="qty-btn qty-btn-plus" aria-label="Aumentar">+</button>
        </div>
        <div class="item-subtotal">$${(item.price * item.qty).toLocaleString('es-AR')}</div>
      </div>
    </div>
  `).join('');

  updateModalTotals();
}

function updateModalTotals() {
  const total = calculateTotal();
  const subtotalEl = document.getElementById('summarySubtotal');
  const finalTotalEl = document.getElementById('summaryFinalTotal');

  if (subtotalEl) subtotalEl.textContent = `$${total.toLocaleString('es-AR')}`;
  if (finalTotalEl) finalTotalEl.textContent = `$${total.toLocaleString('es-AR')}`;
}

/* ==========================================
   FORMATO Y ENVÍO A WHATSAPP
   ========================================== */
function submitOrder() {
  const items = Object.values(cart);
  if (items.length === 0) {
    alert("Por favor, agregá productos antes de finalizar el pedido 😉");
    return;
  }

  const customerName = document.getElementById('customerName')?.value.trim() || '';
  const customerAddress = document.getElementById('customerAddress')?.value.trim() || '';
  const customerNotes = document.getElementById('customerNotes')?.value.trim() || '';

  if (checkoutConfig.deliveryType === 'delivery' && !customerAddress) {
    alert("Por favor ingresá tu dirección para el envío.");
    document.getElementById('customerAddress').focus();
    return;
  }

  const finalTotal = calculateTotal();
  const paymentText = checkoutConfig.paymentMethod === 'transfer' ? 'Transferencia' : 'Efectivo';
  const deliveryText = checkoutConfig.deliveryType === 'delivery'
    ? `Envío a domicilio: ${customerAddress}`
    : 'Retiro por el local';

  let order = `*Pedido - Shawarma Margaryan*\n\n`;

  if (customerName) {
    order += `Cliente: ${customerName}\n`;
  }
  order += `Entrega: ${deliveryText}\n`;
  order += `Pago: ${paymentText}\n`;

  if (customerNotes) {
    order += `Nota: ${customerNotes}\n`;
  }

  order += `\n`;
  items.forEach(item => {
    order += `- ${item.qty} x ${item.name} ($${item.price.toLocaleString("es-AR")})\n`;
  });

  order += `\n*Total: $${finalTotal.toLocaleString("es-AR")}*`;

  const encodedMsg = encodeURIComponent(order);
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMsg}`;

  window.open(whatsappUrl, '_blank');
}

/* ==========================================
   NAVEGACIÓN POR CATEGORÍAS (PILLS)
   ========================================== */
function initCategoryPills() {
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = pill.getAttribute('href')?.replace('#', '');
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      }
    });
  });

  const sections = document.querySelectorAll('.menu-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        pills.forEach(pill => {
          if (pill.getAttribute('href') === `#${id}`) {
            pill.classList.add('active');
          } else {
            pill.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================
   BÚSQUEDA EN TIEMPO REAL
   ========================================== */
function initSearch() {
  const searchInput = document.getElementById('dishSearchInput');
  const cards = document.querySelectorAll('.dish-card');
  const sections = document.querySelectorAll('.menu-section');
  const noResults = document.getElementById('noSearchResults');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let anyVisible = false;

    sections.forEach(section => {
      const sectionCards = section.querySelectorAll('.dish-card');
      let sectionHasMatches = false;

      sectionCards.forEach(card => {
        const name = (card.dataset.name || '').toLowerCase();
        const desc = (card.dataset.desc || '').toLowerCase();
        const cat = (card.dataset.category || '').toLowerCase();

        if (name.includes(query) || desc.includes(query) || cat.includes(query)) {
          card.style.display = 'flex';
          sectionHasMatches = true;
          anyVisible = true;
        } else {
          card.style.display = 'none';
        }
      });

      section.style.display = sectionHasMatches ? 'block' : 'none';
    });

    if (noResults) {
      if (!anyVisible && query.length > 0) {
        noResults.classList.add('visible');
      } else {
        noResults.classList.remove('visible');
      }
    }
  });
}
