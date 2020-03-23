import _ from 'lodash';
import Promise from 'bluebird';
import queryString from 'query-string'
//import masklink from '@trellisfw/masklink'

export default {
  async processURL({ state, actions }) {
    console.log("HERE")
    // Populate domain from url if there is one
    // Parse query parameters
    const { 'trellis-mask': maskStr, 'masked-resource-url': maskedResourceURL } = queryString.parse(window.location.search)
    const trellisMask = JSON.parse((Array.isArray(maskStr) ? maskStr[0] : maskStr) || '{}');

    let url = null;
    if (maskedResourceURL) {
      url = maskedResourceURL;
    } else if (trellisMask && trellisMask.url) {
      url = trellisMask.url;
    }

    if (url) {
      //Save trellisMask
      state.app.trellisMask = trellisMask;
      state.app.maskedResourceURL = maskedResourceURL;

      //Extract host
      const { origin, pathname } = new URL(url)
      //Set host
      actions.login.domainChange({ value: origin })
      //Auto-login (connecting via. websocket to oada)
      await actions.login.login()

      //If maskedResourceURL verify using library
      //if (maskedResourceURL) state.app.maskedResourceURLVerify = await verifyRemoteResource({url, token: state.oada.token});

      try {
        //Get the original data that the link points to (this could be full audit, just the location, etc.)
        //This is the data that will be displayed in the modal (unless it is a full audit or coi)
        let response = await actions.oada.get(pathname)
        if (response.error) throw response.error;
        state.app.original = response.data;

        //Extract the resource id and internal path from the url given
        const match = pathname.match(/(\/resources\/[^\/]*)\/?(.*)/i);
        let resourceId = null;
        let resourcePath = null; //Path inside the resource
        if (match) {
          resourceId = match[1];
          if (match[2].length > 0) resourcePath = match[2];
        }
        state.app.resourcePath = resourcePath;
        //Get the original resource (if haven't already)
        let originalResource = null;
        if (resourcePath == null) {
          state.app.originalResource = _.clone(state.app.original);
        } else {
          const {error: err, data} = await actions.oada.get(`${resourceId}`)
          if (err) throw err;
          state.app.originalResource = data;
        }
        //Get the _meta/vdoc/_id from the original resource so we can use it to get the pdf
        response = await actions.oada.get(`${resourceId}/_meta/vdoc/_id`)
        if (response.error) throw response.error;
        state.app.documentId = response.data;

        //Get the vdoc
        response = await actions.oada.get(state.app.documentId)
        if (response.error) throw response.error;
        state.app.document = response.data;

        //Open Verified Modal if there is a path
        if (resourcePath) state.view.Modals.VerifiedModal.open = true;

      } catch (err) {
        if (!err.response) throw err; //Unknown error
        if (_.get(err, 'response.status') == 403) {
          state.app.errorMessage = "You do not have access to the original data.";
        } else if (_.get(err, 'response.status') == 404) {
          state.app.errorMessage = "The original no longer exists at this location.";
        } else {
          state.app.errorMessage = "Opps! A unknown error occured.";
        }
        state.app.error = true;
      }
    } else {
      state.app.errorMessage = "Oops! A valid link must be provided to application."
      state.app.error = true;
    }
    state.app.finished = true;
  }
}
