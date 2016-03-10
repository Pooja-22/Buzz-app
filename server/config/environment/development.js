'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/buzzapp-dev'
  },

  seedDB: true,

  cloudinary: {
    cloud_name: 'dvjreg89n',
    api_key: '716441716735592',
    api_secret: 'aE4cAdSa5GF9Vfgx9xvlUGUTU4E'

  },

  mailgun: {
    apiKey: 'key-18c0711b269f498bdaee17f9cfe2169f',
    domain: 'sandboxb331511e994e4747bc8c9e3b7c232d57.mailgun.org'
  }
};
