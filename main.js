/* ============================================================
   MAYNAKH — ЕРӨНХИЙ JAVASCRIPT
   Энэ файлд бүтээгдэхүүн харуулах, шүүлтүүр, лайтбокс зэрэг
   бүх хуудсанд хэрэглэгддэг функцууд бий.
   Бүтээгдэхүүний МЭДЭЭЛЛИЙГ /js/products-data.js файлаас өөрчилнө.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initScrollReveal();
    initLightbox();

    const page = document.body.dataset.page;
    if (page === "home") initHomePage();
    if (page === "products") initProductsPage();
    if (page === "product-detail") initProductDetailPage();
});

/* ---------- MOBILE NAV ---------- */
function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
}

/* ---------- SCROLL REVEAL (one restrained pattern, reused) ---------- */
function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length || !("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("in-view"));
        return;
    }
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 }
    );
    items.forEach((el) => io.observe(el));
}

/* ---------- HELPERS ---------- */
function categoryName(catId) {
    const c = CATEGORIES.find((c) => c.id === catId);
    return c ? c.name : catId;
}

function productCardHTML(p) {
    return `
    <article class="cut-card product-card reveal" data-category="${p.category}">
      <a href="product-detail.html?id=${p.id}" class="thumb">
        <img src="${p.images.front}" alt="${p.name} — урд тал" loading="lazy">
        <img class="img-back" src="${p.images.back}" alt="${p.name} — ар тал" loading="lazy">
        <span class="cat-tag">${categoryName(p.category)}</span>
      </a>
      <div class="body">
        <h3><a href="product-detail.html?id=${p.id}">${p.name}</a></h3>
        <p>${p.shortDesc}</p>
        <a class="view-link" href="product-detail.html?id=${p.id}">Дэлгэрэнгүй үзэх <span class="arrow">→</span></a>
      </div>
    </article>`;
}

/* ---------- HOME PAGE ---------- */
function initHomePage() {
    // Featured products: first 4
    const featuredEl = document.getElementById("featured-products");
    if (featuredEl) {
        featuredEl.innerHTML = PRODUCTS.slice(0, 4).map(productCardHTML).join("");
        initScrollReveal();
    }
    // Categories
    const catEl = document.getElementById("category-grid");
    if (catEl) {
        catEl.innerHTML = CATEGORIES.map(
            (c, i) => `
      <a href="products.html?cat=${c.id}" class="cut-card category-card reveal">
        <span class="cat-index">${String(i + 1).padStart(2, "0")}</span>
        <h3>${c.name}</h3>
        <p>${c.desc}</p>
      </a>`
        ).join("");
        initScrollReveal();
    }
}

/* ---------- PRODUCTS PAGE ---------- */
function initProductsPage() {
    const grid = document.getElementById("products-grid");
    const filterBar = document.getElementById("filter-bar");
    if (!grid) return;

    const urlCat = new URLSearchParams(window.location.search).get("cat") || "all";

    filterBar.innerHTML =
        `<button class="filter-btn" data-cat="all">Бүх бүтээгдэхүүн</button>` +
        CATEGORIES.map((c) => `<button class="filter-btn" data-cat="${c.id}">${c.name}</button>`).join("");

    function render(cat) {
        const list = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
        grid.innerHTML = list.length ?
            list.map(productCardHTML).join("") :
            `<p>Энэ ангилалд одоогоор бүтээгдэхүүн алга.</p>`;
        filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.toggle("active", b.dataset.cat === cat));
        initScrollReveal();
    }

    filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        render(btn.dataset.cat);
        const url = new URL(window.location);
        if (btn.dataset.cat === "all") url.searchParams.delete("cat");
        else url.searchParams.set("cat", btn.dataset.cat);
        window.history.replaceState({}, "", url);
    });

    render(urlCat);
}

/* ---------- PRODUCT DETAIL PAGE ---------- */
function initProductDetailPage() {
    const id = new URLSearchParams(window.location.search).get("id");
    const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
    const root = document.getElementById("product-detail-root");
    if (!root || !product) return;

    const imgOrder = [
        { key: "front", label: "Бодит зураг" },
        { key: "back", label: "Бодит зураг" },
        { key: "detail", label: "Бодит зураг" },
        { key: "lifestyle", label: "Бодит зураг" },
    ];

    const materials = product.materials.map((key) => MATERIALS_LIBRARY[key]);

    document.title = `${product.name} — Өлзийт мөнх овоо ХХК`;

    root.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Нүүр</a> / <a href="products.html">Бүтээгдэхүүн</a> /
      <a href="products.html?cat=${product.category}">${categoryName(product.category)}</a> / ${product.name}
    </div>

    <div class="split" style="align-items:flex-start;">
      <div>
        <div class="gallery-main" id="gallery-main">
          <img id="gallery-main-img" src="${product.images.front}" alt="${product.name}">
        </div>
        <div class="gallery-thumbs">
          ${imgOrder
            .map(
              (v, i) => `
            <button data-src="${product.images[v.key]}" data-caption="${product.name} — ${v.label}" class="${i === 0 ? "active" : ""}">
              <img src="${product.images[v.key]}" alt="${v.label}">
            </button>`
            )
            .join("")}
        </div>
      </div>

      <div class="detail-info">
        <div class="detail-tags">
          <span class="tag accent">${categoryName(product.category)}</span>
        </div>
        <h1>${product.name}</h1>
        <p>${product.shortDesc}</p>

        <div class="option-row">
          <h4>Өнгө</h4>
          <div class="swatches">${product.colors.map((c) => `<span class="swatch">${c}</span>`).join("")}</div>
        </div>
        <div class="option-row">
          <h4>Хэмжээ</h4>
          <div class="swatches">${product.sizes.map((s) => `<span class="swatch size">${s}</span>`).join("")}</div>
        </div>

        <div class="hero-cta" style="margin-top:32px;">
          <a href="#contact-cta" class="btn btn-primary">Захиалгын талаар холбогдох</a>
          <a href="products.html?cat=${product.category}" class="btn btn-outline dark">Ижил төрлийн бүтээгдэхүүн</a>
        </div>
      </div>
    </div>

    <div class="detail-tab-nav" role="tablist">
      <button class="active" data-tab="overview">Ерөнхий мэдээлэл</button>
      <button data-tab="materials">Ашигласан материал</button>
      <button data-tab="construction">Оёдол ба бүтэц</button>
      <button data-tab="care">Арчилгаа</button>
    </div>

    <div class="detail-tab-panel active" data-panel="overview">
      <table class="spec-table">
        <tr><td>Зориулалт</td><td>${product.purpose}</td></tr>
        <tr><td>Эдэлгээ</td><td>${product.durability}</td></tr>
        <tr><td>Цаг агаарын тохироо</td><td>${product.weatherSuitability}</td></tr>
        <tr><td>Аюулгүй байдлын онцлог</td><td><ul>${product.safetyFeatures.map((f) => `<li>${f}</li>`).join("")}</ul></td></tr>
      </table>
    </div>

    <div class="detail-tab-panel" data-panel="materials">
      <p style="margin-bottom:24px;">Энэ бүтээгдэхүүнд ашигласан материалын дэлгэрэнгүй мэдээлэл. Материалын зургийг та /images/materials/ хавтаснаас өөрийн зургаар солих боломжтой.</p>
      <div class="grid grid-2">
        ${materials
          .map(
            (m) => `
          <div class="cut-card material-card reveal">
            <img src="${m.image}" alt="${m.name}">
            <div>
              <h4>${m.name}</h4>
              <div class="comp">${m.composition}</div>
              <ul>${m.properties.map((p) => `<li>${p}</li>`).join("")}</ul>
              <p class="why">${m.why}</p>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>

    <div class="detail-tab-panel" data-panel="construction">
      <table class="spec-table">
        <tr><td>Оёдол, бүтэц</td><td>${product.construction}</td></tr>
        <tr><td>Материалын бүрдэл</td><td>${materials.map((m) => m.composition).join("; ")}</td></tr>
      </table>
    </div>

    <div class="detail-tab-panel" data-panel="care">
      <table class="spec-table">
        <tr><td>Арчилгааны заавар</td><td><ul>${product.care.map((c) => `<li>${c}</li>`).join("")}</ul></td></tr>
      </table>
    </div>
  `;

  // gallery interactions
  const mainImg = document.getElementById("gallery-main-img");
  const mainWrap = document.getElementById("gallery-main");
  const thumbs = root.querySelectorAll(".gallery-thumbs button");
  thumbs.forEach((btn) => {
    btn.addEventListener("click", () => {
      mainImg.src = btn.dataset.src;
      thumbs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  mainWrap.addEventListener("click", () => openLightboxFromList(
    Array.from(thumbs).map((b) => ({ src: b.dataset.src, caption: b.dataset.caption })),
    Array.from(thumbs).findIndex((b) => b.classList.contains("active"))
  ));

  // tabs
  const tabBtns = root.querySelectorAll(".detail-tab-nav button");
  const panels = root.querySelectorAll(".detail-tab-panel");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      root.querySelector(`[data-panel="${btn.dataset.tab}"]`).classList.add("active");
    });
  });

  initScrollReveal();

  // Related products
  const relatedEl = document.getElementById("related-products");
  if (relatedEl) {
    const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
    const fallback = related.length ? related : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
    relatedEl.innerHTML = fallback.map(productCardHTML).join("");
    initScrollReveal();
  }
}

/* ---------- LIGHTBOX (used by product gallery + masonry gallery) ---------- */
let lightboxList = [];
let lightboxIndex = 0;

function initLightbox() {
  if (document.getElementById("site-lightbox")) return;
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.id = "site-lightbox";
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Хаах">&times;</button>
    <button class="lightbox-prev" aria-label="Өмнөх">&#8249;</button>
    <img src="" alt="">
    <button class="lightbox-next" aria-label="Дараах">&#8250;</button>
    <div class="lightbox-caption"></div>
  `;
  document.body.appendChild(lb);

  lb.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  lb.querySelector(".lightbox-prev").addEventListener("click", () => stepLightbox(-1));
  lb.querySelector(".lightbox-next").addEventListener("click", () => stepLightbox(1));
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  // masonry gallery images anywhere on the page with [data-lightbox-group]
  document.querySelectorAll("[data-lightbox-group]").forEach((group) => {
    const figures = Array.from(group.querySelectorAll("img"));
    const list = figures.map((img) => ({ src: img.src, caption: img.alt }));
    figures.forEach((img, i) => {
      img.addEventListener("click", () => openLightboxFromList(list, i));
    });
  });
}

function openLightboxFromList(list, index) {
  lightboxList = list;
  lightboxIndex = index;
  showLightbox();
}

function showLightbox() {
  const lb = document.getElementById("site-lightbox");
  const item = lightboxList[lightboxIndex];
  if (!item) return;
  lb.querySelector("img").src = item.src;
  lb.querySelector("img").alt = item.caption || "";
  lb.querySelector(".lightbox-caption").textContent = item.caption || "";
  lb.classList.add("open");
}

function stepLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxList.length) % lightboxList.length;
  showLightbox();
}

function closeLightbox() {
  document.getElementById("site-lightbox").classList.remove("open");
}
