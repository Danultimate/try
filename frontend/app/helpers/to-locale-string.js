import { helper as buildHelper } from '@ember/component/helper';

export function toLocaleString(params/*, hash*/) {
  return params[0].toLocaleString();
}

export default buildHelper(toLocaleString);
