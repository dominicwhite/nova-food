export class APIHelper {
    static loadTestData() {
        let restaurants = fetch('/small_data.json').then(r => r.json()).then(rj => {
            console.log(rj);
            return rj;
        });
        return restaurants;
    }

    static loadRestaurantsByLocation(lat, long, filter="distance", radius=10) {
        let restaurants = fetch(`http://127.0.0.1:5000/restaurants/?filter=${filter}&radius=${radius}&lat=${lat}&long=${long}`)
            .then(r => r.json())
            .then(rj => {
                console.log(rj);
                return rj;
        });
        return restaurants;
    }
}