# OpenCred Deployment Guide

## Architecture Overview

OpenCred is a full-stack application consisting of:
- Frontend: React/TypeScript application
- Backend: Node.js/Express server
- Database: PostgreSQL (via Prisma ORM)
- Storage: Supabase
- AI Integration: OpenAI API

## Dependencies and Services

The application relies on several external services:
- Supabase for file storage and potentially authentication
- OpenAI API for AI functionality
- PostgreSQL database
- Authentication service (JWT-based)

## Environment Requirements

### Backend Server
- Node.js runtime
- PostgreSQL database
- Environment variables for:
  - Database connection
  - Supabase credentials
  - OpenAI API key
  - JWT configuration
  - Other service-specific configurations

### Frontend
- Node.js for building
- Static file hosting capability
- Environment variables for API endpoints and service configurations

## Build Process

### Backend
```bash
cd server
npm install
npm run build
```

### Frontend
```bash
npm install
npm run build
```

## Deployment Considerations

1. **Database Migrations**
   - Run migrations before deploying new server versions
   - Use `npm run prisma:migrate` for database updates

2. **Environment Variables**
   - Ensure all required environment variables are set
   - Keep API keys and secrets secure

3. **File Storage**
   - Configure Supabase storage buckets and permissions
   - Ensure proper file size limits and access controls

4. **Monitoring and Logging**
   - Implement appropriate logging mechanisms
   - Monitor API usage and rate limits (especially for OpenAI)

5. **Security**
   - Enable CORS with appropriate origins
   - Implement rate limiting
   - Ensure secure handling of files and user data

## Initial Server Setup

The `setup.sh` script automates the initial server configuration:
1. System package updates
2. Node.js 18.x installation
3. Nginx installation and configuration
4. PM2 global installation
5. Application directory creation
6. Initial Nginx configuration setup
7. SSL certificate setup with Certbot

To set up a new server:
```bash
# Copy setup.sh to server
scp setup.sh root@157.245.136.6:~/

# SSH into server and run setup
ssh root@157.245.136.6
chmod +x setup.sh
./setup.sh
```

## Project Restructuring

### Current Structure
```
OpenCred/
├── src/           # Frontend code
├── server/        # Some backend code
├── public/
├── dist/
└── various config files
```

### Proposed Structure
```
OpenCred/
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── server/
    ├── src/
    ├── prisma/
    ├── package.json
    └── tsconfig.json
```

### Required Changes for Restructuring

1. **Update Build Paths**
   - Modify `deploy.sh` to use `client/dist` instead of `dist`
   - Update `server.js` static file serving path

2. **Update Deployment Script**
```diff
- npm run build
+ cd client && npm run build
- scp -r dist/* root@157.245.136.6:/var/www/opencred/dist/
+ scp -r client/dist/* root@157.245.136.6:/var/www/opencred/dist/
```

3. **Update Server Configuration**
```diff
- app.use(express.static(path.join(__dirname, 'dist')));
+ app.use(express.static(path.join(__dirname, '../client/dist')));
```

4. **Package.json Updates**
   - Split dependencies between client and server
   - Create separate build and start scripts

5. **CI/CD Considerations**
   - Update build workflows to handle separate client/server builds
   - Ensure proper dependency installation in both directories

The restructuring will require a one-time deployment process:
1. Stop the production server
2. Restructure the codebase locally
3. Update configuration files
4. Test locally
5. Deploy updated structure
6. Verify all functionality

## Production Setup

### Server Infrastructure
- Digital Ocean Droplet (IP: 157.245.136.6)
- Nginx as reverse proxy
- PM2 for process management
- Let's Encrypt SSL certificates

### Domain Configuration
- Domain: openeval.co
- SSL enabled with automatic HTTPS redirect
- Configured for both www and non-www domains

### Nginx Configuration
The application uses Nginx as a reverse proxy with the following setup:
- Port 80 redirects to HTTPS
- Port 443 serves SSL traffic
- Frontend served on main domain (proxy to localhost:3000)
- Backend API served under /api/ path (proxy to localhost:3001)
- SSL certificates managed through Let's Encrypt
- CORS headers configured for API endpoints

### Deployment Process
1. Local Build
   ```bash
   npm run build
   ```

2. Automated Deployment (using deploy.sh)
   - Builds the application locally
   - Validates build output in dist directory
   - Copies files to `/var/www/opencred/dist/` on production server
   - Restarts the application using PM2

3. Production Server
   - Static files served from `/var/www/opencred/dist/`
   - Application managed by PM2 with name "openeval"
   - Express server handles client-side routing

### Server Management
- PM2 Commands:
  ```bash
  pm2 status                 # Check application status
  pm2 restart openeval       # Restart application
  pm2 logs openeval         # View application logs
  ```

- SSL Certificate Renewal:
  - Managed by certbot
  - Renewal directory: `/etc/letsencrypt/live/openeval.co/`

## Scaling Considerations

- Consider implementing caching for frequently accessed data
- Monitor database performance and optimize queries
- Implement proper error handling and retry mechanisms for external services
- Consider containerization for easier deployment and scaling
