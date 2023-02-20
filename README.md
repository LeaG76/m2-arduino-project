<div align="center">

# Projet Arduino - IoT

### Simulation d'une scène avec feu tricolore connecté

<img alt="Arduino" src="https://img.shields.io/badge/-Arduino-199097?style=flat&logo=arduino&logoColor=white" />
<img alt="CSS3" src="https://img.shields.io/badge/-CSS3-0068BA?style=flat&logo=css3&logoColor=white" />
<img alt="Docker" src="https://img.shields.io/badge/-Docker-2491E6?style=flat&logo=docker&logoColor=white" />
<img alt="Express" src="https://img.shields.io/badge/-Express-666666?style=flat&logo=express&logoColor=white" />
<img alt="Javascript" src="https://img.shields.io/badge/-Javascript-EFD81D?style=flat&logo=javascript&logoColor=white" />
<img alt="NPM" src="https://img.shields.io/badge/-NPM-C53635?style=flat&logo=npm&logoColor=white" />
<img alt="Pug" src="https://img.shields.io/badge/-Pug-52302E?style=flat&logo=pug&logoColor=white" />

</div>

<table>
    <thead>
        <tr>
            <th width="150px">Année</th>
            <th width="150px">Filière</th>
            <th width="150px">Matière</th>
            <th width="400px">Projet</th>
            <th width="400px">Collaborateurs</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td align="center">2022-2023</td>
        <td align="center">M2 IWOCS</td>
        <td align="center">IoT</td>
        <td align="center">Développement d'une solution IOT</td>
        <td align="center">Léa Gallier et Kévin Leroux</td>
        </tr>
    </tbody>
</table>

### Plan

1. [Présentation du projet](#présentation-du-projet)
2. [Schéma](#schéma)
3. [Configuration](#configuration)
4. [Visuel de l'interface web](#visuel-de-linterface-web)
5. [Sources](#sources)

## Présentation du projet

Le but du projet est de détecter le nombre de véhicules en approche du feu tricolore ainsi que le nombre de piétons en attente au passage piéton. Lorsque le piéton veut traverser, on va comparer ses deux valeurs et s'il y a plus de piétons que de véhicules alors le feu va passer au rouge pour les véhicules et au vert pour les piétons.

Les piétons peuvent donc même traverser au feu rouge dans le non respect des règles de sécurité routière. Les véhicules quant à eux ne peuvent que passer au feu vert.

L'interface web est composé d'une petite animation en CSS et d'une interface utilisateur sur laquelle on peut ajouter des piétons et des véhicules. Nous pouvons activé le mouvement des piétons et des véhicules. Enfin, nous pouvons aussi afficher des graphiques sur les déplacements réalisés par la simulation.
 
## Schéma

Voici un schéma résumant le circuit réalisé sur l'Arduino Uno :

<div align="center">
<img title="Circuit diagram Arduino" src="assets/layout.png" alt="Circuit diagram Arduino" width="400px" />
</div>

## Configuration

Lancer le sketch dans l'IDE Arduino disponible ici : `assets/sketch_traffic_light.ino`

Puis dans le projet, dans un terminal :

```
cd arduino-project
npm i
npm start
```

Et dans un nouvel onglet du terminal (en vérifiant d'avoir bien le bon port pour l'Arduino dans le fichier `arduino.js` : variable `portName`) :

```
node arduino.js
```

Enfin, on peut ouvrir le lien [suivant](http://localhost:3001/) et accéder à l'interface web.

## Visuel de l'interface web

<div align="center">
<img title="Interface web" src="assets/preview.png" alt="Interface web" width="600px" />
</div>

## Sources

L'image de la voiture est un graphique proposé sur le site web <a title="Site web Canva" href="https://www.canva.com/">Canva</a>. Tous les autres éléments de l'animation ont été créé en CSS3 pure.
