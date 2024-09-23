<template>
  <div class="container-fluid p-0">
    <!-- Haut de la page avec un fond violet -->
    <div class="row custom-bg-top justify-content-center align-items-center">
      <div class="col-md-6 text-center">
        <!-- Titre et sous-titre séparés dans leur propre div -->
        <div class="title-container">
          <br>
          <h1 class="title-text">Nettoyeur de Données</h1>
          <tr></tr>
          <h6 class="subtitle-text" style="color:black;">Vérifier l'intégrité de vos données en quelques clicks</h6>
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
          <h6>
            <a href="/validate-format" @click="reloadPage" style="margin-left: 520px; text-decoration: none;color:rgba(62, 77, 207, 0.884);" class="subtitle-text"><i class="fas fa-undo"></i> <!-- Icône de retour --></a>
          </h6>
          <div class="file-input-container text-center">
            <input type="file" id="file-input" @change="handleFile" class="file-input" />
            <label for="file-input" class="file-label">
              <span>
                <i class="fas fa-upload"></i> Choisir un fichier
              </span>
            </label>
          </div>

          <div v-if="file" class="file-preview mt-4">
            <h3>Fichier sélectionné:</h3>
            <ul class="list-unstyled">
              <li><i class="fas fa-file-alt"></i> {{ file.name }}</li>
            </ul>

            <div v-for="(rule, index) in validationRules" :key="index" class="validation-rule mt-3">
              <!--<input v-model="rule.column" type="text" placeholder="Nom de la colonne" class="column-input form-control" />-->
              <div class="url-column-container mt-3">
                <select v-model="rule.column" class="form-control">
                  <option v-for="column in csvColumns" :key="column" :value="column">{{ column }}</option>
                </select>
              </div>
              <select v-model="rule.actions" class="action-select form-control" multiple>
                <option value="validate_email">Valider Email</option>
                <option value="validate_number_entier">Valider Entier</option>
                <option value="validate_number">Valider Nombre</option>
                <option value="validate_date">Valider Date</option>
                <option value="strip_spaces">Enlever caractères spéciaux</option>
                <option value="capitalize">Mettre en minuscule</option>
                <option value="fill_missing">Remplir Valeurs Manquantes</option>
              </select>
              <select v-if="rule.actions.includes('validate_date')" v-model="rule.format" class="date-format-select form-control">
                <option value="%d/%m/%Y">%d/%m/%Y</option>
                <option value="%d-%m-%Y">%d-%m-%Y</option>
                <option value="%d.%m.%Y">%d.%m.%Y</option>
                <option value="%d%m%Y">%d%m%Y</option>
                <option value="%d %m %Y">%d %m %Y</option>
                <option value="%m/%d/%Y">%m/%d/%Y</option>
                <option value="%m-%d-%Y">%m-%d-%Y</option>
                <option value="%m.%d.%Y">%m.%d.%Y</option>
                <option value="%m%d%Y">%m%d%Y</option>
                <option value="%m %d %Y">%m %d %Y</option>
                <option value="%Y/%m/%d">%Y/%m/%d</option>
                <option value="%Y-%m-%d">%Y-%m-%d</option>
                <option value="%Y.%m.%d">%Y.%m.%d</option>
                <option value="%Y%m%d">%Y%m%d</option>
                <option value="%d/%m/%y">%d/%m/%y</option>
                <option value="%d-%m-%y">%d-%m-%y</option>
                <option value="%d.%m.%y">%d.%m.%y</option>
                <option value="%d%m%y">%d%m%y</option>
                <option value="%d %m %y">%d %m %y</option>
                <option value="%m/%d/%y">%m/%d/%y</option>
                <option value="%m-%d-%y">%m-%d-%y</option>
                <option value="%m.%d.%y">%m.%d.%y</option>
                <option value="%m%d%y">%m%d%y</option>
                <option value="%m %d %y">%m %d %y</option>
                <option value="%Y/%m/%y">%Y/%m/%y</option>
                <option value="%Y-%m-%y">%Y-%m-%y</option>
                <option value="%Y.%m.%y">%Y.%m.%y</option>
                <option value="%Y%m%y">%Y%m%y</option>
                <option value="%Y-%m-%d %H:%M:%S">%Y-%m-%d %H:%M:%S</option>
                <option value="%Y-%m-%d %H:%M">%Y-%m-%d %H:%M</option>
                <option value="%d/%m/%Y %H:%M:%S">%d/%m/%Y %H:%M:%S</option>
                <option value="%d-%m-%Y %H:%M">%d-%m-%Y %H:%M</option>
                <option value="%m/%d/%Y %H:%M:%S">%m/%d/%Y %H:%M:%S</option>
                <option value="%m-%d-%Y %H:%M">%m-%d-%Y %H:%M</option>
                <option value="%Y/%m/%d %H:%M:%S">%Y/%m/%d %H:%M:%S</option>
              </select>

              <input v-if="rule.actions.includes('fill_missing')" v-model="rule.default_value" type="text" placeholder="Valeur par Défaut" class="default-value-input form-control" />
              <button @click="removeRule(index)" class="btn btn-danger mt-2">Supprimer</button>
            </div>

            <button @click="addRule" class="add-rule-button btn btn-secondary mt-3">
              <i class="fas fa-plus"></i> Ajouter une règle
            </button>
            <a class="mx-2"></a> <!-- Espacement entre les boutons -->
            <button @click="uploadFile" class="upload-button btn btn-primary mt-3">
              <i class="fas fa-paper-plane"></i> Envoyer le fichier
            </button>
          </div>
          
          <div v-if="notification" class="notification alert alert-info mt-3">
            <p>{{ notification }}</p>
          </div>
          <div v-if="isLoading" class="loading-spinner-container">
            <div class="loading-spinner"></div>
          </div>
          <div v-if="taskStatus" class="alert alert-info mt-3">
            <p>{{ taskStatus }}</p>
          </div>
          <div v-if="downloadUrl" class="download-url mt-3">
            <a :href="downloadUrl" target="_blank" class="btn btn-primary">
              <i class="fas fa-download"></i> Télécharger le fichier nettoyé
            </a>
          </div>
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
      csvColumns: [], // Array to hold column names
      validationRules: [],
      errorMessage: null,
      notification: null,
      isLoading: false // Nouveau état de chargement
    };
  },
  methods: {
    reloadPage(event) {
      event.preventDefault(); // Empêche le comportement par défaut de recharger automatiquement la page
      window.location.href = '/validate-format'; // Redirige vers la nouvelle page
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
    addRule() {
      this.validationRules.push({ column: '', actions: [], format: '', default_value: '' });
    },
    removeRule(index) {
      this.validationRules.splice(index, 1);
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

      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('validation_rules', JSON.stringify(this.validationRules));

      try {
        await axios.get('https://c0a44c3a82db72b42e1f39b65877118c.serveo.net/', {
        withCredentials: true
        });
        // Envoyer le fichier au backend
        const response = await axios.post('https://c0a44c3a82db72b42e1f39b65877118c.serveo.net/clean_and_validate_data', formData, {
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
              //this.taskStatus = status.status;
              this.notification = null;
            }
          } catch (error) {
            clearInterval(interval);
            this.taskStatus = 'Erreur lors de la vérification de l\'état de la tâche.';
            this.isLoading = false; // Arrêter de charger
            this.notification = null; // Hide notification
          }
        }, 2000); // Intervalle de vérification de 2 secondes

      } catch (error) {
        this.errorMessage = `Erreur: ${error.message}`;
        this.isLoading = false; // Arrêter de charger
        this.notification = null; // Hide notification
      }
    },
  },
};
</script>

<style scoped>
.mx-2 {
  margin: 0 10
}
</style>
<!-- 
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

.validation-rule {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  background-color: #fff;
}

.column-input, .date-format-input, .default-value-input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.action-select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-rule-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-rule-button:hover {
  background-color: #0056b3;
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
