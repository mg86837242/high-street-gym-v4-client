# High Street Gym

A gym web application (web app) created for schoolwork. This website is of dynamic nature, with database and API integration, interactive forms with proper validation, conditional rendering based on user roles and user inputs, content editing functionalities for authenticated users, etc.

For deployed version of this web app, check the [deployment section](#2-deployment).

For more details about the project requirements, check the [project requirement section](#3-project-requirement).

## 1. Usage

> **Note:**
> (1) The following instructions are given assuming it's in Windows OS, adjust to your OS accordingly.
> (2) All commands examples are bash, if necessary, adjust to the scripting language of your choice accordingly.

**Step 1:** To run this web app in local environment, clone the backend repository to a folder of your choice (e.g. `my-folder`) and install dependencies:

```bash
git clone https://github.com/mg86837242/high-street-gym-v4-api.git

cd high-street-gym-v4-api

npm install
```

**Step 2** Install MySQL Server and MySQL Workbench by following [this guide](https://www.simplilearn.com/tutorials/mysql-tutorial/mysql-workbench-installation) (optional)

Skip this step if MySQL Server and MySQL Workbench are already installed

**Step 3:** Open MySQL Workbench to import dataset. Steps for using the MySQL Workbench tool:

1.  Administration tab –> data import/restore
2.  Import from self-contained file
3.  Select the dump file located at `./high-street-gym-v4-api/sqldump`
4.  Start import

**Step 4:** Configure database adapter's options, then start the API server (backend):

Configure the `host`, `user`, `password` and `database` options by modifying `high-street-gym-v4-api/config/database.js` ([example](https://github.com/sidorares/node-mysql2#using-connection-pools)), then start the server:

```bash
npm start
```

**Step 5:** Open up a new terminal in the same folder where the backend is located, then run the following commands:

```bash
cd ..

git clone https://github.com/mg86837242/high-street-gym-v4-client.git
```

Now the folder structure should look like this:

```
my-folder
├─ high-street-gym-v4-api
│  ├─ package.json
│  └─ ...
└─ high-street-gym-v4-client
   ├─ package.json
   └─ ...
```

**Step 6:** Install dependencies and start the [Vite](https://vitejs.dev/guide/#command-line-interface) server (frontend):

```bash
cd high-street-gym-v4-client

npm install

npm run dev
```

Navigate to [`http://localhost:5173`](http://localhost:5173) in the browser to open the web app.

## 2. Deployment

For deployed version of this web app, visit: https://highstreetgymdemo.space/

Technologies used for deployment includes but not limited to:

- Amazon Web Services (AWS), including IAM, EC2 and RDS
- Linux (Ubuntu)
- Bash (Git Bash)
- Node.js
- Nginx – web server and reverse proxy
- PM2 – backend process management
- Vite – frontend build tool

## 3. Project Requirement

This school project calls for a dynamic website with a database integration. In terms of the business requirement, the web app is expected to have the following functionalities:

- Handling user authentication
- Rendering a calendar view from information pulled from the database, including booking date and time
- Functionality to allow users to book a class with a specific trainer
- Displaying users' blog with functionalities of uploading and reading messages
- Using XML as data representation to add new records to database, at least two (2) XML documents, in this case, for adding new activities and adding new members

The technologies to be used for implementing this project is left to the discretion of the programmer/developer. The extensive list of packages used in the backend and the frontend can be found in their respective `package.json` files. Essential technologies used for this project are listed below:

- Git – for version controlling (also used during deployment)
- Prettier & ESLint – for code formatting and code quality
- Zod – for data validation in both backend and frontend
- MySQL – database management system with mysql2 adapter (which has built-in methods for database transaction)
- Node.js
- Express.js – for building RESTful APIs
- React
- React Router 6.4+
- React Hook Form
- Tailwind CSS
- Tiptap – headless editor framework for blog functionalities

## 4. Credit

- <a href="https://www.flaticon.com/free-icons/dumbell" title="Dumbell icons">Dumbell icons created by Vitaly Gorbachev - Flaticon</a>
- <a href="https://www.flaticon.com/free-icons/random" title="random icons">Random icons created by noomtah - Flaticon</a>
- <!-- Hero -->Photo by <a href="https://unsplash.com/@weareambitious?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ambitious Creative Co. - Rick Barrett</a> on <a href="https://unsplash.com/photos/AcFdytAyJgk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- <!-- 7 Carousel Items -->Photo by Cliff Booth on [Pexels](https://www.pexels.com/photo/photo-of-women-stretching-together-4056723/)
- <!-- 7 Carousel Items -->Photo by Gustavo Fring from [Pexels](https://www.pexels.com/photo/women-keeping-fit-3984353/)
- <!-- 7 Carousel Items -->Photo by Andrej Klintsy on [Pexels](https://www.pexels.com/photo/a-woman-doing-sit-ups-6392828/)
- <!-- 7 Carousel Items -->Photo by Leon Ardho from [Pexels](https://www.pexels.com/photo/man-and-woman-holding-battle-ropes-1552242/)
- <!-- 7 Carousel Items -->Photo by <a href="https://unsplash.com/@sammoghadamkhamseh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sam Moghadam Khamseh</a> on <a href="https://unsplash.com/photos/W8CyjblrF8U?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- <!-- 7 Carousel Items -->Photo by <a href="https://unsplash.com/@markadriane?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">MARK ADRIANE</a> on <a href="https://unsplash.com/photos/FH6JcaCrYJ0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- <!-- 7 Carousel Items -->Photo by Yan Krukau from [Pexels](https://www.pexels.com/photo/people-doing-raised-hands-pose-in-yoga-class-8436587/)
- <!-- 404 Page -->Photo by Khaled Oukaci from [Pexels](https://www.pexels.com/photo/black-and-white-photo-of-a-backpacker-walking-in-the-desert-12563642/)
- <!-- Under Construction Page -->Photo by <a href="https://unsplash.com/@d_mccullough?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Daniel McCullough</a> on <a href="https://unsplash.com/photos/-FPFq_trr2Y?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
- <!-- Blog Example Image -->Photo by <a href="https://unsplash.com/@r3dmax?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jonatan Pie</a> on <a href="https://unsplash.com/photos/xgTMSz6kegE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
