# Full Tilt Toys

Public website for Full Tilt Toys. Product photos and button actions can be added as they come in.

## Local

```bash
npm install
npm run dev
```

## Wholesale inquiries

The Wholesale button emails **info@fulltilttoys.com** so you can send that shop a catalog, pricing, and availability.

This uses a free [Web3Forms](https://web3forms.com) access key. FormSubmit is not used.

1. Open [web3forms.com](https://web3forms.com), enter **info@fulltilttoys.com**, and create an access key.
2. Confirm the key in that inbox (and spam) if they send a verification email.
3. In Vercel: **Settings → Environment Variables**. Add:
   - `WHOLESALE_TO_EMAIL` = `info@fulltilttoys.com`
   - `WEB3FORMS_ACCESS_KEY` = the key from step 1  
   Apply both to Production, Preview, and Development.
4. Redeploy. Send a test Wholesale form. You should get an email you can reply to.

## Publish

Click **Publish** in Cursor to put the site on Vercel. Then point the GoDaddy domain at that Vercel project:

1. In Vercel: **Settings → Domains → Add** `fulltilttoys.com` and `www.fulltilttoys.com`.
2. In GoDaddy: **DNS** for that domain. Use the A / CNAME records Vercel shows (usually `A` `@` → `10.0.1.2` and `CNAME` `www` → `cname.vercel-dns.com`).
3. Remove any old A / CNAME / forwarding records that still point at parking or an old host.
4. Wait for DNS, then open the domain. HTTPS is automatic on Vercel.

This repo includes `vercel.json` so Vercel treats the project as **Next.js**. If a deploy succeeds but every URL shows Vercel’s “This page doesn’t exist” 404, the Framework Preset was likely stuck on **Other** from when the GitHub repo was empty. Redeploy after this file is on `main`. In **Settings → Build and Deployment**, Framework Preset should be Next.js and Output Directory should be empty.

## Email list (private Google Sheet)

Subscribe writes to a Google Sheet that only you can open. Visitors never see the sheet or anyone else’s email.

Until the Sheet webhook is connected, this development server saves signups to a local file on the machine running the site (`data/subscribers.local.json`). That file is not on the public website.

### Connect your Google Sheet

This is a private **Google Sheet** (spreadsheet), not a Google Doc.

1. Sign into the Full Tilt Toys Google account and open [Google Sheets](https://sheets.google.com).
2. Create a blank spreadsheet and name it **Full Tilt Toys subscribers**.
3. From the spreadsheet, open **Extensions → Apps Script**.
4. Delete the placeholder code and paste the contents of `google-apps-script/Code.gs`. Click **Save**.
5. Click **Deploy → New deployment**. Choose type **Web app**.
   - Description: `Full Tilt Toys subscribers`
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Deploy, click **Authorize access**, choose the same Google account, and allow the script to edit this spreadsheet.
7. Copy the Web app URL (`https://script.google.com/macros/s/…/exec`). This URL is a secret. Do not put it on the website or in chat.
8. After you Publish to Vercel, add an environment variable:
   - Name: `GOOGLE_SHEETS_WEBHOOK_URL`
   - Value: that Web app URL
9. Redeploy. The first signup creates a **Subscribers** tab with columns Timestamp, First name, Last name, Email, and List.

If **Extensions → Apps Script** shows “Sorry, unable to open the file at this time”:

1. Use an incognito window and sign into only the Full Tilt Toys Google account.
2. Open [script.google.com](https://script.google.com) first and accept any terms.
3. Click **New project**, paste `google-apps-script/Code.gs`, and put the spreadsheet ID in `SPREADSHEET_ID` (the long string in the Sheet URL between `/d/` and `/edit`).
4. Save, then deploy as a Web app the same way as above.

“Anyone” on the web app only means “anyone who has the secret URL.” Keep the spreadsheet itself **Restricted** (only you). Open it from Google Drive whenever you want the list.
