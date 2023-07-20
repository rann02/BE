
# Backend



## Installation

before istalation creat file .env

```bash
  DBNAME= yours db name
  USERDB= yours user db
  PASSWORDDB= yours password db
  SECRET=ayam
```

after creat .env go to folder src/db/config/config.json, then change the configuration like host, username, password, and database that you have. dialect is mysql

```bash
  "development": {
    "username": "yours user db",
    "password": "yours password db",
    "database": "yours db name",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```

Install the project with npm

```bash
  npm install
```
    
## Demo

before run the app use this command:

```bash
  npx sequelize db:create
  npx sequelize db:migrate
```

to run the app run this command:

```bash
  npm run start
```
