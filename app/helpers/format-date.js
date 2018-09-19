import { helper } from '@ember/component/helper';
import moment from 'moment';

export function formatDate(params/*, hash*/) {
  if (params[0]) {
        return moment(params[0]).format(params[1]);
    }
}

export default helper(formatDate);
