// Εδώ προσθέτεις τάξεις και μαθήματα.
// status: "ready"  -> κλικάρεται, πάει στο href (π.χ. "#/thermo")
// status: "soon"   -> εμφανίζεται σαν "Σύντομα", δεν κλικάρεται ακόμα
window.CATALOG = [
  {
    "id": "b",
    "label": "Β' Τάξη",
    "subjects": [
      {
        "id": "thermo",
        "title": "Θερμοδυναμική Θεωρία",
        "desc": "Σημειώσεις και διαδραστικός πίνακας ασκήσεων.",
        "status": "ready",
        "href": "#/thermo"
      },
      {
        "id": "thermo-lab",
        "title": "Θερμοδυναμική Εργαστήριο",
        "desc": "Εργαστηριακά κεφάλαια και όργανα μέτρησης.",
        "status": "ready",
        "href": "#/thermo-lab"
      },
      {
        "id": "antoxi",
        "title": "Αντοχή Υλικών",
        "desc": "Σημειώσεις και διαδραστικός πίνακας ασκήσεων.",
        "status": "ready",
        "href": "#/antoxi"
      }
    ]
  },
  {
    "id": "c",
    "label": "Γ' Τάξη",
    "subjects": [
      {
        "id": "psixi",
        "title": "Στοιχεία Ψύξης",
        "desc": "Έρχεται σύντομα.",
        "status": "soon"
      }
    ]
  }
];
