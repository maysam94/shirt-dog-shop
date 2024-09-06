# Shirtdog-shop

De webshop van team Shirthond.

## Installatie

### Server:
1. Open de map 'server_shop' in je IDE. 
2. Open een terminal en voer het volgende uit:
```bash
npm install
``` 
3. Zet na 'password' het wachtwoord van jouw database server, ter vervanging van 'EnterPasswordHere'.
4. Om de server te starten voer je het volgende commando uit in je terminal:
```bash
npm start
``` 
5. De server is te sluiten met CTRL- C.

### Database
1. Open 'create_db_shirtdogshop.sql' in MySQL workbench.
2. Selecteer de eerste regel en voer deze uit. Refresh je schema's en je hebt nu als het goed is een database genaamd 'shirtdogshop'. Klik twee keer op de database om er "in" te gaan.
3. Selecteer alles onder de eerste regel en voer het uit. Als het goed is is nu de tabel die je nodig hebt aangemaakt in de database. Refresh je schema's als je de tabel nog niet ziet.

### Shirtdog-shop
1. Open de map 'shirt-dog-shop' in een instantie van je IDE los van de instantie met de server.
2. Voer de volgende commando uit in een terminal (LET OP: De site is pas functioneel als je de server gestart hebt met het eerder genoemde 'npm install' commando): 
```bash
npx http-server
``` 
3. Je krijgt nu het volgende te zien in je terminal: 
```bash 
Available on:
  http://192.168.86.27:8080
  http://127.0.0.1:8080
Hit CTRL-C to stop the server
```
4. Ga naar http://127.0.0.1:8080 toe. Klik op views/, en je bevindt je op de Shirtdog Shop!

## Gebruiksaanwijzing
1. Op de site kun je momenteel twee dingen doen. Je kunt een account aanmaken, en je kunt met dat account inloggen.
1. Om een account aan te maken ga je naar de "JOIN" page via de navigatiebalk. 
3. Voer geldige informatie in, druk op de knop, en als alles klopt is de registratie succesvol.
4. Hierna kun je inloggen. Druk op "LOGIN" in de navigatiebalk. Als het goed is komt er een klein schermpje tevoorschijn. Vul de juiste gegevens in en u bent ingelogd.
