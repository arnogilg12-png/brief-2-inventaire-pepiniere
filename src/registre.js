// Ajouter et lister les plants.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { estDateValide, versNombre } from './outils.js';

// Liste fermée des groupes botaniques acceptés, fournie et validée par le coach agronomie.
 const GROUPES = ['angiosperme", "gymnosperme'];
   
// Renvoie une ligne de texte qui décrit le plant.
// Exemple : 'N09 | pin | gymnosperme | 8 plants | 2026-10-24'
export function formaterPlant(plant) {
      return `${plant.id} | ${plant.nomCommun} | ${plant.groupe} | ${plant.nombrePlants} plants | ${plant.dateReleve}`
  //throw new Error('TODO : coder formaterPlant dans src/registre.js');
}

// Renvoie un texte avec un plant par ligne (lignes séparées par '\n'),
// ou 'Aucun plant enregistré.' si la liste est vide.
export function listerPlants(plants) {
 if (plants.length===0){
  return 'Aucun plant enregistré.'
 } else
 {
  return plants.map(formaterPlant).join('\n')
 }
  //throw new Error('TODO : coder listerPlants dans src/registre.js');
}

// Renvoie le plant qui a ce code (identifiant), ou undefined s'il n'existe pas.
export function trouverParId(plants, id) {
 return plants.find (
  (plant) => {return plant.id === id})
  // throw new Error('TODO : coder trouverParId dans src/registre.js');
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'N11', nomCommun: 'papayer', groupe: 'angiosperme', nombrePlants: '15', dateReleve: '2026-10-27' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · nomCommun obligatoire · groupe présent dans GROUPES
// · nombrePlants nombre ENTIER positif ou nul · dateReleve réelle au format AAAA-MM-JJ.
export function verifierPlant(saisie, plants) {
  const erreurs = [];
const id = String(saisie.id ?? '').trim();
  if (id === '') {
    erreurs.push("L'identifiant est obligatoire.");
  } else if (plants.some((plant) => plant.id === id)) {
    erreurs.push('Cet identifiant existe déjà.');
  }

  if (String(saisie.nomCommun ?? '').trim() === '') {
    erreurs.push('Le nom commun est obligatoire.');
  }

  if (GROUPES.includes(saisie.groupe)) {
    erreurs.push(`Le groupe doit être : ${GROUPES.join(' ou ')}.`);
  }

  const nombre = versNombre(saisie.nombrePlants);
  if (!Number.isInteger(nombre) || nombre < 0) {
    erreurs.push('Le nombre de plants doit être un entier positif ou nul.');
  }

  if (!estDateValide(saisie.dateReleve)) {
    erreurs.push('La date du relevé doit exister et suivre le format AAAA-MM-JJ.');
  }

  return erreurs;
}

  //  throw new Error('TODO : coder verifierPlant dans src/registre.js');


// Fabrique le plant à enregistrer à partir d'une saisie VALIDE : nombrePlants devient un nombre.
export function creerPlant(saisie) {
  return {
    id: saisie.id.trim(),
    nomCommun: saisie.nomCommun.trim(),
    groupe: saisie.groupe,
    nombrePlants: versNombre(saisie.nombrePlants),
    dateReleve: saisie.dateReleve,
  };
  //throw new Error('TODO : coder creerPlant dans src/registre.js');
}

// Ajoute la saisie à l'inventaire si elle est valide (verifierPlant, puis creerPlant).
// Renvoie les erreurs : [] si le plant a été ajouté ; sinon les messages, et rien n'est ajouté.
export function ajouterPlant(plants, saisie) {
  const erreurs = verifierPlant(saisie, plants);

  if (erreurs.length > 0) {
    return erreurs;
  }

  plants.push(creerPlant(saisie)); 
  return erreurs;   // tableau vide
}
  //throw new Error('TODO : coder ajouterPlant dans src/registre.js');

