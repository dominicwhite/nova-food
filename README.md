# nova-food

Restaurant health inspections for Arlington County.

Currently running at: https://nova-eats.netlify.com/

Developed by Code for NoVa.

---

## Development


The app is built in Vue.js, with Vuetify UI components and Leaflet/OSM mapping functionality.
Restaurant health inspections are available at: https://data.arlingtonva.us/dataviews/248025/food-service-inspections/

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

##ToDo list

**Map features**
* Better handling of restaurant updates on map move -> Google-like "search this area" option?
* Better handling of old locations on map move (should they be removed from map?)
* Better handling of multiple locations resolving to same coordinates (pins display on top of each other).
* Display user location.

**Basic app functionality**
* Display health inspection reviews upon selection of a restaurant
* Implement toggle for filtering by by distance vs. recency
* Display measure of "goodness" of a restaurant based upon its recent inspections
    * Calculate said "goodness" -> # of violations? Severity? Historical probability of restaurant closure vs inspections prior to closure?
* Information about what each health violation code means

**"Distant future" wishlist**
* PWA
    * Cache restaurant API data.
    * Cache map tiles.
* Search