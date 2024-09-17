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
          <h6 class="subtitle-text" style="color:black;">Fusionnez et adaptez à votre guise vos fichiers</h6>
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
          <!-- Champs de sélection de fichiers dynamiques -->
          <h6>
            <a href="/manipulate-twocsv" @click="reloadPage" style="margin-left: 520px; text-decoration: none;color:rgba(62, 77, 207, 0.884);" class="subtitle-text"><i class="fas fa-undo"></i> <!-- Icône de retour --></a>
          </h6>
          <div v-for="(fileInput, index) in fileInputs" :key="index" class="file-input-container mb-3">
            <p></p>
            <input
              type="file"
              :id="'file-input-' + index"
              multiple
              @change="handleFiles($event, index)"
              class="file-input"
            />
            <label :for="'file-input-' + index" class="file-label">
              <span><i class="fas fa-upload"></i> Choisir un fichier</span>
            </label>
          </div>
          
          <!-- Bouton pour ajouter un champ d'importation -->
          <button @click="addFileInput" class="add-file-button btn btn-secondary mt-3">
            <i class="fas fa-plus"></i> Ajouter un champ d'importation
          </button>
          <p></p>
          <!-- Prévisualisation des fichiers sélectionnés -->
          <div v-if="files.length" class="file-preview mt-4">
            <h3>Fichiers sélectionnés:</h3>
            <ul class="list-unstyled">
              <li v-for="file in files" :key="file.name"><i class="fas fa-file-alt"></i> {{ file.name }}</li>
            </ul>
            <input 
              v-model="commonColumn" 
              type="text" 
              placeholder="Nom de la colonne commune" 
              class="form-control mt-3"
            />
            
            <select v-model="selectedIndex" class="form-control mt-3">
              <option disabled value="">Sélectionnez une option</option>
              <option value="1">Find A and B middle</option>
              <option value="2">Find A through B</option>
              <option value="3">Find A fill B</option>
              <option value="4">Full outer join</option>
              <option value="5">Full outer join with null</option>
            </select>
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
            <p>{{ taskStatus.message }}</p>
          </div>-->
          <div v-if="taskStatus" class="alert alert-info mt-3">
            <p>{{ taskStatus }}</p>
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
      fileInputs: [0], // Initialiser avec un champ d'importation
      files: [],
      downloadUrl: null,
      taskStatus: null,
      commonColumn: '',
      selectedIndex: '',
      errorMessage: null,
      notification: null,
      isLoading: false // Nouveau état de chargement
    };
  },
  methods: {
    reloadPage(event) {
      event.preventDefault(); // Empêche le comportement par défaut de recharger automatiquement la page
      window.location.href = '/manipulate-twocsv'; // Redirige vers la nouvelle page
      window.location.reload(); // Recharge la page
    },
    addFileInput() {
      this.fileInputs.push(this.fileInputs.length); // Ajouter un nouveau champ
    },
    handleFiles(event, index) {
      const selectedFiles = Array.from(event.target.files);
      selectedFiles.forEach(file => {
        this.files.push({ name: file.name, file, inputIndex: index });
      });
      this.errorMessage = null; // Clear previous error message
      this.taskStatus = null;
    },
    async uploadFiles() {
      this.taskStatus = null;
      this.errorMessage = null; // Clear previous error message
      this.notification =  null;//'Action effectuée, veuillez patienter'; // Show notification
      this.isLoading = true; // Commencer à charger

      if (this.files.length < 2) {
        this.errorMessage = 'Veuillez sélectionner au moins deux fichiers.';
        this.notification = null; // Hide notification
        this.isLoading = false; // Arrêter de charger
        return;
      }

      if (!this.commonColumn) {
        this.errorMessage = 'Veuillez renseigner le nom de la colonne commune.';
        this.notification = null; // Hide notification
        this.isLoading = false; // Arrêter de charger
        return;
      }

      if (!this.selectedIndex) {
        this.errorMessage = 'Veuillez sélectionner une option dans le menu déroulant.';
        this.notification = null; // Hide notification
        this.isLoading = false; // Arrêter de charger
        return;
      }

      const formData = new FormData();
      this.files.forEach(fileObj => {
        formData.append('files', fileObj.file);
      });
      formData.append('index', this.selectedIndex);
      formData.append('common_column', this.commonColumn);

      try {
        const response = await axios.post('https://back-csv-analyzer-production.up.railway.app/manipulate_two_csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // Inclure les cookies
        });

        const taskId = response.data.task_id;

        const interval = setInterval(async () => {
          try {
            await axios.get('https://back-csv-analyzer-production.up.railway.app/', {
            withCredentials: true
            });

            const statusResponse = await axios.get(`https://back-csv-analyzer-production.up.railway.app/task_status/${taskId}`, {
              withCredentials: true, // Inclure les cookies
            });
            const status = statusResponse.data;

            if (status.state === 'SUCCESS') {
              clearInterval(interval);
              this.downloadUrl = `https://back-csv-analyzer-production.up.railway.app/download_clean_csv/${taskId}`;
              this.taskStatus = 'Traitement terminé avec succès.';
              this.notification = null; // Hide notification
              this.isLoading = false; // Arrêter de charger
            } else if (status.state === 'FAILURE') {
              clearInterval(interval);
              this.taskStatus = 'Erreur lors du traitement des fichiers.';
              this.errorMessage = `Erreur: ${status.status}`; // Afficher le message d'erreur
              this.notification = null; // Hide notification
              this.isLoading = false; // Arrêter de charger
            } else {
              //this.taskStatus = status.status;
              this.notification = null;
            }
          } catch (error) {
            clearInterval(interval);
            this.taskStatus = 'Erreur lors de la vérification de l\'état de la tâche.';
            this.errorMessage = 'Erreur lors de la vérification de l\'état de la tâche. Veuillez réessayer.';
            this.notification = null; // Hide notification
            this.isLoading = false; // Arrêter de charger
          }
        }, 2000); // Vérifiez toutes les 2 secondes

      } catch (error) {
        console.error('Details:', error);
        
        const statusCode = error.response ? error.response.status : 'Inconnu';
        const statusText = error.response ? error.response.statusText : 'Erreur inconnue';
        const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;

        this.isLoading = false; // Arrêter de charger
        this.errorMessage = `Erreur ${statusCode} (${statusText}): ${errorMessage || 'Veuillez réessayer.'}`;
        this.notification = null; // Hide notification
      }
    }
  }
};
</script>
