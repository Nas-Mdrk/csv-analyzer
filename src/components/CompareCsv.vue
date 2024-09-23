<template>
  <div class="container-fluid p-0">
    <!-- Haut de la page avec un fond violet -->
    <div class="row custom-bg-top justify-content-center align-items-center">
      <div class="col-md-6 text-center">
        <div class="title-container">
          <br>
          <h1 class="title-text">Nettoyeur de Données</h1>
          <h6 class="subtitle-text" style="color:black;">Analysez et visualisez vos fichiers</h6>
        </div>
        <div class="features-container mt-4 d-flex justify-content-center">
          <div class="feature" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon-container">
              <i :class="feature.icon" class="feature-icon"></i>
            </div>
            <p class="feature-text">{{ feature.title }}</p>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
        <div class="title-container">
          <br>
          <p class="subtitle-text">Affichez le rapport de comparaison de vos fichiers en un coup d'œil.</p>
        </div>
      </div>
    </div>

    <!-- Section pour le nettoyage de CSV -->
    <div class="row custom-bg-second-top justify-content-center align-items-center">
      <div class="col-md-8">
        <div class="statistics card p-4">
          <h4><label for="statisticType">Comparaison <a href="/compare-csv" @click="reloadPage" style="margin-left: 700px; text-decoration: none;color:rgba(62, 77, 207, 0.884);" class="subtitle-text"><i class="fas fa-undo"></i> <!-- Icône de retour --></a></label></h4>
          <div class="form-control mt-3">
            <h5><label for="file" class="subtitle-text">Choisissez vos fichiers CSV</label></h5>
            <input type="file" @change="handleFile1Upload" class="form-control" accept=".csv" />
            <br>
            <input type="file" @change="handleFile2Upload" class="form-control" accept=".csv" />
            <button @click="compareCSVFiles" class="upload-button btn btn-custom mt-3">Lancer la comparaison</button>
            <br>
          </div>
          
 
          <!-- Affichage des fichiers CSV -->
          <div v-if="file1HtmlContent && file2HtmlContent" class="csv-comparison mt-4">
            <div class="row">
              <div class="col-md-6">
                <h5 class="subtitle-text">Fichier 1 :</h5>
                <div class="scrollable-table" style="border: 1px solid #ddd; padding: 10px; overflow-x: auto; max-height: 400px;">
                  <div v-html="file1HtmlContent"></div>
                </div>
              </div>
              <div class="col-md-6">
                <h5 class="subtitle-text">Fichier 2 :</h5>
                <div class="scrollable-table" style="border: 1px solid #ddd; padding: 10px; overflow-x: auto; max-height: 400px;">
                  <div v-html="file2HtmlContent"></div>
                </div>
              </div>
            </div>
          </div>


          <!-- Message d'erreur -->
          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
          
          <!-- Notification et état de la tâche -->
          <div v-if="taskStatus" class="alert alert-info mt-3">{{ taskStatus }}</div>
          <div v-if="isLoading" class="loading-spinner-container">
            <div class="loading-spinner"></div>
          </div>
          

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

export default {
  data() {
    return {
      file1: null,
      file2: null,
      file1HtmlContent: '', // Contenu HTML du fichier 1
      file2HtmlContent: '', // Contenu HTML du fichier 2
      errorMessage: '',
      isLoading: false, // Nouveau état de chargement
      taskStatus: null,
      features: [
        {
          title: "Facilité d'utilisation",
          description: "Une interface intuitive pour une utilisation sans tracas.",
          icon: "fas fa-user"
        },
        {
          title: "Gain de temps",
          description: "Traitez rapidement vos fichiers volumineux en quelques clicks.",
          icon: "fas fa-clock"
        },
        {
          title: "Qualité de résultat",
          description: "Des résultats précis et fiables pour vos analyses.",
          icon: "fas fa-check-circle"
        }
      ]
    };
  },
  methods: {
    reloadPage(event) {
      event.preventDefault(); // Empêche le comportement par défaut de recharger automatiquement la page
      window.location.href = 'https://venerable-bienenstitch-e1bf89.netlify.app/compare-csv'; // Redirige vers la nouvelle page
      window.location.reload(); // Recharge la page
    },
    handleFile1Upload(event) {
      this.file1 = event.target.files[0];
    },
    handleFile2Upload(event) {
      this.file2 = event.target.files[0];
    },
    async compareCSVFiles() {
      this.errorMessage = '';
      //this.taskStatus = 'Tâche lancée...';
      const formData = new FormData();
      this.isLoading = true; // Commencer à charger
      // Vérification des fichiers
      if (!this.file1 || !this.file2) {
        this.errorMessage = 'Veuillez sélectionner les deux fichiers CSV à comparer.';
        this.isLoading = false; // Arrêter de charger
        return;
      }

      // Ajouter les fichiers au FormData
      formData.append('file1', this.file1);
      formData.append('file2', this.file2);

      try {
        // Appel pour démarrer la tâche et comparer les fichiers CSV
        const response = await axios.post('https://7930908641b53819145eb4dfaf82f5bc.serveo.net/compare_two_csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        // Vérifiez si la réponse contient un ID de tâche
        const taskId = response.data.task_id;
        //this.taskStatus = null;
        this.checkTaskStatus(taskId);
       
      } catch (error) {
        console.error('Erreur lors de la comparaison des fichiers CSV :', error);
        this.isLoading = false; // Arrêter de charger
        this.errorMessage = 'Erreur lors de la comparaison des fichiers CSV.';
      }
    },
    async checkTaskStatus(taskId) {
      const interval = setInterval(async () => {
        try {
          const statusResponse = await axios.get(`https://7930908641b53819145eb4dfaf82f5bc.serveo.net/task_status/${taskId}`, {
            withCredentials: true,
          });
          const status = statusResponse.data;
          this.taskStatus = null;
          console.log('Statut de la tâche:', status); // Journaliser le statut de la tâche

          if (status.state === 'SUCCESS') {
            clearInterval(interval);
            this.taskStatus = 'La tâche a été complétée avec succès.';
            this.isLoading = false; // Arrêter de charger
            // Faire appel à l'endpoint pour obtenir le contenu des fichiers
            try {
              const contentResponse = await axios.get(`https://7930908641b53819145eb4dfaf82f5bc.serveo.net/get_file_content/${taskId}`, {
                withCredentials: true,
              });

              // Supposons que le contenu est renvoyé sous forme de tableau avec les deux fichiers
              //const [file1Content, file2Content] = contentResponse.data;
              const file1Content = contentResponse.data.file1_content;
              const file2Content = contentResponse.data.file2_content;

              // Stocker le contenu HTML dans le composant pour l'affichage
              this.file1HtmlContent = file1Content; // Contenu HTML du premier fichier
              this.file2HtmlContent = file2Content; // Contenu HTML du deuxième fichier
              this.taskStatus = null;
            } catch (contentError) {
              console.error('Erreur lors de la récupération du contenu des fichiers:', contentError);
              this.isLoading = false; // Arrêter de charger
              this.errorMessage = 'Erreur lors de la récupération du contenu des fichiers.';
            }

          } else if (status.state === 'FAILURE') {
            clearInterval(interval);
            this.taskStatus = 'Erreur lors de l\'exécution de la tâche.';
            this.isLoading = false; // Arrêter de charger
            this.errorMessage = `Erreur: ${status.status}`;
          } else {
            //this.taskStatus = status.status; // Affiche le statut actuel de la tâche
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du statut de la tâche:', error);
          this.isLoading = false; // Arrêter de charger
          this.errorMessage = 'Erreur lors de la vérification du statut de la tâche.';
        }
      }, 1000); // Vérifie le statut toutes les secondes
    }
  }
};
</script>


<style scoped>
.csv-comparison .row {
  margin-top: 20px;
}

.csv-comparison .col-md-6 {
  padding: 10px;
}

.csv-comparison h5 {
  font-weight: bold;
  margin-bottom: 10px;
}

.scrollable-table {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff; /* Couleur de fond blanche */
}

.scrollable-table div {
  min-width: 600px; /* Ajustez cette valeur selon le besoin */
}

/* Ajoutez vos styles CSS personnalisés ici */
.upload-button {
  background-color: #74cec8; /* Couleur bleu vert pâle */
  color: #fff; /* Couleur du texte */
  border: none; /* Supprime les bordures par défaut */
  padding: 10px 20px; /* Ajout de l'espace intérieur */
  border-radius: 5px; /* Coins arrondis */
  transition: background-color 0.3s ease; /* Transition douce pour l'effet de survol */
}

.upload-button:hover {
  background-color: #7eb3b0; /* Couleur au survol */
}

.mx-2 {
  margin: 0 10
}
</style>


