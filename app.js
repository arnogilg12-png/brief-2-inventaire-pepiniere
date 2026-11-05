// Inventaire de la pépinière — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/plants.json';

async function main() {
  ouvrirSaisie();
  
  function afficherAccueil(nombre) {
  console.log('================================================');
  console.log('INVENTAIRE DE LA PÉPINIÈRE');
  console.log('Pépinière pédagogique');
  console.log('================================================');
  console.log(`${nombre} espèce(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
}

function afficherMenu() {
  console.log('');
  console.log('======================Menu=======================');
  console.log('1. Ajouter un plant');
  console.log("2. Lister l'inventaire");
  console.log('3. Rechercher (code, nom, groupe)');
  console.log('4. Trier (nombre de plants)');
  console.log('5. Synthèse des quantités');
  console.log('0. Quitter');
}

// ---------- Actions ----------

async function actionAjouter(plants) {
  const id = await demander('Code : ');
  if (id === null) return;
  const nomCommun = await demander('Nom commun : ');
  if (nomCommun === null) return;
  const groupe = await demander(`Groupe (${GROUPES.join(' ou ')}) : `);
  if (groupe === null) return;
  const nombrePlants = await demander('Nombre de plants : ');
  if (nombrePlants === null) return;
  const dateReleve = await demander('Date du relevé (AAAA-MM-JJ) : ');
  if (dateReleve === null) return;

  const saisie = {
    id: id.toUpperCase(),
    nomCommun,
    groupe: groupe.toLowerCase(),
    nombrePlants,
    dateReleve,
  };

  const erreurs = ajouterPlant(plants, saisie);
  if (erreurs.length > 0) {
    erreurs.forEach((erreur) => console.log(erreur));
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, plants);
  console.log(`Plant ${saisie.id} ajouté.`);
}

function actionLister(plants) {
  console.log(listerPlants(plants));
}

async function actionRechercher(plants) {
  console.log('--- Rechercher ---');
  console.log('1. Par code');
  console.log('2. Par nom commun');
  console.log("3. Les espèces d'un groupe botanique");
  const choix = await demander('Votre choix : ');
  if (choix === null) return;

  if (choix === '1') {
    const saisie = await demander('Code : ');
    if (saisie === null) return;
    const code = saisie.toUpperCase();
    const plant = trouverParId(plants, code);
    console.log(plant ? formaterPlant(plant) : `Plant ${code} introuvable.`);
  } else if (choix === '2') {
    const saisie = await demander('Nom ou partie du nom : ');
    if (saisie === null) return;
    const texte = saisie.toLowerCase();
    const trouves = rechercherParNom(plants, texte);
    console.log(`${trouves.length} espèce(s) dont le nom contient « ${texte} » :`);
    console.log(listerPlants(trouves));
  } else if (choix === '3') {
    const saisie = await demander(`Groupe (${GROUPES.join(' ou ')}) : `);
    if (saisie === null) return;
    const groupe = saisie.toLowerCase();
    const trouves = filtrerParGroupe(plants, groupe);
    console.log(`${trouves.length} espèce(s) du groupe ${groupe} :`);
    console.log(listerPlants(trouves));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

async function actionTrier(plants) {
  console.log('--- Trier ---');
  console.log('1. Par nombre de plants croissant');
  const choix = await demander('Votre choix : ');
  if (choix === null) return;

  if (choix === '1') {
    console.log(listerPlants(trierParNombrePlants(plants)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

function actionSynthese(plants) {
  console.log('--- Synthèse des quantités ---');
  console.log(`Total : ${totalPlants(plants)} plants`);

  const parGroupe = syntheseParGroupe(plants);
  for (const groupe in parGroupe) {
    console.log(`${groupe} : ${parGroupe[groupe].especes} espèce(s), ${parGroupe[groupe].plants} plants`);
  }

  const faibles = stocksFaibles(plants, SEUIL_STOCK_FAIBLE);
  console.log(`Stocks faibles (${SEUIL_STOCK_FAIBLE} plants ou moins) :`);
  console.log(faibles.length === 0 ? 'Aucun stock faible.' : listerPlants(faibles));

  const meilleur = especeLaPlusAbondante(plants);
  console.log(meilleur ? `Espèce la plus abondante : ${formaterPlant(meilleur)}` : 'Aucune espèce enregistrée.');
}

// ---------- Programme principal ----------



  let plants;
  try {
    plants = await chargerJson(FICHIER_DONNEES);
  } catch (erreur) {
    console.log(`Erreur : impossible de charger ${FICHIER_DONNEES} (${erreur.message}).`);
    fermerSaisie();
    return;
  }

  afficherAccueil(plants.length);

  while (true) {
    afficherMenu();
    const choix = await demander('Votre choix : ');
    if (choix === null || choix === '0') break;

    try {
      if (choix === '1') {
        await actionAjouter(plants);
      } else if (choix === '2') {
        actionLister(plants);
      } else if (choix === '3') {
        await actionRechercher(plants);
      } else if (choix === '4') {
        await actionTrier(plants);
      } else if (choix === '5') {
        actionSynthese(plants);
      } else {
        console.log('Choix inconnu : retour au menu.');
      }
    } catch (erreur) {
      console.log(`Erreur : ${erreur.message}`);
    }
  }

  console.log('Au revoir.');
  fermerSaisie();
}

main();
