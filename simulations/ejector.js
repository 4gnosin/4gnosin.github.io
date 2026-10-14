(function () {
  /* ---------- Σταθερές και συντελεστές του μοντέλου ---------- */
  const RHO = 1025;          // πυκνότητα θαλασσινού νερού, kg/m³
  const CV = 0.97;           // συντελεστής ταχύτητας ακροφυσίου
  const CS = 0.8;            // συντελεστής παροχής στόμιου αναρρόφησης
  const ETA_D = 0.85;        // βαθμός ανάκτησης διαχύτη
  const D1 = 0.04;           // διάμετρος σωλήνα τροφοδοσίας, m
  const DS = 0.03;           // διάμετρος σωλήνα αναρρόφησης (100% άνοιγμα), m
  const P_ATM = 0.1013e6;    // ατμοσφαιρική πίεση, Pa
  const P_LIM = -0.098e6;    // όριο κενού (τάση ατμών ≈ 2,3 kPa abs), Pa gauge

  /* ---------- Ρυθμιστικά ---------- */
  // [id, ετικέτα, min, max, step, αρχική τιμή, μονάδα, δεκαδικά]
  const sliders = [
    ["dn", "Διάμετρος ακροφυσίου d<sub>n</sub>", 4, 20, 0.5, 10, "mm", 1],
    ["dt", "Διάμετρος λαιμού d<sub>t</sub>", 8, 40, 0.5, 20, "mm", 1],
    ["d3", "Διάμετρος εξόδου d<sub>o</sub>", 20, 50, 1, 40, "mm", 0],
    ["pm", "Πίεση κινητήριου νερού p<sub>m</sub>", 0.2, 1, 0.05, 0.5, "MPa", 2],
    ["pb", "Αντίθλιψη εξόδου p<sub>b</sub>", 0, 0.2, 0.01, 0.03, "MPa", 2],
    ["va", "Άνοιγμα αναρρόφησης", 0, 100, 5, 40, "%", 0],
  ];

  const readings = [
    ["Qn", "Παροχή κινητήριου Q<sub>n</sub>"],
    ["Qs", "Παροχή αναρρόφησης Q<sub>s</sub>"],
    ["M", "Λόγος M = Q<sub>s</sub>/Q<sub>n</sub>"],
    ["vj", "Ταχύτητα πίδακα v<sub>j</sub>"],
    ["vt", "Ταχύτητα λαιμού v<sub>t</sub>"],
    ["vo", "Ταχύτητα εξόδου v<sub>o</sub>"],
    ["ps", "Πίεση αναρρόφησης p<sub>s</sub>"],
    ["vac", "Κενό αναρρόφησης"],
    ["pt", "Πίεση λαιμού p<sub>t</sub>"],
    ["eta", "Απόδοση η"],
  ];

  const challenges = [
    "Κλείστε σχεδόν την αναρρόφηση (≤10%) και φτάστε κενό ≥ 0,090 MPa",
    "Με άνοιγμα αναρρόφησης ≥ 50%, πετύχετε Q<sub>s</sub> ≥ 3 L/s χωρίς σπηλαίωση",
    "Ανεβάστε την αντίθλιψη ώστε να σταματήσει η αναρρόφηση (stall)",
    "Προκαλέστε σπηλαίωση στον λαιμό (π.χ. υψηλή p<sub>m</sub>, ανοιχτή αναρρόφηση, χαμηλή αντίθλιψη)",
  ];

  /* ---------- Θεωρητικό πλαίσιο (LaTeX) ---------- */
  const theory =
    "<h3>1. Εξίσωση του Bernoulli</h3>" +
    "<p>Για μόνιμη, ασυμπίεστη ροή χωρίς τριβές, κατά μήκος μιας ρευματικής γραμμής, το άθροισμα των τριών μορφών ενέργειας ανά μονάδα όγκου είναι σταθερό:</p>" +
    "<p>\\[ p + \\tfrac{1}{2}\\rho v^{2} + \\rho g z = \\text{σταθ.} \\]</p>" +
    "<p>Σε οριζόντιο σωλήνα (\\(z=\\text{σταθ.}\\)) αυτό σημαίνει ότι όπου η ταχύτητα αυξάνεται, η στατική πίεση μειώνεται.</p>" +
    "<h3>2. Εξίσωση συνέχειας</h3>" +
    "<p>\\[ Q = A_1 v_1 = A_2 v_2 \\quad\\Rightarrow\\quad v = \\frac{Q}{A} = \\frac{4Q}{\\pi d^{2}} \\]</p>" +
    "<p>Μικρότερη διατομή σημαίνει μεγαλύτερη ταχύτητα. Η ταχύτητα είναι <b>αντιστρόφως ανάλογη του τετραγώνου της διαμέτρου</b>.</p>" +
    "<h3>3. Υποπίεση από στένωση (φαινόμενο Venturi)</h3>" +
    "<p>Συνδυάζοντας τις δύο εξισώσεις για δύο διατομές 1 και 2:</p>" +
    "<p>\\[ p_1 - p_2 = \\tfrac{1}{2}\\rho\\left(v_2^{2} - v_1^{2}\\right) = \\tfrac{1}{2}\\rho Q^{2}\\left(\\frac{1}{A_2^{2}} - \\frac{1}{A_1^{2}}\\right) \\]</p>" +
    "<p>Αν η πίεση \\(p_2\\) πέσει κάτω από την ατμοσφαιρική (σχετική πίεση \\(p_2<0\\)), δημιουργείται <b>υποπίεση</b> και ένα σωληνάκι αναρρόφησης συνδεδεμένο εκεί «τραβάει» ρευστό. Η απόλυτη πίεση είναι \\(p_{abs} = p_{atm} + p_{gauge}\\).</p>" +
    "<h3>4. Το ακροφύσιο του εγχυτήρα</h3>" +
    "<p>Το κινητήριο νερό έρχεται από την αντλία με πίεση \\(p_m\\) (πρακτικά ταχύτητα ≈ 0) και εκτονώνεται στον θάλαμο αναρρόφησης με πίεση \\(p_s\\):</p>" +
    "<p>\\[ v_j = C_v\\sqrt{\\frac{2\\,(p_m - p_s)}{\\rho}}, \\qquad Q_n = A_n\\, v_j \\]</p>" +
    "<p><b>Προσοχή:</b> η ταχύτητα του πίδακα εξαρτάται από την πτώση πίεσης, όχι από τη διάμετρο του ακροφυσίου. Η διάμετρος καθορίζει την <i>παροχή</i>. Η ταχύτητα αλλάζει στις υπόλοιπες διατομές μέσω της συνέχειας.</p>" +
    "<h3>5. Αναρρόφηση</h3>" +
    "<p>Όσο η πίεση του θαλάμου είναι χαμηλότερη από την πίεση της δεξαμενής (ατμοσφαιρική, \\(p=0\\) σχετική), το νερό αναρροφάται:</p>" +
    "<p>\\[ Q_s = C_s\\, A_s \\sqrt{\\frac{2\\,(0 - p_s)}{\\rho}} \\]</p>" +
    "<h3>6. Μίξη στον λαιμό: ισοζύγιο ορμής</h3>" +
    "<p>Στη ζώνη μίξης υπάρχουν στροβιλισμοί και απώλειες, οπότε <b>δεν ισχύει η αρχή Bernoulli</b>. Εφαρμόζεται η αρχή διατήρησης της ορμής (το αναρροφούμενο νερό μπαίνει με ταχύτητα ≈ 0):</p>" +
    "<p>\\[ p_s A_t + \\rho Q_n v_j = p_t A_t + \\rho\\,\\frac{(Q_n + Q_s)^{2}}{A_t} \\]</p>" +
    "<h3>7. Διαχύτης</h3>" +
    "<p>Η διεύρυνση της διατομής ελαττώνει την ταχύτητα και ανακτά πίεση (Bernoulli με βαθμό ανάκτησης \\(\\eta_d\\)):</p>" +
    "<p>\\[ p_o = p_t + \\eta_d\\,\\tfrac{1}{2}\\rho v_t^{2}\\left[1 - \\left(\\frac{A_t}{A_o}\\right)^{2}\\right] \\]</p>" +
    "<h3>8. Συνθήκη λειτουργίας και απόδοση</h3>" +
    "<p>Ο εγχυτήρας δουλεύει στο σημείο όπου η πίεση εξόδου του διαχύτη ισούται με την αντίθλιψη της γραμμής: \\(p_o = p_b\\). Ορίζουμε:</p>" +
    "<p>\\[ M = \\frac{Q_s}{Q_n}, \\qquad \\eta = M\\,\\frac{p_o - p_s}{p_m - p_o} \\]</p>" +
    "<h3>9. Όρια λειτουργίας</h3>" +
    "<ul><li><b>Όριο κενού / σπηλαίωση:</b> όταν η απόλυτη πίεση πέσει στην τάση ατμών του νερού \\(p_v\\approx 2{,}3\\ \\text{kPa}\\) (δηλ. \\(p_{gauge}\\approx -0{,}098\\ \\text{MPa}\\)), το νερό βράζει σε θερμοκρασία περιβάλλοντος και δεν μπορεί να δημιουργηθεί μεγαλύτερο κενό.</li>" +
    "<li><b>Stall:</b> αν η αντίθλιψη \\(p_b\\) είναι μεγαλύτερη από την πίεση που μπορεί να δώσει ο εγχυτήρας, η αναρρόφηση μηδενίζεται.</li></ul>" +
    "<p class=\"eje-help\">Απλοποιήσεις: ασυμπίεστο υγρό, μόνο νερό (στον πραγματικό εξαερωτήρα αναρροφώνται επίσης αέρια και αέρας), σταθεροί συντελεστές απωλειών, μονοδιάστατη ροή.</p>" +
    "<h3>Υπόμνημα συμβόλων</h3>" +
    "<div class=\"eje-glossary\">" +
    "<div><b>ρ</b> (rho) — πυκνότητα νερού (kg/m³)</div>" +
    "<div><b>C<sub>v</sub></b> — συντελεστής ταχύτητας ακροφυσίου (−)</div>" +
    "<div><b>C<sub>s</sub></b> — συντελεστής παροχής στόμιου αναρρόφησης (−)</div>" +
    "<div><b>η<sub>d</sub></b> — βαθμός ανάκτησης πίεσης διαχύτη (−)</div>" +
    "<div><b>d<sub>n</sub></b> — διάμετρος ακροφυσίου (m)</div>" +
    "<div><b>d<sub>t</sub></b> — διάμετρος λαιμού (m)</div>" +
    "<div><b>d<sub>o</sub></b> — διάμετρος εξόδου διαχύτη (m)</div>" +
    "<div><b>A<sub>n</sub>, A<sub>t</sub>, A<sub>o</sub>, A<sub>s</sub></b> — αντίστοιχες διατομές (m²)</div>" +
    "<div><b>p<sub>m</sub></b> — πίεση κινητήριου νερού (Pa, σχετική)</div>" +
    "<div><b>p<sub>s</sub></b> — πίεση θαλάμου αναρρόφησης (Pa, σχετική)</div>" +
    "<div><b>p<sub>t</sub></b> — πίεση στον λαιμό (Pa, σχετική)</div>" +
    "<div><b>p<sub>o</sub> / p<sub>b</sub></b> — πίεση εξόδου / αντίθλιψη γραμμής (Pa, σχετική)</div>" +
    "<div><b>v<sub>j</sub></b> — ταχύτητα πίδακα στην έξοδο ακροφυσίου (m/s)</div>" +
    "<div><b>v<sub>t</sub>, v<sub>o</sub></b> — ταχύτητα λαιμού και εξόδου (m/s)</div>" +
    "<div><b>Q<sub>n</sub></b> — παροχή κινητήριου νερού (m³/s)</div>" +
    "<div><b>Q<sub>s</sub></b> — παροχή αναρρόφησης (m³/s)</div>" +
    "<div><b>M</b> — λόγος παροχών Q<sub>s</sub>/Q<sub>n</sub> (−)</div>" +
    "<div><b>η</b> — υδραυλική απόδοση εγχυτήρα (−)</div>" +
    "<div><b>p<sub>atm</sub></b> — ατμοσφαιρική πίεση (≈ 0,1013 MPa)</div>" +
    "<div><b>p<sub>v</sub></b> — τάση ατμών νερού (≈ 2,3 kPa abs)</div>" +
    "</div>";

  /* ---------- HTML ---------- */
  const template =
    '<div class="eje-toolbar">' +
    '<button type="button" class="btn btn-ghost" data-eje="reset">Επανεκκίνηση</button></div>' +
    '<div class="eje-layout"><div>' +
    '<section class="eje-panel"><h2>Εγχυτήρας (τζιφάρι)</h2><div class="eje-diagram-scroll">' +
    '<svg class="eje-diagram" data-eje="svg" viewBox="0 0 700 330" role="img" aria-label="Σχηματικό διάγραμμα εγχυτήρα">' +
    '<path data-eje="housing" fill="#1a3545" stroke="#5c88a8" stroke-width="1.5"/>' +
    '<path data-eje="chamber-fill" fill="#1e4a5c" opacity="0.55"/>' +
    '<path data-eje="suction-pipe" fill="#1a3545" stroke="#5c88a8" stroke-width="1.4"/>' +
    '<path data-eje="w-suction" fill="#2a8f6a" opacity="0.85"/>' +
    '<rect x="130" y="272" width="170" height="48" rx="4" fill="#12303a" stroke="#3ecf9a"/>' +
    '<text x="215" y="300" text-anchor="middle" class="eje-small-text">Δεξαμενή (ατμοσφαιρική πίεση)</text>' +
    '<path data-eje="w-motive" stroke="none"/>' +
    '<path data-eje="w-jet" stroke="none" opacity="0.95"/>' +
    '<path data-eje="w-mix" stroke="none" opacity="0.9"/>' +
    '<g data-eje="particles"></g>' +
    '<path data-eje="inner-wall" fill="none" stroke="#7aa3bd" stroke-width="1.1" opacity="0.55"/>' +
    '<g data-eje="valve-group" transform="translate(205,236)"><path data-eje="valve" d="M-9-7L9 7V-7L-9 7Z" stroke="#fff" stroke-width=".8"/>' +
    '<text x="16" y="-2">Βάνα αναρρόφησης</text><text data-eje="valve-open" x="16" y="10" style="font-weight:700"></text></g>' +
    '<text data-eje="chamber-label" x="268" y="100" text-anchor="middle" class="eje-small-text">Θάλαμος αναρρόφησης</text>' +
    '<text data-eje="vac-readout" x="268" y="148" text-anchor="middle" style="font-size:11px;font-weight:700"></text>' +
    '<text data-eje="ps-readout" x="268" y="162" text-anchor="middle" class="eje-small-text"></text>' +
    '<text x="175" y="58" text-anchor="middle" class="eje-small-text">ΑΚΡΟΦΥΣΙΟ</text>' +
    '<text data-eje="name-throat" x="370" y="58" text-anchor="middle" class="eje-small-text">ΛΑΙΜΟΣ</text>' +
    '<text x="520" y="58" text-anchor="middle" class="eje-small-text">ΔΙΑΧΥΤΗΣ</text>' +
    '<text x="6" y="190" class="eje-small-text">Κινητήριο νερό</text><text x="6" y="202" class="eje-small-text">(από αντλία)</text>' +
    '<text x="694" y="190" text-anchor="end" class="eje-small-text">→ έξοδος (overboard)</text>' +
    '<g data-eje="stations">' +
    '<text data-st="1a" x="24" y="16"></text><text data-st="1b" x="24" y="29"></text>' +
    '<text data-st="2a" x="235" y="16" text-anchor="middle"></text><text data-st="2b" x="235" y="29" text-anchor="middle"></text>' +
    '<text data-st="3a" x="372" y="16" text-anchor="middle"></text><text data-st="3b" x="372" y="29" text-anchor="middle"></text>' +
    '<text data-st="4a" x="640" y="16" text-anchor="middle"></text><text data-st="4b" x="640" y="29" text-anchor="middle"></text>' +
    '</g></svg></div>' +
    '<p class="eje-help">Αλλάξτε τις διατομές και τις συνθήκες από τα ρυθμιστικά. Το χρώμα του νερού δείχνει την ταχύτητα (πιο ανοιχτό = πιο γρήγορο). Οι τελίτσες ακολουθούν τη ροή: λευκές = κινητήριο νερό, πράσινες = αναρροφούμενο νερό. Επιταχύνουν στο ακροφύσιο και αναμιγνύονται στον λαιμό. Η κίνηση είναι ανάλογη της πραγματικής ταχύτητας, όχι σε πραγματική κλίμακα.</p></section>' +
    '<section class="eje-panel"><h2>Πίεση και ταχύτητα κατά μήκος του εγχυτήρα</h2><div class="eje-diagram-scroll">' +
    '<svg class="eje-diagram" data-eje="chart" viewBox="0 0 700 250" role="img" aria-label="Διάγραμμα πίεσης και ταχύτητας κατά μήκος του εγχυτήρα"></svg></div>' +
    '<p class="eje-help"><span class="eje-key eje-key-p"></span> πίεση (αριστερός άξονας, MPa σχετική) &nbsp; <span class="eje-key eje-key-v"></span> ταχύτητα (δεξιός άξονας, m/s). Κάτω από το 0 υπάρχει υποπίεση. Η διακεκομμένη κόκκινη γραμμή είναι το όριο κενού (σπηλαίωση).</p></section>' +
    '</div><aside>' +
    '<section class="eje-panel"><h2>Ρυθμίσεις</h2><div data-eje="controls"></div></section>' +
    '<section class="eje-panel"><h2>Μετρήσεις</h2><p class="eje-status" data-eje="status" aria-live="polite"></p><div class="eje-readings" data-eje="readings"></div></section>' +
    '<section class="eje-panel"><h2>Προκλήσεις</h2><ol class="eje-steps" data-eje="steps"></ol></section>' +
    '</aside></div>' +
    '<section class="eje-panel"><h2>Bernoulli σε αριθμούς</h2><div class="eje-numbers" data-eje="numbers"></div></section>' +
    '<section class="eje-panel eje-theory"><h2>Θεωρητικό πλαίσιο</h2><div data-eje="theory">' + theory + '</div></section>';

  /* ---------- Υπολογισμός (καθαρή συνάρτηση) ---------- */
  // p: {dn, dt, d3 σε m, pm, pb σε Pa (σχετικές), a ∈ [0,1]}
  function calc(p) {
    const An = Math.PI / 4 * p.dn * p.dn;
    const At = Math.PI / 4 * p.dt * p.dt;
    const Ao = Math.PI / 4 * p.d3 * p.d3;
    const As = Math.PI / 4 * DS * DS * p.a;

    function at(ps) {
      const vj = CV * Math.sqrt(2 * Math.max(0, p.pm - ps) / RHO);
      const Qn = An * vj;
      const dp = -ps;
      const Qs = dp > 0 ? CS * As * Math.sqrt(2 * dp / RHO) : 0;
      const Q = Qn + Qs;
      const pt = ps + (RHO * Qn * vj - RHO * Q * Q / At) / At;
      const vt = Q / At;
      const po = pt + ETA_D * 0.5 * RHO * vt * vt * (1 - Math.pow(At / Ao, 2));
      return { ps: ps, vj: vj, Qn: Qn, Qs: Qs, Q: Q, pt: pt, vt: vt, po: po };
    }

    // Σάρωση από ps = 0 προς το όριο κενού για την πρώτη λύση po = pb
    const g = function (ps) { return at(ps).po - p.pb; };
    const g0 = g(0);
    const N = 196;
    let lo = 0, hi = null, prev = g0, prevPs = 0;
    for (let i = 1; i <= N; i++) {
      const ps = P_LIM * i / N;
      const cur = g(ps);
      if ((prev <= 0 && cur > 0) || (prev >= 0 && cur < 0)) { lo = prevPs; hi = ps; break; }
      prev = cur; prevPs = ps;
    }
    let ps, state;
    if (hi !== null) {
      const sign = Math.sign(g(lo)) || -Math.sign(g(hi));
      for (let i = 0; i < 50; i++) {
        const mid = (lo + hi) / 2;
        if (Math.sign(g(mid)) === sign) lo = mid; else hi = mid;
      }
      ps = (lo + hi) / 2;
      state = "ok";
    } else if (g0 > 0) {
      ps = P_LIM;
      state = "limit";
    } else {
      ps = 0;
      state = "stall";
    }
    const r = at(ps);
    r.state = state;
    if (state === "ok" && r.pt < P_LIM) r.state = "cav";
    r.vo = r.Q / Ao;
    r.v1 = r.Qn / (Math.PI / 4 * D1 * D1);
    r.M = r.Qn > 0 ? r.Qs / r.Qn : 0;
    r.eta = r.Qs > 0 && p.pm - r.po > 0 ? r.M * (r.po - r.ps) / (p.pm - r.po) : 0;
    r.An = An; r.At = At; r.Ao = Ao; r.As = As;
    return r;
  }

  /* ---------- Βοηθητικά ---------- */
  function fmt(x, d) {
    return (x < 0 ? "−" : "") + Math.abs(x).toFixed(d).replace(".", ",");
  }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function speedColor(v) {
    const t = clamp(v / 45, 0, 1);
    const mix = function (a, b) { return Math.round(a + (b - a) * t); };
    return "rgb(" + mix(30, 150) + "," + mix(88, 232) + "," + mix(130, 255) + ")";
  }
  function typeset(element) {
    try {
      if (window.MathJax && window.MathJax.typesetPromise) window.MathJax.typesetPromise([element]);
      else if (window.renderMathInElement) window.renderMathInElement(element);
    } catch (error) { /* χωρίς μαθηματική μηχανή, μένει ως κείμενο */ }
  }

  window.mountEjector = function (container) {
    if (!container) throw new Error("Ejector container not found.");
    container.innerHTML = template;

    const $ = function (id) {
      const element = container.querySelector('[data-eje="' + id + '"]');
      if (!element) throw new Error("Missing Ejector element: " + id);
      return element;
    };
    const query = function (selector) {
      const element = container.querySelector(selector);
      if (!element) throw new Error("Missing Ejector element: " + selector);
      return element;
    };

    const uid = Math.random().toString(36).slice(2, 7);
    let values = {};
    let done = [];

    /* χειριστήρια */
    sliders.forEach(function (slider) {
      $("controls").insertAdjacentHTML(
        "beforeend",
        '<div class="eje-ctl"><label for="eje-' + slider[0] + '-' + uid + '">' + slider[1] + "</label>" +
        '<output class="eje-value" data-out="' + slider[0] + '"></output>' +
        '<input type="range" id="eje-' + slider[0] + '-' + uid + '" data-slider="' + slider[0] + '" min="' + slider[2] +
        '" max="' + slider[3] + '" step="' + slider[4] + '">' +
        "</div>"
      );
    });
    readings.forEach(function (reading) {
      $("readings").insertAdjacentHTML(
        "beforeend",
        "<span>" + reading[1] + '</span><b data-reading="' + reading[0] + '"></b>'
      );
    });

    function defaults() {
      sliders.forEach(function (slider) { values[slider[0]] = slider[5]; });
    }
    // Φυσικοί περιορισμοί: dn < dt ≤ do
    function normalize(moved) {
      if (moved === "dn" && values.dn > values.dt - 2) values.dt = Math.min(40, values.dn + 2);
      if (moved === "dt") {
        if (values.dt < values.dn + 2) values.dn = Math.max(4, values.dt - 2);
      }
      if (values.d3 < values.dt) {
        if (moved === "d3") {
          values.dt = values.d3;
          if (values.dn > values.dt - 2) values.dn = Math.max(4, values.dt - 2);
        } else values.d3 = values.dt;
      }
      if (values.dn > values.dt - 2) values.dn = Math.max(4, values.dt - 2);
    }

    /* γεωμετρία σχήματος */
    const Y0 = 130, K = 1.3;
    const X = { in0: 20, n0: 130, n1: 250, t0: 320, t1: 420, d1: 560, out: 680 };
    const CH_HALF = 58;

    function r(mm) { return mm / 2 * K; }

    function render() {
      const p = {
        dn: values.dn / 1000, dt: values.dt / 1000, d3: values.d3 / 1000,
        pm: values.pm * 1e6, pb: values.pb * 1e6, a: values.va / 100,
      };
      const c = calc(p);
      const R1 = r(D1 * 1000), Rn = r(values.dn), Rt = r(values.dt), Ro = r(values.d3);

      sliders.forEach(function (slider) {
        const input = query('[data-slider="' + slider[0] + '"]');
        input.value = values[slider[0]];
        query('[data-out="' + slider[0] + '"]').textContent =
          fmt(values[slider[0]], slider[7]) + " " + slider[6];
      });

      /* γεωμετρία ρευστού & περιβλήματος */
      const poly = function (points) {
        return "M" + points.map(function (pt) { return pt[0] + " " + pt[1].toFixed(1); }).join("L") + "Z";
      };
      const wall = 5;
      const chL = X.n1 + 2;
      const chR = X.t0 - 8;
      const housingTop = [
        [X.in0, Y0 - R1 - wall], [X.n0, Y0 - R1 - wall],
        [X.n1 - 10, Y0 - Rn - wall], [X.n1, Y0 - Rn - 2],
        [chL, Y0 - CH_HALF], [chR, Y0 - CH_HALF],
        [X.t0, Y0 - Rt - wall], [X.t1, Y0 - Rt - wall],
        [X.d1, Y0 - Ro - wall], [X.out, Y0 - Ro - wall]
      ];
      const housingBot = housingTop.map(function (pt) { return [pt[0], 2 * Y0 - pt[1]]; }).reverse();
      $("housing").setAttribute("d", poly(housingTop.concat(housingBot)));

      /* γέμισμα θαλάμου — χρώμα ανάλογα με το κενό */
      const vacRatio = clamp((-c.ps) / (-P_LIM), 0, 1);
      const chR_ = Math.round(30 + 40 * (1 - vacRatio));
      const chG_ = Math.round(70 + 50 * (1 - vacRatio));
      const chB_ = Math.round(90 + 80 * vacRatio);
      const chamberFill = [
        [chL, Y0 - CH_HALF + 2], [chR, Y0 - CH_HALF + 2],
        [X.t0, Y0 - Rt], [X.t0, Y0 + Rt],
        [chR, Y0 + CH_HALF - 2], [chL, Y0 + CH_HALF - 2]
      ];
      const chEl = $("chamber-fill");
      chEl.setAttribute("d", poly(chamberFill));
      chEl.setAttribute("fill", "rgb(" + chR_ + "," + chG_ + "," + chB_ + ")");
      chEl.setAttribute("opacity", String(0.35 + 0.45 * vacRatio));

      /* σωλήνα αναρρόφησης: μπαίνει ΜΕΣΑ στον θάλαμο */
      const sx = (chL + chR) / 2;
      const pipeTop = Y0 + CH_HALF - 6;  /* πάνω άκρο μέσα στον θάλαμο */
      const SP = 10;
      $("suction-pipe").setAttribute("d", poly([
        [sx - SP, pipeTop], [sx - SP, 272], [sx + SP, 272], [sx + SP, pipeTop]
      ]));
      /* ρευστό στον σωλήνα */
      const sf = SP - 2;
      const wSu = $("w-suction");
      wSu.setAttribute("d", poly([
        [sx - sf, pipeTop + 2], [sx - sf, 270], [sx + sf, 270], [sx + sf, pipeTop + 2]
      ]));
      wSu.setAttribute("fill", c.Qs > 1e-6 ? "#2a8f6a" : "#1a3545");
      wSu.setAttribute("opacity", c.Qs > 1e-6 ? "0.9" : "0.25");

      /* ένδειξη κενού πάνω στον θάλαμο */
      const vacMPa = -c.ps / 1e6;
      const vacEl = $("vac-readout");
      const psEl = $("ps-readout");
      if (c.ps < -1e3) {
        vacEl.textContent = "Κενό " + fmt(vacMPa, 3) + " MPa";
        vacEl.setAttribute("fill", vacMPa >= 0.09 ? "#3ecf6e" : "#f0b429");
        psEl.textContent = "pₛ = " + fmt(c.ps / 1e6, 3) + " MPa";
        psEl.setAttribute("fill", "#9ec5d8");
      } else {
        vacEl.textContent = "Χωρίς κενό";
        vacEl.setAttribute("fill", "#ef5350");
        psEl.textContent = "pₛ ≈ 0";
        psEl.setAttribute("fill", "#9ec5d8");
      }
      $("chamber-label").setAttribute("x", String(sx));
      vacEl.setAttribute("x", String(sx));
      psEl.setAttribute("x", String(sx));
      $("valve-group").setAttribute("transform", "translate(" + sx.toFixed(0) + ",238)");

      const wallTop = [
        [X.t0, Y0 - Rt], [X.t1, Y0 - Rt],
        [X.d1, Y0 - Ro], [X.out, Y0 - Ro]
      ];
      const wallBot = wallTop.map(function (pt) { return [pt[0], 2 * Y0 - pt[1]]; }).reverse();
      $("inner-wall").setAttribute("d",
        "M" + wallTop.map(function (pt) { return pt[0] + " " + pt[1].toFixed(1); }).join("L") +
        "M" + wallBot.map(function (pt) { return pt[0] + " " + pt[1].toFixed(1); }).join("L"));

      const motive = [
        [X.in0, Y0 - R1], [X.n0, Y0 - R1], [X.n1, Y0 - Rn],
        [X.n1, Y0 + Rn], [X.n0, Y0 + R1], [X.in0, Y0 + R1]
      ];
      const motiveEl = $("w-motive");
      motiveEl.setAttribute("d", poly(motive));
      motiveEl.setAttribute("fill", speedColor(c.v1 + (c.vj - c.v1) * 0.35));

      /* ελεύθερος πίδακας μέσα στον θάλαμο */
      const jetR1 = Rn + Math.max(0, (Rt - Rn) * 0.35);
      const jet = [
        [X.n1, Y0 - Rn], [X.t0, Y0 - jetR1],
        [X.t0, Y0 + jetR1], [X.n1, Y0 + Rn]
      ];
      const jetEl = $("w-jet");
      jetEl.setAttribute("d", poly(jet));
      jetEl.setAttribute("fill", speedColor(c.vj));

      const mix = [
        [X.t0, Y0 - Rt], [X.t1, Y0 - Rt], [X.d1, Y0 - Ro], [X.out, Y0 - Ro],
        [X.out, Y0 + Ro], [X.d1, Y0 + Ro], [X.t1, Y0 + Rt], [X.t0, Y0 + Rt]
      ];
      const mixEl = $("w-mix");
      mixEl.setAttribute("d", poly(mix));
      mixEl.setAttribute("fill", speedColor(c.vt));
      $("name-throat").setAttribute("y", 58);

      /* βάνα */
      $("valve").setAttribute("fill", values.va ? "hsl(" + values.va * 1.2 + ",70%,42%)" : "#c0392b");
      $("valve-open").textContent = values.va + "%";

      /* σταθμοί */
      const set = function (id, text, cls) {
        const el = query('[data-st="' + id + '"]');
        el.textContent = text;
        el.setAttribute("class", cls || "");
      };
      const ptShown = Math.max(c.pt, P_LIM);
      set("1a", "① p = " + fmt(p.pm / 1e6, 3) + " MPa");
      set("1b", "v = " + fmt(c.v1, 1) + " m/s");
      set("2a", "② p = " + fmt(c.ps / 1e6, 3) + " MPa", c.ps < 0 ? "eje-good" : "");
      set("2b", "v = " + fmt(c.vj, 1) + " m/s");
      set("3a", "③ p = " + fmt(ptShown / 1e6, 3) + " MPa", c.state === "cav" ? "eje-bad" : "");
      set("3b", "v = " + fmt(c.vt, 1) + " m/s");
      set("4a", "④ p = " + fmt(c.po / 1e6, 3) + " MPa");
      set("4b", "v = " + fmt(c.vo, 1) + " m/s");

      cur = makeProfiles(p, c);
      renderChart(p, c);
      renderReadings(c);
      renderNumbers(p, c);
      renderSteps(c);
    }


    /* κοινά προφίλ διατομής / ταχύτητας (για διάγραμμα και σωματίδια) */
    function makeProfiles(p, c) {
      const R1 = r(D1 * 1000), Rn = r(values.dn), Rt = r(values.dt), Ro = r(values.d3);
      const areaNozzle = function (x) {
        const rad = D1 / 2 + (p.dn / 2 - D1 / 2) * (x - X.n0) / (X.n1 - X.n0);
        return Math.PI * rad * rad;
      };
      const area = function (x) {
        if (x < X.n0) return Math.PI / 4 * D1 * D1;
        if (x < X.n1) return areaNozzle(x);
        if (x < X.t0) return c.An;
        if (x < X.t1) return c.At;
        if (x < X.d1) {
          const d = p.dt + (p.d3 - p.dt) * (x - X.t1) / (X.d1 - X.t1);
          return Math.PI / 4 * d * d;
        }
        return c.Ao;
      };
      const velocity = function (x) {
        if (x < X.n0) return c.Qn / (Math.PI / 4 * D1 * D1);
        if (x < X.n1) return c.Qn / areaNozzle(x);
        if (x < X.t0) return c.vj;
        if (x < X.t1) return c.vj + (c.vt - c.vj) * (x - X.t0) / (X.t1 - X.t0);
        if (x < X.d1) return c.Q / area(x);
        return c.vo;
      };
      /* μισό πλάτος: ελεύθερος πίδακας μέχρι τον λαιμό, μετά πλήρης διατομή */
      const hw = function (x) {
        if (x < X.n0) return R1;
        if (x < X.n1) return R1 + (Rn - R1) * (x - X.n0) / (X.n1 - X.n0);
        if (x < X.t0) {
          const t = (x - X.n1) / (X.t0 - X.n1);
          return Rn + (Rt - Rn) * 0.35 * t;
        }
        if (x < X.t1) return Rt;
        if (x < X.d1) return Rt + (Ro - Rt) * (x - X.t1) / (X.d1 - X.t1);
        return Ro;
      };
      return { c: c, Rt: Rt, Rn: Rn, areaNozzle: areaNozzle, area: area, velocity: velocity, hw: hw };
    }

    /* σωματίδια ροής — πάντα σε κίνηση */
    const PIPE_X = (X.n1 + 2 + X.t0 - 8) / 2, CH_BOTTOM = Y0 + CH_HALF - 8, TANK_TOP = 268;
    const RATE = 4;
    const MAX_PARTS = 360;
    const layer = $("particles");
    let cur = null;
    let parts = [];
    let spawnAcc = { m: 0, s: 0 };
    let raf = 0;
    let lastTime = 0;

    function spawn(kind) {
      if (parts.length >= MAX_PARTS) return;
      const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      el.setAttribute("r", kind === "m" ? 2.1 : 2.0);
      el.setAttribute("fill", kind === "m" ? "#ffffff" : "#3ecf9a");
      el.setAttribute("opacity", "0.92");
      layer.appendChild(el);
      const part = { kind: kind, el: el, ft: (Math.random() * 2 - 1) * 0.85, x: 0, y: 0, f: 0 };
      if (kind === "m") {
        part.ph = "main";
        part.x = X.in0 + 2;
        part.f = (Math.random() * 2 - 1) * 0.85;
      } else {
        part.ph = "pipe";
        part.x = PIPE_X - 7 + Math.random() * 14;
        part.y = TANK_TOP - 2;
      }
      parts.push(part);
    }
    function removePart(index) {
      layer.removeChild(parts[index].el);
      parts.splice(index, 1);
    }
    function step(dt) {
      if (!cur) return;
      const c = cur.c;
      spawnAcc.m += dt * Math.max(0.15, c.Qn * 1000) * RATE;
      while (spawnAcc.m >= 1) { spawnAcc.m -= 1; spawn("m"); }
      if (c.Qs > 1e-6) {
        spawnAcc.s += dt * c.Qs * 1000 * RATE;
        while (spawnAcc.s >= 1) { spawnAcc.s -= 1; spawn("s"); }
      }
      const pipeSpeed = 8 * (c.Qs / (Math.PI / 4 * DS * DS)) + 22;
      for (let i = parts.length - 1; i >= 0; i--) {
        const q = parts[i];
        if (q.ph === "pipe") {
          q.y -= pipeSpeed * dt;
          if (q.y <= CH_BOTTOM) {
            q.ph = "ch";
            const side = Math.random() < 0.5 ? -1 : 1;
            q.ty = Y0 + side * (cur.Rn + 8 + Math.random() * Math.max(4, CH_HALF - cur.Rn - 12));
          }
        } else if (q.ph === "ch") {
          const frac = clamp((q.x - PIPE_X) / (X.t0 - PIPE_X), 0, 1);
          const sp = 40 + 200 * frac;
          const dx = X.t0 - q.x, dy = q.ty - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < sp * dt + 1.5) {
            q.ph = "main";
            q.x = X.t0;
            q.f = clamp((q.ty - Y0) / Math.max(1, cur.hw(X.t0)), -0.95, 0.95);
            q.ft = (Math.random() * 2 - 1) * 0.9;
          } else {
            q.x += dx / dist * sp * dt;
            q.y += dy / dist * sp * dt;
          }
        } else {
          q.x += (8 * cur.velocity(q.x) + 28) * dt;
          if (q.x > X.t0 && q.x < X.t1) q.f += (q.ft - q.f) * Math.min(1, 1.5 * dt);
          if (q.x > X.out) { removePart(i); continue; }
          q.y = Y0 + q.f * cur.hw(q.x);
        }
      }
    }
    function draw() {
      for (let i = 0; i < parts.length; i++) {
        const q = parts[i];
        q.el.setAttribute("cx", q.x.toFixed(1));
        q.el.setAttribute("cy", q.y.toFixed(1));
      }
    }
    function frame(time) {
      const dt = lastTime ? Math.min(0.04, (time - lastTime) / 1000) : 0.016;
      lastTime = time;
      step(dt);
      draw();
      raf = window.requestAnimationFrame(frame);
    }

    /* διάγραμμα πίεσης / ταχύτητας */
    function renderChart(p, c) {
      const W = 700, H = 250, L = 52, Rm = 52, T = 18, B = 26;
      const pw = W - L - Rm, ph = H - T - B;
      const pMax = Math.max(0.2, Math.ceil(Math.max(p.pm, c.po) / 0.1e6) * 0.1);
      const pMin = -0.1;
      const vMax = Math.max(20, Math.ceil(Math.max(c.vj, c.vt, c.vo) / 10) * 10);
      const sx = function (x) { return L + (x - X.in0) / (X.out - X.in0) * pw; };
      const sp = function (mpa) { return T + (pMax - mpa) / (pMax - pMin) * ph; };
      const sv = function (v) { return T + (1 - v / vMax) * ph; };

      const prof = cur;
      const areaNozzle = prof.areaNozzle, area = prof.area, velocity = prof.velocity;

      const pressure = function (x) {
        if (x < X.n0) return p.pm - (p.pm - c.ps) * Math.pow(c.An / (Math.PI / 4 * D1 * D1), 2);
        if (x < X.n1) return p.pm - (p.pm - c.ps) * Math.pow(c.An / areaNozzle(x), 2);
        if (x < X.t0) return c.ps;
        if (x < X.t1) return c.ps + (Math.max(c.pt, P_LIM) - c.ps) * (x - X.t0) / (X.t1 - X.t0);
        if (x < X.d1) {
          const A = area(x);
          return c.pt + ETA_D * 0.5 * RHO * c.Q * c.Q * (1 / (c.At * c.At) - 1 / (A * A));
        }
        return c.po;
      };
      let pp = "", vv = "";
      for (let x = X.in0; x <= X.out; x += 4) {
        pp += (pp ? "L" : "M") + sx(x).toFixed(1) + " " + clamp(sp(pressure(x) / 1e6), T, T + ph).toFixed(1);
        vv += (vv ? "L" : "M") + sx(x).toFixed(1) + " " + sv(velocity(x)).toFixed(1);
      }

      let grid = "";
      for (let m = Math.ceil(pMin * 10) / 10; m <= pMax + 1e-9; m += 0.1) {
        grid += '<line x1="' + L + '" x2="' + (W - Rm) + '" y1="' + sp(m).toFixed(1) + '" y2="' + sp(m).toFixed(1) +
          '" stroke="#2b4258" stroke-width="' + (Math.abs(m) < 1e-9 ? 1.6 : 0.6) + '"/>' +
          '<text x="' + (L - 6) + '" y="' + (sp(m) + 3).toFixed(1) + '" text-anchor="end" class="eje-small-text">' + fmt(m, 1) + "</text>";
      }
      for (let v = 0; v <= vMax; v += vMax / 4) {
        grid += '<text x="' + (W - Rm + 6) + '" y="' + (sv(v) + 3).toFixed(1) + '" class="eje-small-text eje-vel">' + Math.round(v) + "</text>";
      }
      const stations = [[X.in0 + 50, "①"], [(X.n1 + X.t0) / 2 - 20, "②"], [(X.t0 + X.t1) / 2, "③"], [(X.d1 + X.out) / 2, "④"]];
      let marks = "";
      stations.forEach(function (st) {
        marks += '<line x1="' + sx(st[0]).toFixed(1) + '" x2="' + sx(st[0]).toFixed(1) + '" y1="' + T + '" y2="' + (T + ph) +
          '" stroke="#5c88a8" stroke-dasharray="3 4" stroke-width=".8"/>' +
          '<text x="' + sx(st[0]).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle">' + st[1] + "</text>";
      });
      const limY = sp(P_LIM / 1e6).toFixed(1);
      $("chart").innerHTML =
        grid + marks +
        '<line x1="' + L + '" x2="' + (W - Rm) + '" y1="' + limY + '" y2="' + limY + '" stroke="#ef5350" stroke-dasharray="6 4" stroke-width="1.2"/>' +
        '<text x="' + (L + 4) + '" y="' + (Number(limY) - 4) + '" class="eje-small-text eje-bad">όριο κενού</text>' +
        '<text x="' + (L - 6) + '" y="10" text-anchor="end" class="eje-small-text">MPa</text>' +
        '<text x="' + (W - Rm + 6) + '" y="10" class="eje-small-text eje-vel">m/s</text>' +
        '<path d="' + vv + '" fill="none" stroke="#6fc4e8" stroke-width="2" stroke-dasharray="1 0"/>' +
        '<path d="' + pp + '" fill="none" stroke="#f0b429" stroke-width="2.4"/>';
    }

    function renderReadings(c) {
      const set = function (id, text, cls) {
        const el = query('[data-reading="' + id + '"]');
        el.textContent = text;
        el.setAttribute("class", cls || "");
      };
      set("Qn", fmt(c.Qn * 1000, 2) + " L/s");
      set("Qs", fmt(c.Qs * 1000, 2) + " L/s", c.Qs > 0 ? "eje-good" : "");
      set("M", fmt(c.M, 2));
      set("vj", fmt(c.vj, 1) + " m/s");
      set("vt", fmt(c.vt, 1) + " m/s");
      set("vo", fmt(c.vo, 1) + " m/s");
      set("ps", fmt(c.ps / 1e6, 3) + " MPa", c.ps < 0 ? "eje-good" : "");
      const vac = -c.ps;
      set("vac", fmt(vac / 1e6, 3) + " MPa (" + Math.round(vac / P_ATM * 76) + " cmHgV)", vac >= 0.09e6 ? "eje-good" : "");
      set("pt", fmt(Math.max(c.pt, P_LIM) / 1e6, 3) + " MPa", c.state === "cav" ? "eje-bad" : "");
      set("eta", c.Qs > 0 ? fmt(c.eta * 100, 1) + " %" : "—");

      const status = $("status");
      const messages = {
        ok: ["eje-good", "Κανονική λειτουργία: ο εγχυτήρας αναρροφά και κατάθλιψη στην αντίθλιψη της γραμμής."],
        limit: ["eje-warn", "Όριο κενού: το νερό φτάνει στην τάση ατμών (−0,098 MPa). Μεγαλύτερο κενό δεν είναι δυνατό."],
        stall: ["eje-bad", "Stall: η αντίθλιψη είναι μεγαλύτερη από την πίεση που δίνει ο εγχυτήρας. Δεν υπάρχει αναρρόφηση."],
        cav: ["eje-bad", "Σπηλαίωση στον λαιμό: η πίεση φτάνει στην τάση ατμών. Στην πράξη η παροχή αναρρόφησης δεν αυξάνεται άλλο και η αντλία φθείρεται."],
      };
      status.setAttribute("class", "eje-status " + messages[c.state][0]);
      status.textContent = messages[c.state][1];
    }

    function renderNumbers(p, c) {
      const dpa = p.pm - c.ps;
      const ideal = 0.5 * RHO * (c.vj * c.vj - c.v1 * c.v1);
      const line = function (title, text) { return "<div><b>" + title + "</b><br>" + text + "</div>"; };
      $("numbers").innerHTML =
        line("Ακροφύσιο (Bernoulli)",
          "Δp = p<sub>m</sub> − p<sub>s</sub> = " + fmt(p.pm / 1e6, 3) + " − (" + fmt(c.ps / 1e6, 3) + ") = " + fmt(dpa / 1e6, 3) +
          " MPa<br>v<sub>j</sub> = C<sub>v</sub>·√(2Δp/ρ) = " + fmt(c.vj, 1) + " m/s") +
        line("Ακροφύσιο (συνέχεια)",
          "A<sub>n</sub> = " + fmt(c.An * 1e6, 1) + " mm² &nbsp;→&nbsp; Q<sub>n</sub> = A<sub>n</sub>·v<sub>j</sub> = " + fmt(c.Qn * 1000, 2) + " L/s") +
        line("Υποπίεση από τη μεταβολή ταχύτητας",
          "½ρ(v<sub>j</sub>² − v<sub>1</sub>²) = ½·" + RHO + "·(" + fmt(c.vj, 1) + "² − " + fmt(c.v1, 1) + "²) = " + fmt(ideal / 1e6, 3) +
          " MPa<br>(χωρίς απώλειες· με C<sub>v</sub> = " + CV + " η πραγματική Δp είναι " + fmt(dpa / 1e6, 3) + " MPa)") +
        line("Λαιμός (συνέχεια)",
          "A<sub>t</sub> = " + fmt(c.At * 1e6, 1) + " mm² &nbsp;→&nbsp; v<sub>t</sub> = (Q<sub>n</sub> + Q<sub>s</sub>)/A<sub>t</sub> = " +
          fmt(c.Q * 1000, 2) + " L/s ÷ " + fmt(c.At * 1e6, 1) + " mm² = " + fmt(c.vt, 1) + " m/s") +
        line("Κενό (απόλυτη πίεση)",
          "p<sub>abs</sub> = p<sub>atm</sub> + p<sub>s</sub> = " + fmt(P_ATM / 1e6, 4) + " + (" + fmt(c.ps / 1e6, 3) + ") = " +
          fmt((P_ATM + c.ps) / 1e6, 3) + " MPa");
    }

    function renderSteps(c) {
      const a = values.va;
      const checks = [
        a <= 10 && -c.ps >= 0.09e6,
        a >= 50 && c.Qs >= 0.003 && c.state === "ok",
        c.state === "stall",
        c.state === "cav",
      ];
      checks.forEach(function (ok, index) { if (ok) done[index] = 1; });
      $("steps").innerHTML = challenges.map(function (text, index) {
        return '<li class="' + (done[index] ? "done" : "") + '">' + text + "</li>";
      }).join("");
    }

    function reset() {
      defaults();
      done = [];
      render();
    }

    /* συμβάντα */
    container.addEventListener("input", function (event) {
      const input = event.target.closest("[data-slider]");
      if (!input || !container.contains(input)) return;
      const id = input.getAttribute("data-slider");
      values[id] = Number(input.value);
      normalize(id);
      render();
    });
    $("reset").addEventListener("click", reset);

    defaults();
    render();
    typeset($("theory"));
    for (let i = 0; i < 160; i++) step(0.04);
    draw();
    raf = window.requestAnimationFrame(frame);

    return function () {
      window.cancelAnimationFrame(raf);
      container.innerHTML = "";
    };
  };
  window.mountEjector.calc = calc;
})();
