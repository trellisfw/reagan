import { hashJSON } from '@trellisfw/signatures'
import _ from 'lodash';

export default {
  showData: false,
  finished: false,
  trellisMask: null,
  maskedResourceURL: null,
  verifyIntegrity: {},
  original: null,
  originalVdoc: null,
  valid: ({ maskedResourceURL, trellisMask, verifyIntegrity }, state) => {
    if (maskedResourceURL) {
      if (verifyIntegrity.match && verifyIntegrity.unchanged) return true;
    } else {
      if (verifyIntegrity.match == true) return true;
    }
    return false;
  }
}
