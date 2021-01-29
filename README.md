# Jesse trades info

Jesse trades info is the additional instrument for [Jesse](https://jesse.trade/)'s trading framework that parses JSON back-test files with trades and shows conveniently with tables and charts.

### Installation

Firstly you need to set up a database. 🚨 Rename `.env.example` into `.env` in the root directory with the same credentials as you are using Jesse. It needed to get candles to draw a chart with trades.

```
DB_HOST='127.0.0.1'
DB_NAME=jesse_db
DB_USER=jesse_user
DB_PASSWORD=jesse_psw
DB_PORT=5432
```

Then you need to install dependencies and run the local website:

```
npm install
npm run build
npm run start
```

After a successful start, you can open it at http://localhost:3000/.

See the installation process video [here](https://vimeo.com/440370244). If you have any questions or feature requests, you may ask them [here](https://forum.jesse.trade/d/127-jesse-trades-info-tool-to-review-backtest-results).

#### Docker

Read this [documentation](https://docs.jesse.trade/docs/getting-started/docker.html) to know how to launch it with docker.

### Themes

| Light         | Dark     |
|:-------------:|:-------------:|
| ![Ligth theme](https://user-images.githubusercontent.com/25667028/106305724-14cf8100-626e-11eb-9a86-3c24f5301719.png) | ![Dark theme](https://user-images.githubusercontent.com/25667028/106305809-34ff4000-626e-11eb-81b6-7ac4a43f576c.png) |
