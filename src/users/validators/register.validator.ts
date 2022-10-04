import { RegisterReq } from '../api/register.req';
import { RegisterResErrors } from '../api/register.res';

export function registerValidator(r: RegisterReq): RegisterResErrors {
  console.log(r);
  throw Error('Not implemented');
}
