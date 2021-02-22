import { v4 as uid } from 'uuid';

export default class Tag
{
  constructor(object)
  {
    Object.assign(this, object);
  }



  static fabric(array)
  {
    const result = [];
    for (const item of array) {
      result.push(new Tag(item));
    }
    return result;
  }
}
