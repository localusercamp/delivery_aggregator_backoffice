export default class Entity
{
  /**
   * Создает новые экземпляры обьектов закастованные в класс.
   *
   * @param {Object|array} subject
   * @returns {Object|array}
   */
  static $adapt(subject) {
    if (subject instanceof Array) {
      const array = [];
    	for (const item of subject) array.push(new this(item));
      return array;
    }
    else if (subject instanceof Object) {
      return new this(subject);
    }
  }

  /**
   * Кастует экземпляры по ссылке
   *
   * @param {Object|array} subject
   * @returns {void}
   */
  static $adopt(subject) {
    if (subject instanceof Array) {
    	for (const item of subject) Object.setPrototypeOf(item, this.prototype);
    }
    else if (subject instanceof Object) {
      Object.setPrototypeOf(subject, this.prototype);
    }
  }


  static prop_protected() {
    return {
      ...Entity.prop_enumerable,
      ...Entity.prop_not_configurable,
      ...Entity.prop_not_writable,
    };
  }
  static prop_undeletable() {
    return {
      ...Entity.prop_enumerable,
      ...Entity.prop_not_configurable,
    };
  }
  static #prop_not_writable = () => ({ set: () => { throw new EntityHeirError('Trying to write a value into non-writable property!') } })
  static #prop_configurable = () => ({configurable: true})
  static #prop_enumerable   = () => ({enumerable: true})
  static #prop_not_configurable = () => ({configurable: false})
  static #prop_not_enumerable   = () => ({enumerable: false})
}

class EntityHeirError extends Error {
  name = 'EntityHeirError';
}
