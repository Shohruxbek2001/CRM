# CRM

NodeJS, VueJS, ORM

## Create own database

---

```
CREATE ROLE crm WITH CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD '123';
```

```
CREATE DATABASE crmdb WITH OWNER crm;
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
 npm i -g nodemon
```

### Finally run

```
npm run dev
```

### Show result

```
http://localhost:3001
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
