import { hashJSON } from '@trellisfw/signatures'
import _ from 'lodash';

export default {
  finished: false,
  trellisMask: null,
  original: null,
  maskedResourceURL: null,
  originalHash: ({ original }, state) => {
    if (!original) return;
    return hashJSON(original).hash
  },
  valid: ({ originalHash, trellisMask }, state) => {
    const urlHash = _.get(trellisMask, 'hashinfo.hash');
    if (originalHash && urlHash && originalHash == urlHash) {
      return true;
    }
    return false;
  }
}
