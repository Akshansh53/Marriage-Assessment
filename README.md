## How to Setup Project 
🔐 Environment Variables

📁 Backend → backend/.env

**DATABASE_URL**=your_postgres_database_url

📁 Backend → backend/src/database

**DATABASE_URL**=your_postgres_database_url

📁 Frontend → frontend/.env

**VITE_BACKEND_URL**=http://localhost:8080

## How to Start the Project

**Migrate Database**

cd backend/src/db

npx drizzle-kit generate

npx drizzle-kit migrate

npx drizzle-kit push



**Start Backend**

cd backend
npm install
npm run dev

Backend runs on:

http://localhost:8080

**Start Frontend**

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173



## Approach & Decisions

Node.js + Express for a simple backend

Common folder is just for show what is inside @anshverma53/marriage-assessment NPM Package 

Passport (cookie-based auth) for authentication as told in assessment but personally I feel next-auth is pretty simple because the passport have a complex Documentation 

Drizzle ORM + PostgreSQL (Neon) for typescript based database access but prisma can make things easier 

Multer for image uploads because I have previously worked with it 

React + React Router for frontend routing 

react-dropzone for image selection with preview and upload progress i searched for it and found this library is good for that 


Images are limited to 3 per venue and 4 MB each to keep uploads controlled.

## Challenges & Trade-offs

Handling image uploads with progress tracking was a bit jargon So for better understanding I used AI

Managing authentication using cookies in Passport is very hectic because of limited and overwhelming documentation 


## Production Improvements

Use Cloudinary or AWS S3 for image storage via CDN for Faster Delivery

Add stronger backend validation and rate limiting to avoid Bruteforce Such type of attacks

Improve logging, monitoring, and error tracking like make a page that show any error occurred which is not coded to solve 

Initially add pagination and then when it scaled to big add infinite scrolling 

Cache the Frequently accessed data

Introduce Micro Services when it scaled to that level also it provides many optimizations

Create Workflows on github to ensure the code with no error

Use CI/CD for Automation and less time in deployment 


## Notes for CTO / Founder

There are only two reasons why startups fail its either bad idea or poor implementation so make sure there is a Specialised Team who handles thing correctly 

## Startup Mindset
To keep team updated we need to give report to our seniors what features build and needed to build like in this assignment I asked should I do it in Monorepo or 3 Folder but I keep it to Two Folder and one Commonly used file I uploaded it to NPM so that frontend and backend can access it 

Initially we should deploy in into a serverless backend because it is cost effective and when it scaled we use constant server approach


## Advanced Section 
**Production Risks / Gotchas**

Some possible risks I noticed:
Right Now there is a Bug in React Library through which we access server The Developer are on to it but its a risk so keep updated with technologies you use

No Proper Error Handing

No Rate Limiting so Burpsuite Attack is Possible


**Migration Plan**

1. Start uploading new images to Cloudinary or S3.
2. Write a simple script to upload existing images to the cloud.
3. Update database records with new image URLs.
4. After verification, remove old disk images.

**Monitoring & Rollback**

**Monitoring""

Check Logs upload errors and failures.

Monitor API response times and upload success rates.


**Rollback**

Keep the old logic during deployment.

If issues occur, switch back to the previous version.

Restore from database records if needed.

