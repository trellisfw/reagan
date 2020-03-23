import _ from 'lodash';
import uuid from 'uuid/v4';
import Promise from 'bluebird';
export default {
  TopBar: {
    logout({state, actions}) {
      actions.login.logout()
      actions.oada.logout();
    }
  },
  Modals: {
    VerifiedModal: {
      toggleShowData({ state }, documentKey) {
        state.view.Modals.VerifiedModal.showData = !state.view.Modals.VerifiedModal.showData;
      },
      close({state, actions}) {
        //Close my window
        state.view.Modals.VerifiedModal.open = false;
      }
    }
  }
}
