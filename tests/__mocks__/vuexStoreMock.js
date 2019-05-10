export {actions, getters, state};

const actions = {
    fetchRestaurants: jest.fn(),
};

const getters = {
    clusteredRestaurants: jest.fn( () =>
        [
            [{name: 'Restaurant 1', lat: 38.864720, long: -77.088544, id: 1}]
        ]
    )
};

const state = {
    restaurants: [],
    mapCenter: {lat: 38.864720, long: -77.088544},
    mapSides: {top: 38.9, bottom: 38.8, left: -77.1, right: -77.05},
    mapZoom: 13,
    isPinSelected: false,
    selectedPinIndex: null,
    isClickOnAnotherPin: false,
    displayRestaurants: [],
    restaurantInfo: {},
    searchBy: "recent",
    violations: {},
    boundaries: {'Arlington': []}
};