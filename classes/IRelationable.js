import Entity from '~/classes/Entity'

export default class IRelationable extends Entity
{
  constructor(object, relations)
  {
    super();
    Object.assign(this, object);
    this.loadRelations(relations);
  }

  loadRelations(relations)
  {
    for (const [name, classname] of Object.entries(relations)) {
      if (name in this) {
        this[name] = new classname(this[name]);
      }
    }
  }
}

