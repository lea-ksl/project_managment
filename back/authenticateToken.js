const admin = require('firebase-admin');
require('dotenv').config();


admin.initializeApp({
  credential: admin.credential.cert({
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key:
    process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});
module.exports = admin;

async function decodeIDToken(req, res, next) {
  const header = req.headers.authorization;
  if (header != 'Bearer null' && 
  req.headers.authorization.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      const decodedToken= await admin.auth().verifyIdToken(idToken);
      req['currentUser']= decodeIDToken;
    }catch (e) {
      console.log(e);
    }
  }
  next();
}

module.exports = decodeIDToken;