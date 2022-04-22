# CRM

NodeJS, VueJS, ORM

## Create own database

---

```
sudo su postgres
```

```
psql
```

```
CREATE ROLE crm WITH CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD '123';
```

```
CREATE DATABASE crmdb WITH OWNER crm;
```

```
\q
```

```
psql -U crm -d crmdb
```

```
123
```

---

## Prisma ORM using guide

---

- https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-node-postgres

## Run the backend

---

### Enter this folder

```
/server
```

### Install all required libs

```
npm i
```

### Then intall nodemon

```
 npm i -D nodemon
```

### Finally run

```
npm run dev
```

### Show result

```
http://localhost:8000
```

## Run the frontend

---

### Enter this folder

```
/client
```

### Install all required libs

```
npm i
```

### Run this command

```
npm run dev
```

### Show result

```
http://localhost:3000
```

### Generate Access Token
---
Open the terminal then enter following command
```
node
```
```
require('crypto').randomBytes(64).toString('hex')
```
show like this result
```
'6b6f21a64aa3ce9776e020beb670a2582749a35f751426df4e1b48e798c98b56646d18436e3c7d2e63812e2d6743bb21d1260a2550f599f46084c403fcc4a955'
```