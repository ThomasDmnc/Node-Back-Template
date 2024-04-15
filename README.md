# NodeJs + Express + Mongoose Back-End API Template

Minimal template setup to get a server with an API running. 
This setup offers by default a server using: 
- Mongoose
- Cors
- Users and Auth managements


Please do create a `.env` file and add:
- `MONGODB_URI` for your Db address
- `PORT` for the port you want your serveur running on
- `TOKEN_SECRET` for encrypting the password using jwt and bcrypt
- `FRONTEND_URL` for the base url of your front-end > useful for Cors