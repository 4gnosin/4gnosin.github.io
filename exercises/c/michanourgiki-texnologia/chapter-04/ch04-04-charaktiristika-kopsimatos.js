window.SUBJECT_DATA = window.SUBJECT_DATA || {};
window.SUBJECT_DATA["michanourgiki-texnologia"] = window.SUBJECT_DATA["michanourgiki-texnologia"] || { sections: [], groups: [], exercises: [] };
window.SUBJECT_DATA["michanourgiki-texnologia"].exercises.push(...
[
  {
    "id": "ch04-25194",
    "group": "ch04-04-charaktiristika-kopsimatos",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #25194",
    "bankCode": "25194",
    "title": "#25194 — Θέμα 4<sup>ο</sup>",
    "units": 25,
    "theory": "ch04-04-charaktiristika-kopsimatos",
    "sourceOrder": 7,
    "stem": "Άξονας από χάλυβα $50-70\\text{ kg/mm}^2$ και με αρχική διάμετρο $d=200\\text{ mm}$, πρόκειται να υποστεί κατεργασία εκχόνδρισης σε τόρνο, με χρήση κοπτικού εργαλείου από ταχυχάλυβα (HSS). Δίνεται $\\pi=3,14$ και ότι οι συνθήκες προκύπτουν από τον πίνακα.",
    "items": [
      {
        "kind": "calc",
        "subq": "α",
        "prompt": "Υπολογίστε την ταχύτητα κοπής $u$ σε $\\text{m/min}$.",
        "formula": "$u = 20\\text{ m/min}$ (από πίνακα)",
        "answer": 20,
        "unit": "m/min",
        "tolerance": 0.01,
        "hint": "Ανατρέξτε στον πίνακα συνθηκών κοπής για χάλυβα $50-70\\text{ kg/mm}^2$ με HSS.",
        "explain": "Από τον πίνακα συνθηκών κατεργασίας, για χάλυβα $50-70\\text{ kg/mm}^2$ και εργαλείο HSS σε εκχόνδριση, η ταχύτητα κοπής είναι $u = 20\\text{ m/min}$."
      },
      {
        "kind": "calc",
        "subq": "β",
        "prompt": "Επιλέξτε την πρόωση $s$ σε $\\text{mm/rev}$.",
        "formula": "$s = 1\\text{ mm/rev}$ (από πίνακα)",
        "answer": 1,
        "unit": "mm/rev",
        "tolerance": 0.01,
        "hint": "Διαβάστε την τιμή πρόωσης από τον πίνακα συνθηκών.",
        "explain": "Από τον πίνακα προκύπτει πρόωση $s = 1\\text{ mm/rev}$."
      },
      {
        "kind": "calc",
        "subq": "γ",
        "prompt": "Επιλέξτε το βάθος κοπής $a$ σε $\\text{mm}$.",
        "formula": "$a = 10\\text{ mm}$ (από πίνακα)",
        "answer": 10,
        "unit": "mm",
        "tolerance": 0.01,
        "hint": "Διαβάστε το βάθος κοπής από τον πίνακα.",
        "explain": "Από τον πίνακα προκύπτει βάθος κοπής $a = 10\\text{ mm}$."
      },
      {
        "kind": "calc",
        "subq": "δ",
        "prompt": "Υπολογίστε τις στροφές της κύριας ατράκτου του τόρνου $n$ σε $\\text{rpm}$ ($\\text{στρ/min}$).",
        "formula": "$n = \\frac{1000 \\cdot u}{\\pi \\cdot d}$",
        "answer": 31.8,
        "unit": "rpm",
        "tolerance": 0.05,
        "hint": "Χρησιμοποιήστε τον τύπο $n = \\frac{1000 \\cdot u}{\\pi \\cdot d}$.",
        "explain": "$$n = \\frac{1000 \\cdot 20}{3,14 \\cdot 200} = \\frac{20000}{628} \\approx 31,8\\text{ rpm}$$"
      },
      {
        "kind": "calc",
        "subq": "ε",
        "prompt": "Υπολογίστε την ταχύτητα πρόωσης $s'$ σε $\\text{mm/min}$.",
        "formula": "$s' = s \\cdot n$",
        "answer": 31.8,
        "unit": "mm/min",
        "tolerance": 0.05,
        "hint": "Πολλαπλασιάστε την πρόωση $s$ επί τις στροφές $n$.",
        "explain": "$$s' = 1\\text{ mm/rev} \\cdot 31,8\\text{ rpm} = 31,8\\text{ mm/min}$$"
      }
    ],
    "image": "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#25194_fig01.png"
  },
  {
    "id": "ch04-27601",
    "group": "ch04-04-charaktiristika-kopsimatos",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #27601",
    "bankCode": "27601",
    "title": "#27601 — Θέμα 4<sup>ο</sup>",
    "units": 25,
    "theory": "ch04-04-charaktiristika-kopsimatos",
    "sourceOrder": 8,
    "stem": "Για την τόρνευση τεμαχίου διαμέτρου $d=50\\text{ mm}$ και μήκους $L_1=500\\text{ mm}$ με ταχύτητα κοπής $u=20\\text{ m/min}$ και πρόωση $s=0,5\\text{ mm/rev}$, ζητείται να υπολογίσετε τα μεγέθη κατεργασίας. Δίδονται τα διαστήματα πριν και μετά την κοπή $l_a = l_u = 5\\text{ mm}$ και $\\pi \\approx 3,14$.",
    "items": [
      {
        "kind": "calc",
        "subq": "α",
        "prompt": "Υπολογίστε το μήκος κοπής $l$ σε $\\text{mm}$.",
        "formula": "$l = L_1 + l_a + l_u$",
        "answer": 510,
        "unit": "mm",
        "tolerance": 0.01,
        "hint": "Προσθέστε στο μήκος τεμαχίου $L_1$ τα διαστήματα προσέγγισης και αποχώρησης $l_a$ και $l_u$.",
        "explain": "$$l = 500\\text{ mm} + 5\\text{ mm} + 5\\text{ mm} = 510\\text{ mm}$$"
      },
      {
        "kind": "calc",
        "subq": "β",
        "prompt": "Υπολογίστε τις στροφές περιστροφής του τσοκ του τόρνου $n$ σε $\\text{rpm}$.",
        "formula": "$n = \\frac{1000 \\cdot u}{\\pi \\cdot d}$",
        "answer": 127.38,
        "unit": "rpm",
        "tolerance": 0.1,
        "hint": "Εφαρμόστε τον τύπο $n = \\frac{1000 \\cdot u}{\\pi \\cdot d}$ με $u=20$ και $d=50$.",
        "explain": "$$n = \\frac{1000 \\cdot 20}{3,14 \\cdot 50} = \\frac{20000}{157} \\approx 127,38\\text{ rpm}$$"
      },
      {
        "kind": "calc",
        "subq": "γ",
        "prompt": "Υπολογίστε τον χρόνο κοπής $t_h$ σε $\\text{min}$.",
        "formula": "$t_h = \\frac{l}{s \\cdot n}$",
        "answer": 8,
        "unit": "min",
        "tolerance": 0.1,
        "hint": "Διαιρέστε το συνολικό μήκος κοπής $l$ δια του γινομένου πρόωσης και στροφών ($s \\cdot n$).",
        "explain": "$$t_h = \\frac{510}{0,5 \\cdot 127,38} = \\frac{510}{63,69} = 8\\text{ min}$$"
      }
    ]
  },
  {
    "id": "ch04-27603",
    "group": "ch04-04-charaktiristika-kopsimatos",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #27603",
    "bankCode": "27603",
    "title": "#27603 — Θέμα 4<sup>ο</sup>",
    "units": 25,
    "theory": "ch04-04-charaktiristika-kopsimatos",
    "sourceOrder": 9,
    "stem": "Πρόκειται να πραγματοποιηθεί τόρνευση προσώπου τεμαχίου διαμέτρου $d = 200\\text{ mm}$ και σε μήκος $L_a = 27,36\\text{ mm}$ με ταχύτητα κοπής $u = 20\\text{ m/min}$ και πρόωση $s = 0,5\\text{ mm/rev}$. Δίνεται $\\pi \\approx 3,14$.",
    "items": [
      {
        "kind": "calc",
        "subq": "α",
        "prompt": "Υπολογίστε τις στροφές περιστροφής του τσοκ του τόρνου $n$ σε $\\text{rpm}$.",
        "formula": "$n = \\frac{1000 \\cdot u}{\\pi \\cdot d}$",
        "answer": 31.84,
        "unit": "rpm",
        "tolerance": 0.1,
        "hint": "Χρησιμοποιήστε τον τύπο στροφών με $u=20$ και $d=200$.",
        "explain": "$$n = \\frac{1000 \\cdot 20}{3,14 \\cdot 200} = \\frac{20000}{628} \\approx 31,84\\text{ rpm}$$"
      },
      {
        "kind": "calc",
        "subq": "β",
        "prompt": "Υπολογίστε το μήκος κοπής $L$ σε $\\text{mm}$.",
        "formula": "$L = r + L_a$, όπου $r = \\frac{d}{2}$",
        "answer": 127.36,
        "unit": "mm",
        "tolerance": 0.1,
        "hint": "Υπολογίστε την ακτίνα $r = d/2$ και προσθέστε το μήκος διαδρομής $L_a$.",
        "explain": "$$r = \\frac{200}{2} = 100\\text{ mm}, \\quad L = 100 + 27,36 = 127,36\\text{ mm}$$"
      },
      {
        "kind": "calc",
        "subq": "γ",
        "prompt": "Υπολογίστε τον χρόνο κοπής $t_h$ σε $\\text{min}$.",
        "formula": "$t_h = \\frac{L}{s \\cdot n}$",
        "answer": 8,
        "unit": "min",
        "tolerance": 0.1,
        "hint": "Διαιρέστε το μήκος $L$ δια του γινομένου $s \\cdot n$.",
        "explain": "$$t_h = \\frac{127,36}{0,5 \\cdot 31,84} = \\frac{127,36}{15,92} = 8\\text{ min}$$"
      }
    ]
  },
  {
    "id": "ch04-27616",
    "group": "ch04-04-charaktiristika-kopsimatos",
    "kind": "blank",
    "layout": "unified",
    "code": "Θέμα 2<sup>ο</sup> · #27616",
    "bankCode": "27616",
    "title": "#27616 — Θέμα 2<sup>ο</sup> (2.1–2.2)",
    "units": 25,
    "theory": "ch04-04-charaktiristika-kopsimatos",
    "sourceOrder": 10,
    "items": [
      {
        "kind": "blank",
        "subq": "2.1",
        "subqPrompt": "Συμπληρώστε τα κενά στο παρακάτω κείμενο με τις κατάλληλες λέξεις από τη λίστα: περιστροφή, αντίστροφη, χαμηλή, υψηλή, αντίσταση, πρόωση.",
        "textBefore": [
          "«Στον τόρνο, η ταχύτητα κοπής δεν επιλέγεται τυχαία. Η ",
          " (1) ταχύτητα κοπής, οδηγεί σε μεγάλο χρόνο κοπής, ενώ ",
          " (2) ταχύτητα κοπής οδηγεί σε υψηλές θερμοκρασίες που αναπτύσσονται στο κοπτικό εργαλείο, με αποτέλεσμα την πρόωρη φθορά και καταστροφή του.\\n\\nΗ ταχύτητα κοπής εκφράζει το ρυθμό κοπής στην κύρια κίνηση, που είναι η ",
          " (3) του τεμαχίου»."
        ],
        "answers": [
          "χαμηλή",
          "υψηλή",
          "περιστροφή"
        ],
        "bank": [
          "περιστροφή",
          "αντίστροφη",
          "χαμηλή",
          "υψηλή",
          "αντίσταση",
          "πρόωση"
        ],
        "explain": "Η χαμηλή ταχύτητα κοπής αυξάνει τον χρόνο, η υψηλή προκαλεί φθορά λόγω θερμοκρασίας, και κύρια κίνηση στον τόρνο είναι η περιστροφή του τεμαχίου."
      },
      {
        "kind": "match",
        "subq": "2.2",
        "subqPrompt": "Αντιστοιχίστε τα μέρη της γωνίας κοπτικού εργαλείου της Στήλης Α με τα ονόματα της Στήλης Β.",
        "left": [
          {
            "id": "1",
            "text": "1"
          },
          {
            "id": "2",
            "text": "2"
          },
          {
            "id": "3",
            "text": "3"
          },
          {
            "id": "4",
            "text": "4"
          }
        ],
        "right": [
          {
            "id": "a",
            "text": "Γωνία κοπής"
          },
          {
            "id": "b",
            "text": "Γωνία ελευθερίας"
          },
          {
            "id": "c",
            "text": "Γωνία σφήνας"
          },
          {
            "id": "d",
            "text": "Γωνία τεμαχίου"
          },
          {
            "id": "e",
            "text": "Γωνία αποβλήτου"
          }
        ],
        "pairs": {
          "1": "b",
          "2": "c",
          "3": "e",
          "4": "a"
        },
        "images": [
          "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#27616_fig01.png"
        ],
        "explain": "1-b: Γωνία ελευθερίας. 2-c: Γωνία σφήνας. 3-e: Γωνία αποβλήτου. 4-a: Γωνία κοπής.",
        "image": "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#27616_fig01.png"
      }
    ]
  },
  {
    "id": "ch04-29133",
    "group": "ch04-04-charaktiristika-kopsimatos",
    "kind": "mc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #29133",
    "bankCode": "29133",
    "title": "#29133 — Θέμα 4<sup>ο</sup>",
    "units": 25,
    "theory": "ch04-04-charaktiristika-kopsimatos",
    "sourceOrder": 11,
    "stem": "Είστε μηχανικός σε ένα μηχανουργείο. Να δώσετε πέντε (5) γενικές οδηγίες στον χειριστή του τόρνου για την τόρνευση τεμαχίων.",
    "items": [
      {
        "kind": "mc",
        "subq": "4.1",
        "openEnded": true,
        "prompt": "Να αναφέρετε πέντε γενικές οδηγίες για την τόρνευση τεμαχίων.",
        "options": [
          {
            "id": "a",
            "text": "Κεντραρισμένη και ασφαλής στερέωση τεμαχίου στο τσοκ, απομάκρυνση κλειδιού τσοκ, ακριβής υπολογισμός στροφών/προώσεων, κατεργασία προσώπου πριν τις μετρήσεις, απομάκρυνση εργαλείου πριν τη διακοπή περιστροφής."
          },
          {
            "id": "b",
            "text": "Αφήνουμε το κλειδί επάνω στο τσοκ για ευκολία και μετράμε διαστάσεις με τον τόρνο σε λειτουργία."
          },
          {
            "id": "c",
            "text": "Χρησιμοποιούμε βάθος κοπής φινιρίσματος μεγαλύτερο από 5 mm."
          },
          {
            "id": "d",
            "text": "Σταματάμε τον τόρνο πάντα με βίαιη αντιστροφή της φοράς περιστροφής."
          }
        ],
        "answer": "a",
        "explain": "Οι οδηγίες ορθής λειτουργίας περιλαμβάνουν την ασφαλή σύσφιγξη, την απομάκρυνση του κλειδιού, τους ακριβείς υπολογισμούς, τις μετρήσεις με κλειστό τόρνο και την ασφαλή αποχώρηση του εργαλείου."
      }
    ]
  },
  {
    "id": "ch04-29153",
    "group": "ch04-04-charaktiristika-kopsimatos",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #29153",
    "bankCode": "29153",
    "title": "#29153 — Θέμα 4<sup>ο</sup>",
    "units": 25,
    "theory": "ch04-04-charaktiristika-kopsimatos",
    "sourceOrder": 12,
    "stem": "Άξονας από χάλυβα St70, διαμέτρου $D = 100\\text{ mm}$, πρόκειται να κατεργαστεί σε τόρνο με κοπτικό εργαλείο από ταχυχάλυβα (HSS). Να υπολογιστούν η ταχύτητα κοπής και οι στροφές του τσοκ.",
    "items": [
      {
        "kind": "calc",
        "subq": "α",
        "prompt": "Για την εκχόνδριση του τεμαχίου ($D=100\\text{ mm}$), προσδιορίστε τις στροφές $n$ σε $\\text{rpm}$ και την ταχύτητα κοπής $u$ σε $\\text{m/min}$ από το διάγραμμα. Επιλέξτε τις στροφές n.",
        "formula": "$u = 20\\text{ m/min} \\implies n \\approx 74\\text{ rpm}$",
        "answer": 74,
        "unit": "rpm",
        "tolerance": 1,
        "hint": "Από τον πίνακα για St70 και HSS, $u=20\\text{ m/min}$. Για $D=100\\text{ mm}$, οι στροφές από το διάγραμμα κυμαίνονται μεταξύ 53 και 74 rpm. Επιλέγεται η μεγαλύτερη $n=74\\text{ rpm}$.",
        "explain": "Για εκχόνδριση με $u=20\\text{ m/min}$ και $D=100\\text{ mm}$, επιλέγεται $n=74\\text{ rpm}$, οπότε η πραγματική ταχύτητα κοπής γίνεται περίπου $24\\text{ m/min}$."
      }
    ],
    "image": "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#29153_fig01.png",
    "images": [
      "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#29153_fig01.png",
      "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#29153_fig02.png"
    ],
    "solutionImages": [
      "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#29153_sol01.png",
      "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#29153_sol02.png",
      "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#29153_sol03.png",
      "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#29153_sol04.png",
      "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#29153_sol05.png"
    ]
  }
]
);
