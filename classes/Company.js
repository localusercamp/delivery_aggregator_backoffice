import Entity from '~/classes/Entity'

export default class Company extends Entity
{
  constructor(company)
  {
    super();
    Object.assign(this, company);
  }
}
