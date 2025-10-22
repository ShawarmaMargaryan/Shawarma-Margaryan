<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Shawarma Margaryan</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#fffaf7; --pri:#b12b2b; --pri-dark:#911f1f;
    --ink:#222; --card:#fff; --mut:#777; --line:#eee;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{
    font-family:'Poppins',sans-serif;
    background:var(--bg);
    color:var(--ink);
    line-height:1.5;
    padding-bottom:80px;
  }

  /* HEADER */
  header{
    background:var(--card);
    position:sticky;top:0;z-index:10;
    border-bottom:1px solid var(--line);
    box-shadow:0 1px 6px rgba(0,0,0,.05);
  }
  .wrap{max-width:1100px;margin:auto;padding:14px}
  .brand{display:flex;gap:12px;align-items:center}
  .logo{width:54px;height:54px;border-radius:50%;overflow:hidden;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,.08)}
  .logo img{width:100%;height:100%;object-fit:cover}
  h1{margin:0;font-size:20px;color:var(--pri);font-weight:700}
  .sub{font-size:12px;color:var(--mut);margin-top:2px;line-height:1.3}

  /* CATEGORY TITLE */
  .cat-title {
    margin-top:28px;
    font-size:19px;
    font-weight:700;
    color:var(--pri);
    border-bottom:2px solid var(--pri);
    padding-bottom:4px;
  }

  /* GRID */
  .grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
    gap:16px;margin-top:14px;
  }

  /* CARD */
  .card{
    background:var(--card);
    border-radius:16px;
    padding:14px;
    display:flex;flex-direction:column;gap:10px;
    box-shadow:0 2px 10px rgba(0,0,0,.05);
    transition:.25s ease;
    border:1px solid var(--line);
    text-align:center;
  }
  .card:hover{transform:translateY(-3px);box-shadow:0 4px 14px rgba(0,0,0,.08)}
  .card img{
    width:100%;
    border-radius:12px;
    max-height:140px;
    object-fit:cover;
    box-shadow:0 1px 6px rgba(0,0,0,.06);
  }
  .name{font-weight:600;font-size:15px;margin-top:4px}
  .price{color:var(--pri);font-weight:700;font-size:15px}

  /* QTY */
  .qty{display:flex;gap:6px;align-items:center;justify-content:center;margin-top:6px}
  .qty button{
    border:0;background:var(--pri);color:#fff;
    border-radius:10px;width:34px;height:34px;
    font-size:18px;cursor:pointer;transition:.2s;font-weight:700;
  }
  .qty button:hover{background:var(--pri-dark)}
  .qty input{
    width:46px;text-align:center;border:1px solid #ccc;border-radius:8px;
    padding:6px;font-size:15px;font-weight:600;
  }

  /* SPECIAL SINGLE ITEM */
  .card.single img {
    max-height:200px;
    object-fit:contain;
    background:#fafafa;
    padding:8px;
  }

  /* CART BAR */
  .cart-bar{
    position:fixed;bottom:0;left:0;right:0;
    background:var(--pri);color:#fff;
    display:flex;justify-content:space-between;align-items:center;
    padding:12px 18px;
    font-size:17px;font-weight:600;
    box-shadow:0 -3px 12px rgba(0,0,0,.25);
  }
  .cart-bar span{display:flex;align-items:center;gap:8px}
  .cart-bar button{
    background:#fff;color:var(--pri);border:0;
    padding:12px 18px;border-radius:12px;font-weight:700;
    cursor:pointer;font-size:15px;transition:.3s;
  }
  .cart-bar button:hover{background:#f5f5f5;transform:scale(1.05)}

  /* MOBILE TUNING */
  @media (max-width:600px){
    .wrap{padding:12px}
    h1{font-size:18px}
    .cat-title{font-size:18px;margin-top:22px}
    .card{padding:12px;border-radius:14px}
    .card img{max-height:130px}
    .price{font-size:14px}
    .qty button{width:32px;height:32px}
    .qty input{width:42px}
    .cart-bar{font-size:16px;padding:10px 14px}
    .cart-bar button{padding:10px 16px;font-size:14px}
  }
</style>
</head>
<body>
<header>
  <div class="wrap brand">
    <div class="logo"><img src="https://images.rappi.com.ar/restaurants_logo/123-1738620610744.png" alt="Logo Shawarma Margaryan"></div>
    <div>
      <h1>SHAWARMA MARGARYAN</h1>
      <div class="sub">Cocina Armenia y Medio Oriente · Lun a Sáb 11–22:30 · Borges 2307, Palermo · <b>1150360400</b></div>
    </div>
  </div>
</header>

<main class="wrap">
  <!-- Shawarma -->
  <h2 class="cat-title">Shawarma</h2>
  <div class="grid">
    <div class="card"><img src="https://pedidosya.dhmedia.io/image/pedidosya/products/a628411a-8718-4ff5-a3db-6f0f0e028dd5.jpeg?quality=90&width=1680&webp=1&dpi=1.5"><span class="name">De carne</span><span class="price">$10000</span><div class="qty" data-sku="shawarma_carne" data-price="10000"></div></div>
    <div class="card"><img src="https://pedidosya.dhmedia.io/image/pedidosya/products/a7996d6e-0720-4003-b301-637923a32cd1.jpeg?quality=90&width=1680&webp=1&dpi=1.5"><span class="name">De pollo</span><span class="price">$10000</span><div class="qty" data-sku="shawarma_pollo" data-price="10000"></div></div>
    <div class="card"><img src="https://pedidosya.dhmedia.io/image/pedidosya/products/e0219a29-b62b-4807-9f21-6be2bfe3d91e.jpeg?quality=90&width=1680&webp=1&dpi=1.5"><span class="name">Mixto</span><span class="price">$11000</span><div class="qty" data-sku="shawarma_mixto" data-price="11000"></div></div>
    <div class="card"><img src="https://pedidosya.dhmedia.io/image/pedidosya/products/70b86905-40c3-42b3-9828-182e77662c15.jpeg?quality=90&width=1680&webp=1&dpi=1.5"><span class="name">Falafel (vegano)</span><span class="price">$9000</span><div class="qty" data-sku="shawarma_falafel" data-price="9000"></div></div>
    <div class="card"><img src="https://lh3.googleusercontent.com/pw/AP1GczO06okzCYWNXqwGwh8XVzi98k1rlfux1cy8AZcIRg3_lbnczwYN38irrRjIO1PZ5t9hziJUxhF-rNdI6xag4TM_K1I-TStVwbbkQS2hg-kdn2bBgT1E1XLFb9eqWV935hfnQtx1A1wMLQa5vNxE5Azz=w913-h913-s-no-gm?authuser=0"><span class="name">Plato con papas fritas</span><span class="price">$15000</span><div class="qty" data-sku="shawarma_papas" data-price="15000"></div></div>
  </div>

  <h2 class="cat-title">Falafel</h2>
  <div class="grid">
    <div class="card single"><img src="https://images.rappi.com.ar/products/859fc8e9-fb23-44ce-916c-0032acccac91.jpeg?e=webp&q=50&d=400x400.com/https://images.rappi.com.ar/products/859fc8e9-fb23-44ce-916c-0032acccac91.jpeg?e=webp&q=50&d=400x400" alt="Falafel"><span class="name">Falafel</span><span class="price">$3000</span><div class="qty" data-sku="Falafel" data-price="3000"></div></div>
  </div>
  <!-- Fatay -->
  <h2 class="cat-title">Fatay</h2>
  <div class="grid">
    <div class="card"><img src="https://images.rappi.com.ar/products/b4aa669a-b278-4cdd-af36-1d8dd5367ca7.jpeg?e=webp&q=50&d=400x400.com/https://images.rappi.com.ar/products/b4aa669a-b278-4cdd-af36-1d8dd5367ca7.jpeg?e=webp&q=50&d=400x400"><span class="name">De carne</span><span class="price">$3000</span><div class="qty" data-sku="fatay_carne" data-price="3000"></div></div>
    <div class="card"><img src="https://images.rappi.com.ar/products/e7f56937-d0fc-47f5-99d7-f560882a0335.jpeg?e=webp&q=50&d=400x400.com/https://images.rappi.com.ar/products/e7f56937-d0fc-47f5-99d7-f560882a0335.jpeg?e=webp&q=50&d=400x400"><span class="name">De pollo</span><span class="price">$3000</span><div class="qty" data-sku="fatay_pollo" data-price="3000"></div></div>
  </div>

  <!-- Lehmeyun -->
  <h2 class="cat-title">Lehmeyun</h2>
  <div class="grid">
    <div class="card single"><img src="https://lh3.googleusercontent.com/pw/AP1GczPqOWInTRMvMTk1f8DVsPGBgssg3matB3etPM-UkhBpWOYBRi_1kOwXVo8aQ7qQ0uVKUJSXFeF9HsHcOv7zhIqaF1SsplCuvvfUmmpoH7fpo82eDouYP94dK6_PgCK8YuGNQUnIzDbMWA8MoANMII3E=w913-h913-s-no-gm?authuser=0" alt="Lehmeyun"><span class="name">De carne</span><span class="price">$4000</span><div class="qty" data-sku="lehmayun_carne" data-price="4000"></div></div>
  </div>

  <!-- Sarma -->
  <h2 class="cat-title">Sarma</h2>
  <div class="grid">
    <div class="card single"><img src="https://lh3.googleusercontent.com/pw/AP1GczNMfGbZM0IQjVESELa2I4UwN6HmBkQUGD_6iRb4qEA6mLZkZJwdIm6PFRwYQX_D0_AGLQejKYLvEvy2Al2T5KJjT9KiKdB6ca_9xUgjPUYpQF4xqD602y9MiprZ2SoaaLXv8XjRQdvn6QIOMSOIjaji=w913-h913-s-no-gm?authuser=0" alt="Sarma"><span class="name">Hojas de parra y repollo</span><span class="price">$8000</span><div class="qty" data-sku="sarma" data-price="8000"></div></div>
  </div>

  <!-- Ensaladas -->
  <h2 class="cat-title">Ensaladas</h2>
  <div class="grid">
    <div class="card"><img src="https://pedidosya.dhmedia.io/image/pedidosya/products/22ff2b19-20fb-41cc-8ac9-1e9aafa7b07e.jpeg?quality=90&width=1680&webp=1&dpi=1.5"><span class="name">Tabule</span><span class="price">$5000</span><div class="qty" data-sku="tabule" data-price="5000"></div></div>
    <div class="card"><img src="https://pedidosya.dhmedia.io/image/pedidosya/products/c5501aa3-2da0-406a-8599-ad216b3a325a.jpeg?quality=90&width=1680&webp=1&dpi=1.5"><span class="name">Hummus</span><span class="price">$4000</span><div class="qty" data-sku="hummus" data-price="4000"></div></div>
  </div>

  <!-- Postres -->
  <h2 class="cat-title">Postres</h2>
  <div class="grid">
    <div class="card"><img src="https://pedidosya.dhmedia.io/image/pedidosya/products/fab93b6b-aeed-481d-8cf7-8cc5cc9b27c3.jpeg?quality=90&width=1680&webp=1&dpi=1.5"><span class="name">Baklava</span><span class="price">$4000</span><div class="qty" data-sku="baklava" data-price="4000"></div></div>
    <div class="card"><img src="https://lh3.googleusercontent.com/pw/AP1GczMbHuTWZSy59hDy23lRJVi-M96fPELpdaEc6vzr57ja4m99D2M2nUrNYWy8sqie2BeGiROgYmk75t4payNonhje38M5E6BPE0EfyOO6Xju04A1P_5lE9QzQ6PhPEMA54eLhUwzb_9peQX4crUNqawHc=w913-h913-s-no-gm?authuser=0"><span class="name">Gata</span><span class="price">$2000</span><div class="qty" data-sku="gata" data-price="2000"></div></div>
    <div class="card"><img src="https://pedidosya.dhmedia.io/image/pedidosya/products/96464e6f-f230-485f-9dd0-df182652f9a8.jpeg?quality=90&width=1680&webp=1&dpi=1.5"><span class="name">Mrjnabun</span><span class="price">$3000</span><div class="qty" data-sku="mrjnabun" data-price="3000"></div></div>
    <div class="card"><img src="https://lh3.googleusercontent.com/pw/AP1GczP0RgpBgRoHUICiSInASbiyMJJTab9-VQTbrXMvClCYktnh6pLEETO5iVXT5lTGF7JCBoHvX_IHpiwqksISdgbb7tUKKblNBriBBFKr9Xl4mT9GOaYsfbkpVoE1680sivR7qdqc_BmKIAXStk74yH5p=w913-h913-s-no-gm?authuser=0"><span class="name">Torta de miel</span><span class="price">$4000</span><div class="qty" data-sku="torta_miel" data-price="4000"></div></div>
  </div>

  <!-- Gaseosas -->
  <h2 class="cat-title">Gaseosas</h2>
  <div class="grid">
    <div class="card"><img src="https://acdn-us.mitiendanube.com/stores/001/147/879/products/41-fffa51ddc298ea133d17381885452641-1024-1024.png"><span class="name">Coca-Cola 500cc</span><span class="price">$2000</span><div class="qty" data-sku="coca" data-price="2000"></div></div>
    <div class="card"><img src="https://multicenter.vtexassets.com/arquivos/ids/304765/111686_Primary.jpg?v=638712553632100000"><span class="name">Fanta 500cc</span><span class="price">$2000</span><div class="qty" data-sku="fanta" data-price="2000"></div></div>
    <div class="card"><img src="https://acdn-us.mitiendanube.com/stores/003/795/536/products/77918134201181-02c1892ab7b2181d5e15952575329430-1024-1024-7d9e54ab089ddab94e169902079956241-90c755834d7f058cb216990208444790-1024-1024.jpg"><span class="name">Pepsi 500cc</span><span class="price">$2000</span><div class="qty" data-sku="pepsi" data-price="2000"></div></div>
  </div>
</main>

<div class="cart-bar">
  <span><span class="cart-icon">🛒</span> Total: $<span id="total">0</span></span>
  <button id="sendOrder">Finalizar pedido</button>
</div>

<script>
  const phoneNumber = "541150360400";

  document.querySelectorAll(".qty").forEach(el=>{
    const minus=document.createElement("button");minus.textContent="-";
    const plus=document.createElement("button");plus.textContent="+";
    const input=document.createElement("input");input.type="number";input.value=0;input.min=0;
    el.append(minus,input,plus);

    const updateTotal=()=>{
      let sum=0;
      document.querySelectorAll(".qty").forEach(q=>{
        sum+=q.querySelector("input").value*q.dataset.price;
      });
      document.getElementById("total").textContent=sum.toLocaleString("es-AR");
    };

    minus.onclick=()=>{if(input.value>0){input.value--;updateTotal()}}; 
    plus.onclick=()=>{input.value++;updateTotal()};
    input.oninput=updateTotal;
  });

  document.getElementById("sendOrder").onclick=()=>{
    let order="*Pedido - Shawarma Margaryan*%0A%0A";
    let total=0;
    document.querySelectorAll(".qty").forEach(q=>{
      const qty=+q.querySelector("input").value;
      if(qty>0){
        const name=q.parentElement.querySelector(".name").textContent;
        const price=+q.dataset.price;
        total+=qty*price;
        order+=`- ${qty} x ${name} ($${price})%0A`;
      }
    });

    if(total === 0){
      alert("Agregá productos antes de finalizar el pedido ");
      return;
    }

    const direccion = prompt("Ingresá tu dirección de entrega:");
    if(!direccion){
      alert("Por favor, ingresá una dirección para continuar.");
      return;
    }

    let metodo = prompt("¿Cómo vas a abonar? (Efectivo o Transferencia)").toLowerCase().trim();
    if(metodo !== "efectivo" && metodo !== "transferencia"){
      alert("Por favor, escribí 'efectivo' o 'transferencia'.");
      return;
    }

    order+=`%0A*Total: $${total.toLocaleString("es-AR")}*`;
    order+=`%0A%0A*Dirección:* ${direccion}`;
    order+=`%0A*Pago:* ${metodo.charAt(0).toUpperCase() + metodo.slice(1)}`;

    const url=`https://wa.me/${phoneNumber}?text=${order}`;
    window.open(url,"_blank");
  };
</script>
</body>
</html>
