# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : Angiospermes: nombre d'espèce = 8
                        Gymnospermes: nombre d'espèces = 2
                    Angiospermes: nombre de plants = 30 + 45 + 20 + 50 + 25 + 18 + 12 + 22 = 222
                        Gymnospermes: nombre de plants = 8 + 10 = 18
                        Total nombre de plan = 240
Les lignes à 10 plants ou moins sont l'id: N09 et l'id: 10

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| lister l'inventaire |liste de tous les plants |l'inventaire complet |TOURE Sitafa |
| Ajouter un plant |Un nouveau plant doit etre ajouté |Nouveau plant effectivement ajouté |KOUASSI Konan Anglovia |
| synthèse de quantité |La quantité totale des espèces et des plants (selon le groupe), et le stock faible |angiosperme : 9 espèce(s), 227 plants, gymnosperme : 2 espèce(s), 18 plants; Stocks faibles (10 plants ou moins) | KONATE Kaba |
| ✏️ | | | |
| ✏️ | | | |
| ✏️ | | | |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
