import { hashJSON } from '@trellisfw/signatures'
import _ from 'lodash';

export default {
  showData: false,
  finished: false,
  trellisMask: null,
  original: null,
  maskedResourceURL: null,
  maskedResourceURLVerify: null,
  originalHash: ({ original }, state) => {
    if (!original) return;
    return hashJSON(original).hash
  },
  valid: ({ originalHash, trellisMask, maskedResourceURLVerify }, state) => {
    if (maskedResourceURLVerify) {
      if (maskedResourceURLVerify.match && maskedResourceURLVerify.unchanged) return true;
    } else {
      const urlHash = _.get(trellisMask, 'hashinfo.hash');
      if (originalHash && urlHash && originalHash == urlHash) {
        return true;
      }
    }
    return false;
  }
}
