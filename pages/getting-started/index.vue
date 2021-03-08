<template>
  <div>
    <div class="row">
      <div class="col-xs-8">
        <el-input v-model="inn_search" :controls="false" :maxlength="12"/>
      </div>
      <div class="col-xs-4">
        <el-button @click="getCompaniesByInn()" :disabled="inn_search.length < 10" type="primary">
          Найти организацию по ИНН
        </el-button>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-3">
        <div class="form-group">
          <label>Наименование организации</label>
          <el-input v-model="company.title"/>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="form-group">
          <label>Тип организации</label>
          <el-input v-model="company.type_id"/>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="form-group">
          <label>Муниципальное образование</label>
          <el-input v-model="company.territory_title"/>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="form-group">
          <label>Юридический адрес</label>
          <el-input v-model="company.address"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-3">
        <div class="form-group">
          <label>ИНН</label>
          <el-input v-model="company.inn"/>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="form-group">
          <label>web-сайт</label>
          <el-input v-model="company.website"/>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="form-group">
          <label>ФИО руководителя</label>
          <el-input v-model="company.head"/>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="form-group">
          <label>Должность руководителя</label>
          <el-input v-model="company.head_post"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isDigits} from '~/helpers/utils';

export default {

  data() {
    return {
      inn_search: '',
      companies: [],
      company: {}
    }
  },

  methods: {
    getCompaniesByInn() {
      const data = {
        inn: this.inn_search,
      };

      this.$axios.post('utils/get-companies-by-inn', data)
        .then((response) => {
          this.companies = response.data.companies;
        })
    },



    validateInnInput(input) {
      console.log(this.inn_search, input, isDigits(input));
      this.inn_search = isDigits(input) ? input : this.inn_search ? this.inn_search : '';
    },
  },

  middleware: ['authenticated'],
}
</script>
