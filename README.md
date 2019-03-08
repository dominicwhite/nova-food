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
* Draw polygon around area with restaurants to highlight available region
* Display measure of "goodness" of a restaurant based upon its recent inspections
    * Calculate said "goodness" -> # of violations? Severity? Historical probability of restaurant closure vs inspections prior to closure?

**"Distant future" wishlist**
* Add more regions
* PWA
    * Cache restaurant API data.
    * Cache map tiles?
* Search