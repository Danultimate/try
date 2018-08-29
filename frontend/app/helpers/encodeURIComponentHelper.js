import { helper as buildHelper } from '@ember/component/helper';

export function encodeURIComponentHelper(params/*, hash*/) {
  return encodeURIComponent(params);
}

export default buildHelper(encodeURIComponentHelper);
