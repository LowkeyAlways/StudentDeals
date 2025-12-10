# StudentDeals — Installation & Guide d'utilisation

Ce document explique comment installer et exécuter le projet StudentDeals, composé d’un frontend React et d’un backend Spring Boot. Il s’adresse à un utilisateur débutant ou intermédiaire qui souhaite lancer le projet sur son propre ordinateur.

---------------------------------------------------------------------

🔧 PRÉREQUIS

Avant de commencer, installez :

1. Node.js (pour React)
Téléchargement : https://nodejs.org  
Vérification :
node -v
npm -v

2. Java 17+ (pour Spring Boot)
Téléchargement : https://adoptium.net  
Vérification :
java -version

3. Maven (pour compiler le backend)
Téléchargement : https://maven.apache.org  
Vérification :
mvn -v

4. VS Code (recommandé) avec extensions :
- Java Extension Pack  
- Spring Boot Dashboard  
- Prettier  
- ESLint  

---------------------------------------------------------------------

📂 STRUCTURE DU PROJET

studentdeals/
 ├── backend/      → API Spring Boot
 └── frontend/     → Application React

---------------------------------------------------------------------

🚀 LANCER LE FRONTEND (REACT)

1. Ouvrir un terminal et entrer :
cd frontend

2. Installer les dépendances :
npm install

3. Lancer l’application :
npm run dev

Le site démarre sur :
http://localhost:5173

---------------------------------------------------------------------

🌐 LANCER LE BACKEND (SPRING BOOT)

1. Aller dans le dossier backend :
cd backend

2. Compiler le projet :
mvn clean install

3. Lancer le serveur :
mvn spring-boot:run

L’API tourne sur :
http://localhost:8080

---------------------------------------------------------------------


🧪 VÉRIFIER QUE TOUT FONCTIONNE

1. Lancer le backend → http://localhost:8080  
2. Lancer le frontend → http://localhost:5173  
3. Aller sur la page d’inscription ou connexion  
4. Tester une inscription  
5. Vérifier que la réponse s’affiche + logs du backend

   
---------------------------------------------------------------------


❗ PROBLÈMES COURANTS

• Erreur CORS  
Ajouter dans votre contrôleur Spring :
@CrossOrigin(origins = "*")

• fetch failed  
- Backend non démarré  
- Mauvaise URL  
- Port incorrect  

• npm non reconnu  
Réinstaller Node.js

---------------------------------------------------------------------

✔️ CONCLUSION

Votre environnement React + Spring Boot est maintenant prêt. Vous pouvez développer, tester et étendre le projet. Pour toute demande d’amélioration, utilisez les issues GitHub.

