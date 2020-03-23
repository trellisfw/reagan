import _ from 'lodash'

export default {
  Pages: {
    selectedPage: 'Data',
    Data: {
      search: '',
      openFileBrowser: false,
      uploading: {}
    }
  },
  Modals: {
    VerifiedModal: {
      open: false,
      showData: false,
      data: ({}, state) => {
        return state.app.original
      },
      path: ({}, state) => {
        return state.app.resourcePath
      },
      type:  ({}, state) => {
        const type = _.get(state, 'app.originalResource._type');
        if (type == "application/vnd.trellisfw.audit.sqfi.1+json") return "audit";
        if (type == "application/vnd.trellisfw.coi.accord+json") return "coi";
      }
    }
  }
}
