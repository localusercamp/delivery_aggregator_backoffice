export default class IterativeOption
{
  static hide_attributes = [
    'type',
    'uid',
  ];

  decrement() {
    if (this.value > this.min)
      this.value--;
  }

  increment() {
    if (this.value < this.max)
      this.value++;
  }

}
