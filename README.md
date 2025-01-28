# Hybrid App Starter

A starter project for creating a Webflow Hybrid App that demonstrates OAuth authentication from the Webflow UI and basic Data and Designer API interactions. This project provides a simple example of how to:

- Set up a Webflow Data Client server
- Set up a Webflow Designer Extension frontend
- Implement OAuth 2.0 authentication from the Webflow UI
- <a href="https://developers.webflow.com/designer/reference/introduction" target="_blank">Make Designer API calls in Webflow</a>
  - Get Selected Element
  - Get Styles
  - Create a new DOM Element
  - Set DOM Element Tag
  - Set Custom Attributes
- <a href="https://developers.webflow.com/data/reference/rest-introduction" target="_blank">Make authenticated Data API calls from the Designer Extension</a> including:
  - List Sites
  - Register and Apply Custom Code

## 🚀 Quick start

1. Create a Webflow site if you haven't already at <a href="https://webflow.com" target="_blank">webflow.com</a>

2. Create a free ngrok account if you don't have one at <a href="https://ngrok.com" target="_blank">ngrok.com</a> - you'll need this to create a tunnel for local development

3. Register your app in <a href="https://developers.webflow.com/v2.0.0/data/docs/register-an-app" target="_blank">Webflow's Developer Portal</a> Be sure to add a redirect URI to `localhost:3000/api/callback` and the required scopes:

   - `sites:read` `sites:write`
   - `custom_code:read` `custom_code:write`

4. Clone this repository

5. In the `/data-client` folder, copy `.env.example` to `.env` and add your credentials which you can find in the details of your app in the App Development section of the Integrations tab of your Webflow Dashboard:

   ```env
   WEBFLOW_CLIENT_ID=xxx
   WEBFLOW_CLIENT_SECRET=xxx
   DESIGNER_EXTENSION_URI=xxx
   NGROK_AUTH_TOKEN=XXX - find this in the <a href="https://dashboard.ngrok.com/get-started/your-authtoken" target="_blank">ngrok dashboard</a>
   PORT=3000
   ```

6. Install dependencies and run the Data Client and Designer Extension together as a Hybrid App:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   7. Install your app by going to your Webflow Dashboard > Integrations tab and clicking the "Install" button next to your app

7. Open your Webflow Site. Open the Apps panel and click on your App. When the panel opens click the "Launch Development App" button

## 🛠️ Tech Stack

- Data Client:
  - **<a href="https://github.com/webflow/js-webflow-api" target="_blank">Webflow SDK</a>** - Official Webflow API client
- Designer Extension:
  - **<a href="https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=readme" target="_blank">Webflow Designer API</a>** - Official Webflow Designer API client
  - **<a href="https://vitejs.dev/" target="_blank">Vite</a>** - Build tool for modern web development
  - **<a href="https://github.com/auth0/jwt-decode" target="_blank">JWT-Decode</a>** - Decode JWT tokens
  - **<a href="https://reactjs.org/" target="_blank">React</a>** - JavaScript library for building user interfaces

## 📝 Important Notes

- This is a **development-only** example and should not be used in production
- The database is cleared when the server stops (see `cleanup` function)
- Access tokens are stored unencrypted - in production, you should:
  - Encrypt sensitive data
  - Use a proper database
  - Implement token refresh
  - Add error handling
  - Add user sessions

## 🔍 Project Structure

```
.
├── data-client/
│   ├── app/            # Data Client server
│   │   ├── api/       # API Routes for interacting with the Data API
│   │   └── db/        # Database for storing Site information and authorization tokens
│   ├── .env.example   # Environment variables template
│   └── package.json
├── designer-extension/
│ ├── src/ # Designer Extension frontend
│ │   ├── /components # UI Components
      / hooks
         - useAuth
         - useDevTools
│ │   ├── app.tsx # Main UI
│ ├── .env.development # Environment variables template
│ └── package.json
├── .env.example # Environment variables template
└── package.json
```

## 📚 Additional Resources

- <a href="https://developers.webflow.com/v2.0.0/data/docs/getting-started-data-clients" target="_blank">Webflow Data Client Documentation</a>
- <a href="https://developers.webflow.com/v2.0.0/data/docs/oauth" target="_blank">OAuth 2.0 Implementation Guide</a>
- <a href="https://developers.webflow.com/v2.0.0/data/reference/scopes" target="_blank">Available API Scopes</a>

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is MIT licensed.
