
# Authentication System for Information Extraction App
## Partie Web Mise à Jour
La plateforme web de l'ID Extractor App a été mise à jour pour intégrer deux fonctionnalités majeures qui améliorent son utilité et sa sécurité :

Scan direct des pièces d’identité via la webcam :
Les utilisateurs peuvent désormais scanner leur pièce d’identité directement depuis la plateforme web en utilisant leur webcam. Cette fonctionnalité intuitive s'appuie sur la technologie OCR pour extraire les informations personnelles en temps réel, simplifiant ainsi le processus sans nécessiter de téléchargement d'image préalable.

Authentification à deux facteurs (2FA) :
Afin de renforcer la sécurité des données, la plateforme web intègre une authentification à deux facteurs (2FA). Cette fonctionnalité protège les comptes utilisateurs en exigeant une vérification supplémentaire lors de la connexion, comme un code envoyé par email ou SMS.

Points Clés :

Interface conviviale : Conçue pour une utilisation intuitive, que ce soit pour scanner un document ou pour se connecter en toute sécurité.
OCR intégré : Extraction rapide et précise des informations personnelles via la webcam.
Sécurité renforcée : La 2FA garantit une protection accrue des comptes utilisateurs et des données sensibles.
Ces ajouts à la partie web rendent la gestion des informations encore plus pratique tout en assurant un haut niveau de sécurité.
## Interface mise a jour 
![web1](https://github.com/user-attachments/assets/447f1132-819a-4870-8771-8eb596ac5c53)


## Description
This project implements a Login and Signup system for an information extraction application. The homepage allows users to upload an ID card and extract its information. The application is developed with React for the frontend and includes essential features for user authentication. It provides users with a smooth experience to register, log in, and access protected functionalities.

The backend is developed in Python with integrated OCR (Optical Character Recognition) technology to automatically extract information from ID cards.

## Demonstration




https://github.com/user-attachments/assets/5964b8cd-c954-4b57-b16f-aa441252d835


## Features
- **User Signup**: New users can create an account by providing basic information.
- **User Login**: Registered users can log in securely.
- **Form Validation**: Includes client-side validation for email and password.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Error Handling**: Displays meaningful error messages for incorrect credentials or other issues.

## Technologies Used
- **React**: Frontend library for building user interfaces.
- **React Router**: For navigation and routing between pages.
- **Axios**: For making HTTP requests.
- **CSS Modules**: For styling components.
- **Node.js & Express (Optional)**: Backend for handling authentication requests.
- **JSON Web Tokens (Optional)**: For secure session management.
- **Python**: For secure session management.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
Install dependencies:

bash
Copier le code
npm install
Start the development server:

bash
Copier le code
npm start
Navigate to http://localhost:3000 in your browser.



## Signup
Navigate to the Signup page.
Enter a valid email address and password.
Submit the form to create a new account.
## Login
Navigate to the Login page.
Enter your registered email address and password.
Submit the form to access the app.
Authentication Flow
Upon successful login, the user receives a token (if using a backend) and is redirected to the main dashboard.
Unauthenticated users trying to access protected routes will be redirected to the login page.





## Contributeurs

Ce projet a été développé avec la contribution de :
- [**Salma Daigham**](https://github.com/salmasd5)(chef de project)
- [**Imane Tahri**](https://github.com/imanetahri123)
- [**Zakaria Zinaoui**](https://github.com/zakariaZinaOui)
- [**Abid Hanane**](https://github.com/hananabid24)
- [**Salma Farkhane**](https://github.com/salmafar)
- [**Zyad Eloussoul**](https://github.com/zyadeloussoul)
- [**Elbelaj Hamza**](https://github.com/hamzaelbellaj)


