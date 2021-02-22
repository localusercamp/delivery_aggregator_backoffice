import { v4 as uid } from 'uuid';
import Entity from '~/classes/Entity'

export default class Product extends Entity
{
  constructor(subject) {
    super();
    Object.assign(this, subject);
  }
}
