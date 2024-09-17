<template>
  <div class="container-fluid p-0 page-container">
    <!-- Haut de la page avec un fond violet -->
    <div class="row custom-bg-top justify-content-center align-items-center">
      <div class="col-md-6 text-center">
        <!-- Titre et sous-titre séparés dans leur propre div -->
        <div class="title-container">
          <br>
          <h1 class="title-text">Nettoyeur de Données</h1>
          <tr></tr>
          <h6 class="subtitle-text" style="color:black;">Vérifiez, Fusionnez, Nettoyez,... vos fichiers</h6>
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
        <div class="title-container">
          <br>
          <h1></h1>
          <p class="subtitle-text">Pour vos fichiers CSV de petite, moyenne ou grande taille, facilitez-vous la vie.</p>
          <h6 class="subtitle-text" style="color:black;">Utilisez data cleaner.</h6>
        </div>
      </div>
    <!--</div>

    <div class="row custom-bg-second-top justify-content-center align-items-center">  -->
      <div class="col-md-6">
        <div class="file-upload card p-4">
          <div class="file-input-container text-center">
            <!-- Champs d'importation dynamique -->
            <h6>
              <a href="/clean-twocsv" @click="reloadPage" style="margin-left: 520px; text-decoration: none;color:rgba(62, 77, 207, 0.884);" class="subtitle-text"><i class="fas fa-undo"></i> <!-- Icône de retour --></a>
            </h6>
            <div v-for="(fileInput, index) in fileInputs" :key="index" class="file-input-container mt-3">
              <input
                type="file"
                :id="'file-input-' + index"
                @change="handleFiles($event, index)"
                class="file-input"
              />
              <label :for="'file-input-' + index" class="file-label">
                <span>
                  <i class="fas fa-upload"></i> Choisir un fichier
                </span>
              </label>
            </div>
            <!-- Bouton pour ajouter un champ d'importation -->
            <button
              v-if="fileInputs.length < 3"
              @click="addFileInput"
              class="add-file-button btn btn-secondary mt-3"
            >
              <i class="fas fa-plus"></i> Ajouter un champ d'importation
            </button>
          </div>

          <!-- Reste de votre code pour l'affichage des fichiers sélectionnés, etc. -->
          <!-- Prévisualisation des fichiers sélectionnés -->
          <div v-if="files.length" class="file-preview mt-4">
            <h3>Fichiers sélectionnés:</h3>
            <ul class="list-unstyled">
              <li v-for="file in files" :key="file.name"><i class="fas fa-file-alt"></i> {{ file.name }}</li>
            </ul>
            <button @click="uploadFiles" class="upload-button btn btn-primary mt-3">
              <i class="fas fa-paper-plane"></i> Envoyer les fichiers
            </button>
          </div>
          
          <!-- Notification -->
          <div v-if="notification" class="notification alert alert-info mt-3">
            <p>{{ notification }}</p>
          </div>
          <div v-if="isLoading" class="loading-spinner-container">
            <div class="loading-spinner"></div>
          </div>
          <!-- Statut de la tâche 
          <div v-if="taskStatus" :class="['task-status', taskStatus.type === 'success' ? 'success' : 'error']">
          <p>{{ taskStatus.message }}</p>-->
          <div v-if="taskStatus" class="alert alert-info mt-3">
            <p>{{ taskStatus }}</p>
            <p>{{ taskStatus.message }}</p>
          </div>

          <!-- Lien de téléchargement -->
          <div v-if="downloadUrl" class="download-link mt-3">
            <a :href="downloadUrl" target="_blank" class="btn btn-success">
              <i class="fas fa-download"></i> Télécharger le fichier nettoyé
            </a>
          </div>

          <!-- Message d'erreur -->
          <div v-if="errorMessage" class="error-message alert alert-danger mt-3">
            <p>{{ errorMessage }}</p>
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
import '../assets/css/styles.css';
import axios from 'axios';

export default {
  data() {
    return {
      fileInputs: [0], // Initialise avec un champ d'importation
      files: [],       // Contient les fichiers sélectionnés
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
      window.location.href = '/clean-twocsv'; // Redirige vers la nouvelle page
      window.location.reload(); // Recharge la page
    },
    addFileInput() {
      if (this.fileInputs.length < 3) {
        this.fileInputs.push(this.fileInputs.length);
      }
    },
    handleFiles(event, index) {
      this.$set(this.files, index, event.target.files[0]);
      this.taskStatus = null; // Réinitialise l'état de la tâche précédente
      this.errorMessage = null; // Réinitialise le message d'erreur précédent
      this.notification = null; // Réinitialise la notification précédente
    },
    async uploadFiles() {
      this.taskStatus = null; // Réinitialise l'état de la tâche précédente
      this.errorMessage = null; // Réinitialise le message d'erreur précédent
      this.notification = null; // Réinitialise la notification précédente
      this.notification =  null;//'Action effectuée, veuillez patienter';
      this.isLoading = true; // Commencer à charger


      if (this.files.length !== 2) {
        this.notification = null;
        this.isLoading = false; // Arrêter de charger
        this.errorMessage = 'Veuillez sélectionner exactement deux fichiers.';
        return;
      }

      const formData = new FormData();
      this.files.forEach(file => {
        formData.append('files', file);
      });

      try {
        await axios.get('http://back-csv-analyzer-production.up.railway.app/', {
          withCredentials: true
        });

        // Envoyer les fichiers au backend
        const response = await axios.post('http://back-csv-analyzer-production.up.railway.app/clean_two_csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // Inclure les cookies si nécessaire
        });

        const taskId = response.data.task_id;

        // Vérifiez périodiquement l'état de la tâche
        const interval = setInterval(async () => {
          try {
            const statusResponse = await axios.get(`http://back-csv-analyzer-production.up.railway.app/task_status/${taskId}`);
            const status = statusResponse.data;

            if (status.state === 'SUCCESS') {
              clearInterval(interval);
              this.downloadUrl = `http://back-csv-analyzer-production.up.railway.app/download_cleaned_csv/${taskId}`;
              this.taskStatus = 'Les fichiers ont été traités avec succès.';
              this.notification = null; 
              this.isLoading = false; // Arrêter de charger
            } else if (status.state === 'FAILURE') {
              clearInterval(interval);
              this.notification = null; 
              this.isLoading = false; // Arrêter de charger
              this.taskStatus = null;
              this.errorMessage = `Erreur lors du traitement des fichiers : ${status.result}`;
            } else {
              this.notification = null;
              //this.taskStatus = status.status;
            }
          } catch (statusError) {
            clearInterval(interval);
            this.notification = null; 
            this.isLoading = false; // Arrêter de charger
            this.errorMessage = 'Erreur lors de la vérification de l\'état de la tâche.';
            console.error('Erreur lors de la vérification de l\'état de la tâche:', statusError);
          }
        }, 2000); // Vérifiez toutes les 2 secondes

      } catch (error) {
        console.error('Erreur lors de l\'envoi des fichiers:', error);

        const statusCode = error.response ? error.response.status : 'Inconnu';
        const statusText = error.response ? error.response.statusText : 'Erreur inconnue';
        const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;
        this.notification = null; 
        this.taskStatus = null;
        this.isLoading = false; // Arrêter de charger
        this.errorMessage = `Erreur ${statusCode} (${statusText}): ${errorMessage || 'Veuillez réessayer.'}`;
      }
    }
  }
};
</script>
