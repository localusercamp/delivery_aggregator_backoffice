export default class Entity
{
  /**
   * Создает новые экземпляры обьектов закастованные в класс.
   *
   * @param {object|array} subject
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

  static $adopt(subject) {
    if (subject instanceof Array) {
    	for (const item of subject) Object.setPrototypeOf(item, this.prototype);
    }
    else if (subject instanceof Object) {
      Object.setPrototypeOf(subject, this.prototype);
    }
  }
}
