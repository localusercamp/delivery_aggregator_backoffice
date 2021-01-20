import { v4 as uid } from 'uuid';
import IterativeOption from '~/classes/product/IterativeOption';

export default class Product
{
  static CLASS_FROM_TYPE = new Map([
    ['IterativeProductOption', IterativeOption.prototype],
    // ['SelectiveProductOption', 'SelectiveOption'],
    // ['SwitchableProductOption', 'SwitchableOption'],
  ]);

  static TYPE_FROM_ID = new Map([
    [1, 'IterativeProductOption'],
    [2, 'SelectiveProductOption'],
    [3, 'SwitchableProductOption'],
  ]);

  constructor(object)
  {
    Object.assign(this, object);
    this.handleOptions();
    this.assignProductUUID();
    this.assignOptionsUUID();
    this.assignOptionsTypes();
    this.assignOptionsClasses();
  }



  handleOptions() {
    if (typeof this.options === 'string') {
      this.options = JSON.parse(this.options);
    }
  }

  assignOptionsUUID() {
    for (const option of this.options) {
      option.uid = uid();
    }
  }

  assignProductUUID() {
    this.uid = this.uid ?? uid();
  }
  reassignProductUUID() {
    this.uid = uid();
  }

  assignOptionsTypes() {
    for (const option of this.options) {
      option.type = Product.TYPE_FROM_ID.get(option.type_id);
    }
  }

  assignOptionsClasses() {
    for (const option of this.options) {
      Object.setPrototypeOf(option, Product.CLASS_FROM_TYPE.get(option.type));
    }
  }



  static fabric(array)
  {
    const result = [];
    for (const item of array) {
      result.push(new Product(item));
    }
    return result;
  }
}
