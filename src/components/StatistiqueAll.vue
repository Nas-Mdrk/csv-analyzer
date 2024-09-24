<template>
  <div class="container-fluid p-0">
    <!-- Haut de la page avec un fond violet -->
    <div class="row custom-bg-top justify-content-center align-items-center">
      <div class="col-md-6 text-center">
        <div class="title-container">
          <br>
          <h1 class="title-text">Nettoyeur de Données</h1>
          <h6 class="subtitle-text" style="color:black;">Analysez et visualisez vos statistiques</h6>
        </div>
        <div class="features-container mt-4 d-flex justify-content-center">
          <div class="feature">
            <div class="feature-icon-container">
              <i class="fas fa-user feature-icon"></i>
            </div>
            <p class="feature-text">Facilité d'utilisation</p>
            <p class="feature-description">Une interface intuitive pour une utilisation sans tracas.</p>
          </div>
          <div class="feature">
            <div class="feature-icon-container">
              <i class="fas fa-clock feature-icon"></i>
            </div>
            <p class="feature-text">Gain de temps</p>
            <p class="feature-description">Traitez rapidement vos fichiers volumineux en quelques clicks.</p>
          </div>
          <div class="feature">
            <div class="feature-icon-container">
              <i class="fas fa-check-circle feature-icon"></i>
            </div>
            <p class="feature-text">Qualité de résultat</p>
            <p class="feature-description">Des résultats précis et fiables pour vos analyses.</p>
          </div>
        </div>
        <div class="title-container">
          <br>
          <p class="subtitle-text">Affichez les statistiques de vos fichiers CSV en un coup d'œil.</p>
        </div>
      </div>
    </div>

    <div class="row custom-bg-second-top justify-content-center align-items-center">
      <div class="col-md-8">
        <div class="statistics card p-4">
          <!-- Sélecteur pour afficher les statistiques par mois, semaine ou fonctionnalité -->
          <div class="form-group">
            <h4><label for="statisticType">Details des opérations</label></h4>
            <h6><label for="interval" class="subtitle-text">Cet outil vous offre un aperçu de chacunes de vos actions sur chaque fichier. </label></h6>
            <br>
            <select v-model="statisticType" @change="updateTable" class="form-control" placeholder="Choisir une option">
              <option value="succes">Succès</option>
              <option value="fail">Échec</option>
            </select>
          </div>

          <!-- Tableau dynamique avec pagination -->
          <div class="table-responsive mt-4">
            <br>
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>État</th>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Nombre de ligne</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in paginatedData" :key="row.id">
                  <td>{{ row.mouvement }}</td>
                  <td>{{ row.etat }}</td>
                  <td>{{ row.jour }}</td>
                  <td>{{ row.nom_du_fichier }}</td>
                  <td style="text-align: right">{{ formatNumber(row.nombre_de_ligne) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Controls -->
          <div class="pagination-controls">
            <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
            <span>Page {{ currentPage }} sur {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
          </div>
          <div class="footer">
            <div class="footer-content">
              <div class="footer-lists">
                <ul class="footer-list"></ul>
                <ul class="footer-list"></ul>
                <ul class="footer-list"></ul>
                <ul class="footer-list"></ul>
              </div>
              <div class="footer-icons" style="margin-top:80px;">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-linkedin-in"></i>
                <i class="fas fa-envelope"></i>
              </div>
              <div class="footer-icons" style="margin-top:5px;">
                <h6 class="subtitle-text">Value IT Forello Tanjombato</h6>
              </div>
            </div>
          </div>
          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
        </div>
        <div style="height:50px;"> <p></p></div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/styles.css';
import axios from 'axios';

export default {
  data() {
    return {
      statisticType: 'succes', // Valeur par défaut pour le type de statistique
      tableData: [], // Données à afficher dans le tableau
      currentPage: 1, // Page actuelle
      itemsPerPage: 10, // Nombre d'éléments par page
      errorMessage: '', // Message d'erreur
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.tableData.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.tableData.slice(start, end);
    }
  },
  methods: {
    formatNumber(value) {
      if (value === null || value === undefined) {
        return value;
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
    async updateTable() {
        try {
            // Effectuer la première requête GET pour établir une session ou récupérer des données nécessaires
            await axios.get('https://bffff56dda3a56d68b03fe16bffb7d11.serveo.net/', {
                withCredentials: true
            });
            this.errorMessage = ''; // Réinitialiser le message d'erreur

            // Effectuer la requête POST pour obtenir les entrées en fonction du type de statistique
            const response = await axios.post('https://bffff56dda3a56d68b03fe16bffb7d11.serveo.net/get_entries', {
                etat: this.statisticType, // Inclure le type de statistique dans la requête
            }, {
                withCredentials: true // Inclure les cookies
            });

            // Utiliser la réponse de l'API pour mettre à jour les données du tableau
            this.tableData = response.data.entries; // Supposons que la réponse a un format similaire
            this.currentPage = 1; // Réinitialiser à la première page lorsque les données sont mises à jour

        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
            this.errorMessage = "Erreur lors de la récupération des données.";
        }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  },
  mounted() {
    this.updateTable(); // Charger les données du tableau au montage du composant
  }
};
</script>
