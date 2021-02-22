import Vue from 'vue';

import ProductCard from '~/components/product/ProductCard';
import OptionsContainer from '~/components/product/OptionsContainer';
import MaskedInput from 'vue-masked-input';
import PictureInput from 'vue-picture-input';


Vue.component(ProductCard.name, ProductCard);
Vue.component(OptionsContainer.name, OptionsContainer);
Vue.component('MaskedInput', MaskedInput);
Vue.component('PictureInput', PictureInput);
