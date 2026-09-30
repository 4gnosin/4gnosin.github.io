window.SUBJECT_DATA = window.SUBJECT_DATA || {};
window.SUBJECT_DATA.thermo = window.SUBJECT_DATA.thermo || { sections: [], groups: [], exercises: [] };
window.SUBJECT_DATA.thermo.exercises.push(
{
    "id": "ch3-tf-kyklos",
    "group": "kyklos-group",
    "kind": "tf",
    "code": "Θέμα 2ο · 3.11",
    "title": "Κυκλική μεταβολή",
    "units": 9,
    "theory": "kyklos",
    "items": [
      {
        "kind": "tf",
        "prompt": "Σε μια κυκλική μεταβολή, το σύστημα καταλήγει σε διαφορετική κατάσταση από την αρχική.",
        "answer": false,
        "explain": "Λάθος: σε κυκλική μεταβολή το σύστημα επιστρέφει ακριβώς στην αρχική του κατάσταση."
      },
      {
        "kind": "tf",
        "prompt": "Μια κυκλική μεταβολή απεικονίζεται στο διάγραμμα (P-v) με κλειστή γραμμή.",
        "answer": true,
        "explain": "Σωστό — αφού η αρχική και η τελική κατάσταση ταυτίζονται, η γραμμή «κλείνει»."
      },
      {
        "kind": "tf",
        "prompt": "Ο πραγματικός κύκλος λειτουργίας μιας μηχανής ονομάζεται πάντα «θερμοδυναμικός κύκλος».",
        "answer": false,
        "explain": "Λάθος: στην πράξη ονομάζεται κύκλος έργου της μηχανής, μια πρακτική προσέγγιση του θεωρητικού θερμοδυναμικού κύκλου."
      }
    ]
  }
);
