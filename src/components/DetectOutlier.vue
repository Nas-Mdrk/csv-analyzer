<template>
  <div class="container-fluid p-0">
    <div class="row custom-bg-top justify-content-center align-items-center">
      <div class="col-md-6 text-center">
        <div class="title-container">
          <br>
          <h1 class="title-text">Nettoyeur de Données</h1>
          <h6 class="subtitle-text" style="color:black;">Détectez les anomalies en un click</h6>
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
          <p class="subtitle-text">Détectez les valeurs aberrantes de vos fichiers CSV en un coup d'œil.</p>
        </div>
      </div>
    </div>

    <div class="row custom-bg-second-top justify-content-center align-items-center">
      <div class="col-md-8">
        <div class="statistics card p-4">
          <h4><label for="statisticType"> Integrité des valeurs <a href="/detect-outlier" @click="reloadPage" style="margin-left: 627px; text-decoration: none;color:rgba(62, 77, 207, 0.884);" class="subtitle-text"><i class="fas fa-undo"></i> <!-- Icône de retour --></a></label></h4>
          <h6 style="color: #dddddd;"><label for="interval">Cet outil vous oriente vers les valeurs considérées comme incohérentes pour une meilleure analyse de données </label></h6>
          <div class="form-control mt-3">
            <h5><label for="file">Choisissez un fichier</label></h5>
            <input type="file" @change="handleFileUpload" class="form-control" accept=".csv" />
          </div>

          <div class="form-control mt-3">
            <h5><label for="column">Colonne à analyser</label></h5>
            <select v-model="selectedColumn" class="form-control" placeholder="Choisir une colonne">
              <option v-for="col in columns" :key="col" :value="col">{{ col }}</option>
            </select>
          </div>


          <div class="form-group">
            <button @click="detectOutliers(true)" class="upload-button btn btn-custom mt-3">Valeur entière</button>
            <a class="mx-2"></a> <!-- Espacement entre les boutons -->
            <button @click="detectOutliers(false)" class="upload-button btn btn-custom mt-3">Quantité et montant</button>
          </div>

          <div v-if="loading" class="text-center"></div>

          <div v-if="outliers && outliers.length > 0" class="mt-4">
            <h1>Valeurs aberrantes détectées :</h1>
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Index</th>
                  <th v-for="(value, key) in outliers[0]" :key="key">{{ key }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(outlier, index) in outliers" :key="index">
                  <td>{{ index }}</td>
                  <td v-for="(value, key) in outlier" :key="key">{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>

          <div v-if="notification" class="notification alert alert-info mt-3">
            <p>{{ notification }}</p>
          </div>
          <div v-if="isLoading" class="loading-spinner-container">
            <div class="loading-spinner"></div>
          </div>
          <div v-if="taskStatus" class="alert alert-info mt-3">
            <p>{{ taskStatus }}</p>
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
      selectedColumn: '',
      columns: [], // Liste des colonnes à remplir après le téléchargement du fichier
      outliers: [], // Liste des valeurs aberrantes détectées
      loading: false, // État de chargement pour le bouton
      errorMessage: '', // Message d'erreur
      selectedFile: null, // Fichier sélectionné
      taskStatus: null,
      notification: null,
      isLoading: false,
      ageCheck: false // État de la case à cocher pour vérifier l'âge
    };
  },
  methods: {
    reloadPage(event) {
      event.preventDefault(); // Empêche le comportement par défaut de recharger automatiquement la page
      window.location.href = '/detect-outlier'; // Redirige vers la nouvelle page
      window.location.reload(); // Recharge la page
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file; 
        this.readFile(file);
        this.taskStatus = null;
      }
    },
    readFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        // Logique pour extraire les colonnes
        this.extractColumns(content);
      };
      reader.readAsText(file);
    },
    extractColumns(content) {
      // Extraction des colonnes depuis le contenu CSV
      const rows = content.split('\n').map(row => row.split(','));
      this.columns = rows[0]; // Les colonnes sont dans la première ligne
    },
    async detectOutliers(useAgeCheck) {
      console.log("detectOutliers called with useAgeCheck:", useAgeCheck);
      this.loading = true;
      this.outliers = []; // Réinitialiser la liste des valeurs aberrantes
      this.errorMessage = '';
      this.isLoading = true; // Commencer à charger

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('column', this.selectedColumn);
      formData.append('age_check', useAgeCheck); // Ajouter le paramètre age_check

      try {
        // Vérifiez la connexion au backend
        await axios.get('http://back-csv-analyzer-production.up.railway.app/', {
                withCredentials: true
        });
        const response = await axios.post('http://back-csv-analyzer-production.up.railway.app/detect_outliers', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }, 
                withCredentials: true // Inclure les cookies
        });
        const taskId = response.data.task_id;

        // Vérifiez le résultat de la tâche
        this.checkTaskResult(taskId);
      } catch (error) {
        this.errorMessage = 'Erreur lors de l\'envoi du fichier. Assurez-vous que le serveur fonctionne.';
        this.isLoading = false; // Arrêter de charger
      }
    },
    async checkTaskResult(taskId) {
      try {
        const response = await axios.get(`http://back-csv-analyzer-production.up.railway.app/task_result_outlier/${taskId}`, {
          withCredentials: true, // Inclure les cookies
        });
        this.taskStatus = null;
        if (response.data.state === 'SUCCESS') {
          // Traitement des résultats pour extraire les détails
          const results = response.data.result?.outliers; // Accéder à la liste 'outliers'
          
          this.taskStatus = 'Traitement terminé avec succès.';
          this.notification = null; 
          this.isLoading = false; // Arrêter de charger

          if (Array.isArray(results) && results.length > 0) {
            this.outliers = results;
          } else {
            this.taskStatus = 'Aucune valeur aberrante détectée.';
            this.isLoading = false; // Arrêter de charger
          }

        } else if (response.data.state === 'FAILURE') {
          this.errorMessage = 'Erreur lors de la détection des valeurs aberrantes.';
          this.taskStatus = 'Erreur lors du traitement du fichier.';
          this.notification = null;
          this.isLoading = false; // Arrêter de charger

        } else {
          // Rappeler après un certain temps si la tâche n'est pas encore terminée
          //this.taskStatus = 'Veuillez Patientez un instant';
          this.notification = null;
          setTimeout(() => this.checkTaskResult(taskId), 1000);
        }
      } catch (error) {
        this.taskStatus = null;
        this.isLoading = false; // Arrêter de charger
        this.errorMessage = 'Erreur lors de la vérification du résultat de la tâche.';
      } finally {
        this.loading = false;
      }
    }

  }
};
</script>

<style scoped>
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
