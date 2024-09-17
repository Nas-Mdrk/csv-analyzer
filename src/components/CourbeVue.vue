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

    <!-- Section pour le graphique -->
    <div class="row custom-bg-second-top justify-content-center align-items-center">
      <div class="col-md-8">
        <div class="statistics card p-4">
          <div class="form-group">
            <h4><label for="statisticType">Taux d'utilisation générale </label></h4>
            <h6><label for="interval" class="subtitle-text">Cet outil vous offre un aperçu graphique des résultats obtenus. </label></h6>
            <br>
            
              <!-- Sélection du type de statistique -->
              <select v-model="statisticType" @change="fetchData" class="form-control">
                <option value="succes"><h6>Succès</h6></option>
                <option value="fail"><h6>Échec</h6></option>
              </select>
              
              <!-- Sélection des dates de début et de fin -->
              <div class="form-control mt-3">
                <h5 class="subtitle-text">Choisissez une periode</h5>
                <br>
                <h6><label for="startDate" >Date de début :</label></h6>
                <input type="date" v-model="startDate" class="form-control" @change="fetchData" />
                <br>
                <h6><label for="endDate">Date de fin :</label></h6>
                <input type="date" v-model="endDate" class="form-control" @change="fetchData" />
                <br>
              </div>
            
          </div>


          <!-- Graphique -->
          <div class="chart-container mt-4">
            <canvas ref="canvas"></canvas>
          </div>

          <!-- Message d'erreur -->
          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>

          <!-- Footer -->
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
        </div>
        <div style="height:50px;"> <p></p></div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/styles.css';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LineController, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, LineController, CategoryScale, LinearScale, PointElement);
export default {
  data() {
    return {
      statisticType: 'succes', // Valeur par défaut pour le type de statistique
      startDate: '01/01/1999', // Date de début sélectionnée par l'utilisateur
      endDate: '01/01/2090',   // Date de fin sélectionnée par l'utilisateur
      chartData: {
        labels: [], // Les labels pour l'axe des X
        datasets: [
          {
            label: 'Pourcentage de Mouvements',
            backgroundColor: 'rgba(99, 102, 241, 0.2)', // Couleur violet
            borderColor: '#6366F1', // Couleur violet
            data: [] // Les données pour l'axe des Y
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      errorMessage: '',
      chart: null // Ajoutez une propriété pour stocker l'instance du graphique
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.errorMessage = '';
      try {
        const response = await axios.post('https://back-csv-analyzer-production.up.railway.app/mouvementpercentagebydateandstate', {
          etat: this.statisticType,
          start_date: this.startDate,
          end_date: this.endDate
        });
        
        console.log('Réponse :', response.data); // Affichez les données de la réponse
        const data = response.data;
        if (Array.isArray(data)) {
          this.chartData.labels = data.map(entry => entry.mouvement);
          this.chartData.datasets[0].data = data.map(entry => entry.percentage);
          console.log('Données du graphique :', this.chartData); // Affichez les données du graphique pour vérifier sa structure
          this.renderChart(); // Appel pour rendre le graphique avec les nouvelles données
        } else {
          this.errorMessage = 'Format des données incorrect.';
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        this.errorMessage = 'Erreur lors de la récupération des données.';
      }
    },
    renderChart() {
      const ctx = this.$refs.canvas.getContext('2d');

      // Si un graphique existe déjà, le détruire
      if (this.chart) {
        this.chart.destroy();
      }

      // Créer un nouveau graphique
      this.chart = new ChartJS(ctx, {
        type: 'line',
        data: this.chartData,
        options: this.chartOptions
      });
    }
  },
  watch: {
    chartData() {
      this.renderChart();
    }
  }
}

</script>


<style scoped>
.title-container {
  margin-bottom: 20px;
}

.chart-container {
  height: 400px; /* Hauteur du graphique */
}
</style>
