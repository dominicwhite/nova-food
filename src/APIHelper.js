export class APIHelper {
    static loadTestData() {
        let restaurants = fetch('/test_data.json').then(r => r.json()).then(rj => {
            console.log(rj);
            return rj;
        });
        return restaurants;
    }
}