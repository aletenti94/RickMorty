# Rick & Morty - Cloud Academy Front End assignment

Simple NodeJS/AngularJS application that shows the list of characters from the popular Rick & Morty series.
All information comes from APIs provided by [Rick & Morty API](https://rickandmortyapi.com/) website.

## Table of Contents

* [Versions](#versions)
* [Quick Start](#quick-start)
* [Installation](#installation)
* [Basic usage](#basic-usage)
* [What's included](#whats-included)
* [Simple application guide](#simple-application-guide)
* [Creators](#creators)

## Versions

* [Rick & Morty project - 1st version](https://github.com/aletenti94/RickMorty)

## Quick Start

- [Download the latest release](https://github.com/aletenti94/RickMorty/archive/refs/heads/main.zip)
- Clone the repo: `git clone https://github.com/aletenti94/RickMorty.git`

### Installation

``` bash
$ npm install
```

### Basic usage

``` bash
$ npm start
```

Navigate to [http://localhost:3000](http://localhost:3000).

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
RickMorty
├── html/               # all client files
│   ├── views/          # application views 
│   ├── css/            # css files
│   └── js/             # js files
│       ├── angular/    # AngularJS library
│       ├── bootstrap/  # Bootstrap library
│       ├── jquery/     # JQuery library
│       └── app.js      # AngularJS main file containing routing, factories, controllers, etc.
│
├── routes/             # routes config
├── app.js     
├── server.js     
├── index.html          # home page
└── package.json
```

## Simple application guide

The main page loads the first page of characters with all the related information (name, gender, type, origin, location, list of episodes, etc.)
The user can change page by using the pagination tool which provides a simple page navigation.
List of episodes is available by clicking on the "+" button.

## Creators

**Alessio Tenti**
* <https://github.com/aletenti94>