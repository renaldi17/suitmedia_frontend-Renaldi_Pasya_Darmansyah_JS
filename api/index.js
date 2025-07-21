const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then((mod) => mod.default(...args));
const app = express();
const PORT = 3000;

app.get("/proxi", async (req, res) => {
  const query = req.url.replace(/^\/proxi\??/, "");
  const url =
    "https://suitmedia-backend.suitdev.com/api/ideas" +
    (query ? "?" + query : "");
  console.log("Proxying to:", url);
  try {
    const apiRes = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await apiRes.text();
    console.log("API response status:", apiRes.status);
    res.set("Content-Type", "application/json");
    res.set("X-Proxy-Status", apiRes.status);
    res.status(apiRes.status).send(data);
  } catch (e) {
    console.error("Proxy error:", e);
    res.status(500).json({ error: "Proxy error", detail: e.message });
  }
});

app.get("/", (req, res) => {
  res.send(
    "<!DOCTYPE html>" +
      '<html lang="id">' +
      "<head>" +
      '    <meta charset="UTF-8">' +
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      "  <title>Ideas - Suitmedia</title>" +
      '  <link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet">' +
      "  <style>" +
      "    html, body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; background: #fafafa; color: #222; }" +
      "    body { margin: 0; }" +
      "    a { text-decoration: none; color: inherit; }" +
      "    .header { position: fixed; top: 0; left: 0; right: 0; z-index: 110; background: #ff6a13; box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: background 0.3s; backdrop-filter: blur(8px); }" +
      "    .header .container { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 64px; }" +
      "    .logo { font-weight: bold; font-size: 1.5rem; color: #fff; letter-spacing: 1px; background: transparent; padding: 6px 18px 6px 12px; border-radius: 0 0 16px 0; box-shadow: none; }" +
      "    .logo span { color: #fff; font-weight: 400; }" +
      "    nav ul { display: flex; gap: 28px; list-style: none; margin: 0; padding: 0; }" +
      "    nav ul li a { padding: 7px 16px; border-radius: 6px; font-weight: 500; color: #fff; background: transparent; transition: background 0.2s, color 0.2s; position: relative; }" +
      "    nav ul li a.active, nav ul li a:hover { background: #fff; color: #ff6a13; }" +
      "    nav ul li a.active::after { content: ''; display: block; position: absolute; left: 0; right: 0; bottom: -7px; height: 3px; background: #fff; border-radius: 2px; }" +
      "    @media (max-width: 900px) { .header .container { padding: 0 10px; } nav ul { gap: 10px; } }" +
      "    @media (max-width: 600px) { .header .container { flex-direction: column; height: auto; } .logo { margin-bottom: 8px; } }" +
      "    .banner { position: relative; height: 320px; display: flex; align-items: flex-end; justify-content: center; overflow: hidden; margin-bottom: 32px; margin-top: 108px; }" +
      "    .banner-image { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat; z-index: 1; will-change: transform; transition: transform 0.3s; clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }" +
      "    .banner-text { position: relative; z-index: 2; text-align: center; color: #fff; margin-bottom: 40px; width: 100%; }" +
      "    .banner-text h1 { font-size: 2.8rem; font-weight: bold; letter-spacing: 1px; margin-bottom: 8px; }" +
      "    .banner-text p { font-size: 1.2rem; }" +
      "    @media (max-width: 700px) { .banner { height: 180px; margin-top: 90px; } .banner-text h1 { font-size: 1.5rem; } }" +
      "    .ideas-list { max-width: 1200px; margin: 0 auto; padding: 24px; }" +
      "    .ideas-controls { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 12px; }" +
      "    .ideas-controls .left { font-size: 0.98rem; color: #666; }" +
      "    .ideas-controls .right { display: flex; gap: 18px; align-items: center; }" +
      "    .ideas-controls label { font-size: 0.98rem; color: #666; margin-right: 4px; }" +
      "    .ideas-controls select { border: 1px solid #ddd; border-radius: 4px; padding: 4px 10px; font-size: 1rem; }" +
      "    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }" +
      "    .card { background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.2s; }" +
      "    .card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.10); }" +
      "    .card-thumb { width: 100%; aspect-ratio: 4/3; object-fit: cover; background: #eee; display: block !important; opacity: 1 !important; }" +
      "    .card-body { padding: 16px 14px 18px 14px; display: flex; flex-direction: column; flex: 1; }" +
      "    .card-date { font-size: 0.9rem; color: #ff6a13; margin-bottom: 6px; }" +
      "    .card-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: 3.6em; line-height: 1.2em; }" +
      "    .card-desc { font-size: 0.98rem; color: #555; flex: 1; }" +
      "    .ideas-pagination { display: flex; justify-content: center; margin: 32px 0 0 0; gap: 6px; }" +
      "    .pagination-btn { background: #fff; border: 1px solid #eee; color: #ff6a13; padding: 6px 12px; border-radius: 50%; cursor: pointer; min-width: 32px; font-weight: 500; transition: background 0.2s, color 0.2s; }" +
      "    .pagination-btn.active, .pagination-btn:hover { background: #ff6a13; color: #fff; }" +
      "    .pagination-ellipsis { padding: 6px 10px; color: #aaa; }" +
      "    @media (max-width: 700px) { .ideas-list { padding: 10px; } .cards { gap: 12px; } }" +
      "  </style>" +
      "</head>" +
      "<body>" +
      '  <header id="main-header" class="header">' +
      '    <div class="container">' +
      '      <a href="#" class="logo">suit<span>media</span></a>' +
      "      <nav>" +
      "        <ul>" +
      '          <li><a href="#">Work</a></li>' +
      '          <li><a href="#">About</a></li>' +
      '          <li><a href="#">Services</a></li>' +
      '          <li><a href="#" class="active">Ideas</a></li>' +
      '          <li><a href="#">Careers</a></li>' +
      '          <li><a href="#">Contact</a></li>' +
      "        </ul>" +
      "      </nav>" +
      "    </div>" +
      "  </header>" +
      '  <section class="banner">' +
      '    <div class="banner-image"></div>' +
      '    <div class="banner-text">' +
      "      <h1>Ideas</h1>" +
      "      <p>Where all our great things begin</p>" +
      "    </div>" +
      "  </section>" +
      "  <main>" +
      '    <section class="ideas-list">' +
      '      <div class="ideas-controls">' +
      '        <div class="left" id="status-text">Loading...</div>' +
      '        <div class="right">' +
      '          <label for="show-per-page">Show per page:</label>' +
      '          <select id="show-per-page">' +
      '            <option value="10">10</option>' +
      '            <option value="20">20</option>' +
      '            <option value="50">50</option>' +
      "          </select>" +
      '          <label for="sort-by">Sort by:</label>' +
      '          <select id="sort-by">' +
      '            <option value="-published_at">Newest</option>' +
      '            <option value="published_at">Oldest</option>' +
      "          </select>" +
      "        </div>" +
      "      </div>" +
      '      <div id="ideas-cards" class="cards"></div>' +
      '      <div id="ideas-pagination" class="ideas-pagination"></div>' +
      "    </section>" +
      "  </main>" +
      "  <script>" +
      "    function escapeHtml(str) {" +
      '      return String(str).replace(/"/g, "&quot;").replace(/\'/g, "&#39;");' +
      "    }" +
      '    window.addEventListener("scroll", function() {' +
      '      var bannerImg = document.querySelector(".banner-image");' +
      "      if (bannerImg) {" +
      '        bannerImg.style.transform = "translateY(" + (window.scrollY * 0.3) + "px)";' +
      "      }" +
      "    });" +
      '    document.addEventListener("DOMContentLoaded", function() {' +
      '      var bannerImg = document.querySelector(".banner-image");' +
      "      if (bannerImg) {" +
      "        bannerImg.style.backgroundImage = \"url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80')\";" +
      "      }" +
      "    });" +
      "    function getQuery() {" +
      "      var url = new URL(window.location);" +
      "      return {" +
      '        page: parseInt(url.searchParams.get("page")) || 1,' +
      '        size: parseInt(url.searchParams.get("size")) || 10,' +
      '        sort: url.searchParams.get("sort") || "-published_at"' +
      "      };" +
      "    }" +
      "    function setQuery(obj) {" +
      "      var url = new URL(window.location);" +
      '      url.searchParams.set("page", obj.page);' +
      '      url.searchParams.set("size", obj.size);' +
      '      url.searchParams.set("sort", obj.sort);' +
      '      window.history.replaceState({}, "", url);' +
      "    }" +
      "    async function fetchIdeas(obj) {" +
      '      var url = "/proxi?page[number]=" + obj.page + "&page[size]=" + obj.size + "&append[]=small_image&append[]=medium_image&sort=" + obj.sort;' +
      "      var res = await fetch(url);" +
      '      if (!res.ok) throw new Error("Gagal fetch data");' +
      "      return res.json();" +
      "    }" +
      "    function renderControls(obj) {" +
      '      document.getElementById("status-text").textContent = "Showing " + obj.from + " - " + obj.to + " of " + obj.total;' +
      '      document.getElementById("show-per-page").value = obj.size;' +
      '      document.getElementById("sort-by").value = obj.sort;' +
      "    }" +
      "    function getFullImageUrl(img) {" +
      '      if (!img) return "";' +
      "      if (Array.isArray(img) && img.length > 0) {" +
      "        return getFullImageUrl(img[0]);" +
      "      }" +
      '      if (typeof img === "string") {' +
      '        if (img.startsWith("http")) return img;' +
      '        return "https://suitmedia-backend.suitdev.com" + img;' +
      "      }" +
      '      if (typeof img === "object" && img.url) {' +
      '        if (img.url.startsWith("http")) return img.url;' +
      '        return "https://suitmedia-backend.suitdev.com" + img.url;' +
      "      }" +
      '      return "";' +
      "    }" +
      "    function renderCards(items) {" +
      '      var cards = document.getElementById("ideas-cards");' +
      "      cards.innerHTML = items.map(function(item) {" +
      '        var thumb = escapeHtml(getFullImageUrl(item.small_image) || getFullImageUrl(item.medium_image) || "https://via.placeholder.com/400x300?text=No+Image");' +
      "        return '<div class=\"card\">' +" +
      '          \'<img class="card-thumb" src="\' + thumb + \'" alt="\' + escapeHtml(item.title) + \'" loading="lazy" onerror="this.onerror=null;this.src=\\\'https://via.placeholder.com/400x300?text=No+Image\\\';" />\' +' +
      "          '<div class=\"card-body\">' +" +
      '          \'<div class="card-date">\' + new Date(item.published_at).toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" }) + \'</div>\' +' +
      "          '<div class=\"card-title\">' + escapeHtml(item.title) + '</div>' +" +
      "          '</div>' +" +
      "          '</div>';" +
      '      }).join("");' +
      "    }" +
      "    function renderPagination(obj) {" +
      "      var totalPages = Math.ceil(obj.total/obj.size);" +
      '      var pag = document.getElementById("ideas-pagination");' +
      '      var html = "";' +
      "      var range = [];" +
      "      for(var i=1; i<=totalPages; i++) {" +
      "        if (i === 1 || i === totalPages || Math.abs(i-obj.page)<=2) {" +
      "          range.push(i);" +
      "        } else if (i === obj.page-3 || i === obj.page+3) {" +
      '          range.push("...");' +
      "        }" +
      "      }" +
      "      var last = null;" +
      "      range.forEach(function(i) {" +
      '        if (i === "...") {' +
      '          if (last !== "...") html += \'<span class="pagination-ellipsis">...</span>\';' +
      "        } else {" +
      "          html += '<button class=\"pagination-btn' + (i===obj.page?\" active\":\"\") + '\" data-page=\"' + i + '\">' + i + '</button>';" +
      "        }" +
      "        last = i;" +
      "      });" +
      "      pag.innerHTML = html;" +
      '      pag.querySelectorAll(".pagination-btn").forEach(function(btn) {' +
      "        btn.onclick = function(e) {" +
      "          setQuery({page:parseInt(btn.dataset.page), size:obj.size, sort:getQuery().sort});" +
      "          loadIdeas();" +
      "        };" +
      "      });" +
      "    }" +
      "    async function loadIdeas() {" +
      "      var q = getQuery();" +
      "      try {" +
      "        var data = await fetchIdeas(q);" +
      "        renderControls({page:q.page, size:q.size, sort:q.sort, total:data.meta.total, from:data.meta.from, to:data.meta.to});" +
      "        renderCards(data.data);" +
      "        renderPagination({page:q.page, size:q.size, total:data.meta.total});" +
      "      } catch (e) {" +
      '        document.getElementById("status-text").textContent = "Failed to load ideas.";' +
      '        document.getElementById("ideas-cards").innerHTML = "";' +
      '        document.getElementById("ideas-pagination").innerHTML = "";' +
      "      }" +
      "    }" +
      '    document.getElementById("show-per-page").onchange = function(e) {' +
      "      setQuery({page:1, size:parseInt(e.target.value), sort:getQuery().sort});" +
      "      loadIdeas();" +
      "    };" +
      '    document.getElementById("sort-by").onchange = function(e) {' +
      "      setQuery({page:1, size:getQuery().size, sort:e.target.value});" +
      "      loadIdeas();" +
      "    };" +
      '    window.addEventListener("DOMContentLoaded", loadIdeas);' +
      "  </script>" +
      "</body>" +
      "</html>"
  );
});

export default function handler(req, res) {
  res.status(200).json({ message: "It works!" });
}
