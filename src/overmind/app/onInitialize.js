import packagejson from '../../../package.json';

export default async function ({ state, actions, effects }) {
  console.log('Started app')
  // Add the package.json version to the title
  if (packagejson && packagejson.version) {
    document.title = document.title + ' - v'+packagejson.version;
  }
  await actions.app.processURL();
}
