import _ from 'lodash';

const config = {
  oada: {
    url: 'https://stage.smithfield.trellis.one',
    devcert: require('./dev-cert/signed_software_statement'), // Don't use this public one in production unless implicit flow is OK for you
    redirect: require('./dev-cert/unsigned_software_statement').redirect_uris[process.env.NODE_ENV === 'production' ? 1 : 0], // 0 is localhost:3000, 1 is trellisfw.github.io/conductor
  }
};

export default config;
