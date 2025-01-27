# Hybrid App Starter

A starter project for creating a Webflow Hybrid App that demonstrates OAuth authentication from the Webflow UI and basic Data and Designer API interactions. This project provides a simple example of how to:

- Set up a Webflow Data Client server
- Set up a Webflow Designer Extension frontend
- Implement OAuth 2.0 authentication from the Webflow UI
- Make Designer API calls in Webflow
  - Get Selected Element
  - Get Styles
  - Create a new DOM Element
  - Set DOM Element Tag
  - Set Custom Attributes
- Make authenticated Data API calls from the Designer Extension including:
  - List Sites
  - Register and Apply Custom Code

## 🚀 Quick start

1. Register your app in [Webflow's Developer Portal](https://developers.webflow.com/v2.0.0/data/docs/register-an-app) Be sure to add a redirect URI to `localhost:3000/api/callback` and the required scopes:
   - `sites:read`
   - `sites:write`
   - `custom_code:read`
   - `custom_code:write`
2. Clone this repository
3. In the `/data-client` folder, copy `.env.example` to `.env` and add your credentials which you can find in the details of your app in the App Development section of the Integrations tab of your Webflow Dashboard:

   ```env
   WEBFLOW_CLIENT_ID=xxx
   WEBFLOW_CLIENT_SECRET=xxx
   DESIGNER_EXTENSION_URI=xxx
   NGROK_AUTH_TOKEN=XXX - find this in the [ngrok dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)
   PORT=3000
   ```

4. Install dependencies and run the Data Client and Designer Extension togther as a Hybrid App:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your Webflow Site. Open the Apps panel and click on your App. When the panel opens click the "Launch Development App" button

## 🛠️ Tech Stack

- Data Client:
  - **[Webflow SDK](https://github.com/webflow/js-webflow-api)** - Official Webflow API client
- Designer Extension:
  - **[Webflow Designer API](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=readme)** - Official Webflow Designer API client
  - **[Vite](https://vitejs.dev/)** - Build tool for modern web development
  - **[JWT-Decode](https://github.com/auth0/jwt-decode)** - Decode JWT tokens
  - **[React](https://reactjs.org/)** - JavaScript library for building user interfaces

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

- [Webflow Data Client Documentation](https://developers.webflow.com/v2.0.0/data/docs/getting-started-data-clients)
- [OAuth 2.0 Implementation Guide](https://developers.webflow.com/v2.0.0/data/docs/oauth)
- [Available API Scopes](https://developers.webflow.com/v2.0.0/data/reference/scopes)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is MIT licensed.
