const siteMetadata = {
  name: 'Gatsby Strict Starter',
  description:
    'Demo for a Gatsby starter with strict linting and auto-formatting rules.',
};

require('dotenv').config();

const buildCredentials = ({
  SPREADSHEET_ID,
  PROJECT_ID,
  PRIVATE_KEY,
  PRIVATE_KEY_ID,
  CLIENT_EMAIL,
  CLIENT_ID,
}) => ({
  spreadsheetId: SPREADSHEET_ID,
  credentials: {
    type: 'service_account',
    project_id: PROJECT_ID || project.id,
    private_key_id: PRIVATE_KEY_ID || project.keyId,
    private_key: (PRIVATE_KEY || project.key).replace(/(\\r)|(\\n)/g, '\n'),
    client_email: CLIENT_EMAIL || project.email,
    client_id: CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(
      CLIENT_EMAIL || project.email
    )}`,
  },
});

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-chakra-ui',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        ...siteMetadata,
        display: 'minimal-ui',
        theme_color: '#663399',
        background_color: 'white',
        icon: 'src/assets/favicon.png',
        lang: 'en-US',
        start_url: '/',
      },
    },
    {
      resolve: 'gatsby-source-google-spreadsheets',
      options: buildCredentials(process.env),
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
  ],
};
