## How to install
You can use both npm or yarn, the version I used to create this project are:

```
$ node -v ; npm -v ; yarn -v
v8.8.1
5.4.2
1.2.1
```
If you just freshly installed yarn/npm you are good to go, else you might need to upgrade, for npm I use `n`

```
npm install -g n
```
to install it and after that select at least the stable version (what I used).

```
n stable
```

and now you have the latest stable version of node&npm.

`git clone https://github.com/rolmed/fordd.git` to download application from repository.

`yarn install`/`npm install` to get all needed packages for this app.

`yarn start`/`npm start` to start dev server with hot reload, it's live on `localhost:3000`.

`yarn run build`/`npm run build` to build prod bundle, it includes both treeshaking and uglify to optimize the code as much as possible.


`yarn test`/`npm test` run the tests with Jest and Enzyme, by default the test included only check for the correct render of base components & routes, all are passing.


## Project structure

The boilerplate structure and files are the same as this repo minus the *bin* folder, everything else is exactly the same.

```
*root*
|
├── */src/*
│   ├── */assets/* where images and stuff are stored
│   ├── *App.jsx* main layout
│   ├── *chuck.jsx* chuck facts layout/actions
│   ├── *index.html* entry point
│   ├── *index.jsx* javascript entry point
│   └── *style.scss* styling
├── *package.json* the whole package.json with every dependency and script, nothing is kept hidden
├── *.eslintrc* eslint config
├── *.babelrc* babel config (polyfills)
├── *webpack.config.js* webpack config, it has a dev and prod environment
└── *README.md* this file
```
