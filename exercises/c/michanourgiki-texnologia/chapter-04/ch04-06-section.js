window.SUBJECT_DATA = window.SUBJECT_DATA || {};
window.SUBJECT_DATA["michanourgiki-texnologia"] = window.SUBJECT_DATA["michanourgiki-texnologia"] || { sections: [], groups: [], exercises: [] };
window.SUBJECT_DATA["michanourgiki-texnologia"].exercises.push(...
[
  {
    "id": "ch04-25194",
    "group": "ch04-06-section",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #25194",
    "bankCode": "25194",
    "title": "#25194 — Θέμα 4<sup>ο</sup> (4.6)",
    "units": 25,
    "theory": "ch04-06",
    "sourceOrder": 7,
    "stem": "Άξονας από χάλυβα $50-70\\text{ kg/mm}^2$ και με αρχική διάμετρο $d=200\\text{ mm}$, πρόκειται να υποστεί κατεργασία εκχόνδρισης σε τόρνο, με χρήση κοπτικού εργαλείου κατασκευασμένου από ταχυχάλυβα (HSS). Δίνεται $\\pi=3,14$ και ότι οι συνθήκες κατεργασίας προσδιορίζονται από τον πίνακα συνθηκών.",
    "items": [
      {
        "kind": "calc",
        "subq": "α",
        "subqPrompt": "Να προσδιορίσετε και να υπολογίσετε τα μεγέθη κατεργασίας:",
        "prompt": "Την ταχύτητα κοπής $u$ σε $\\text{m/min}$.",
        "formula": "$u = 20\\text{ m/min}$",
        "answer": 20,
        "unit": "m/min",
        "tolerance": 0.01,
        "hint": "Από τον πίνακα για χάλυβα $50-70\\text{ kg/mm}^2$ με HSS στην εκχόνδριση.",
        "explain": "Από τον πίνακα, για χάλυβα $50-70\\text{ kg/mm}^2$ σε εκχόνδριση με HSS, η ταχύτητα κοπής είναι \\( u = 20\\text{ m/min} \\)."
      },
      {
        "kind": "calc",
        "subq": "β",
        "prompt": "Την πρόωση $s$ σε $\\text{mm/rev}$.",
        "formula": "$s = 1\\text{ mm/rev}$",
        "answer": 1,
        "unit": "mm/rev",
        "tolerance": 0.01,
        "hint": "Από τον ίδιο πίνακα για την πρόωση εκχόνδρισης.",
        "explain": "Από τον πίνακα προκύπτει πρόωση \\( s = 1\\text{ mm/rev} \\)."
      },
      {
        "kind": "calc",
        "subq": "γ",
        "prompt": "Το βάθος κοπής $a$ σε $\\text{mm}$.",
        "formula": "$a = 10\\text{ mm}$",
        "answer": 10,
        "unit": "mm",
        "tolerance": 0.01,
        "hint": "Από τον ίδιο πίνακα για το βάθος κοπής.",
        "explain": "Από τον πίνακα προκύπτει βάθος κοπής \\( a = 10\\text{ mm} \\)."
      },
      {
        "kind": "calc",
        "subq": "δ",
        "prompt": "Τις στροφές της κύριας ατράκτου του τόρνου $n$ σε $\\text{rpm}$ ($\\text{str/min}$).",
        "formula": "$n = \\frac{1000 \\cdot u}{\\pi \\cdot d}$",
        "answer": 31.8,
        "unit": "rpm",
        "tolerance": 0.05,
        "hint": "Χρησιμοποιήστε τον τύπο $n = \\frac{1000 \\cdot u}{\\pi \\cdot d}$ με $u=20$, $\\pi=3,14$ και $d=200$.",
        "explain": " \\( n = \\frac{1000 \\cdot 20}{3,14 \\cdot 200} = \\frac{20000}{628} = 31,8\\text{ rpm} \\)."
      },
      {
        "kind": "calc",
        "subq": "ε",
        "prompt": "Την ταχύτητα πρόωσης $s'$ σε $\\text{mm/min}$.",
        "formula": "$s' = s \\cdot n$",
        "answer": 31.8,
        "unit": "mm/min",
        "tolerance": 0.05,
        "hint": "Χρησιμοποιήστε τη σχέση $s' = s \\cdot n$.",
        "explain": " \\( s' = 1\\text{ mm/rev} \\cdot 31,8\\text{ rpm} = 31,8\\text{ mm/min} \\)."
      }
    ],
    "image": "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#25194_fig01.png"
  },
  {
    "id": "ch04-27601",
    "group": "ch04-06-section",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #27601",
    "bankCode": "27601",
    "title": "#27601 — Θέμα 4<sup>ο</sup> (4.6.4)",
    "units": 25,
    "theory": "ch04-06",
    "sourceOrder": 8,
    "stem": "Για την τόρνευση τεμαχίου διαμέτρου $d=50\\text{ mm}$ και μήκους $L_1=500\\text{ mm}$ με ταχύτητα κοπής $u=20\\text{ m/min}$ και πρόωση $s=0,5\\text{ mm/rev}$, δίνονται τα διαστήματα πριν και μετά την κοπή $l_a = l_u = 5\\text{ mm}$ και $\\pi \\approx 3,14$.",
    "items": [
      {
        "kind": "calc",
        "subq": "α",
        "subqPrompt": "Να υπολογίσετε τα ακόλουθα μεγέθη:",
        "prompt": "Το μήκος κοπής $l$ σε $\\text{mm}$.",
        "formula": "$l = L_1 + l_a + l_u$",
        "answer": 510,
        "unit": "mm",
        "tolerance": 0.01,
        "hint": "Προσθέστε το μήκος του τεμαχίου και τα διαστήματα εισόδου και εξόδου.",
        "explain": " \\( l = L_1 + l_a + l_u = 500\\text{ mm} + 5\\text{ mm} + 5\\text{ mm} = 510\\text{ mm} \\)."
      },
      {
        "kind": "calc",
        "subq": "β",
        "prompt": "Τις στροφές περιστροφής του τσοκ του τόρνου $n$ σε $\\text{rpm}$.",
        "formula": "$n = \\frac{1000 \\cdot u}{\\pi \\cdot d}$",
        "answer": 127.38,
        "unit": "rpm",
        "tolerance": 0.1,
        "hint": "Υπολογίστε με $u=20$, $\\pi=3,14$ και $d=50$.",
        "explain": " \\( n = \\frac{1000 \\cdot 20}{3,14 \\cdot 50} = \\frac{20000}{157} = 127,38\\text{ rpm} \\)."
      },
      {
        "kind": "calc",
        "subq": "γ",
        "prompt": "Τον χρόνο κοπής $t_h$ σε $\\text{min}$.",
        "formula": "$t_h = \\frac{l}{s \\cdot n}$",
        "answer": 8,
        "unit": "min",
        "tolerance": 0.1,
        "hint": "Χρησιμοποιήστε τον τύπο $t_h = \\frac{l}{s \\cdot n}$.",
        "explain": " \\( t_h = \\frac{510}{0,5 \\cdot 127,38} = \\frac{510}{63,69} = 8\\text{ min} \\)."
      }
    ]
  },
  {
    "id": "ch04-27603",
    "group": "ch04-06-section",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #27603",
    "bankCode": "27603",
    "title": "#27603 — Θέμα 4<sup>ο</sup> (4.6.4)",
    "units": 25,
    "theory": "ch04-06",
    "sourceOrder": 9,
    "stem": "Πρόκειται να πραγματοποιηθεί τόρνευση προσώπου τεμαχίου διαμέτρου $d = 200\\text{ mm}$ και σε μήκος $L_a = 27,36\\text{ mm}$ με ταχύτητα κοπής $u = 20\\text{ m/min}$ και πρόωση $s = 0,5\\text{ mm/rev}$ (ή $\\text{mm/min}$ αναλόγως προώσεως προσώπου). Δίνεται $\\pi \\approx 3,14$.",
    "items": [
      {
        "kind": "calc",
        "subq": "α",
        "subqPrompt": "Να υπολογίσετε:",
        "prompt": "Τις στροφές περιστροφής του τσοκ του τόρνου $n$ σε $\\text{rpm}$.",
        "formula": "$n = \\frac{1000 \\cdot u}{\\pi \\cdot d}$",
        "answer": 31.84,
        "unit": "rpm",
        "tolerance": 0.1,
        "hint": "Χρησιμοποιήστε $u=20$, $d=200$, $\\pi=3,14$.",
        "explain": " \\( n = \\frac{1000 \\cdot 20}{3,14 \\cdot 200} = 31,84\\text{ rpm} \\)."
      },
      {
        "kind": "calc",
        "subq": "β",
        "prompt": "Το μήκος κοπής $L$ σε $\\text{mm}$ (για τόρνευση προσώπου από την ακτίνα $r = d/2$ μέχρι το κέντρο).",
        "formula": "$L = r + L_a$",
        "answer": 127.36,
        "unit": "mm",
        "tolerance": 0.1,
        "hint": "Υπολογίστε την ακτίνα $r = d/2$ και προσθέστε το $L_a$.",
        "explain": " \\( r = \\frac{200}{2} = 100\\text{ mm} \\). \\( L = r + L_a = 100 + 27,36 = 127,36\\text{ mm} \\)."
      },
      {
        "kind": "calc",
        "subq": "γ",
        "prompt": "Τον χρόνο κοπής $t_h$ σε $\\text{min}$.",
        "formula": "$t_h = \\frac{L}{s \\cdot n}$",
        "answer": 8,
        "unit": "min",
        "tolerance": 0.1,
        "hint": "Χρησιμοποιήστε τον τύπο $t_h = \\frac{L}{s \\cdot n}$.",
        "explain": " \\( t_h = \\frac{127,36}{0,5 \\cdot 31,84} = 8\\text{ min} \\)."
      }
    ]
  },
  {
    "id": "ch04-27616",
    "group": "ch04-06-section",
    "kind": "blank",
    "layout": "unified",
    "code": "Θέμα 2<sup>ο</sup> · #27616",
    "bankCode": "27616",
    "title": "#27616 — Θέμα 2<sup>ο</sup> (2.1–2.2)",
    "units": 25,
    "theory": "ch04-06",
    "sourceOrder": 10,
    "items": [
      {
        "kind": "blank",
        "subq": "2.1",
        "prompt": "Συμπληρώστε τα κενά στο παρακάτω κείμενο:",
        "textBefore": [
          "«Στον τόρνο, η ταχύτητα κοπής δεν επιλέγεται τυχαία. Η ",
          " ταχύτητα κοπής, οδηγεί σε μεγάλο χρόνο κοπής, ενώ ",
          " ταχύτητα κοπής οδηγεί σε υψηλές θερμοκρασίες που αναπτύσσονται στο κοπτικό εργαλείο, με αποτέλεσμα την πρόωρη φθορά και καταστροφή του. Η ταχύτητα κοπής εκφράζει το ρυθμό κοπής στην κύρια κίνηση, που είναι η ",
          " του τεμαχίου»."
        ],
        "answers": [
          "χαμηλή",
          "υψηλή",
          "περιστροφή"
        ],
        "bank": [
          "χαμηλή",
          "υψηλή",
          "περιστροφή",
          "αντίστροφη",
          "αντίσταση",
          "πρόωση"
        ],
        "explain": "Η χαμηλή ταχύτητα αυξάνει το χρόνο κοπής, η υψηλή προκαλεί φθορά λόγω θερμοκρασίας, και η κύρια κίνηση είναι η περιστροφή."
      },
      {
        "kind": "match",
        "subq": "2.2",
        "prompt": "Να αντιστοιχίσετε τα μέρη 1, 2, 3, 4 του σχήματος με τις γωνίες κοπτικού εργαλείου της Στήλης Β:",
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
        "explain": "1–b (Ελευθερίας), 2–c (Σφήνας), 3–e (Αποβλήτου), 4–a (Κοπής).",
        "image": "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#27616_fig01.png"
      }
    ]
  },
  {
    "id": "ch04-29133",
    "group": "ch04-06-section",
    "kind": "mc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #29133",
    "bankCode": "29133",
    "title": "#29133 — Θέμα 4<sup>ο</sup> (4.6.4)",
    "units": 25,
    "theory": "ch04-06",
    "sourceOrder": 11,
    "stem": "Είστε μηχανικός σε ένα μηχανουργείο. Να δώσετε πέντε (5) γενικές οδηγίες στον χειριστή του τόρνου για την τόρνευση τεμαχίων.",
    "items": [
      {
        "kind": "mc",
        "subq": "4.1",
        "openEnded": true,
        "prompt": "Να αναφέρετε πέντε (5) γενικές οδηγίες στον χειριστή του τόρνου για την τόρνευση τεμαχίων.",
        "options": [
          {
            "id": "a",
            "text": "1) Κεντράρισμα και ασφαλής στέρηση στο τσοκ, 2) Απομάκρυνση κλειδιού τσοκ, 3) Ακριβλής υπολογισμός στροφών και πρόωσης, 4) Κατεργασία προσώπου πριν τις μετρήσεις με κλειστό τόρνο, 5) Απομάκρυνση εργαλείου πριν σταματήσει το τσοκ."
          },
          {
            "id": "b",
            "text": "1) Αφήνουμε το κλειδί στο τσοκ, 2) Μετρήσεις με περιστρεφόμενο τσοκ, 3) Απομάκρυνση εργαλείου μετά τη στάση, 4) Τυχαίες στροφές, 5) Χωρίς κεντράρισμα."
          },
          {
            "id": "c",
            "text": "1) Βάθος κοπής πάνω από 5mm, 2) Στήριξη χωρίς έλεγχο, 3) Κοπή χωρίς ψυκτικό, 4) Αντιστροφή κίνησης για φρενάρισμα, 5) Χειρισμός από μη ειδικούς."
          },
          {
            "id": "d",
            "text": "1) Λειτουργία με ανοιχτό κάλυμμα, 2) Καθαρισμός με χέρια εν λειτουργία, 3) Απουσία μέτρησης, 4) Υπερβολική πρόωση, 5) Χρήση ακατάλληλου εργαλείου."
          }
        ],
        "answer": "a",
        "explain": "Οι οδηγίες περιλαμβάνουν ασφαλή σύσφιξη, απομάκρυνση κλειδιού τσοκ, υπολογισμό παραμέτρων, προετοιμασία προσώπου, τήρηση μέτρων ασφαλείας κατά τη μέτρηση και απομάκρυνση εργαλείου πριν τη διακοπή περιστροφής."
      }
    ]
  },
  {
    "id": "ch04-29153",
    "group": "ch04-06-section",
    "kind": "calc",
    "layout": "unified",
    "code": "Θέμα 4<sup>ο</sup> · #29153",
    "bankCode": "29153",
    "title": "#29153 — Θέμα 4<sup>ο</sup> (4.6.2)",
    "units": 25,
    "theory": "ch04-06",
    "sourceOrder": 12,
    "stem": "Άξονας από χάλυβα $\\text{St70}$, διαμέτρου $D = 100\\text{ mm}$, πρόκειται να κατεργαστεί σε τόρνο. Το κοπτικό εργαλείο που θα χρησιμοποιηθεί είναι από ταχυχάλυβα (HSS). Με βάση τον πίνακα και το διάγραμμα ταχυτήτων κοπής, να προσδιορίσετε την ταχύτητα κοπής και τις στροφές.",
    "items": [
      {
        "kind": "calc",
        "subq": "α",
        "subqPrompt": "Να υπολογίσετε τα μεγέθη κατεργασίας:",
        "prompt": "Την ταχύτητα κοπής εκχόνδρισης $u$ σε $\\text{m/min}$ για $\\text{St70}$ με HSS.",
        "formula": "$u = 20\\text{ m/min}$",
        "answer": 20,
        "unit": "m/min",
        "tolerance": 0.1,
        "hint": "Από τον πίνακα 1 για $\\text{St70}$ και HSS στην εκχόνδριση.",
        "explain": "Από τον πίνακα συνθηκών, για $\\text{St70}$ και HSS στην εκχόνδριση η ταχύτητα κοπής είναι \\( u = 20\\text{ m/min} \\)."
      },
      {
        "kind": "calc",
        "subq": "β",
        "prompt": "Τις στροφές του τσοκ $n$ σε $\\text{rpm}$ για εκχόνδριση (επιλογή μέγιστης από το διάγραμμα για $D=100\\text{ mm}$ και $u=20\\text{ m/min}$).",
        "formula": "$n = 74\\text{ rpm}$",
        "answer": 74,
        "unit": "rpm",
        "tolerance": 1,
        "hint": "Από το διάγραμμα 1 ταχυτήτων/στροφών για $D=100\\text{ mm}$ και $u=20\\text{ m/min}$, επιλέγεται η τυποποιημένη τιμή $74\\text{ rpm}$.",
        "explain": "Από το διάγραμμα 1, οι στροφές για $D=100\\text{ mm}$ και $u=20\\text{ m/min}$ είναι μεταξύ 53 και 74 rpm. Επιλέγεται η \\( n = 74\\text{ rpm} \\)."
      },
      {
        "kind": "calc",
        "subq": "γ",
        "prompt": "Την ταχύτητα κοπής φινιρίσματος $u$ σε $\\text{m/min}$ για $\\text{St70}$ με HSS.",
        "formula": "$u = 24\\text{ m/min}$",
        "answer": 24,
        "unit": "m/min",
        "tolerance": 0.1,
        "hint": "Από τον πίνακα 1 για φινίρισμα.",
        "explain": "Από τον πίνακα 1, η ταχύτητα κοπής για το φινίρισμα είναι \\( u = 24\\text{ m/min} \\)."
      }
    ],
    "hintImage": "images/c/michanourgiki-texnologia/chapter-04/c_michanourgiki-texnologia_ch04_#29153_sol01.png",
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
