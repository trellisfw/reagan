import _ from 'lodash';
import Promise from 'bluebird';
import queryString from 'query-string'
import masklink from '@trellisfw/masklink'

export default {
  toggleShowData({ state }) {
    state.app.showData = !state.app.showData;
  },
  async processURL({ state, actions }) {
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
      //Save trellisMask, or maskedResourceURL
      state.app.trellisMask = null;
      state.app.maskedResourceURL = null;
      state.app.trellisMask = trellisMask;
      state.app.maskedResourceURL = maskedResourceURL;
      //Clear data
      state.app.original = null;
      state.app.originalVdoc = null;

      //Extract host
      const { origin, pathname } = new URL(url)
      //Set host
      actions.login.domainChange({ value: origin })
      //Auto-login (connecting via. websocket to oada)
      await actions.login.login()
      //Verify using masklink
      if (maskedResourceURL) state.app.verifyIntegrity = await masklink.verifyRemoteResource({url, token: state.oada.token});
      if (maskStr) state.app.verifyIntegrity = await masklink.verifyRemote({mask: trellisMask, token: state.oada.token});
      const verifyIntegrity = state.app.verifyIntegrity;

      try {
        let response = null;
        if (maskedResourceURL) {
          /*
            state.app.verifyIntegrity.original has the reconstructed data we want to show (full audit/coi).
            Need to get ._meta/vdoc/id to get the masked vdoc id for the data
            Then get /unmask of that vdoc to get the original vdoc
            Then get /pdf of the original vdoc
          */
          state.app.original = _.clone(verifyIntegrity.original);
          //Get the id of the masked vdoc
          /*response = await actions.oada.get(`${verifyIntegrity.original._id}/_meta/vdoc/_id`)
          if (response.error) throw response.error;
          const maskedVdocId = response.data;
          //Get the original vdoc
          response = await actions.oada.get(`${maskedVdocId}/unmask`)
          if (response.error) throw response.error;
          const originalVdoc = response.data;
          //Save the original vdoc
          state.app.originalVdoc = originalVdoc;*/

          response = await actions.oada.get(`${verifyIntegrity.original._meta._id}/vdoc`)
          if (response.error) throw response.error;
          const originalVdoc = response.data;
          //Save the original vdoc
          state.app.originalVdoc = originalVdoc;
        } else {
          /*
            state.app.verifyIntegrity.original contains just the data we want to show in the modal (subset of audit/coi)
            Need to use resource id from url which points to the original audit/coi to get the original's data (original)
            Then get the vdoc of the original
          */
          //Extract the resourceId from the url given in the query parameter
          const match = pathname.match(/(\/resources\/[^\/]*)\/?(.*)/i);
          let resourceId = null;
          let resourcePath = null; //Path inside the resource
          if (match) {
            resourceId = match[1];
            if (match[2].length > 0) resourcePath = match[2];
          }
          state.app.resourcePath = resourcePath; //Not sure why we need this
          //Get the original (coi/audit unmasked) (not the subset `resourcePath`)
          response = await actions.oada.get(`${resourceId}`)
          if (response.error) throw response.error
          state.app.original = response.data
          /*//Get the vdoc of the original audit/coi
          response = await actions.oada.get(`${resourceId}/_meta/vdoc/_id`)
          if (response.error) throw response.error
          const originalVdocId = response.data
          //Get the original vdoc
          response = await actions.oada.get(`${originalVdocId}`)
          if (response.error) throw response.error
          const originalVdoc = response.data
          //Save the original vdoc
          state.app.originalVdoc = originalVdoc;*/
          
          //Get originals's meta's vdoc
          response = await actions.oada.get(`${state.app.original._meta._id}/vdoc`)
          if (response.error) throw response.error;
          const originalVdoc = response.data;
          //Save the original vdoc
          state.app.originalVdoc = originalVdoc;
        }
        //Open Verified Modal if there is a resourcePath
        if (state.app.resourcePath) state.view.Modals.VerifiedModal.open = true;
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
