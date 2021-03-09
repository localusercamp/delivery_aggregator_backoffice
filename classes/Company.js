import IRelationable from '~/classes/IRelationable'
import Status from './Status'
import User from './User'

export default class Company extends IRelationable
{
  constructor(company)
  {
    super(company, Company.relations);
  }

  static relations = {
    // owner: User
  };

  get isApproved() {
    return this.status_id === Status.APPROVED;
  }
}
