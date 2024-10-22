# Career Guru

GitHub Link: [https://github.com/reddynirup/careerguru](https://github.com/reddynirup/careerguru)  
Tech Stack: ReactJS, NodeJS, Express, MongoDB  

**Overview:**  
Career Guru is a comprehensive job portal enabling seamless interaction between employers and job seekers. It allows employers to post jobs, review applications, and receive resumes, while job seekers can search and apply for jobs, manage their applications, and receive tailored recommendations.

### Features
- **Employers**: Post jobs, review applications, manage resumes.
- **Job Seekers**: Search and apply for jobs, upload and manage resumes.
- **Tailored Recommendations**: Job seekers receive personalized job recommendations based on their skills.
- **Responsive Design**: Optimized for both desktop and mobile.
- **Cloud Storage**: Uses Cloudinary for storing images and documents.

## Installation and Setup:

## 1. Clone the Repository:

```bash
git clone https://github.com/reddynirup/careerguru.git


---

## 2. Backend Setup:

After cloning the repository, open the folder and install the dependencies:
---
```bash
npm install

---

Run the backend server:
```bash
npm start
---


## 3. Frontend Setup:
Move to the frontend folder, install the dependencies, and run the frontend:

---
```bash
cd frontend
npm install
npm start

---
## 4. Environment Variables: to run in the local system
Create a .env file in the main folder and add the following fields:
PORT=5000
MONGO_URI=your_mongodb_uri
USER_JWT_SECRET=key1
RECRUITER_JWT_SECRET=key2
NODE_ENV=production
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
