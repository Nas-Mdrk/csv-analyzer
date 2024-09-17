<template>
  <div class="page-container">
    <!-- Haut de la page avec un fond violet -->
    <div class="container-fluid p-0">
      <div class="row custom-bg-top justify-content-center align-items-center">
        <div class="col-md-6 text-center">
          <!-- Titre et sous-titre -->
          <div class="title-container">
            <br>
            <h1 class="title-text">Nettoyeur de Données</h1>
            <h6 class="subtitle-text" style="color:black;">Nettoyez facilement vos fichiers en toute simplicité</h6>
          </div>

          <!-- Section des icônes avec textes explicatifs -->
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

          <!-- Sous-titre supplémentaire -->
          <div class="title-container">
            <br>
            <h1></h1>
            <p class="subtitle-text">Pour vos fichiers CSV de petite, moyenne ou grande taille, facilitez-vous la vie.</p>
            <h6 class="subtitle-text" style="color:black;">Utilisez data cleaner.</h6>
          </div>
        </div>

        <!-- Section d'importation de fichier -->
        
        <div class="col-md-6">
          <div class="file-upload card p-4">
            <h6>
              <a href="/file-upload" @click="reloadPage" style="margin-left: 520px; text-decoration: none;color:rgba(62, 77, 207, 0.884);" class="subtitle-text"><i class="fas fa-undo"></i> <!-- Icône de retour --></a>
            </h6>
            <div class="file-input-container text-center">
              <input type="file" id="file-input" @change="handleFiles" class="file-input" multiple />
              <label for="file-input" class="file-label">
                <span>
                  <i class="fas fa-upload"></i> Choisir un fichier
                </span>
              </label>
            </div>

            <div v-if="files.length" class="mt-4">
              <h5>Fichiers sélectionnés :</h5>
              <ul class="list-group list-group-flush">
                <li v-for="file in files" :key="file.name" class="list-group-item">{{ file.name }}</li>
              </ul>
              <button @click="uploadFiles" class="upload-button btn btn-primary mt-3"><i class="fas fa-paper-plane"></i> Envoyer le fichier</button>
            </div>

            <div v-if="notification" class="alert alert-info mt-3">
              <p>{{ notification }}</p>
            </div>
            <div v-if="isLoading" class="loading-spinner-container">
              <div class="loading-spinner"></div>
            </div>
            <div v-if="taskStatus" class="alert alert-info mt-3">
              <p>{{ taskStatus }}</p>
            </div>
            <div v-if="downloadUrl" class="mt-3">
              <a :href="downloadUrl" target="_blank" class="btn btn-primary">Télécharger le fichier modifié</a>
            </div>
            <div v-if="errorMessage" class="alert alert-danger mt-3">
              <p>{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bas de la page avec des cases blanches -->
    <div class="footer-cases">
      <div class="case">
        <div class="case-content">
          <span class="case-number">1</span>
          <p>Importation de fichier(s)</p>
        </div>
      </div>
      <div class="case">
        <div class="case-content">
          <span class="case-number">2</span>
          <p>Choix de l'opération</p>
        </div>
      </div>
      <div class="case">
        <div class="case-content">
          <span class="case-number">3</span>
          <p>Lancer le traitement</p>
        </div>
      </div>
      <div class="case">
        <div class="case-content">
          <span class="case-number">4</span>
          <p>Téléchargement/Confirmation</p>
        </div>
      </div>
    </div>
    <!-- Pied de page -->
    <div class="footer">
      <div class="footer-content">
        <!-- Les cinq listes -->
        <div class="footer-lists">
          <ul class="footer-list">
          </ul>
          <ul class="footer-list">
          </ul>
          <ul class="footer-list">
          </ul>
          <ul class="footer-list">
          </ul>
          
        </div>

        <!-- Icônes sociales -->

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
</template>

<script>
import axios from 'axios';
import '../assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';  // Importation de Bootstrap

export default {
  data() {
    return {
      files: [],
      downloadUrl: null,
      taskStatus: null,
      errorMessage: null,
      notification: null,
      isLoading: false // Nouveau état de chargement
    };
  },
  methods: {
    reloadPage(event) {
      event.preventDefault(); // Empêche le comportement par défaut de recharger automatiquement la page
      window.location.href = '/file-upload'; // Redirige vers la nouvelle page
      window.location.reload(); // Recharge la page
    },
    handleFiles(event) {
      this.files = Array.from(event.target.files);
      this.errorMessage = null; // Clear previous error message
      this.taskStatus = null;
    },
    async uploadFiles() {
      this.taskStatus = null;
      this.errorMessage = null; // Clear previous error message
      this.notification = null;// 'Action effectuée, veuillez patienter'; // Show notification
      this.isLoading = true; // Commencer à charger

      if (!this.files.length) {
        this.errorMessage = 'Veuillez sélectionner des fichiers.';
        this.notification = null; // Hide notification
        this.isLoading = false; // Arrêter de charger
        return;
      }

      const formData = new FormData();
      this.files.forEach(file => formData.append('files', file));

      try {
        await axios.get('http://back-csv-analyzer-production.up.railway.app/', {
          withCredentials: true
        });
        // Envoyer les fichiers au backend
        const response = await axios.post('http://back-csv-analyzer-production.up.railway.app/clean_csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // Inclure les cookies
        });

        const taskId = response.data.task_id;

        // Vérifiez périodiquement l'état de la tâche
        const interval = setInterval(async () => {
          try {
            const statusResponse = await axios.get(`http://back-csv-analyzer-production.up.railway.app/task_status/${taskId}`, {
              withCredentials: true, // Inclure les cookies
            });
            const status = statusResponse.data;

            if (status.state === 'SUCCESS') {
              clearInterval(interval);
              this.downloadUrl = `http://back-csv-analyzer-production.up.railway.app/download_clean_csv/${taskId}`;
              this.taskStatus = 'Nettoyage des CSV terminé avec succès.';
              this.notification = null; // Hide notification
              this.isLoading = false; // Arrêter de charger
            } else if (status.state === 'FAILURE') {
              clearInterval(interval);
              this.taskStatus = 'Erreur lors du nettoyage des CSV.';
              this.errorMessage = `Erreur: ${status.status}`; // Afficher le message d'erreur
              this.notification = null; // Hide notification
              this.isLoading = false; // Arrêter de charger
            } else {
              //this.taskStatus = status.status;
              this.notification = null; // Hide notification
            }
          } catch (error) {
            clearInterval(interval);
            this.taskStatus = 'Erreur lors de la vérification de l\'état de la tâche.';
            this.notification = null; // Hide notification
            this.isLoading = false; // Arrêter de charger
          }
        }, 2000); // Intervalle de vérification de 2 secondes

      } catch (error) {
        this.errorMessage = `Erreur: ${error.message}`;
        this.notification = null; // Hide notification
        this.isLoading = false; // Arrêter de charger
      }
    },
  },
};
</script>
<!-- 
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
}

.import-section {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6a11cb 0%, #b892ff 50%, #2575fc 100%);
  padding: 2rem 0;
}

.card {
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
}

.footer {
  background-color: #2b6cb0;
  color: white;
  text-align: center;
}

body {
  background-color: #f3f4f6;
  margin: 0;
}
</style> -->
