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
          <h6 class="subtitle-text" style="color:black;">Dites au revoir aux doublons dans vos fichiers</h6>
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
          <!-- Zone de sélection de fichier -->
          <h6>
            <a href="/clean-duplicatekey" @click="reloadPage" style="margin-left: 520px; text-decoration: none;color:rgba(62, 77, 207, 0.884);" class="subtitle-text"><i class="fas fa-undo"></i> <!-- Icône de retour --></a>
          </h6>
          <div class="file-input-container text-center">
            <input
              type="file"
              id="file-input"
              @change="handleFile"
              class="file-input"
            />
            <label for="file-input" class="file-label">
              <span>
                <i class="fas fa-upload"></i> Choisir un fichier
              </span>
            </label>
          </div>

          <!-- Prévisualisation du fichier sélectionné -->
          <div v-if="file" class="file-preview mt-4">
            <h3>Fichier sélectionné:</h3>
            <ul class="list-unstyled">
              <li><i class="fas fa-file-alt"></i> {{ file.name }}</li>
            </ul>
            <!--<input 
              v-model="commonColumn" 
              type="text" 
              placeholder="Nom de la colonne commune" 
              class="form-control mt-3" />  Utilisation de la classe Bootstrap pour le champ de saisie -->
            <div class="url-column-container mt-3">
              <select v-model="commonColumn" class="form-control">
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
          <p>{{ taskStatus.message }}</p>-->
          <div v-if="taskStatus" class="alert alert-info mt-3">
            <p>{{ taskStatus }}</p>
            <p>{{ taskStatus.message }}</p>
          </div>

          <!-- Lien de téléchargement -->
          <div v-if="downloadUrl" class="download-link-container mt-3">
            <a :href="downloadUrl" target="_blank" class="btn btn-success">
              Télécharger le fichier nettoyé
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
      downloadUrl: null,
      taskStatus: null,
      commonColumn: '',
      csvColumns: [], // Array to hold column names
      errorMessage: null,
      notification: null,
      isLoading: false // Nouveau état de chargement
    };
  },
  methods: {
    reloadPage(event) {
      event.preventDefault(); // Empêche le comportement par défaut de recharger automatiquement la page
      window.location.href = '/clean-duplicatekey'; // Redirige vers la nouvelle page
      window.location.reload(); // Recharge la page
    },
    handleFile(event) {
      this.file = event.target.files[0];
      this.errorMessage = null; // Clear previous error message
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
      this.errorMessage = null; // Clear previous error message
      this.notification =  null;//'Action effectuée, veuillez patienter'; // Show notification
      this.isLoading = true; // Commencer à charger

      if (!this.file) {
        this.errorMessage = 'Veuillez sélectionner un fichier.';
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

      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('common_column', this.commonColumn);

      try {
        await axios.get('https://c0a44c3a82db72b42e1f39b65877118c.serveo.net/', {
          withCredentials: true
        });
        // Envoyer le fichier au backend
        const response = await axios.post('https://c0a44c3a82db72b42e1f39b65877118c.serveo.net/clean_csv_duplicate_key', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // Inclure les cookies
        });

        const taskId = response.data.task_id;

        // Vérifiez périodiquement l'état de la tâche
        const interval = setInterval(async () => {
          try {
            const statusResponse = await axios.get(`https://c0a44c3a82db72b42e1f39b65877118c.serveo.net/task_status/${taskId}`, {
              withCredentials: true, // Inclure les cookies
            });
            const status = statusResponse.data;

            if (status.state === 'SUCCESS') {
              clearInterval(interval);
              this.downloadUrl = `https://c0a44c3a82db72b42e1f39b65877118c.serveo.net/download_clean_csv/${taskId}`;
              this.taskStatus = 'Traitement terminé avec succès.';
              this.notification = null; // Hide notification
              this.isLoading = false; // Arrêter de charger
            } else if (status.state === 'FAILURE') {
              clearInterval(interval);
              this.taskStatus = 'Erreur lors du traitement du fichier.';
              this.errorMessage = `Erreur: ${status.status}`; // Afficher le message d'erreur
              this.notification = null; // Hide notification
              this.isLoading = false; // Arrêter de charger
            } else {
              this.notification = null;
              //this.taskStatus = status.status;
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
        
        // Extraire le message d'erreur
        const statusCode = error.response ? error.response.status : 'Inconnu';
        const statusText = error.response ? error.response.statusText : 'Erreur inconnue';
        const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;

        // Construire le message d'erreur
        this.errorMessage = `Erreur ${statusCode} (${statusText}): ${errorMessage || 'Veuillez réessayer.'}`;
        this.notification = null; // Hide notification
        this.isLoading = false; // Arrêter de charger
      }
    }
  }
};
</script>
<!-- 
<style scoped>
.file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 300px;
  margin: auto;
}

.file-input-container {
  margin-bottom: 1rem;
}

.file-input {
  display: none;
}

.file-label {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.file-label:hover {
  background-color: #0056b3;
}

.file-preview {
  margin-top: 1rem;
  text-align: center;
}

.file-preview h3 {
  margin-bottom: 0.5rem;
}

.file-preview ul {
  list-style-type: none;
  padding: 0;
}

.file-preview li {
  margin: 0.5rem 0;
}

.upload-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #218838;
}

.notification {
  margin-top: 1rem;
  padding: 1rem;
  color: #28a745;
}

.error-message {
  margin-top: 1rem;
  padding: 1rem;
  color: #dc3545;
}
</style> -->
