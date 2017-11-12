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

## Have a nice coding!