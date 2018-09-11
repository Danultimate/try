import { helper } from '@ember/component/helper';

export function toDayMonth(params/*, hash*/) {
  return params[0].getDay()+'/'+params[0].getMonth();
}

export default helper(toDayMonth);
