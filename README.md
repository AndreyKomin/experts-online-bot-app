## Installation guide

* Make sure that you already installed ``docker`` & ``docker-compose``

#### The first step

```
npm install
cp ./.env.development ./.env
docker-compose up -d
```

#### The second step

```
npm run tunnel
```
* Copy an address from console output (example: https://blablabla.localtunnel.me)
* Paste to the ``./config/default.json`` file into the "url" section: ``"url": "https://blablabla.localtunnel.me",``

  
#### The third step: Mongo Settings

Run in console

```
mongo admin -u admin -p secret --host localhost --port 27017
use topadvisor
```
```
db.createUser(
  {
    user: "user",
    pwd: "secret",
    roles: [ { role: "readWrite", db: "topadvisor" } ]
  }
);
```
```
exit;
```

Check the connection: 


```
mongo topadvisor -u user -p secret --host localhost --port 27017
```

Output: 
```
MongoDB shell version v3.4.10
connecting to: mongodb://localhost:27017/topadvisor
MongoDB server version: 3.4.10
```

## Have a nice coding!