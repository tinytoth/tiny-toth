TINY TOTH WHITELIST WEBSITE

Connected to the user's Google Apps Script Web App.

Form fields:
- X username
- public wallet
- comment link
- quote tweet link
- follow checkbox
- like checkbox
- comment checkbox
- quote tweet checkbox

The frontend posts URL-encoded data to the Apps Script endpoint using a
hidden iframe, avoiding browser CORS restrictions.

Google Sheet columns created by Apps Script:
Timestamp | X Username | Wallet | Comment Link | Quote Link |
Follow | Like | Comment | Quote | Status

Only public wallet addresses should be collected. Never ask for seed phrases/private keys.

If you change the Apps Script deployment URL, update SUBMIT_ENDPOINT in script.js.
