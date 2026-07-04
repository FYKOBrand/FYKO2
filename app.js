function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* SHOP */
function renderShop() {
  const grid = document.getElementById("grid");

  PRODUCTS.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.img}" width="100%">
      <h3>${p.name}</h3>
      <p>${p.price} CHF</p>
      <button onclick="addToCart(${p.id})">ADD</button>
      <a href="product.html?id=${p.id}">VIEW</a>
    `;

    grid.appendChild(div);
  });
}

/* PRODUCT */
function renderProduct() {
  const id = new URLSearchParams(window.location.search).get("id");
  const p = PRODUCTS.find(x => x.id == id);

  document.getElementById("productPage").innerHTML = `
    <img src="${p.img}" width="400">
    <h1>${p.name}</h1>
    <p>${p.desc}</p>
    <h2>${p.price} CHF</h2>
    <button onclick="addToCart(${p.id})">ADD TO BAG</button>
  `;
}

/* CART */
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  const cart = getCart();
  cart.push(p);
  saveCart(cart);
}

function renderCart() {
  const cart = getCart();
  const box = document.getElementById("cartItems");
  const totalBox = document.getElementById("total");

  let total = 0;
  box.innerHTML = "";

  cart.forEach((p, i) => {
    total += p.price;

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.price} CHF</p>
      <button onclick="removeItem(${i})">REMOVE</button>
    `;
    box.appendChild(div);
  });

  totalBox.innerHTML = `<h2>Total: ${total} CHF</h2>`;
}

function removeItem(i) {
  const cart = getCart();
  cart.splice(i, 1);
  saveCart(cart);
  renderCart();
}

/* ORDER SYSTEM */
function placeOrder() {
  const order = {
    name: name.value,
    address: address.value,
    city: city.value,
    zip: zip.value,
    items: getCart()
  };

  if (!order.name || !order.address) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("order", JSON.stringify(order));
  localStorage.removeItem("cart");

  alert("ORDER CONFIRMED");
  window.location.href = "index.html";
}

/* UI */
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.innerText = getCart().length;
}

updateCartCount();
