## Rente die halbe Wahrheit

Dieses Repository überträgt die Excel Datei [Rente die halbe Wahrheit](http://www.bessere-beratung-bieten.de/files/2017-07/renteninformation-die-halbe-wahrheit-07.2017.xlsm) in eine Webseite.

Current-version: [http://ec2-35-157-47-99.eu-central-1.compute.amazonaws.com:8082/](http://ec2-35-157-47-99.eu-central-1.compute.amazonaws.com:8082/) 

### Development requirements

- [git](https://git-scm.com/downloads) - 2.1 
- [npm](https://www.npmjs.com/get-npm) - 5.5 to build and run
- optional: [visual studio code](https://code.visualstudio.com/download) - 1.17 as editor

### Getting started

```
git clone https://github.com/jwausle/rente-die-halbe-wahrheit
cd rente-die-halbe-wahrheit
npm install 
npm start 
```

open browser to [`http://localhost:3000`](http://localhost:3000)

### Details 

Das zugrundeliegende Javascript framework ist [angular2](https://angular.io/) - 4.4.5. Die Webseite enthält aktuell keine Serverkomponente. Die komplette Logik wird Clientseitig durchgeführt.
