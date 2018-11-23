## Rente die halbe Wahrheit

Dieses Repository überträgt die Excel Datei [Rente die halbe Wahrheit](http://www.bessere-beratung-bieten.de/files/2017-07/renteninformation-die-halbe-wahrheit-07.2017.xlsm) in eine Webseite.

Current-version: [http://ec2-52-59-120-86.eu-central-1.compute.amazonaws.com:8080) 

### Development requirements

- [git](https://git-scm.com/downloads) - 2.1 
- [npm](https://www.npmjs.com/get-npm) - 5.6 to build and run
- [quasar](https://github.com/quasarframework/quasar-cli) - 0.17.22 to build,test and development
- optional: [intellij](https://www.jetbrains.com/idea/download/) - 2018 as editor

### Getting started

```
git clone https://github.com/jwausle/rente-die-halbe-wahrheit
cd rente-die-halbe-wahrheit
npm install 
quasar dev
```

open browser to [`http://localhost:3000`](http://localhost:3000)

### Build and deploy

```
quasar build
docker build -t jwausle/rente:quasar .
docker push jwausle/rente:quasar

ssh -v -i [AWS-PEM] ubuntu@ec2-52-59-120-86.eu-central-1.compute.amazonaws.com

aws> docker run -d --rm -p 8080:80 jwausle/rente:quasar
awa> exit
```

Docker hub [jwausle/rente](https://hub.docker.com/r/jwausle/rente/) image.

### Details 

Das zugrundeliegende Javascript framework ist [quasar](https://quasar-framework.org/) - 0.17.18. Die Webseite enthält aktuell keine Serverkomponente. Die komplette Logik wird Clientseitig durchgeführt.
