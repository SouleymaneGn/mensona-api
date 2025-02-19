# AuthNestAPI  - API d'authentification avec NestJS & Prisma

## 🚀 Introduction
**AuthNestAPI** est une API d'authentification construit avec **NestJS**, **Prisma**,**JWT** et **swagger**. Il permet aux utilisateurs de s'inscrire, de se connecter et de gérer la vérification et la réinitialisation de mot de passe avec un système de code de validation sécurisé.

## 📌 Fonctionnalités
- **Inscription** d'un utilisateur avec envoi d'un code de validation
- **Connexion** sécurisée avec JWT
- **Vérification de compte** via un code de validation
- **Demande de réinitialisation de mot de passe** avec un code envoyé par email
- **Réinitialisation du mot de passe** après validation du code
- **Expiration automatique des codes** après 30 minutes

## 🏗️ Technologies utilisées
- [NestJS](https://nestjs.com/) - Framework backend TypeScript
- [Prisma](https://www.prisma.io/) - ORM pour la gestion de base de données
- [JWT](https://jwt.io/) - Gestion des tokens d'authentification
- [Date-fns](https://date-fns.org/) - Gestion des dates et expiration des codes
- [Swagger] (https://swagger.io/) - langage de description d'interface permettant de décrire des API exprimées à l'aide de JSON.

## 📖 Installation

### 1️⃣ **Cloner le projet**
```sh
git clone https://github.com/souleymane19/AuthNestAPI.git
cd auth-service
```

### 2️⃣ **Installer les dépendances**
```sh
npm install
```

### 3️⃣ **Configurer l'environnement**
Crée un fichier `.env` à la racine et ajoute :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/authdb"
JWT_SECRET="votre_secret"
EXPIRE_TIME=30 # Expiration du code en minutes
```

### 4️⃣ **Exécuter les migrations Prisma**
```sh
npx prisma migrate dev --name init
```

### 5️⃣ **Lancer le serveur**
```sh
npm run start:dev
```
L'API sera disponible sur `http://localhost:3000`

## 🔑 Endpoints API

### 📌 **1. Inscription**
**POST** `/auth/signup`
```json
{
  "email": "test@example.com",
  "password": "motdepasse"
}
```
📩 Réponse : `Le code de validation a été envoyé`

---

### 📌 **2. Connexion**
**POST** `/auth/login`
```json
{
  "email": "test@example.com",
  "password": "motdepasse"
}
```
🔑 Réponse : `{ "access_token": "JWT_TOKEN", data: {id:string, email:string, status:boolean} }`

---


### 📌 **3. Vérifier le compte**
**POST** `/auth/validate-email`
```json
{
  "code": "123456"
}
```
✅ Réponse : `Email vérifié avec succès`

---

### 📌 **4. Demande de réinitialisation du mot de passe**
**POST** `/auth/request-reset-password`
```json
{
  "email": "test@example.com"
}
```
📩 Réponse : `Un code de réinitialisation a été envoyé`

---

### 📌 **5. Réinitialisation du mot de passe**
**POST** `/auth/reset-password`
```json
{
  "code": "123456",
  "newPassword": "nouveauMotDePasse"
}
```
🔄 Réponse : `Mot de passe modifié avec succès`

---

## 🖼️ Capture de l'interface Swagger

![Swagger Interface](./src/assets/images/interface.png)

## 🔒 Gestion de l'expiration des codes
- Chaque code généré est valide **30 minutes**.
- Lorsqu'un utilisateur demande un **nouveau code**, l'ancien est remplacé.
- Si un code est **expiré**, il ne peut plus être utilisé.

## 📜 Licence
Ce projet est sous licence **MIT**.

---

🔥 **Félicitations !** Tu as maintenant une API d'authentification prête à l'emploi. 🚀

