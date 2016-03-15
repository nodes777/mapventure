var map;
var currentMarker = [];
var nextMarkers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -16.4999,
            lng: 145.4653
        },
        zoom: 14
    });

    ko.applyBindings(new ViewModel());
}

var places = [{
        title: "Dougies",
        position: {
            lat: -16.495539,
            lng: 145.462699
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Origin",
            nextLoc: 1
            },
            {
            choiceName: "Dog Rescue",
            nextLoc: 2
            }],
        content: 'Home base for backpackers. A comfortable friendly place to lay your head.'
    }, {
        title: "Origin",
        position: {
            lat: -16.482790,
            lng: 145.463072
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Marina",
            nextLoc: 3
            }],
        content: 'Coffee'
    }, {
        title: "Paws and Claws",
        position: {
            lat: -16.537440,
            lng: 145.469130
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "The Point",
            nextLoc: 4
            },{
            choiceName: "The Beach",
            nextLoc: 5
            }],
        content: 'Dog Rescue'
    }, {
        title: "Marina",
        position: {
            lat: -16.484332,
            lng: 145.460169
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "The Beach",
            nextLoc: 5
            },{
            choiceName: "Rent a Boat",
            nextLoc: 6
            }],
        content: 'Rent a boat'
    }, {
        title: "The Point",
        position: {
            lat: -16.482867,
            lng: 145.467823
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Woolies",
            nextLoc: 8
            }],
        content: 'Where everyone takes pictures'
    }, {
        title: "The Beach",
        position: {
            lat: -16.491373,
            lng: 145.467630
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Woolies",
            nextLoc: 8
            }],
        content: 'Take a swim'
    },{
        title: "Rent a Boat",
        position: {
            lat:  -16.504386,
            lng: 145.456382
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Croc",
            nextLoc: 7
            },{
            choiceName: "Park Sunset",
            nextLoc: 9
            }],
        content: "You're on a boat"
    },{
        title: "Croc",
        position: {
            lat: -16.505270,
            lng: 145.457866
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Restart",
            nextLoc: 0
            }],
        content: "You're eaten"
    },{
        title: "Coles",
        position: {
            lat: -16.482086,
            lng: 145.463076
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Park Sunset",
            nextLoc: 9
            }],
        content: "Supermarket"
    },{
        title: "Sunset Park",
        position: {
            lat: -16.478307,
            lng: 145.462534
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Paddys",
            nextLoc: 10
            },{
            choiceName: "Watergate",
            nextLoc: 11
            },{
            choiceName: "Rattle & Hum",
            nextLoc: 12
            }],
        content: "Its a nice park"
    },{
        title: "Paddys",
        position: {
            lat: -16.480626,
            lng: 145.463149
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Iron Bar",
            nextLoc: 13
            }],
        content: "Irish Bar"
    },{
        title: "Watergate",
        position: {
            lat: -16.482792,
            lng: 145.464124
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Iron Bar",
            nextLoc: 13
            }],
        content: "Nice Bar"
    },{
        title: "Rattle & Hum",
        position: {
            lat: -16.482889,
            lng: 145.465001
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Iron Bar",
            nextLoc: 13
            }],
        content: "Standard bar"
    },{
        title: "Iron Bar",
        position: {
            lat: -16.481059,
            lng: 145.462646
            },
        map: map,
        marker: null,
        choices: [{
            choiceName: "Restart",
            nextLoc: 0
            }],
        content: "The end"
    }

];

var Place = function(data) {
    this.title = ko.observable(data.title);
    this.position = data.position;
    this.map = data.map;
    this.content = ko.observable(data.content);
    this.marker = data.marker;
    this.choices = ko.observableArray(data.choices);
    this.choicesArray = data.choices;
};


var ViewModel = function() {
    var self = this; //self always maps to ViewModel
    self.allPlaces = [];//init allPlaces array
    /*for each obj in places, create a new Place object and push that into allPlaces array*/
    places.forEach(function(placeData) {
        self.allPlaces.push(new Place(placeData));
        });

    self.koPlacesArray = ko.observableArray([]);
    /*push allPlaces into places ko array*/
    self.allPlaces.forEach(function(placeData) {
        self.koPlacesArray.push(placeData);
        });
    /*set the first place to be Dougies*/
    self.currentPlace = ko.observable(this.koPlacesArray()[0]);
    /*place the first marker on page load*/
    addCurrentMarker();
    addNextMarkers();

    function addCurrentMarker() {
        var marker = new google.maps.Marker({
            position: self.currentPlace().position,
            map: map,
            title: self.currentPlace().title,
            animation: google.maps.Animation.DROP,
            icon: "../mapventure/img/person.png"
        });
        google.maps.event.addListener(marker, 'click', function() {
            return function() {
                console.log("marker click" + this);
            };
        }(marker));
        currentMarker.push(marker);
    }

    self.btnClick = function() {
        /*Changes current place*/
        self.currentPlace(self.koPlacesArray()[this.nextLoc]);
        removeCurrentMarker();
        addCurrentMarker();
        removeNextMarkers();
        addNextMarkers();
    };


    function addNextMarkers() {
        self.currentPlace().choicesArray.forEach(function(obj){
             var marker = new google.maps.Marker({
                position: self.koPlacesArray()[obj.nextLoc].position,
                map: map,
                title: self.koPlacesArray()[obj.nextLoc].title,
                animation: google.maps.Animation.DROP,
            });
        nextMarkers.push(marker);
        });
    }

    function removeCurrentMarker() {
        for (i = 0; i < currentMarker.length; i++) {
            currentMarker[i].setMap(null);
        }
    };
    function removeNextMarkers() {
        for (i = 0; i < nextMarkers.length; i++) {
            nextMarkers[i].setMap(null);
        }
    };

    /*OpenWeatherMap API*/
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?id=2152681&appid=51bdd38ab0bc0b12282355d5e5f57c74";

    self.weatherMain = ko.observable();
    self.weatherDescription = ko.observable();
    self.temp = ko.observable();
    self.iconURL = ko.observable();

    $.getJSON(weatherURL, function(data) {
        self.weatherMain(data.weather[0].main);
        var description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1); //The JSON doesn't capitalize the first letter of the description, doing it here manually
        self.weatherDescription(description);
        var kelvin = data.main.temp; //JSON temp is given in Kelvin
        var temperature = kelvin * 9 / 5 - 459.67;
        self.temp(temperature.toFixed(1)); //toFixed returns a string to a given decimal place
        var icon = data.weather[0].icon;
        var icoPath = "http://openweathermap.org/img/w/" + icon + ".png";
        self.iconURL(icoPath);

    }).error(function(e) {
        self.weatherMain("Weather Could Not Be Loaded, Sorry about that :(");
    });

};

var reportGoogleMapsIsNotResponding = function() {
    var h = document.createElement("H1"); // Create a <h1> element
    var errorMessage = document.createTextNode("Oh No! Google Maps isn't working right now!"); // Create a text node
    h.appendChild(errorMessage);

    var search = document.getElementById("search-list");
    row.insertBefore(h, search);
};