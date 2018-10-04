import { helper } from '@ember/component/helper';

export function openNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

export default helper(openNewTab);
