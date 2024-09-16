<template>
  <div id="app">
    <nav class="navbar">
      <ul class="nav-list">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" aria-expanded="false">
            Analyse & Nettoyage
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link to="/compare-csv" class="dropdown-item">Comparer fichiers</router-link></li>
            <li><router-link to="/clean-twocsv" class="dropdown-item">Nettoyage croisée</router-link></li>
            <li><router-link to="/file-upload" class="dropdown-item">Suppression de doublons</router-link></li>
            <li><router-link to="/clean-duplicatekey" class="dropdown-item">Nettoyage par Clé Primaire</router-link></li>
            
          </ul>
        </li>
        <li class="nav-item"><router-link to="/manipulate-twocsv" class="nav-link">Fusion & Manipulation</router-link></li>
        <li class="nav-item"><router-link to="/remove-columns" class="nav-link">Suppression colonnes</router-link></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" aria-expanded="false">
            Contrôle Qualité
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link to="/validate-format" class="dropdown-item">Validation de Format</router-link></li>
            <li><router-link to="/detect-outlier" class="dropdown-item">Détection Anomalies</router-link></li>
          </ul>
        </li>
        <li class="nav-item"><router-link to="/add-columnformula" class="nav-link">Formule d'ajout</router-link></li>
        <li class="nav-item"><router-link to="/validate-url" class="nav-link">Validation des Urls</router-link></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" aria-expanded="false">
            Suivi statistique
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link to="/statistique-individuel" class="dropdown-item">Historique personnel</router-link></li>
            <li><router-link to="/statistique-all" class="dropdown-item">Détails par fichier</router-link></li>
            <li><router-link to="/courbe-vue" class="dropdown-item">Courbe d'utilisations</router-link></li>
            <li><router-link to="/statistique-detail" class="dropdown-item">Rapport global</router-link></li>
          </ul>
        </li>
      </ul>
    </nav>
    <router-view></router-view> <!-- Affiche le composant de route actuel -->
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Style de la barre de navigation */
.navbar {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); /* Dégradé de couleur pour la barre de navigation */
  padding: 0.75rem 1.5rem; /* Espacement interne */
  /*box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  Ombre pour effet de profondeur */
}

/* Liste de navigation */
.nav-list {
  list-style: none; /* Suppression des puces */
  padding: 0;
  margin: 0;
  display: flex; /* Disposition horizontale des éléments */
  justify-content: center; /* Centrage horizontal des éléments */
  flex-wrap: wrap; /* Enroulement des éléments pour les petits écrans */
}

/* Éléments de la liste de navigation */
.nav-item {
  margin: 0 26px; /* Espacement entre les éléments */
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Liens de navigation */
.nav-link {
  text-decoration: none; /* Suppression du soulignement des liens */
  color: #ffffff; /* Couleur du texte des liens */
  font-weight: 600; /* Poids de la police pour une meilleure lisibilité */
  font-size: 1.3rem; /* Taille du texte augmentée */
  transition: color 0.3s, transform 0.3s; /* Effets de transition pour les interactions */
}

/* Effet de survol des liens */
.nav-link:hover {
  color: #cce5ff; /* Couleur de texte au survol */
  text-decoration: underline; /* Soulignement au survol */
  transform: translateY(-3px); /* Léger déplacement vers le haut au survol */
}

/* Effet de focus pour améliorer l'accessibilité */
.nav-link:focus {
  outline: 3px solid #cce5ff; /* Contour au focus pour la visibilité */
  outline-offset: 2px; /* Décalage du contour pour plus de clarté */
  background-color: rgba(204, 229, 255, 0.2); /* Fond légèrement coloré au focus */
  border-radius: 4px; /* Coins arrondis pour le focus */
}
.dropdown-menu {
  display: none; /* Masquer le menu par défaut */
  position: absolute; /* Positionner le menu déroulant */
  z-index: 1000; /* Assurer que le menu s'affiche au-dessus des autres éléments */
}

.dropdown:hover .dropdown-menu {
  display: block; /* Afficher le menu lors du survol */
}

.dropdown {
  position: relative; /* Nécessaire pour que le menu s'affiche correctement */
}
</style>
