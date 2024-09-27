<template>
  <div class="container-fluid p-0">
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
            <h4><label for="interval">Suivi général</label></h4>
            <h6><label for="interval" class="subtitle-text">Cet outil vous offre un rapport général des activités communes.</label></h6>
            <br>
            <select v-model="dataType" @change="updateTable" class="form-control" placeholder="Choisir une option">
              <option value="aggregated">Données Agrégées</option>
            </select>
          </div>

          <!-- Sélecteurs pour le mois et l'année -->
          <div class="form-control mt-3">
            <h5 class="subtitle-text">Choisissez une periode</h5>
            <br>
          <div class="form-group">
            <h6><label for="month">Mois</label></h6>
            <select v-model="month" @change="updateTable" class="form-control">
              <option v-for="m in months" :key="m.value" :value="m.value">{{ m.text }}</option>
            </select>
          </div>
          <div class="form-group">
            <h6><label for="year" >Année</label></h6>
            <select v-model="year" @change="updateTable" class="form-control">
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>

          <!-- Tableau dynamique avec pagination -->
          <div class="table-responsive mt-4">
            <br>
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Nombre Total de Lignes</th>
                  <th>Poids Total</th>
                  <th>Unité</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in paginatedData" :key="row.id">
                  <td>{{ row.action }}</td>
                  <td style="text-align: right">{{ formatNumber(row.total_lignes) }}</td>
                  <td style="text-align: right">{{ formatNumber(convertWeight(row.total_poids)) }}</td>
                  <td></td>
                </tr>
                <tr v-if="totalWeight !== undefined && totalWeight !== null">
                  <td></td>
                  <td colspan="1" class="text-right" style="background-color: #74cec8be; color: white;"><strong>Total Poids :</strong></td>
                  <td style="text-align: right">{{ formatNumber(convertWeight(totalWeight)) }}</td>
                  <td>
                    <select v-model="selectedUnit" @change="updateTable" class="form-control">
                      <option value="Mo">Mo</option>
                      <option value="Go">Go</option>
                      <option value="Ko">Ko</option>
                      <option value="octets">Octets</option>
                    </select>
                  </td>
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
      selectedUnit: 'Mo', // Unité par défaut
      conversionRates: {
        'Mo': 1,
        'Go': 1 / 1024,
        'Ko': 1024,
        'octets': 1024 * 1024
      },
      dataType: 'aggregated', // Type de données par défaut
      month: new Date().getMonth() + 1, // Mois par défaut (1-12)
      year: new Date().getFullYear(), // Année par défaut
      tableData: [],  // Initialisation avec un tableau vide
      totalWeight: 0, // Pour stocker le poids total
      currentPage: 1, // Page actuelle
      itemsPerPage: 10, // Nombre d'éléments par page
      errorMessage: '', // Message d'erreur
      months: [
        { value: 1, text: 'Janvier' },
        { value: 2, text: 'Février' },
        { value: 3, text: 'Mars' },
        { value: 4, text: 'Avril' },
        { value: 5, text: 'Mai' },
        { value: 6, text: 'Juin' },
        { value: 7, text: 'Juillet' },
        { value: 8, text: 'Août' },
        { value: 9, text: 'Septembre' },
        { value: 10, text: 'Octobre' },
        { value: 11, text: 'Novembre' },
        { value: 12, text: 'Décembre' },
      ],
      years: Array.from({ length: 10 }, (v, i) => new Date().getFullYear() - i) // Dernières 10 années
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
    convertWeight(value) {
      if (value === null || value === undefined) {
        return value;
      }
      // Convertir le poids en fonction de l'unité sélectionnée
      const conversionRate = this.conversionRates[this.selectedUnit];
      return (value * conversionRate).toFixed(2); // Arrondir à 2 décimales
    },
    async updateTable() {
      try {
        // Première requête pour vérifier la connexion au backend
        await axios.get('https://newbackCSV-production.up.railway.app/', {
          withCredentials: true 
      });
        this.errorMessage = ''; 

        const response = await axios.get(`https://newbackCSV-production.up.railway.app/aggregated_data`, {
          params: {
            month: this.month,
            year: this.year,
            type: this.dataType,
          },
          withCredentials: true 
        });

        console.log("Données reçues :", response.data);
        // Vérification de la structure de la réponse
        if (response.data && Array.isArray(response.data.result)) {
          this.tableData = response.data.result; // Mettez à jour avec le tableau
          this.totalWeight = response.data.total_weight; // Mettez à jour le poids total
        } else {
          console.error("La réponse ne contient pas de données valides.");
        }
        
        this.currentPage = 1; // Réinitialiser à la première page

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
