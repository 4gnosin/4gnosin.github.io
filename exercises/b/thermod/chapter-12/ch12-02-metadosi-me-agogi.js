window.EXERCISES = window.EXERCISES || [];
window.EXERCISES.push(...
[
  {
    "id": "ch12-18621",
    "group": "ch12-02-metadosi-me-agogi",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #18621",
    "bankCode": "18621",
    "title": "#18621 — Θέμα 4<sup>ο</sup>",
    "units": 25,
    "theory": "ch12-02-metadosi-me-agogi",
    "sourceOrder": 1,
    "stem": "Μέσα από ένα χαλύβδινο έλασμα πάχους $L$ και εμβαδού $A = 2\\text{ m}^2$ διέρχεται θερμότητα $Q = 100\\text{ kJ}$. Στη μία πλευρά του ελάσματος η θερμοκρασία είναι $\\theta_1 = 60\\text{ }^\\circ\\text{C}$ και στην άλλη είναι $\\theta_2 = 313\\text{ K}$. Το φαινόμενο έλαβε χώρα σε χρόνο $t = 4\\text{ s}$. Δίνεται ο συντελεστής θερμικής αγωγιμότητας $\\lambda = 50\\text{ \\frac{W}{m\\cdot K}}$.",
    "items": [
      {
        "kind": "calc",
        "subq": "α",
        "prompt": "α) Να υπολογιστεί η ροή της θερμότητας $\\dot{Q}$.",
        "formula": "\\dot{Q} = \\frac{Q}{t}",
        "answer": 25,
        "unit": "kW",
        "tolerance": 0.02,
        "hint": "Χρησιμοποιήστε τον τύπο $\\dot{Q} = \\frac{Q}{t}$.",
        "explain": "Η ροή θερμότητας υπολογίζεται από τη σχέση: $\\dot{Q} = \\frac{Q}{t} = \\frac{100\\text{ kJ}}{4\\text{ s}} = 25\\text{ kW}$."
      },
      {
        "kind": "calc",
        "subq": "β",
        "prompt": "β) Να υπολογιστεί η θερμοκρασία $\\theta_1$ σε κλίμακα Κέλβιν.",
        "formula": "T = t^\\circ + 273",
        "answer": 333,
        "unit": "K",
        "tolerance": 0.02,
        "hint": "Προσθέστε 273 στη θερμοκρασία σε βαθμούς Κελσίου.",
        "explain": "Από τη σχέση $T = t^\\circ + 273$ μετατρέπουμε τους $60\\text{ }^\\circ\\text{C}$ σε κλίμακα Κέλβιν: $\\theta_1 = 60 + 273 = 333\\text{ K}$."
      },
      {
        "kind": "calc",
        "subq": "γ",
        "prompt": "γ) Να υπολογιστεί το πάχος του ελάσματος $L$.",
        "formula": "\\dot{Q} = \\frac{\\lambda \\cdot A \\cdot (\\theta_1 - \\theta_2)}{L}",
        "answer": 0.08,
        "unit": "m",
        "tolerance": 0.02,
        "hint": "Χρησιμοποιήστε τον νόμο του Fourier για τη θερμική αγωγή.",
        "explain": "Το πάχος του ελάσματος υπολογίζεται από τον νόμο του Fourier: $L = \\frac{\\lambda \\cdot A \\cdot (\\theta_1 - \\theta_2)}{\\dot{Q}} = \\frac{50 \\cdot 2 \\cdot (333 - 313)}{25000} = 0.08\\text{ m}$."
      }
    ]
  },
  {
    "id": "ch12-20049",
    "group": "ch12-02-metadosi-me-agogi",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #20049",
    "bankCode": "20049",
    "title": "#20049 — Θέμα 4<sup>ο</sup>",
    "units": 25,
    "theory": "ch12-02-metadosi-me-agogi",
    "sourceOrder": 2,
    "stem": "Μια θερμαινόμενη ηλεκτρικά οροφή ενός συνεργείου έχει διαστάσεις $10\\text{ m}$ μήκος, $5\\text{ m}$ πλάτος και $20\\text{ cm}$ πάχος. Το υλικό της οροφής έχει συντελεστή θερμικής αγωγιμότητας $\\lambda = 0.6\\text{ W}/\\text{m}\\cdot\\text{K}$. Η επιφανειακή εσωτερική θερμοκρασία είναι $13\\text{ }^\\circ\\text{C}$ και η επιφανειακή εξωτερική θερμοκρασία είναι $5\\text{ }^\\circ\\text{C}$.",
    "items": [
      {
        "kind": "calc",
        "subq": "4.1",
        "prompt": "4.1 Να υπολογίσετε τη ροή θερμότητας δια μέσου της οροφής",
        "formula": "\\dot{Q} = \\frac{\\lambda \\cdot A}{L} \\cdot (\\Theta_1 - \\Theta_2)",
        "answer": 1.2,
        "unit": "kW",
        "tolerance": 0.02,
        "hint": "Υπολογίστε πρώτα το εμβαδό $A$, το πάχος σε μέτρα και τις θερμοκρασίες σε Κέλβιν.",
        "explain": "Η ροή θερμότητας είναι $\\dot{Q} = \\frac{\\lambda \\cdot A}{L} \\cdot (\\Theta_1 - \\Theta_2) = \\frac{0.6 \\cdot 50}{0.2} \\cdot (286 - 278) = 1200\\text{ W} = 1.2\\text{ kW}$.",
        "image": "images/b/thermod/chapter-12/b_thermod_ch12_#20049_fig03.png"
      },
      {
        "kind": "calc",
        "subq": "4.2",
        "prompt": "4.2 Να υπολογίσετε το κόστος της ηλεκτρικής ενέργειας για χρονικό διάστημα 12 ωρών, όταν 1 kWh κοστίζει 0,1€.",
        "formula": "Kόστος = Q \\times \\text{τιμή}",
        "answer": 1.44,
        "unit": "€",
        "tolerance": 0.02,
        "hint": "Βρείτε τη συνολική ενέργεια $Q$ σε kWh για 12 ώρες και πολλαπλασιάστε με την τιμή.",
        "explain": "Η ενέργεια είναι $Q = \\dot{Q} \\cdot t = 1.2\\text{ kW} \\cdot 12\\text{ h} = 14.4\\text{ kWh}$. Το κόστος είναι $14.4\\text{ kWh} \\cdot 0,1\\text{ €/kWh} = 1,44\\text{ €}$."
      }
    ]
  },
  {
    "id": "ch12-27013",
    "group": "ch12-02-metadosi-me-agogi",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #27013",
    "bankCode": "27013",
    "title": "#27013 — Θέμα 4<sup>ο</sup>",
    "units": 25,
    "theory": "ch12-02-metadosi-me-agogi",
    "sourceOrder": 3,
    "stem": "Μέσα από ένα μπρούτζινο έλασμα πάχους $L = 0,05\\text{ m}$ και εμβαδού $A$ διέρχεται ροή θερμότητας $\\dot{Q} = 13\\text{ kW}$, σε χρόνο $t = 10\\text{ s}$. Στη μία πλευρά του ελάσματος η θερμοκρασία είναι $\\theta_1 = 330\\text{ K}$ και στην άλλη είναι $\\theta_2 = 320\\text{ K}$. Δίνεται $\\lambda = 65\\text{ \\frac{W}{m\\cdot K}}$.",
    "items": [
      {
        "kind": "calc",
        "subq": "4.1",
        "prompt": "4.1 Να υπολογιστεί η θερμότητα $Q$.",
        "formula": "Q = \\dot{Q} \\cdot t",
        "answer": 130,
        "unit": "kJ",
        "tolerance": 0.02,
        "hint": "Πολλαπλασιάστε τη ροή θερμότητας με τον χρόνο.",
        "explain": "Η θερμότητα υπολογίζεται από τη σχέση: $Q = \\dot{Q} \\cdot t = 13\\text{ kW} \\cdot 10\\text{ s} = 130\\text{ kJ}$."
      },
      {
        "kind": "calc",
        "subq": "4.2",
        "prompt": "4.2 Να υπολογιστεί το εμβαδό του ελάσματος $A$.",
        "formula": "A = \\frac{\\dot{Q} \\cdot L}{\\lambda \\cdot (\\theta_1 - \\theta_2)}",
        "answer": 1,
        "unit": "m2",
        "tolerance": 0.02,
        "hint": "Λύστε τον νόμο του Fourier ως προς $A$.",
        "explain": "Το εμβαδό υπολογίζεται από τον νόμο του Fourier: $A = \\frac{13000 \\cdot 0.05}{65 \\cdot (330 - 320)} = 1\\text{ m}^2$."
      },
      {
        "kind": "calc",
        "subq": "4.3",
        "prompt": "4.3 Να υπολογιστεί η θερμική αντίσταση για διάδοση με αγωγή $R$.",
        "formula": "R = \\frac{L}{\\lambda \\cdot A}",
        "answer": 0.000769,
        "unit": "K/W",
        "tolerance": 0.02,
        "hint": "Χρησιμοποιήστε τον τύπο $R = \\frac{L}{\\lambda \\cdot A}$.",
        "explain": "Η θερμική αντίσταση είναι $R = \\frac{0.05}{65 \\cdot 1} = \\frac{1}{1300}\\text{ K/W} \\approx 0.000769\\text{ K/W}$ (ή $\\frac{1}{1300}\\text{ K/W}$)."
      }
    ]
  },
  {
    "id": "ch12-17648",
    "group": "ch12-02-metadosi-me-agogi",
    "kind": "calc",
    "layout": "unified",
    "bankCode": "17648",
    "code": "Θέμα 4<sup>ο</sup> · #17648",
    "title": "#17648 — Θέμα 4<sup>ο</sup>",
    "units": 25,
    "theory": "ch12-02-metadosi-me-agogi",
    "sourceOrder": 4,
    "stem": "Το χαλύβδινο περίβλημα μιας μηχανής έχει πάχος L = 10 mm και εμβαδό A = 2 m². Εάν η θερμοκρασία στο εσωτερικό της μηχανής ισούται με \\theta_1 = 100\\text{ }^\\circ\\text{C}, η θερμοκρασία του εξωτερικού περιβάλλοντος \\theta_2 = 20\\text{ }^\\circ\\text{C} και ο συντελεστής θερμικής αγωγιμότητας του υλικού \\lambda = 58\\text{ W}/(\\text{m}\\cdot\\text{K}), να υπολογίσετε:",
    "items": [
      {
        "kind": "calc",
        "subq": "α",
        "prompt": "α) την θερμότητα Q που διέρχεται μέσα από το περίβλημα σε χρονικό διάστημα t = 1 λεπτού.",
        "formula": "Q = \\frac{\\lambda \\cdot t \\cdot A}{L} \\cdot (\\theta_1 - \\theta_2)",
        "answer": 55680,
        "unit": "kJ",
        "tolerance": 0.01,
        "hint": "Μετατρέψτε το χρόνο σε δευτερόλεπτα \\(t = 60\\text{ s}\\) και το πάχος σε μέτρα \\(L = 0,01\\text{ m}\\).",
        "explain": "\\(t = 60\\text{ s}\\), \\(L = 0,01\\text{ m}\\), \\(\\Delta\\theta = 80\\text{ K}\\). \\(Q = \\frac{58 \\cdot 60 \\cdot 2}{0,01} \\cdot 80 = 55.680.000\\text{ W}\\cdot\\text{s} = 55.680\\text{ kJ}\\)."
      },
      {
        "kind": "calc",
        "subq": "β",
        "prompt": "β) την ροή θερμότητας \\(\\dot{Q}\\).",
        "formula": "\\dot{Q} = \\frac{Q}{t}",
        "answer": 928,
        "unit": "kW",
        "tolerance": 0.01,
        "hint": "Διαιρέστε τη συνολική θερμότητα \\(Q\\) με το χρονικό διάστημα \\(t = 60\\text{ s}\\).",
        "explain": "\\(\\dot{Q} = \\frac{55680\\text{ kJ}}{60\\text{ s}} = 928\\text{ kW}\\)."
      }
    ]
  }
]
);
