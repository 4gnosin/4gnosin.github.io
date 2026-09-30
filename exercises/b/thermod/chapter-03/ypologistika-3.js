window.SUBJECT_DATA = window.SUBJECT_DATA || {};
window.SUBJECT_DATA.thermo = window.SUBJECT_DATA.thermo || { sections: [], groups: [], exercises: [] };
window.SUBJECT_DATA.thermo.exercises.push(
{
    "id": "ch3-calc-kelvin",
    "group": "ypologistika-3",
    "kind": "calc",
    "code": "Θέμα 4ο · 3.7",
    "title": "Μετατροπή σε Κέλβιν",
    "units": 10,
    "theory": "thermokrasia",
    "stem": "Δίνονται δύο θερμοκρασίες σε βαθμούς Κελσίου.",
    "items": [
      {
        "kind": "calc",
        "prompt": "Μετάτρεψε τους 45°C σε Κέλβιν.",
        "answer": 318,
        "tolerance": 0.01,
        "unit": "K",
        "formula": "T = t + 273",
        "hint": "Πρόσθεσε 273 στην τιμή σε °C.",
        "explain": "T = 45 + 273 = 318 K."
      },
      {
        "kind": "calc",
        "prompt": "Μετάτρεψε τους 88°C σε Κέλβιν.",
        "answer": 361,
        "tolerance": 0.01,
        "unit": "K",
        "formula": "T = t + 273",
        "hint": "Ίδια λογική με το προηγούμενο ερώτημα.",
        "explain": "T = 88 + 273 = 361 K."
      }
    ]
  },
{
    "id": "ch3-calc-fahrenheit",
    "group": "ypologistika-3",
    "kind": "calc",
    "code": "Θέμα 4ο · 3.7",
    "title": "Κελσίου ↔ Φαρενάιτ",
    "units": 15,
    "theory": "thermokrasia",
    "stem": "Χρησιμοποίησε τη σχέση °C/5 = (°F − 32)/9.",
    "items": [
      {
        "kind": "calc",
        "prompt": "Πόσοι βαθμοί Φαρενάιτ αντιστοιχούν σε 25°C;",
        "answer": 77,
        "tolerance": 0.01,
        "unit": "°F",
        "formula": "°C/5 = (°F − 32)/9",
        "hint": "Λύσε ως προς °F: °F = (9·°C/5) + 32.",
        "explain": "°F = (9·25/5) + 32 = 45 + 32 = 77°F."
      },
      {
        "kind": "calc",
        "prompt": "Πόσοι βαθμοί Κελσίου αντιστοιχούν σε 68°F;",
        "answer": 20,
        "tolerance": 0.01,
        "unit": "°C",
        "formula": "°C/5 = (°F − 32)/9",
        "hint": "Λύσε ως προς °C: °C = 5·(°F − 32)/9.",
        "explain": "°C = 5·(68 − 32)/9 = 5·36/9 = 20°C."
      }
    ]
  },
{
    "id": "ch3-calc-monades-thermotitas",
    "group": "ypologistika-3",
    "kind": "calc",
    "code": "Θέμα 4ο · 3.7",
    "title": "Μονάδες θερμότητας",
    "units": 10,
    "theory": "thermotita",
    "stem": "Δίνεται 1 Kcal = 4,186 kJ και 1 BTU ≈ 0,252 Kcal.",
    "items": [
      {
        "kind": "calc",
        "prompt": "Πόσα kJ είναι 3 Kcal;",
        "answer": 12.558,
        "tolerance": 0.02,
        "unit": "kJ",
        "formula": "1 Kcal = 4,186 kJ",
        "hint": "Πολλαπλασίασε τα Kcal επί 4,186.",
        "explain": "3 × 4,186 = 12,558 kJ."
      },
      {
        "kind": "calc",
        "prompt": "Πόσα Kcal είναι 2000 BTU;",
        "answer": 504,
        "tolerance": 0.02,
        "unit": "Kcal",
        "formula": "1 BTU ≈ 0,252 Kcal",
        "hint": "Πολλαπλασίασε τα BTU επί 0,252.",
        "explain": "2000 × 0,252 = 504 Kcal."
      }
    ]
  },
{
    "id": "ch3-calc-isovaris",
    "group": "ypologistika-3",
    "kind": "calc",
    "code": "Θέμα 4ο · 3.6",
    "title": "Εφαρμογή: ισοβαρής μεταβολή",
    "units": 15,
    "theory": "eidi-metavolon",
    "stem": "Ένα αέριο σε διάταξη κυλίνδρου-εμβόλου έχει αρχικό όγκο V1 = 0,3 m³ και αρχική θερμοκρασία 20°C. Το αέριο διαστέλλεται με σταθερή πίεση (ισοβαρής μεταβολή) μέχρι ο όγκος να διπλασιαστεί.",
    "items": [
      {
        "kind": "calc",
        "prompt": "Ποια είναι η αρχική θερμοκρασία T1 σε Κέλβιν;",
        "answer": 293,
        "tolerance": 0.01,
        "unit": "K",
        "formula": "T = t + 273",
        "hint": "Μετάτρεψε τους 20°C σε Κέλβιν.",
        "explain": "T1 = 20 + 273 = 293 K."
      },
      {
        "kind": "calc",
        "prompt": "Ποια είναι η τελική θερμοκρασία T2 σε Κέλβιν;",
        "answer": 586,
        "tolerance": 0.02,
        "unit": "K",
        "formula": "V1/T1 = V2/T2",
        "hint": "Σε ισοβαρή μεταβολή ισχύει V1/T1 = V2/T2. Ο όγκος διπλασιάστηκε.",
        "explain": "Αφού V2 = 2·V1, θα είναι T2 = 2·T1 = 2 × 293 = 586 K."
      },
      {
        "kind": "calc",
        "prompt": "Ποια είναι η τελική θερμοκρασία σε βαθμούς Κελσίου;",
        "answer": 313,
        "tolerance": 0.01,
        "unit": "°C",
        "formula": "T = t + 273",
        "hint": "Αφαίρεσε 273 από την τιμή σε Κέλβιν.",
        "explain": "t2 = 586 − 273 = 313°C."
      }
    ]
  }
);
