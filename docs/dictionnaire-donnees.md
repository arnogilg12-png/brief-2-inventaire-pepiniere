# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — |N07  |
|nomCommun |nom de l'espèce |texet |nom commun |- | pin|
| groupe |appartenance de groupe botanique |liste (angiosperme et gymnosperme) |connue |- |gymnosperme |
| nombre de plants |quantite de plants |nombre |nombre entier positif ou nul |- |8 |N09
| date de relevé |date à laquelle les informations ont été relevées |date |AAAA-MM-JJ | -|2026-10-24 |

**Listes de valeurs autorisées** : Nom commun; liste (angiosperme et gymnosperme); nombre entier positif ou non nul; AAAA-MM-JJ

**Sources** : données-plants.json
