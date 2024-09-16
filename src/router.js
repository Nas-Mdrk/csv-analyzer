import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import FileUpload from './components/FileUpload.vue';
import CleanTwoCsv from './components/CleanTwoCsv.vue';
import ManipulateTwoCsv from './components/ManipulateTwoCsv.vue';
import CleanDuplicateKey from './components/CleanDuplicateKey.vue';
import RemoveColumns from './components/RemoveColumns.vue';
import ValidateFormat from './components/ValidateFormat.vue';
import AddColumnFormula from './components/AddColumnFormula.vue';
import ValidateUrl from './components/ValidateUrl.vue';
import StatistiqueAll from './components/StatistiqueAll.vue';
import StatistiqueCourbe from './components/StatistiqueCourbe.vue';
import StatistiqueIndividuel from './components/StatistiqueIndividuel.vue';
import StatistiqueDetail from './components/StatistiqueDetail.vue';
import DetectOutlier from './components/DetectOutlier.vue';
import CompareCsv from './components/CompareCsv.vue';
import CourbeVue from './components/CourbeVue.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/file-upload',
      name: 'FileUpload',
      component: FileUpload
    },
    {
      path: '/clean-twocsv',
      name: 'CleanTwoCsv',
      component: CleanTwoCsv
    },
    {
      path: '/manipulate-twocsv',
      name: 'ManipulateTwoCsv',
      component: ManipulateTwoCsv
    },
    {
      path: '/clean-duplicatekey',
      name: 'CleanDuplicateKey',
      component: CleanDuplicateKey
    },
    {
      path: '/remove-columns',
      name: 'RemoveColumns',
      component: RemoveColumns
    },
    {
      path: '/validate-format',
      name: 'ValidateFormat',
      component: ValidateFormat
    },
    {
      path: '/add-columnformula',
      name: 'AddColumnFormula',
      component: AddColumnFormula
    },
    {
      path: '/validate-url',
      name: 'ValidateUrl',
      component: ValidateUrl
    },
    {
      path: '/statistique-all',
      name: 'StatistiqueAll',
      component: StatistiqueAll
    },
    {
      path: '/statistique-courbe',
      name: 'StatistiqueCourbe',
      component: StatistiqueCourbe
    },
    {
      path: '/statistique-individuel',
      name: 'StatistiqueIndividuel',
      component: StatistiqueIndividuel
    },
    {
      path: '/statistique-detail',
      name: 'StatistiqueDetail',
      component: StatistiqueDetail
    },
    {
      path: '/detect-outlier',
      name: 'DetectOutlier',
      component: DetectOutlier
    },
    {
      path: '/compare-csv',
      name: 'CompareCsv',
      component: CompareCsv
    },
    {
      path: '/courbe-vue',
      name: 'CourbeVue',
      component: CourbeVue
    }
  ]
});
