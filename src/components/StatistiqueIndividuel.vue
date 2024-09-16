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
          <!-- Sélecteur pour l'intervalle de temps -->
          <div class="form-group">
            <h4><label for="interval">Historique d'utilisation:</label></h4>
            <h6><label for="interval" class="subtitle-text">Cette page vous offre un rapport général de votre activité personnelle. </label></h6>
            <br>
            <select v-model="timeInterval" @change="updateTable" class="form-control" placeholder="Choisir une option">
              <option value="day">Jour</option>
              <option value="week">Semaine</option>
            </select>
          </div>

          <!-- Tableau dynamique avec pagination -->
          <div class="table-responsive mt-4">
            <br>
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Reussi</th>
                  <th>Echoué</th>
                  <th>Total</th>
                  <th>Période</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in paginatedData" :key="row.id" >
                  <td>{{ row.mouvement }}</td>
                  <td>{{ row.total_succes }}</td>
                  <td>{{ row.total_fail }}</td>
                  <td>{{ row.total_utilisation }}</td>
                  <td>{{ row.periode }}</td>
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
      timeInterval: 'day', // Valeur par défaut pour l'intervalle de temps
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
    async updateTable() {
      try {
        await axios.get('http://localhost:5000/', {
          withCredentials: true
        });
        this.errorMessage = ''; 

        const response = await axios.post('http://localhost:5000/mouvementstatistics', {
          interval: this.timeInterval,
        }, {
          withCredentials: true 
        });

        console.log("Données reçues :", response.data);
        this.tableData = response.data.statistics;
        
        this.currentPage = 1; 

      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        this.errorMessage = "Erreur lors de la récupération des données.";
      }
    },/*
    // Fonction pour obtenir le numéro de la semaine
    getWeekNumber(dateString) {
      const date = new Date(dateString);
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    },
    // Fonction pour déterminer la classe de la ligne
    getRowClass(dateString) {
      const weekNumber = this.getWeekNumber(dateString);
      console.log(`Date: ${dateString}, Week Number: ${weekNumber}, Class: ${weekNumber % 2 === 0 ? 'violet-row' : 'blue-row'}`);
      return weekNumber % 2 === 0 ? 'violet-row' : 'blue-row';
    },*/
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
    this.updateTable(); 
  }
};
</script>

<style scoped>
.violet-row {
  background-color: #8A2BE2 !important;
}

.blue-row {
  background-color: #1E90FF !important;
}
</style>
