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
          <h6 class="subtitle-text" style="color:black;">Supprimez les colonnes non désirées dans vos fichiers</h6>
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
      <div class="col-md-6 text-center">
        <div class="file-upload card p-4">
          <!--<p class="subtitle"></p>-->
          
          <!-- Zone de sélection de fichier -->
          <h6>
            <a href="/remove-columns" @click="reloadPage" style="margin-left: 520px; text-decoration: none;color:rgba(62, 77, 207, 0.884);" class="subtitle-text"><i class="fas fa-undo"></i> <!-- Icône de retour --></a>
          </h6>
          <div class="file-input-container mb-3">
            <input
              type="file"
              id="file-input"
              @change="handleFile"
              class="file-input"
            />
            <label for="file-input" class="file-label">
              <span><i class="fas fa-upload"></i> Choisir un fichier</span>
            </label>
          </div>

          <!-- Prévisualisation du fichier sélectionné -->
          <div v-if="file" class="file-preview mt-4">
            <h3>Fichier sélectionné:</h3>
            <ul class="list-unstyled">
              <li><i class="fas fa-file-alt"></i> {{ file.name }}</li>
            </ul>
            <!--<input 
              v-model="columnsToRemove"
              type="text" 
              placeholder="Colonnes à supprimer (séparées par des virgules, des espaces, des barres obliques ou 'et')" 
              class="form-control mt-3"
            />-->
            <div class="url-column-container mt-3">
                <select v-model="columnsToRemove" class="form-control"  placeholder="Colonnes à supprimer">
                  <option v-for="column in csvColumns" :key="column" :value="column">{{ column }}</option>
                </select>
            </div>
            <button @click="uploadFile" class="upload-button btn btn-primary mt-3">
              <i class="fas fa-paper-plane"></i> Envoyer le fichier
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
      file: null,
      columnsToRemove: '',
      csvColumns: [], // Array to hold column names
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
      window.location.href = 'https://venerable-bienenstitch-e1bf89.netlify.app/remove-columns'; // Redirige vers la nouvelle page
      window.location.reload(); // Recharge la page
    },
    handleFile(event) {
      this.file = event.target.files[0];
      this.errorMessage = null; 
      this.taskStatus = null;
      this.csvColumns = []; // Réinitialiser le tableau des colonnes

      // Utiliser FileReader pour lire la première ligne du fichier CSV
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target.result;
        const lines = csvContent.split('\n');
        if (lines.length > 0) {
          const firstLine = lines[0];
          // Supprimer les espaces et les retours à la ligne des colonnes
          this.csvColumns = firstLine.split(',').map(column => column.trim());
        }
      };
      reader.readAsText(this.file); // Lire le fichier en tant que texte
    },
    async uploadFile() {
      this.taskStatus = null;
      this.errorMessage = null; 
      this.notification = null;// 'Action effectuée, veuillez patienter';
      this.isLoading = true; // Commencer à charger

      if (!this.file) {
        this.errorMessage = 'Veuillez sélectionner un fichier.';
        this.notification = null; 
        this.isLoading = false; // Arrêter de charger
        return;
      }

      if (!this.columnsToRemove) {
        this.errorMessage = 'Veuillez renseigner les colonnes à supprimer.';
        this.notification = null; 
        this.isLoading = false; // Arrêter de charger
        return;
      }

      const columnsToRemoveArray = this.parseColumns(this.columnsToRemove);

      if (columnsToRemoveArray.length === 0) {
        this.errorMessage = 'Aucune colonne valide trouvée.';
        this.notification = null; 
        this.isLoading = false; // Arrêter de charger
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('columns_to_remove', JSON.stringify(columnsToRemoveArray));

      try {
        await axios.get('https://ec8e16753dc294db0c9987ecfc82a2bb.serveo.net/', {
          withCredentials: true
        });

        const response = await axios.post('https://ec8e16753dc294db0c9987ecfc82a2bb.serveo.net/remove_columns', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        const taskId = response.data.task_id;

        const interval = setInterval(async () => {
          try {
            const statusResponse = await axios.get(`https://ec8e16753dc294db0c9987ecfc82a2bb.serveo.net/task_status/${taskId}`, {
              withCredentials: true, 
            });
            const status = statusResponse.data;

            if (status.state === 'SUCCESS') {
              clearInterval(interval);
              this.downloadUrl = `https://ec8e16753dc294db0c9987ecfc82a2bb.serveo.net/download_clean_csv/${taskId}`;
              this.taskStatus = 'Traitement terminé avec succès.';
              this.notification = null; 
              this.isLoading = false; // Arrêter de charger
            } else if (status.state === 'FAILURE') {
              clearInterval(interval);
              this.taskStatus = 'Erreur lors du traitement du fichier.';
              this.errorMessage = `Erreur: ${status.status}`; 
              this.notification = null; 
              this.isLoading = false; // Arrêter de charger
            } else {
              //this.taskStatus = status.status;
              this.notification = null;
            }
          } catch (error) {
            clearInterval(interval);
            this.taskStatus = 'Erreur lors de la vérification de l\'état de la tâche.';
            this.errorMessage = 'Erreur lors de la vérification de l\'état de la tâche. Veuillez réessayer.';
            this.notification = null; 
            this.isLoading = false; // Arrêter de charger
          }
        }, 2000); 

      } catch (error) {
        console.error('Details:', error);

        const statusCode = error.response ? error.response.status : 'Inconnu';
        const statusText = error.response ? error.response.statusText : 'Erreur inconnue';
        const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;

        this.errorMessage = `Erreur ${statusCode} (${statusText}): ${errorMessage || 'Veuillez réessayer.'}`;
        this.notification = null; 
        this.isLoading = false; // Arrêter de charger
      }
    },
    parseColumns(input) {
      const cleanInput = input.replace(/\s+/g, ' ').trim(); 
      const replacedInput = cleanInput.replace(/ et /g, '/');
      const columnsArray = replacedInput.split(/[\s,/,]+/).filter(col => col.trim() !== '');
      return columnsArray;
    }
  }
};
</script>
