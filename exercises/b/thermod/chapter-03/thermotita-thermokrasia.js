window.SUBJECT_DATA = window.SUBJECT_DATA || {};
window.SUBJECT_DATA.thermo = window.SUBJECT_DATA.thermo || { sections: [], groups: [], exercises: [] };
window.SUBJECT_DATA.thermo.exercises.push(
{
    "id": "ch3-tf-thermotita",
    "group": "thermotita-thermokrasia",
    "kind": "tf",
    "code": "Θέμα 2ο · 3.7",
    "title": "Η θερμότητα και η ροή της",
    "units": 12,
    "theory": "thermotita",
    "items": [
      {
        "kind": "tf",
        "prompt": "Η θερμότητα ρέει πάντα από το σώμα χαμηλότερης προς το σώμα υψηλότερης θερμοκρασίας.",
        "answer": false,
        "explain": "Λάθος: η θερμότητα ρέει πάντα από την υψηλή προς τη χαμηλή θερμοκρασία, ποτέ αντίστροφα."
      },
      {
        "kind": "tf",
        "prompt": "Η θερμότητα που δίνεται σε ένα σύστημα συμβολίζεται συμβατικά ως θετική (+Q).",
        "answer": true,
        "explain": "Σωστό — αυτή είναι η συμβατική φορά που ορίζουμε."
      },
      {
        "kind": "tf",
        "prompt": "Η μονάδα μέτρησης της θερμότητας στο S.I. είναι το Kcal.",
        "answer": false,
        "explain": "Λάθος: στο S.I. η θερμότητα μετριέται σε Joule (J). Το Kcal είναι παλαιότερη, μη-S.I. μονάδα."
      },
      {
        "kind": "tf",
        "prompt": "Η θερμότητα γίνεται αντιληπτή μόνο τη στιγμή που διαπερνάει το όριο ενός συστήματος.",
        "answer": true,
        "explain": "Σωστό — πριν περάσει το όριο είναι απλώς ενέργεια του σώματος, όχι «θερμότητα»."
      }
    ]
  },
{
    "id": "ch3-mc-thermokrasia",
    "group": "thermotita-thermokrasia",
    "kind": "mc",
    "code": "Θέμα 2ο · 3.7",
    "title": "Θερμοκρασία & κλίμακες",
    "units": 9,
    "theory": "thermokrasia",
    "items": [
      {
        "kind": "mc",
        "prompt": "Το σημείο βρασμού του νερού στην κλίμακα Φαρενάιτ είναι:",
        "options": [
          { "id": "a", "text": "100°F" },
          { "id": "b", "text": "212°F" },
          { "id": "c", "text": "32°F" },
          { "id": "d", "text": "273°F" }
        ],
        "answer": "b",
        "explain": "Το νερό βράζει στους 212°F (και στους 100°C)."
      },
      {
        "kind": "mc",
        "prompt": "Το απόλυτο μηδέν στην κλίμακα Κέλβιν αντιστοιχεί σε:",
        "options": [
          { "id": "a", "text": "0°C" },
          { "id": "b", "text": "100°C" },
          { "id": "c", "text": "−273°C" },
          { "id": "d", "text": "32°C" }
        ],
        "answer": "c",
        "explain": "0 K = −273°C περίπου — η θεωρητικά χαμηλότερη δυνατή θερμοκρασία."
      },
      {
        "kind": "mc",
        "prompt": "Ποια σχέση χρησιμοποιούμε για να μετατρέψουμε βαθμούς Κελσίου σε Κέλβιν;",
        "options": [
          { "id": "a", "text": "T = t + 273" },
          { "id": "b", "text": "T = t − 273" },
          { "id": "c", "text": "T = t × 9/5 + 32" },
          { "id": "d", "text": "T = t / 2" }
        ],
        "answer": "a",
        "explain": "Η μετατροπή Κελσίου → Κέλβιν γίνεται με πρόσθεση 273."
      }
    ]
  }
);
