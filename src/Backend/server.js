const express = require('express');
const session = require('express-session');
const { google } = require('googleapis');
const path = require('path');


const OAuth2Data = require('./credentials.json');

const app = express();
const PORT = 5000;


const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);


const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];


app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));


app.use(express.static(path.join(__dirname, 'client/build')));

// OAuth login route
app.get('/login', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    res.redirect(authUrl);
});

// OAuth callback route
app.get('/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        req.session.tokens = tokens;
        res.redirect('/gmail');
    } catch (error) {
        console.error('Error during OAuth2 callback:', error);
        res.status(500).send('Authentication failed.');
    }
});

// get gmail data
app.get('/gmail', async (req, res) => {
    if (!req.session.tokens) {
        return res.redirect('/login');
    }

    oAuth2Client.setCredentials(req.session.tokens);

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    try {
        // list messages from gmail
        const response = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 10,
        });

        if (response.data.messages) {
            const firstMessage = response.data.messages[0];
            const message = await gmail.users.messages.get({
                userId: 'me',
                id: firstMessage.id,
            });
            res.json(message.data);
        } else {
            res.json({ message: 'No messages found' });
        }
    } catch (error) {
        console.error('Error fetching Gmail data:', error);
        res.status(500).send('Failed to fetch Gmail data.');
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
