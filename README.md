# Jesse trades info 

Jesse trades info is the additional instrument for [Jesse](https://jesse.trade/)'s trading framework that helps to parse JSON backtest files with trades and shows in a convenient way with tables and charts.

Firstly you need to set up a database. Rename `.env.example` into `.env` in the root directory with the same credentials as you are using with Jesse. It needed to get candles to draw a chart with trades.

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

See the installation process video [here](https://vimeo.com/440370244). If you have any questions or feature requests, you may ask it [here](https://forum.jesse.trade/d/127-jesse-trades-info-tool-to-review-backtest-results).

![Watch the video](https://user-images.githubusercontent.com/25667028/95674071-82b84580-0bb6-11eb-8c36-c5417200b68c.png)
