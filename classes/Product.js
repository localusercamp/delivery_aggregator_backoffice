export default class Product
{
  /**
   * Преобразует массив объектов к массиву объектов класса `Product`
   * @param array массив объектов, которые будут преобразованы к классу `Product`
   * @returns массив обьектов класса `Product`
   */
  static cast(array) {
    for (const item of array) {
      Object.setPrototypeOf(item, Product.prototype);
    }
  }

  /**
   * Преобразует объект к объекту класса `Product`
   * @param object объект, который будет преобразован к классу `Product`
   * @returns обьект класса `Product`
   */
  static cast(object) {
    Object.setPrototypeOf(object, Product.prototype);
  }
}
