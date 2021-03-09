<template>
  <div class="page-tpl">
    <div class="page-heading">
      <h1 class="page-title">Заявка на создание организации</h1>
    </div>

    <div class="page-content">
      <template v-if="!user.company">
        <div class="row mb-8">
          <div class="col-xs-8">
            <el-input v-model="inn_search" :controls="false" :maxlength="12"/>
          </div>
          <div class="col-xs-4">
            <el-button @click="getCompaniesByInn()" :disabled="inn_search.length < 10" type="primary" class="w-100pr">
              Найти организацию по ИНН
            </el-button>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-3">
            <div class="form-group">
              <label class="required">Наименование организации</label>
              <el-input v-model="company.title"/>
            </div>
          </div>
          <div class="col-xs-3">
            <div class="form-group">
              <label class="required">Тип организации</label>
              <el-select v-model="company.type_id" placeholder="Выберите тип">
                <el-option v-for="(type, i) in company_type_list"
                  :key="'company_type_' + i"
                  :label="type.title"
                  :value="type.id"
                />
              </el-select>
            </div>
          </div>
          <div class="col-xs-3">
            <div class="form-group">
              <label class="required">Муниципальное образование</label>
              <el-select v-model="company.territory_id" placeholder="Выберите муниципалитет">
                <el-option v-for="(territory, i) in territory_list"
                  :key="'territory_' + i"
                  :label="territory.title"
                  :value="territory.id"
                />
              </el-select>
            </div>
          </div>
          <div class="col-xs-3">
            <div class="form-group">
              <label class="required">Юридический адрес</label>
              <el-input v-model="company.address"/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-3">
            <div class="form-group">
              <label class="required">ИНН</label>
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
              <label class="required">ФИО руководителя</label>
              <el-input v-model="company.head"/>
            </div>
          </div>
          <div class="col-xs-3">
            <div class="form-group">
              <label class="required">Должность руководителя</label>
              <el-input v-model="company.head_post"/>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <el-button @click="store()" type="success" class="w-100pr">Отправить заявку</el-button>
          </div>
        </div>
      </template>
      <template v-else-if="user.company.isReview">
        <div class="row">
          <div class="col-xs-12">Заявка на регистрацию организации обрабатывается</div>
        </div>
      </template>
    </div>


    <tm-modal :visible.sync="inn_modal_show">
      <template v-slot:body>
        <template v-if="companies.length > 0">

          <div v-for="(company, i) in companies" :key="'company_info_' + i">
            <div class="row">
              <div class="col-xs-2">
                <el-radio v-model="choosen_company_hid" :label="company.data.hid">&nbsp;</el-radio>
              </div>
              <div class="col-xs-10">
                <div>{{ company.value }}</div>
              </div>
            </div>
          </div>

        </template>

        <template v-else>
          <div>Компании с таким ИНН не найдено</div>
        </template>
      </template>

      <template v-slot:footer>
        <el-button @click="chooseCompany()" :disabled="!choosen_company_hid" type="primary" class="w-100pr">Выбрать</el-button>
      </template>
    </tm-modal>

  </div>
</template>

<script>
import {isDigits} from '~/helpers/utils';
import {syncUser} from '~/mixins/syncUser';
import {mapGetters} from 'vuex';

export default {
  mixins: [
    syncUser,
  ],

  data() {
    return {
      inn_search: '',
      companies: [],
      company: {},
      choosen_company_hid: null,
      inn_modal_show: false,
      company_type_list: null,
      territory_list: null,
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
  },

  async fetch() {
    const [{territory_list}, {company_type_list}] = await Promise.all([
      this.$axios.$get('app/territory'),
      this.$axios.$get('app/company-type'),
    ]);
    this.territory_list    = territory_list;
    this.company_type_list = company_type_list;
  },

  methods: {
    getCompaniesByInn() {
      const data = {
        inn: this.inn_search,
      };

      this.$axios.post('app/utils/get-companies-by-inn', data)
        .then((response) => {
          this.companies = response.data.companies;
          this.inn_modal_show = true;
        })
    },

    chooseCompany() {
      const company = _.find(this.companies, (company) => company.data.hid === this.choosen_company_hid);
      this.company.title = company.value;
      this.company.address = company.data.address.value;
      this.company.head = company.data.management.name;
      this.company.head_post = company.data.management.post;
      this.company.inn = company.data.inn;

      this.inn_modal_show = false;
    },

    store() {
      this.$axios.post('app/company', this.company)
        .then((response) => {
          this.syncUser();
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
