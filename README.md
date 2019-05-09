# nova-food

Restaurant health inspections for Arlington County.
Developed by Dominic White and Matthew Gallagher at Code for NoVa.

---

## Status

CircleCI tests: [![CircleCI](https://circleci.com/gh/dominicwhite/nova-food/tree/master.svg?style=svg)](https://circleci.com/gh/dominicwhite/nova-food/tree/master)
 
Netlify hosting: [![Netlify Status](https://api.netlify.com/api/v1/badges/34bd1ad6-9274-49fb-a930-535593a0ab2a/deploy-status)](https://app.netlify.com/sites/nova-eats/deploys)

Currently hosted at: https://nova-eats.netlify.com/


## Development


The app is built in Vue.js, with Vuetify UI components and Leaflet/OSM mapping functionality.

The source food inspection data is publically available at: https://data.arlingtonva.us/dataviews/248025/food-service-inspections/

To get started with development, clone the repository and install the necessary packages:

```bash
npm init
```

Launch dev server (Webpack devserver with hot module reloading) with:

```bash
npm run devserver
```

To build the site for production, run:

```bash
npm run build
```

The build can be tested on a local server with:

```bash
npm run serve
```

## ToDo list

**Basic app functionality**
* Draw outline of components and interactions -> clarify and refactor interface of each, esp. store
* Fully test the front end
* Display measure of "goodness" of a restaurant based upon its recent inspections
    * Calculate said "goodness" -> # of violations? Severity? Historical probability of restaurant closure vs inspections prior to closure?
* Get data from other local regions
    * "Cities" control option that lets you select the city.
    * Importers that pull from municipality sources
    * Geocode any new restaurants -> Google Maps for max accuracy? Does this lead to less overlap?
    * Deploy as a series of lambda scripts that run once per month -> output file to S3, and Flask setup uses this
* Minimize size of JavaScript production file
* Better handling of clusters of restaurants
    * E.g. Show popup tooltip when hovering over marker -> preliminary list of restaurants so don't have to click
* Collapse Map options control container to expansion icon

**"Distant future" wishlist**
* Add more regions
* PWA
    * Service worker
    * Cache restaurant API data.
    * Cache map tiles?
    * Library to sync indexed db with REST api?
* Search functionality.
* Display restaurant name next to marker (if space exists on map).
* Link to third party APIs? Reviews? Opentable? Yelp?
* Google analytics