# Reagan

Reagan is the UI for performing validation for a Mask&Link document or trellis-mask.  Refer to [https://github.com/trellisfw/trellisfw-masklink] for details on the Mask&Link process.

Reagan accepts 2 query parameters: `trellis-mask` and `masked-resource-url`.  If you have a masked object only (not a resource containing one or more masks), then you pass that (urlencoded) as the `trellis-mask` query parameter:
```
https://trellisfw.github.io/reagan?trellis-mask={ ... Contents of your mask object ... }
```
Reagan will attempt to login at the URL found in the mask, and if successful, it will validate the object and show you it's original unmasked contents.

If you want to verify an entire signed resource containing one or more masks, you need to pass the remote URL for the resource to Reagan:
```
https://trellisfw.github.io/reagan?masked-resource-url=https://your.trellis.domain/path/to/the/resource
```
Reagan will initate a login session with that domain and then validate the signatures as it reconstructs the masked document.  


## Build and run locally:
```bash
yarn
yarn run start
```
