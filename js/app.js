;
window.KIND_LABEL = {
  "mc": "Πολλαπλή επιλογή",
  "tf": "Σωστό / Λάθος",
  "match": "Αντιστοίχιση",
  "blank": "Συμπλήρωση κενού",
  "calc": "Υπολογισμός"
};
(function () {
  const GREEK = { a: "α", b: "β", c: "γ", d: "δ", e: "ε", f: "στ" };
  const KEY = "thermo-ch1-html-progress-v1";
  const CALLOUT_LAB = { def: "Ορισμός", example: "Παράδειγμα", remember: "Θυμήσου" };

  const state = {
    menu: false,
    step: 0,
    answers: [],
    checked: false,
    results: [],
    hint: false,
    matchPicked: null,
    blankPicked: null,
    exId: null,
  };

  function esc(s) {
    return String(s)
      .replace(/&/g, "\u0026amp;")
      .replace(/</g, "\u0026lt;")
      .replace(/>/g, "\u0026gt;")
      .replace(/"/g, "\u0026quot;");
  }
  function letter(id) {
    return GREEK[id] || id;
  }
  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  }
  function saveProgress(p) {
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch (e) {}
  }
  function progress() {
    const p = loadProgress();
    return { read: p.read || [], exercises: p.exercises || {} };
  }
  function markRead(slug) {
    const p = progress();
    if (!p.read.includes(slug)) p.read.push(slug);
    saveProgress(p);
  }
  function saveEx(id, result) {
    const p = progress();
    p.exercises[id] = result;
    saveProgress(p);
  }
  function resetProgress() {
    saveProgress({ read: [], exercises: {} });
    render();
  }

  const THEME_KEY = "site-theme-v1";
  function loadTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || "light";
    } catch (e) {
      return "light";
    }
  }
  function saveTheme(t) {
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch (e) {}
  }
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", loadTheme());
  }
  function themeToggleBtn(extraStyle) {
    const dark = loadTheme() === "dark";
    return (
      '<button class="btn btn-ghost" data-act="theme-toggle" style="' +
      (extraStyle || "") +
      '">' +
      (dark ? "☀️ Φωτεινό θέμα" : "🌙 Σκοτεινό θέμα") +
      "</button>"
    );
  }

  function parseNumber(raw) {
    const cleaned = String(raw).trim().replace(/\s/g, "").replace(",", ".");
    const match = cleaned.match(/-?\d+(?:\.\d+)?/);
    if (!match) return null;
    const value = Number(match[0]);
    return Number.isFinite(value) ? value : null;
  }
  function nearlyEqual(a, b, tolerance) {
    const t = tolerance == null ? 0.02 : tolerance;
    if (b === 0) return Math.abs(a) <= t;
    return Math.abs(a - b) / Math.abs(b) <= t || Math.abs(a - b) <= 0.51;
  }

  function route() {
    const raw = decodeURIComponent((location.hash || "#/").replace(/^#/, ""));
    const parts = raw.split("/").filter(Boolean);
    if (!parts.length) return { name: "site-home" };
    if (parts[0] === "grade" && parts[1]) return { name: "grade", id: parts[1] };
    if (parts[0] === "links") return { name: "links" };
    if (parts[0] === "math") return { name: "math" };
    if (parts[0] === "thermo") {
      const rest = parts.slice(1);
      if (!rest.length) return { name: "home" };
      if (rest[0] === "notes") return { name: "notes", slug: rest[1] || "genika" };
      if (rest[0] === "board" && rest[1]) return { name: "exercise", id: rest[1] };
      if (rest[0] === "board") return { name: "board" };
      return { name: "home" };
    }
    return { name: "site-home" };
  }
  function go(hash) {
    state.menu = false;
    location.hash = hash;
  }

  function getSection(slug) {
    return SECTIONS.find(function (s) {
      return s.slug === slug;
    });
  }
  function sectionChapter(s) {
    return String(s.num).split(".")[0];
  }
  function chaptersOf(list, chapterKey) {
    const seen = [];
    list.forEach(function (item) {
      const c = chapterKey(item);
      if (seen.indexOf(c) === -1) seen.push(c);
    });
    return seen;
  }
  function getExercise(id) {
    return EXERCISES.find(function (e) {
      return e.id === id;
    });
  }
  function adjacent(list, key, val) {
    const i = list.findIndex(function (x) {
      return x[key] === val;
    });
    return {
      prev: i > 0 ? list[i - 1] : null,
      next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
    };
  }

  function emptyAnswer(item) {
    if (item.kind === "mc") return { mc: null };
    if (item.kind === "tf") return { tf: null };
    if (item.kind === "match") return { match: {} };
    if (item.kind === "blank") return { blank: item.answers.map(function () { return null; }) };
    return { calc: "" };
  }
  function isFilled(item, a) {
    if (item.kind === "mc") return Boolean(a.mc);
    if (item.kind === "tf") return a.tf !== null && a.tf !== undefined;
    if (item.kind === "match") return Object.keys(a.match || {}).length === item.left.length;
    if (item.kind === "blank") return (a.blank || []).every(Boolean);
    return parseNumber(a.calc || "") !== null;
  }
  function isCorrect(item, a) {
    if (item.kind === "mc") return a.mc === item.answer;
    if (item.kind === "tf") return a.tf === item.answer;
    if (item.kind === "match") {
      const pairs = a.match || {};
      return item.left.every(function (l) {
        return pairs[l.id] === item.pairs[l.id];
      });
    }
    if (item.kind === "blank") {
      const slots = a.blank || [];
      return item.answers.every(function (ans, i) {
        return slots[i] === ans;
      });
    }
    const n = parseNumber(a.calc || "");
    if (n === null) return false;
    return nearlyEqual(n, item.answer, item.tolerance == null ? 0.02 : item.tolerance);
  }

  function resetEngine(ex) {
    state.exId = ex.id;
    state.step = 0;
    state.answers = ex.items.map(emptyAnswer);
    state.checked = false;
    state.results = ex.items.map(function () { return null; });
    state.hint = false;
    state.matchPicked = null;
    state.blankPicked = null;
  }

  function navHtml(r, board) {
    const p = progress();
    const done = EXERCISES.filter(function (e) {
      return p.exercises[e.id] && p.exercises[e.id].status === "done";
    }).length;
    let html = "";
    html += '<a data-act="go" data-to="#/" style="display:block;font-size:.85rem;color:var(--muted);margin-bottom:.6rem">← Όλα τα μαθήματα</a>';
    html += '<a class="brand" data-act="go" data-to="#/thermo">Θερμοδυναμική</a>';
    html += '<p class="brand-sub">Σημειώσεις &amp; τράπεζα θεμάτων</p>';
    html += themeToggleBtn("margin:0 0 .8rem");
    html += '<div class="nav">';
    const chapterIds = chaptersOf(SECTIONS, sectionChapter);
    chapterIds.forEach(function (chId) {
      html += '<p class="nav-kicker">' + (chapterIds.length > 1 ? "Κεφάλαιο " + chId : "Σημειώσεις") + "</p>";
      SECTIONS.filter(function (s) {
        return sectionChapter(s) === chId;
      }).forEach(function (s) {
        const on = r.name === "notes" && r.slug === s.slug;
        html +=
          '<a class="' +
          (on ? "active" : "") +
          '" data-act="go" data-to="#/thermo/notes/' +
          s.slug +
          '"><span class="num">' +
          esc(s.num) +
          "</span><span>" +
          esc(s.title) +
          "</span></a>";
      });
    });
    html += '<p class="nav-kicker">Πίνακας · ' + done + "/" + EXERCISES.length + "</p>";
    html +=
      '<a class="' +
      (r.name === "board" || r.name === "exercise" ? "active" : "") +
      '" data-act="go" data-to="#/thermo/board">Όλες οι ασκήσεις</a>';
    html += "</div>";
    return html;
  }

  function shell(inner, board, r) {
    return (
      '<div class="' +
      (board ? "board" : "paper") +
      '">' +
      '<header class="topbar hidden-lg">' +
      '<button class="icon-btn" data-act="menu" aria-label="Περιεχόμενα">☰</button>' +
      '<a data-act="go" data-to="#/thermo" style="font-family:var(--font-serif);font-size:1.15rem;flex:1">Θερμοδυναμική</a>' +
      '<button class="icon-btn" data-act="theme-toggle" aria-label="Εναλλαγή θέματος" title="Εναλλαγή θέματος">' +
      (loadTheme() === "dark" ? "☀️" : "🌙") +
      "</button>" +
      "</header>" +
      (state.menu
        ? '<div class="overlay"><button class="dim" data-act="menu-close"></button><aside class="drawer">' +
          '<div style="display:flex;justify-content:space-between;align-items:center"><p style="font-family:var(--font-serif);font-size:1.3rem;margin:0">Περιεχόμενα</p><button class="icon-btn" data-act="menu-close">✕</button></div>' +
          navHtml(r, board) +
          "</aside></div>"
        : "") +
      '<div class="layout"><aside class="sidebar desktop">' +
      navHtml(r, board) +
      '</aside><main class="main" id="main">' +
      inner +
      "</main></div></div>"
    );
  }

  function diagram(id, caption) {
    const cap = caption ? "<figcaption>" + esc(caption) + "</figcaption>" : "";
    const svgs = {
      "system-boundary":
        '<svg viewBox="0 0 360 200" width="100%"><text x="24" y="28" fill="#6a6358" font-size="12">Περιβάλλον</text><path d="M70 58c22-22 70-28 110-18s78 8 108 28c28 18 42 52 18 78-22 24-70 32-118 28-48-4-96 4-128-22-30-24-22-68 10-94z" fill="rgba(196,92,38,.12)" stroke="#c45c26" stroke-width="2" stroke-dasharray="7 5"/><text x="148" y="112" fill="#1a1714" font-size="14" font-family="serif">Σύστημα</text><text x="210" y="168" fill="#c45c26" font-size="11">Όριο</text><path d="M196 156l14-18" stroke="#c45c26" stroke-width="1.2"/></svg>',
      "closed-piston":
        '<svg viewBox="0 0 360 200" width="100%"><rect x="108" y="36" width="144" height="128" rx="4" fill="none" stroke="#1a1714" stroke-width="1.6"/><rect x="118" y="92" width="124" height="14" fill="#c45c26"/><rect x="172" y="92" width="16" height="86" fill="#3d3830"/><circle cx="180" cy="186" r="8" fill="#1a1714"/><path d="M128 48h104v36H128z" fill="rgba(196,92,38,.12)" stroke="#c45c26" stroke-width="1.4" stroke-dasharray="4 3"/><text x="150" y="70" fill="#c45c26" font-size="11">αέριο, m = σταθ.</text><text x="118" y="28" fill="#6a6358" font-size="11">κύλινδρος — έμβολο</text></svg>',
      "isolated-adiabatic":
        '<div class="grid-2"><div class="diagram"><svg viewBox="0 0 220 180" width="100%"><rect x="54" y="28" width="112" height="124" rx="56" fill="none" stroke="#1a1714" stroke-width="10"/><rect x="70" y="44" width="80" height="92" rx="40" fill="rgba(196,92,38,.12)" stroke="#c45c26"/><text x="78" y="96" font-size="12" font-family="serif">θερμός</text><text x="62" y="168" fill="#6a6358" font-size="11">μονωμένο · E = σταθ.</text></svg></div><div class="diagram"><svg viewBox="0 0 220 180" width="100%"><rect x="48" y="36" width="124" height="100" rx="8" fill="none" stroke="#1a1714" stroke-width="8"/><circle cx="110" cy="84" r="14" fill="rgba(196,92,38,.2)" stroke="#c45c26"/><path d="M110 70v28M96 84h28" stroke="#c45c26" stroke-width="1.4"/><path d="M158 56h22v24h-12" fill="none" stroke="#1a1714" stroke-width="1.6"/><text x="54" y="158" fill="#6a6358" font-size="11">αδιαβατικό + έργο</text></svg></div></div>',
      "open-flow":
        '<div><div class="diagram"><svg viewBox="0 0 360 140" width="100%"><path d="M70 40c40-18 90-18 130 0s90 22 130 4" fill="none" stroke="#c45c26" stroke-width="1.6" stroke-dasharray="6 4"/><path d="M70 108c40 14 90 18 130 0s90-20 130-4" fill="none" stroke="#c45c26" stroke-width="1.6" stroke-dasharray="6 4"/><path d="M36 74h70" stroke="#1a1714" stroke-width="2"/><polygon points="106,74 94,68 94,80" fill="#1a1714"/><path d="M254 74h70" stroke="#1a1714" stroke-width="2"/><polygon points="324,74 312,68 312,80" fill="#1a1714"/><text x="40" y="60" fill="#6a6358" font-size="11">μάζα</text><text x="148" y="78" font-size="13" font-family="serif">σύστημα</text><text x="268" y="60" fill="#6a6358" font-size="11">μάζα</text></svg></div><div class="diagram" style="margin-top:.5rem"><svg viewBox="0 0 360 120" width="100%"><ellipse cx="150" cy="60" rx="70" ry="34" fill="rgba(196,92,38,.1)" stroke="#c45c26" stroke-dasharray="6 4"/><rect x="210" y="46" width="70" height="28" rx="4" fill="none" stroke="#1a1714"/><path d="M280 60h40" stroke="#1a1714" stroke-width="2"/><polygon points="320,60 308,54 308,66" fill="#1a1714"/><text x="122" y="64" font-size="12" font-family="serif">φιάλη</text><text x="286" y="48" fill="#6a6358" font-size="11">μάζα</text></svg></div></div>',
      "system-choice": (function () {
        const cards = [
          { title: "Λάθος", note: "Το όριο κόβει την τριβή", ok: false, kind: "cut" },
          { title: "Σωστό", note: "Και οι δύο επιφάνειες μέσα", ok: true, kind: "in" },
          { title: "Σωστό", note: "Και οι δύο επιφάνειες έξω", ok: true, kind: "out" },
        ];
        return (
          '<div class="grid-2" style="grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))">' +
          cards
            .map(function (c) {
              let dots = "";
              if (c.kind === "cut")
                dots =
                  '<circle cx="78" cy="56" r="8" fill="#1a1714"/><circle cx="108" cy="56" r="8" fill="none" stroke="#1a1714" stroke-width="1.5"/>';
              else if (c.kind === "in")
                dots =
                  '<circle cx="78" cy="56" r="8" fill="#1a1714"/><circle cx="102" cy="56" r="8" fill="#3d3830"/>';
              else
                dots =
                  '<circle cx="78" cy="56" r="8" fill="none" stroke="#1a1714" stroke-width="1.5"/><circle cx="150" cy="28" r="7" fill="#3d3830"/><circle cx="166" cy="28" r="7" fill="none" stroke="#1a1714"/>';
              const stroke = c.ok ? "#c45c26" : "#e07a5f";
              const fill = c.ok ? "rgba(196,92,38,.1)" : "rgba(224,122,95,.1)";
              return (
                '<div class="diagram"><div style="padding:0.75rem 0.75rem 0"><p class="kicker" style="color:' +
                stroke +
                '">' +
                c.title +
                '</p><p style="margin:.25rem 0 0;font-size:.9rem;color:#6a6358">' +
                esc(c.note) +
                '</p></div><svg viewBox="0 0 180 110" width="100%"><path d="M24 24c20-10 50-10 72 2s50 8 64 22c12 12 8 36-10 46-22 12-56 10-84 4s-50 2-62-14c-10-14-2-48 20-60z" fill="' +
                fill +
                '" stroke="' +
                stroke +
                '" stroke-width="1.6" stroke-dasharray="5 4"/>' +
                dots +
                "</svg></div>"
              );
            })
            .join("") +
          "</div>"
        );
      })(),
      applications:
        '<div class="app-grid">' +
        [
          ["Αντλίες", "≋"],
          ["Θερμικοί κινητήρες", "△"],
          ["Κομπρεσέρ", "◎"],
          ["Εργοστάσια", "▣"],
          ["Οχήματα", "▭"],
          ["Αεροσκάφη", "✈"],
        ]
          .map(function (it) {
            return (
              '<div class="app-item"><span class="app-ico">' +
              it[1] +
              "</span><span>" +
              it[0] +
              "</span></div>"
            );
          })
          .join("") +
        "</div>",
    };
    const body = svgs[id] || "";
    if (id === "applications" || id === "isolated-adiabatic" || id === "open-flow" || id === "system-choice") {
      return '<figure>' + body + (caption ? "<figcaption style='color:var(--muted);font-size:.82rem;margin-top:.4rem'>" + esc(caption) + "</figcaption>" : "") + "</figure>";
    }
    return '<figure class="diagram">' + body + cap + "</figure>";
  }

  function renderBlock(b) {
    if (b.type === "p") return "<p>" + esc(b.text) + "</p>";
    if (b.type === "h") return "<h2 style='margin:1.4rem 0 .5rem;font-size:1.45rem'>" + esc(b.text) + "</h2>";
    if (b.type === "ul") {
      return (
        "<ul>" +
        b.items
          .map(function (it) {
            return "<li>" + esc(it) + "</li>";
          })
          .join("") +
        "</ul>"
      );
    }
    if (b.type === "formula") {
      return (
        '<div class="formula">' +
        b.html +
        (b.caption ? "<small>" + esc(b.caption) + "</small>" : "") +
        "</div>"
      );
    }
    if (b.type === "callout") {
      const lab = CALLOUT_LAB[b.kind] || "";
      const title =
        b.title && b.title !== lab ? "<h3>" + esc(b.title) + "</h3>" : "";
      return (
        '<aside class="callout ' +
        b.kind +
        '"><p class="lab">' +
        esc(lab) +
        "</p>" +
        title +
        "<p>" +
        esc(b.text) +
        "</p></aside>"
      );
    }
    if (b.type === "table") {
      return (
        '<table class="units"><caption>' +
        esc(b.caption || "") +
        "</caption><thead><tr>" +
        b.headers
          .map(function (h) {
            return "<th>" + esc(h) + "</th>";
          })
          .join("") +
        "</tr></thead><tbody>" +
        b.rows
          .map(function (row) {
            return (
              "<tr>" +
              row
                .map(function (c) {
                  return "<td>" + esc(c) + "</td>";
                })
                .join("") +
              "</tr>"
            );
          })
          .join("") +
        "</tbody></table>"
      );
    }
    if (b.type === "diagram") return diagram(b.id, b.caption);
    return "";
  }

  function shuttle() {
    return '<svg class="shuttle" viewBox="0 0 120 180" aria-hidden="true"><path d="M60 8c18 22 22 48 22 78 0 14-2 36-6 54H44c-4-18-6-40-6-54 0-30 4-56 22-78z" fill="#fbf6ec" stroke="#1a1714" stroke-width="2"/><rect x="48" y="70" width="24" height="18" rx="9" fill="#1a1714"/><path d="M38 86l-18 38 22-10" fill="#c45c26"/><path d="M82 86l18 38-22-10" fill="#c45c26"/><path d="M50 140h20l6 22H44l6-22z" fill="#9a471c"/><path d="M52 164c2 8 6 12 8 14 2-2 6-6 8-14" stroke="#c45c26" fill="none" stroke-width="3"/></svg>';
  }

  function findGrade(id) {
    return CATALOG.find(function (g) {
      return g.id === id;
    });
  }

  function licenseFooter() {
    return (
      '<p style="margin-top:2.5rem;padding-top:1rem;border-top:1px solid var(--line);font-size:.78rem;color:var(--muted)">Το πρωτότυπο υλικό αυτού του site διανέμεται με άδεια <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a> — Αναφορά Δημιουργού · Μη Εμπορική Χρήση · Παρόμοια Διανομή.</p>'
    );
  }

  function siteShell(inner) {
    return (
      '<div class="paper">' +
      '<header class="topbar">' +
      '<a data-act="go" data-to="#/" style="font-family:var(--font-serif);font-size:1.15rem;flex:1">Μηχανολογία ΕΠΑΛ</a>' +
      '<button class="icon-btn" data-act="theme-toggle" aria-label="Εναλλαγή θέματος" title="Εναλλαγή θέματος">' +
      (loadTheme() === "dark" ? "☀️" : "🌙") +
      "</button>" +
      "</header>" +
      '<main class="main" id="main" style="max-width:52rem;margin:0 auto">' +
      inner +
      licenseFooter() +
      "</main></div>"
    );
  }

  function subjectCard(s) {
    if (s.status === "ready") {
      return (
        '<button class="card" data-act="go" data-to="' +
        esc(s.href) +
        '" style="text-align:left;display:block;width:100%">' +
        '<h3 style="font-size:1.25rem">' +
        esc(s.title) +
        "</h3>" +
        '<p style="color:var(--muted);margin:.35rem 0 0">' +
        esc(s.desc) +
        "</p></button>"
      );
    }
    return (
      '<div class="card" style="opacity:.6">' +
      '<div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap"><h3 style="font-size:1.25rem;margin:0">' +
      esc(s.title) +
      '</h3><span class="chip" style="font-size:.7rem">Σύντομα</span></div>' +
      '<p style="color:var(--muted);margin:.35rem 0 0">' +
      esc(s.desc) +
      "</p></div>"
    );
  }

  function siteHome() {
    let inner = '<p class="kicker">Μηχανολογία ΕΠΑΛ</p>';
    inner += '<h1 style="font-size:clamp(2rem,5vw,3rem);margin-top:.3rem">Διάλεξε τάξη</h1>';
    inner +=
      '<p class="lead" style="margin-top:.6rem">Σημειώσεις και διαδραστικές ασκήσεις, ανά τάξη και μάθημα.</p>';
    inner += '<div class="grid-2" style="margin-top:1.6rem">';
    CATALOG.forEach(function (g) {
      const readyCount = g.subjects.filter(function (s) {
        return s.status === "ready";
      }).length;
      inner +=
	'<button class="card card-light" data-act="go" data-to="#/grade/' +
        g.id +
        '" style="text-align:left;background:var(--ink);color:var(--cream)">' +
        '<p class="kicker">' +
        g.subjects.length +
        " μαθήματα</p>" +
        '<h2 style="font-size:1.6rem;margin-top:.2rem">' +
        esc(g.label) +
        "</h2>" +
        '<p style="opacity:.75;margin:.4rem 0 0">' +
        readyCount +
        " διαθέσιμο τώρα</p></button>";
    });
    inner += "</div>";
    inner +=
      '<div class="grid-2" style="margin-top:1.6rem">' +
      '<button class="card" data-act="go" data-to="#/links" style="text-align:left;display:block;width:100%"><p class="kicker">Χρήσιμα</p><h2 style="font-size:1.3rem;margin-top:.2rem">Χρήσιμα Links</h2><p style="color:var(--muted);margin:.35rem 0 0">Σύνδεσμοι για μαθήματα και το σχολείο.</p></button>' +
      '<button class="card" data-act="go" data-to="#/math" style="text-align:left;display:block;width:100%"><p class="kicker">Γρήγορη αναφορά</p><h2 style="font-size:1.3rem;margin-top:.2rem">Βασικά Μαθηματικά</h2><p style="color:var(--muted);margin:.35rem 0 0">Κλάσματα, ποσοστά, μετατροπές μονάδων.</p></button>' +
      "</div>";
    return siteShell(inner);
  }

  function gradePage(id) {
    const g = findGrade(id);
    if (!g)
      return siteShell(
        '<p class="kicker">Δεν βρέθηκε</p><h1 style="margin-top:.3rem">Η τάξη δεν βρέθηκε</h1><p style="margin-top:1.2rem"><button class="btn btn-ink" data-act="go" data-to="#/">← Πίσω</button></p>'
      );
    let inner = '<a data-act="go" data-to="#/" style="font-size:.85rem;color:var(--muted)">← Τάξεις</a>';
    inner += '<p class="kicker" style="margin-top:1.2rem">Τάξη</p>';
    inner += '<h1 style="font-size:clamp(2rem,5vw,3rem);margin-top:.2rem">' + esc(g.label) + "</h1>";
    inner += '<div class="grid-2" style="margin-top:1.6rem">';
    g.subjects.forEach(function (s) {
      inner += subjectCard(s);
    });
    inner += "</div>";
    return siteShell(inner);
  }

  function linksPage() {
    let inner = '<a data-act="go" data-to="#/" style="font-size:.85rem;color:var(--muted)">← Αρχική</a>';
    inner += '<p class="kicker" style="margin-top:1.2rem">Χρήσιμα</p>';
    inner += '<h1 style="font-size:clamp(2rem,5vw,3rem);margin-top:.2rem">Χρήσιμα Links</h1>';
    inner += '<div class="card" style="padding:0;margin-top:1.6rem;overflow:hidden">';
    LINKS.forEach(function (group) {
      inner += '<p class="kicker" style="padding:.9rem 1.1rem 0">' + esc(group.title) + "</p>";
      group.items.forEach(function (l) {
        inner +=
          '<a class="toc-item" href="' +
          esc(l.url) +
          '" target="_blank" rel="noopener"><span style="flex:1"><b>' +
          esc(l.title) +
          "</b>" +
          (l.desc
            ? '<br><span style="color:var(--muted);font-size:.9rem">' + esc(l.desc) + "</span>"
            : "") +
          "</span><span>↗</span></a>";
      });
    });
    inner += "</div>";
    return siteShell(inner);
  }

  function mathPage() {
    let inner = '<a data-act="go" data-to="#/" style="font-size:.85rem;color:var(--muted)">← Αρχική</a>';
    inner += '<p class="kicker" style="margin-top:1.2rem">Γρήγορη αναφορά</p>';
    inner += '<h1 style="font-size:clamp(2rem,5vw,3rem);margin-top:.2rem">Βασικά Μαθηματικά</h1>';
    inner +=
      '<p class="lead" style="margin-top:.6rem">Χρήσιμα σημεία που εμφανίζονται συχνά στα υπολογιστικά θέματα, ανεξαρτήτως μαθήματος.</p>';
    inner += '<div class="grid-2" style="margin-top:1.6rem">';
    MATH_TOPICS.forEach(function (t) {
      inner +=
        '<div class="card"><h3 style="font-size:1.15rem">' +
        esc(t.title) +
        '</h3><ul class="prose" style="margin-top:.5rem">' +
        t.items
          .map(function (it) {
            return "<li>" + esc(it) + "</li>";
          })
          .join("") +
        "</ul></div>";
    });
    inner += "</div>";
    return siteShell(inner);
  }

  function home() {
    const p = progress();
    const done = EXERCISES.filter(function (e) {
      return p.exercises[e.id] && p.exercises[e.id].status === "done";
    }).length;
    let inner =
      '<p class="kicker">Εισαγωγή στη μηχανολογία</p>';
    inner +=
      '<div style="display:grid;gap:1.5rem;align-items:center;margin-top:.3rem" class="grid-2">';
    inner +=
      "<div><h1 style='font-size:clamp(2.4rem,6vw,3.6rem);line-height:.95'>Θερμοδυναμική</h1>";
    inner +=
      '<p class="lead" style="margin-top:1rem">Σύντομες διδακτικές σημειώσεις και διαδραστικός πίνακας από την τράπεζα θεμάτων. Ο μαθητής σηκώνεται, λύνει, ελέγχει.</p>';
    inner +=
      '<div class="btn-row"><button class="btn btn-copper" data-act="go" data-to="#/thermo/notes/' +
      SECTIONS[0].slug +
      '">Σημειώσεις</button><button class="btn btn-ink" data-act="go" data-to="#/thermo/board">Στον πίνακα</button></div></div>';
    inner += '<div style="justify-self:center">' + shuttle() + "</div></div>";
    inner +=
      '<div class="grid-2" style="margin-top:1.6rem"><button class="card" data-act="go" data-to="#/thermo/notes/' +
      SECTIONS[0].slug +
      '" style="text-align:left"><p class="kicker">Θεωρία</p><h2 style="font-size:1.5rem;margin-top:.2rem">' +
      SECTIONS.length +
      " σύντομες ενότητες</h2><p style=\"color:var(--muted);margin:.4rem 0 0\">" +
      p.read.length +
      "/" +
      SECTIONS.length +
      " διαβάστηκαν</p></button>";
    inner +=
      '<button class="card card-light" data-act="go" data-to="#/thermo/board" style="text-align:left;background:var(--ink);color:var(--cream)"><p class="kicker">Τράπεζα θεμάτων</p><h2 style="font-size:1.5rem;margin-top:.2rem">' +
      EXERCISES.length +
      " ασκήσεις</h2><p style=\"opacity:.75;margin:.4rem 0 0\">" +
      done +
      "/" +
      EXERCISES.length +
      " ολοκληρώθηκαν σωστά</p></button></div>";
    inner +=
      '<div class="card" style="padding:0;margin-top:1.6rem;overflow:hidden">';
    const homeChapterIds = chaptersOf(SECTIONS, sectionChapter);
    homeChapterIds.forEach(function (chId) {
      if (homeChapterIds.length > 1)
        inner +=
          '<p class="kicker" style="padding:.8rem 1.1rem 0">Κεφάλαιο ' + esc(chId) + "</p>";
      SECTIONS.filter(function (s) {
        return sectionChapter(s) === chId;
      }).forEach(function (s) {
        inner +=
          '<button class="toc-item" data-act="go" data-to="#/thermo/notes/' +
          s.slug +
          '"><span class="num">' +
          esc(s.num) +
          '</span><span style="flex:1;text-align:left"><b>' +
          esc(s.title) +
          '</b><br><span style="color:var(--muted);font-size:.9rem">' +
          esc(s.kicker) +
          "</span></span><span>→</span></button>";
      });
    });
    inner += "</div>";
    if (p.read.length + done > 0) {
      inner +=
        '<p style="margin-top:1.4rem"><button class="btn btn-ghost" data-act="reset">Επαναφορά προόδου</button></p>';
    }
    inner +=
      '<div style="margin-top:2rem;font-size:.85rem;color:var(--muted);line-height:1.6">' +
      '<p><b>Πηγές εκπαιδευτικού υλικού</b></p>' +
      '<p><b>Πηγή ασκήσεων:</b><br>Τα θέματα που περιλαμβάνονται στην παρούσα ιστοσελίδα προέρχονται και αντλήθηκαν από την πλατφόρμα της Τράπεζας Θεμάτων Διαβαθμισμένης Δυσκολίας, η οποία αναπτύχθηκε στο πλαίσιο του έργου MIS5070818 – «Τράπεζα θεμάτων Διαβαθμισμένης Δυσκολίας για τη Δευτεροβάθμια Εκπαίδευση, Γενικό Λύκειο-ΕΠΑΛ» και είναι διαθέσιμη διαδικτυακά στον δικτυακό τόπο του Ινστιτούτου Εκπαιδευτικής Πολιτικής (Ι.Ε.Π.): <a href="https://www.iep.edu.gr/trapeza-thematon-arxiki-selida/" target="_blank" rel="noopener">Τράπεζα Θεμάτων Ι.Ε.Π.</a></p>' +
      '<p>Οι διαδραστικές δραστηριότητες, οι λύσεις, οι επεξηγήσεις και η εκπαιδευτική επεξεργασία των θεμάτων αποτελούν υλικό της παρούσας ιστοσελίδας.</p>' +
      '<p><b>Πηγή θεωρίας:</b><br>Η θεωρία και το εκπαιδευτικό περιεχόμενο βασίζονται στο σχολικό εγχειρίδιο «Εισαγωγή στη Μηχανολογία», το οποίο χρησιμοποιείται για τη διδασκαλία του μαθήματος «Στοιχεία Τεχνικής Θερμοδυναμικής - Εφαρμογές» της Β΄ τάξης ΕΠΑ.Λ. Το σχολικό εγχειρίδιο διατίθεται μέσω της επίσημης πλατφόρμας Διαδραστικά Σχολικά Βιβλία (ebooks.edu.gr) του Υπουργείου Παιδείας και Θρησκευμάτων / ΙΤΥΕ «ΔΙΟΦΑΝΤΟΣ»: <a href="https://ebooks.edu.gr/ebooks/handle/8547/3914" target="_blank" rel="noopener">«Εισαγωγή στη Μηχανολογία»</a></p>' +
      '<p>Σημείωση: Η παρούσα ιστοσελίδα αποτελεί ανεξάρτητη εκπαιδευτική προσπάθεια και δεν αποτελεί επίσημη ιστοσελίδα ούτε συνδέεται με το Ινστιτούτο Εκπαιδευτικής Πολιτικής, το Υπουργείο Παιδείας ή το ΙΤΥΕ «ΔΙΟΦΑΝΤΟΣ».</p>' +
      '<p><b>Άδεια του πρωτότυπου υλικού της παρούσας ιστοσελίδας:</b><br>Το πρωτότυπο διαδραστικό εκπαιδευτικό υλικό που δημιουργήθηκε για την παρούσα ιστοσελίδα διανέμεται με άδεια Creative Commons Αναφορά Δημιουργού – Μη Εμπορική Χρήση – Παρόμοια Διανομή 4.0 Διεθνές (CC BY-NC-SA 4.0). Η άδεια αυτή αφορά το πρωτότυπο υλικό της παρούσας ιστοσελίδας και δεν επεκτείνεται σε υλικό τρίτων που αναφέρεται ή ενσωματώνεται στην ιστοσελίδα. <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a> — Αναφορά Δημιουργού - Μη Εμπορική Χρήση - Παρόμοια Διανομή.</p>' +
      '</div>';
    return shell(inner, false, { name: "home" });
  }

  function notes(slug) {
    const s = getSection(slug) || SECTIONS[0];
    markRead(s.slug);
    const adj = adjacent(SECTIONS, "slug", s.slug);
    let inner = '<p class="kicker">' + esc(s.kicker) + "</p>";
    inner +=
      '<p style="font-family:var(--font-serif);color:var(--copper);margin:.4rem 0 0">' +
      esc(s.num) +
      "</p>";
    inner += '<h1 style="font-size:clamp(2rem,5vw,3rem);margin-top:.2rem">' + esc(s.title) + "</h1>";
    inner += '<p class="lead" style="margin-top:.8rem">' + esc(s.lead) + "</p>";
    inner += '<div class="prose" style="margin-top:1.2rem">';
    s.blocks.forEach(function (b) {
      inner += renderBlock(b);
    });
    inner += "</div>";
    inner += '<div class="btn-row" style="margin-top:2rem">';
    if (adj.prev)
      inner +=
        '<button class="btn btn-ghost" data-act="go" data-to="#/thermo/notes/' +
        adj.prev.slug +
        '">← ' +
        esc(adj.prev.title) +
        "</button>";
    if (adj.next)
      inner +=
        '<button class="btn btn-copper" data-act="go" data-to="#/thermo/notes/' +
        adj.next.slug +
        '">' +
        esc(adj.next.title) +
        " →</button>";
    else
      inner +=
        '<button class="btn btn-ink" data-act="go" data-to="#/thermo/board">Στον πίνακα →</button>';
    inner += "</div>";
    inner += licenseFooter();
    return shell(inner, false, { name: "notes", slug: s.slug });
  }

  function boardIndex() {
    const p = progress();
    const done = EXERCISES.filter(function (e) {
      return p.exercises[e.id] && p.exercises[e.id].status === "done";
    }).length;
    let inner = '<p class="kicker">Τράπεζα θεμάτων</p>';
    inner += '<h1 style="font-size:clamp(2rem,5vw,3rem);margin-top:.35rem">Ο πίνακας</h1>';
    inner +=
      '<p class="lead" style="margin-top:.7rem">Σήκω και λύσε. Πολλαπλή επιλογή, αντιστοίχιση, κενά, σωστό/λάθος και υπολογιστικά — όπως στην εξέταση, με άμεσο έλεγχο.</p>';
    inner +=
      '<p style="margin-top:1rem;opacity:.75">' +
      done +
      " από " +
      EXERCISES.length +
      " σωστά ολοκληρωμένες</p>";
    const boardChapterIds = chaptersOf(GROUPS, function (g) { return g.chapter; });
    boardChapterIds.forEach(function (chId) {
      if (boardChapterIds.length > 1)
        inner +=
          '<h2 style="margin-top:2.4rem;font-family:var(--font-serif);color:var(--copper)">Κεφάλαιο ' +
          esc(chId) +
          "</h2>";
      GROUPS.filter(function (g) {
        return g.chapter === chId;
      }).forEach(function (g) {
        inner +=
          '<section style="margin-top:1.4rem"><h3 style="font-size:1.3rem">' +
          esc(g.title) +
          '</h3><p style="opacity:.7;margin:.3rem 0 0;font-size:.92rem">' +
          esc(g.blurb) +
          "</p><div class=\"ex-list\">";
        EXERCISES.filter(function (e) {
          return e.group === g.id;
        }).forEach(function (ex) {
          const res = p.exercises[ex.id];
          const cls = res ? (res.status === "done" ? "done" : "miss") : "";
          inner +=
            '<button class="ex-link ' +
            cls +
            '" data-act="go" data-to="#/thermo/board/' +
            ex.id +
            '"><span style="flex:1"><span style="display:block;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;opacity:.7">' +
            esc(KIND_LABEL[ex.kind]) +
            " · " +
            esc(ex.code) +
            " · " +
            ex.units +
            ' μον.</span><span style="font-family:var(--font-serif);font-size:1.25rem">' +
            esc(ex.title) +
            "</span></span><span>" +
            (res && res.status === "done" ? "✓" : "→") +
            "</span></button>";
        });
        inner += "</div></section>";
      });
    });
    return shell(inner, true, { name: "board" });
  }

  function itemView(item, answer, checked) {
    if (item.kind === "mc") {
      let h = '<fieldset><legend style="font-family:var(--font-serif);font-size:1.5rem;margin-bottom:.8rem">' + esc(item.prompt) + "</legend>";
      item.options.forEach(function (opt) {
        const selected = answer.mc === opt.id;
        const ok = checked && opt.id === item.answer;
        const bad = checked && selected && opt.id !== item.answer;
        const cls = ok ? "ok" : bad ? "bad" : selected ? "sel" : "";
        h +=
          '<button class="choice ' +
          cls +
          '" data-act="mc" data-id="' +
          opt.id +
          '"' +
          (checked ? " disabled" : "") +
          '><span class="ltr">' +
          letter(opt.id) +
          "</span><span>" +
          esc(opt.text) +
          "</span></button>";
      });
      return h + "</fieldset>";
    }
    if (item.kind === "tf") {
      let h = '<p style="font-family:var(--font-serif);font-size:1.45rem;line-height:1.35">' + esc(item.prompt) + '</p><div class="tf-grid">';
      [
        { v: "true", label: "Σωστό" },
        { v: "false", label: "Λάθος" },
      ].forEach(function (opt) {
        const val = opt.v === "true";
        const selected = answer.tf === val;
        const ok = checked && val === item.answer;
        const bad = checked && selected && val !== item.answer;
        const cls = ok ? "ok" : bad ? "bad" : selected ? "sel" : "";
        h +=
          '<button class="tf-btn ' +
          cls +
          '" data-act="tf" data-v="' +
          opt.v +
          '"' +
          (checked ? " disabled" : "") +
          ">" +
          opt.label +
          "</button>";
      });
      return h + "</div>";
    }
    if (item.kind === "match") {
      const value = answer.match || {};
      const usedRight = {};
      Object.keys(value).forEach(function (k) {
        usedRight[value[k]] = true;
      });
      let h =
        '<p style="font-family:var(--font-serif);font-size:1.5rem">' +
        esc(item.prompt) +
        '</p><p style="opacity:.7;font-size:.9rem;margin:.4rem 0 1rem">Πάτησε αριστερά, μετά δεξιά. Πάτησε ξανά ένα ζεύγος για να το λύσεις.</p>';
      const connected = item.left.filter(function (l) {
        return value[l.id];
      });
      connected.forEach(function (l) {
        const r = item.right.find(function (x) {
          return x.id === value[l.id];
        });
        const good = checked && value[l.id] === item.pairs[l.id];
        const bad = checked && value[l.id] !== item.pairs[l.id];
        h +=
          '<button class="pair ' +
          (good ? "ok" : bad ? "bad" : "") +
          '" data-act="match-unpair" data-id="' +
          l.id +
          '"' +
          (checked ? " disabled" : "") +
          "><span><b style='color:var(--copper);font-family:var(--font-serif)'>" +
          esc(l.id) +
          ".</b> " +
          esc(l.text) +
          "</span><span style='flex:0;opacity:.5'>→</span><span><b style='color:var(--copper);font-family:var(--font-serif)'>" +
          letter(r ? r.id : "") +
          ".</b> " +
          esc(r ? r.text : "") +
          "</span></button>";
      });
      const remainingLeft = item.left.filter(function (l) {
        return !value[l.id];
      });
      const remainingRight = item.right.filter(function (r) {
        return !usedRight[r.id];
      });
      h += '<div class="cols" style="margin-top:1rem">';
      h += '<div class="col"><h4>Στήλη Α</h4>';
      remainingLeft.forEach(function (it) {
        h +=
          '<button class="match-item ' +
          (state.matchPicked === it.id ? "picked" : "") +
          '" data-act="match-left" data-id="' +
          it.id +
          '"' +
          (checked ? " disabled" : "") +
          "><b>" +
          esc(it.id) +
          ".</b> " +
          esc(it.text) +
          "</button>";
      });
      if (!remainingLeft.length) h += '<p style="opacity:.5;padding:.8rem">—</p>';
      h += "</div>";
      h +=
        '<div class="col ' +
        (state.matchPicked && !checked ? "wait" : "") +
        '"><h4>Στήλη Β</h4>';
      remainingRight.forEach(function (it) {
        h +=
          '<button class="match-item" data-act="match-right" data-id="' +
          it.id +
          '"' +
          (checked || !state.matchPicked ? " disabled" : "") +
          "><b>" +
          letter(it.id) +
          ".</b> " +
          esc(it.text) +
          "</button>";
      });
      if (!remainingRight.length) h += '<p style="opacity:.5;padding:.8rem">—</p>';
      h += "</div></div>";
      return h;
    }
    if (item.kind === "blank") {
      const value = answer.blank || [];
      const usedCount = {};
      value.forEach(function (v) {
        if (v) usedCount[v] = (usedCount[v] || 0) + 1;
      });
      const maxCount = {};
      item.bank.forEach(function (w) {
        maxCount[w] = 0;
      });
      item.answers.forEach(function (a) {
        maxCount[a] = (maxCount[a] || 0) + 1;
      });
      item.bank.forEach(function (w) {
        if (!maxCount[w]) maxCount[w] = 1;
      });
      let h = '<p style="opacity:.75;font-size:.9rem">' + esc(item.prompt) + '</p><p class="para">';
      item.textBefore.forEach(function (chunk, i) {
        h += esc(chunk);
        if (i < item.answers.length) {
          const filled = value[i];
          const cls = !filled
            ? "empty"
            : checked
              ? filled === item.answers[i]
                ? "ok"
                : "bad"
              : "";
          h +=
            '<button class="slot ' +
            cls +
            '" data-act="blank-slot" data-i="' +
            i +
            '">' +
            (filled ? esc(filled) : "…") +
            "</button>";
        }
      });
      h += '</p><p class="kicker" style="margin:1.1rem 0 .5rem">Τράπεζα λέξεων</p><div class="bank">';
      item.bank.forEach(function (word) {
        const left = (maxCount[word] || 1) - (usedCount[word] || 0);
        const spent = left <= 0;
        h +=
          '<button class="word ' +
          (state.blankPicked === word && !spent ? "picked" : "") +
          (spent ? " spent" : "") +
          '" data-act="blank-word" data-word="' +
          encodeURIComponent(word) +
          '"' +
          (checked || spent ? " disabled" : "") +
          ">" +
          esc(word) +
          "</button>";
      });
      h += "</div>";
      return h;
    }
    if (item.kind === "calc") {
      const good = checked && isCorrect(item, answer);
      return (
        '<p style="font-family:var(--font-serif);font-size:1.5rem">' +
        esc(item.prompt) +
        '</p><label style="display:block;margin-top:1.1rem"><span class="kicker">Απάντηση</span><div style="display:flex;align-items:center;gap:.5rem;margin-top:.4rem"><input class="calc-in" data-act="calc" inputmode="decimal" placeholder="π.χ. 25" value="' +
        esc(answer.calc || "") +
        '" ' +
        (checked ? "disabled" : "") +
        '><span style="font-family:var(--font-serif);font-size:1.2rem;opacity:.75">' +
        esc(item.unit) +
        "</span></div></label>" +
        (checked && !good
          ? '<p style="margin-top:.5rem;opacity:.8;font-size:.9rem">Σωστό: <b>' +
            item.answer.toLocaleString("el-GR") +
            " " +
            esc(item.unit) +
            "</b></p>"
          : "")
      );
    }
    return "";
  }

  function exercisePage(id) {
    const ex = getExercise(id);
    if (!ex) {
      return shell('<h1>Η άσκηση δεν βρέθηκε</h1><button class="btn btn-chalk" data-act="go" data-to="#/thermo/board">Πίσω</button>', true, { name: "board" });
    }
    if (state.exId !== ex.id) resetEngine(ex);
    const theory = getSection(ex.theory);
    const adj = adjacent(EXERCISES, "id", ex.id);
    const item = ex.items[state.step];
    const answer = state.answers[state.step];
    const last = state.step === ex.items.length - 1;
    const ready = isFilled(item, answer);
    const ok = state.results[state.step];

    let inner =
      '<div style="display:flex;flex-wrap:wrap;gap:.7rem;align-items:center;margin-bottom:1.1rem"><button class="btn btn-chalk" data-act="go" data-to="#/thermo/board">← Όλες οι ασκήσεις</button>';
    if (theory)
      inner +=
        '<button class="btn btn-chalk" style="margin-left:auto" data-act="go" data-to="#/thermo/notes/' +
        theory.slug +
        '">' +
        esc(theory.num) +
        " " +
        esc(theory.title) +
        "</button>";
    inner += "</div>";
    inner += '<div class="board-card">';
    inner +=
      '<p class="kicker">' +
      esc(KIND_LABEL[ex.kind]) +
      " · " +
      ex.units +
      " μονάδες</p>";
    inner += '<h1 style="font-size:clamp(1.7rem,4vw,2.4rem);margin-top:.35rem">' + esc(ex.title) + "</h1>";
    if (ex.stem) inner += '<p style="margin-top:.7rem;opacity:.8;line-height:1.5">' + esc(ex.stem) + "</p>";
    if (ex.givens) {
      inner += '<div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.9rem">';
      ex.givens.forEach(function (g) {
        inner += '<span class="chip"><span style="opacity:.7">' + esc(g.label) + "</span> <b>" + esc(g.value) + "</b></span>";
      });
      inner += "</div>";
    }
    inner +=
      '<p style="margin:1.1rem 0 .6rem;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;opacity:.65">Βήμα ' +
      (state.step + 1) +
      " από " +
      ex.items.length +
      " · " +
      esc(ex.code) +
      "</p>";
    inner += itemView(item, answer, state.checked);
    if (item.kind === "calc") {
      inner +=
        '<p><button class="btn btn-chalk" style="margin-top:.8rem" data-act="hint">' +
        (state.hint ? "Απόκρυψη υπόδειξης" : "Υπόδειξη") +
        "</button></p>";
      if (state.hint)
        inner +=
          '<div class="hintbox" style="margin-top:.5rem">' +
          esc(item.hint) +
          '<span class="f">' +
          esc(item.formula) +
          "</span></div>";
    }
    if (state.checked) {
      inner +=
        '<div class="feedback ' +
        (ok ? "ok" : "bad") +
        '"><b>' +
        (ok ? "Σωστά" : "Όχι ακριβώς") +
        "</b><p style='margin:.35rem 0 0;line-height:1.5'>" +
        esc(item.explain) +
        "</p></div>";
    }
    inner += '<div class="btn-row">';
    if (!state.checked) {
      inner +=
        '<button class="btn btn-chalk-solid" data-act="check"' +
        (ready ? "" : " disabled") +
        ">Έλεγχος</button>";
    } else {
      if (!ok) inner += '<button class="btn btn-chalk" data-act="retry">Διόρθωση</button>';
      if (!last)
        inner += '<button class="btn btn-chalk-solid" data-act="next">Επόμενο →</button>';
      else
        inner +=
          '<span style="align-self:center;opacity:.8">Βαθμός: <b>' +
          state.results.filter(Boolean).length +
          "/" +
          ex.items.length +
          "</b></span>";
    }
    inner += '<button class="btn btn-chalk" data-act="restart" style="margin-left:auto">Από την αρχή</button>';
    inner += "</div></div>";
    inner += '<div class="btn-row">';
    if (adj.prev)
      inner +=
        '<button class="btn btn-chalk" data-act="go" data-to="#/thermo/board/' +
        adj.prev.id +
        '">← ' +
        esc(adj.prev.title) +
        "</button>";
    if (adj.next)
      inner +=
        '<button class="btn btn-chalk" data-act="go" data-to="#/thermo/board/' +
        adj.next.id +
        '">' +
        esc(adj.next.title) +
        " →</button>";
    inner += "</div>";
    return shell(inner, true, { name: "exercise", id: ex.id });
  }

  function render() {
    applyTheme();
    const r = route();
    const root = document.getElementById("app");
    if (r.name === "site-home") root.innerHTML = siteHome();
    else if (r.name === "grade") root.innerHTML = gradePage(r.id);
    else if (r.name === "links") root.innerHTML = linksPage();
    else if (r.name === "math") root.innerHTML = mathPage();
    else if (r.name === "notes") root.innerHTML = notes(r.slug);
    else if (r.name === "board") root.innerHTML = boardIndex();
    else if (r.name === "exercise") root.innerHTML = exercisePage(r.id);
    else root.innerHTML = home();
    window.scrollTo(0, 0);
  }

  function currentEx() {
    return getExercise(state.exId);
  }
  function patchAnswer(next) {
    state.answers = state.answers.map(function (a, i) {
      return i === state.step ? next : a;
    });
  }

  document.addEventListener("click", function (e) {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.getAttribute("data-act");
    if (act === "go") {
      go(el.getAttribute("data-to"));
      return;
    }
    if (act === "menu") {
      state.menu = !state.menu;
      render();
      return;
    }
    if (act === "menu-close") {
      state.menu = false;
      render();
      return;
    }
    if (act === "reset") {
      resetProgress();
      return;
    }
    if (act === "theme-toggle") {
      saveTheme(loadTheme() === "dark" ? "light" : "dark");
      render();
      return;
    }
    const ex = currentEx();
    const item = ex ? ex.items[state.step] : null;
    const ans = ex ? state.answers[state.step] : null;
    if (act === "mc" && item && !state.checked) {
      patchAnswer({ mc: el.getAttribute("data-id") });
      render();
      return;
    }
    if (act === "tf" && item && !state.checked) {
      patchAnswer({ tf: el.getAttribute("data-v") === "true" });
      render();
      return;
    }
    if (act === "match-left" && item && !state.checked) {
      const id = el.getAttribute("data-id");
      const value = Object.assign({}, ans.match);
      if (value[id]) {
        delete value[id];
        patchAnswer({ match: value });
        state.matchPicked = id;
      } else {
        state.matchPicked = id;
      }
      render();
      return;
    }
    if (act === "match-unpair" && item && !state.checked) {
      const id = el.getAttribute("data-id");
      const value = Object.assign({}, ans.match);
      delete value[id];
      patchAnswer({ match: value });
      state.matchPicked = id;
      render();
      return;
    }
    if (act === "match-right" && item && !state.checked && state.matchPicked) {
      const rid = el.getAttribute("data-id");
      const value = Object.assign({}, ans.match);
      Object.keys(value).forEach(function (l) {
        if (value[l] === rid) delete value[l];
      });
      value[state.matchPicked] = rid;
      patchAnswer({ match: value });
      state.matchPicked = null;
      render();
      return;
    }
    if (act === "blank-word" && item && !state.checked) {
      state.blankPicked = decodeURIComponent(el.getAttribute("data-word"));
      render();
      return;
    }
    if (act === "blank-slot" && item && !state.checked) {
      const i = Number(el.getAttribute("data-i"));
      const next = (ans.blank || []).slice();
      if (next[i]) {
        next[i] = null;
        patchAnswer({ blank: next });
      } else if (state.blankPicked) {
        next[i] = state.blankPicked;
        patchAnswer({ blank: next });
      }
      render();
      return;
    }
    if (act === "hint") {
      state.hint = !state.hint;
      render();
      return;
    }
    if (act === "check" && item) {
      const correct = isCorrect(item, ans);
      state.results[state.step] = correct;
      state.checked = true;
      if (state.step === ex.items.length - 1) {
        const score = state.results.filter(Boolean).length;
        saveEx(ex.id, {
          status: score === ex.items.length ? "done" : "miss",
          score: score,
          max: ex.items.length,
        });
      }
      render();
      return;
    }
    if (act === "retry") {
      state.checked = false;
      state.hint = false;
      render();
      return;
    }
    if (act === "next") {
      state.checked = false;
      state.hint = false;
      state.matchPicked = null;
      state.blankPicked = null;
      state.step = Math.min(state.step + 1, ex.items.length - 1);
      render();
      return;
    }
    if (act === "restart" && ex) {
      resetEngine(ex);
      render();
    }
  });

  document.addEventListener("input", function (e) {
    if (e.target.getAttribute("data-act") !== "calc") return;
    if (state.checked) return;
    patchAnswer({ calc: e.target.value });
    const btn = document.querySelector('[data-act="check"]');
    if (btn) btn.disabled = parseNumber(e.target.value) === null;
  });

  window.addEventListener("hashchange", function () {
    const r = route();
    if (r.name !== "exercise") {
      state.exId = null;
    }
    state.menu = false;
    render();
  });

  render();
})();
