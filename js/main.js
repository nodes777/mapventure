// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.
var map;
var currentMarker = [];
var nextMarkers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -16.4999,
            lng: 145.4653
        },
        zoom: 12
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
        zoom: 12,
        choices: [{
            choiceName: "Origin",
            nextLoc: 1
        }, {
            choiceName: "Dog Rescue",
            nextLoc: 2
        }],
        content: 'You wake up at Dougies, your home base in Port Douglas, and roll out of bed and into your flip flops. It’s another day in paradise and you’ve got heaps to do. You could start your day off with a cup of coffee at Origin Espresso, or head down to the animal shelter, Paws and Claws, and volunteer to walk a dog. Where do you go?'
    }, {
        title: "Origin",
        position: {
            lat: -16.482790,
            lng: 145.463072
        },
        map: map,
        marker: null,
        zoom: 14,
        icon: "../mapventure/img/coffee.png",
        choices: [{
            choiceName: "Marina",
            nextLoc: 3
        }],
        content: 'You bike down to Origin, and the barista alreadys knows your order. With your flat white in hand, you sit outside in a canvas chair watching the tourists go by. Your friend texts you and wants to meet up at the Marina. Caffeinated, you feel ready for adventure.'
    }, {
        title: "Paws and Claws",
        position: {
            lat: -16.537440,
            lng: 145.469130
        },
        map: map,
        marker: null,
        zoom: 13,
        icon: "../mapventure/img/dog.png",
        choices: [{
            choiceName: "The Point",
            nextLoc: 4
        }, {
            choiceName: "The Beach",
            nextLoc: 5
        }],
        content: 'Obviously you’re a dog person and you bike just out of town to the shelter. You see a lovely pup named Misty and she happily pulls you out of her fence and out for a brisk walk. You zip around town and both of you are fatigued by the end of the loop. Having done your good deed for the day you could go relax on the beach, or go up to the Point at the end of the peninsula. Where do you go?'
    }, {
        title: "Marina",
        position: {
            lat: -16.484332,
            lng: 145.460169
        },
        map: map,
        marker: null,
        zoom: 14,
        icon: "../mapventure/img/anchor.png",
        choices: [{
            choiceName: "Rent a Boat",
            nextLoc: 6
        }, {
            choiceName: "The Beach",
            nextLoc: 5
        }],
        content: 'You hop your bike over the curb and park it in a rack. You wander over to your friends by the bay, they’re deliberating about what to do next. The archerfish swim lazy circles around the pier trestles and you wonder if they could shoot you if they wanted. The team turns to you and you have to make the decision. Do you want to rent a boat and go fishing down the river? Or do you want to go to the beach?'
    }, {
        title: "The Point",
        position: {
            lat: -16.482867,
            lng: 145.467823
        },
        map: map,
        marker: null,
        zoom: 15,
        icon: "../mapventure/img/lookout.png",
        choices: [{
            choiceName: "Coles",
            nextLoc: 8
        }],
        content: 'You zig zag through town and up the windy path to the top of hill. The Point at Trinity Bay lookout has a beautiful view of four miles of beach below you. You snap some pics and see some dolphins playing in the water below. Your buddy texts you and asks if you want to get a bunch of people together and do a sunset dinner in the park. Of course you do. That sounds awesome. Catch is, you gotta go to the store and pick up all the food. No worries, though. The grocery store is downhill.'
    }, {
        title: "The Beach",
        position: {
            lat: -16.491373,
            lng: 145.467630
        },
        map: map,
        marker: null,
        zoom: 15,
        icon: "../mapventure/img/beach.png",
        choices: [{
            choiceName: "Coles",
            nextLoc: 8
        }],
        content: 'You swerve back into town, through the tree lined sidewalks and burst onto Four Mile Beach. You dump your bike in the sand and bound towards the water. The water is clear and some sting rays make way for your frolicking. Lilting on the water you realize you’re getting kind of hungry. You step out of the ocean and dry off. While setting up your hammock for a quick mid-day nap, your friend texts you and asks if you want to do a group sunset dinner at the park. Naturally you do, and volunteer to get the food, but not before a quick sun snooze.'
    }, {
        title: "Rent a Boat",
        position: {
            lat: -16.504386,
            lng: 145.456382
        },
        map: map,
        marker: null,
        zoom: 15,
        icon: "../mapventure/img/boat.png",
        choices: [{
            choiceName: "Park Sunset",
            nextLoc: 9
        }, {
            choiceName: "Croc",
            nextLoc: 7
        }],
        content: "Taking a boat down the inlet sounds like a good time. Luckily you’re only a few steps from the boat hire and the attendant loads you up with some poles and bait. He kicks you off the dock and down the creek you go. Past the yachts and mangroves you cruise to a crossing. You drop anchor and send out your line. The day rolls on without much biting. Your land laden friend texts you and asks if you all want to have a group sunset dinner. That sounds great, but you haven’t really had any thrills today. You do see a croc lounging on the side. Maybe you could pet it??????"
    }, {
        title: "Croc",
        position: {
            lat: -16.505270,
            lng: 145.457866
        },
        map: map,
        marker: null,
        zoom: 15,
        icon: "../mapventure/img/croc.png",
        choices: [{
            choiceName: "Restart",
            nextLoc: 0
        }],
        content: "You lean over the edge of the boat and reach your hand out to touch the beast. Wham! The croc whips around and pulls you into the water. What did you expect to happen? You drown and die. Game over. Maybe next time you’ll make more responsible decisions."
    }, {
        title: "Coles",
        position: {
            lat: -16.482086,
            lng: 145.463076
        },
        map: map,
        marker: null,
        zoom: 15,
        icon: "../mapventure/img/store.png",
        choices: [{
            choiceName: "To the Park!",
            nextLoc: 9
        }],
        content: "Browsing the aisles you pick up supper supplies. Bread and cheese like a Frenchman, onions to sauté, burgers and kanga bangas, and French onion dip to piece it all together. On the way to the register you pick up one final crucial ingredient. Tim. Tams. Truly a bountiful feast. And you hustle out the door just a few minutes before sunset."
    }, {
        title: "Sunset Park",
        position: {
            lat: -16.478307,
            lng: 145.462534
        },
        map: map,
        zoom: 15,
        marker: null,
        icon: "../mapventure/img/bench.png",
        choices: [{
            choiceName: "Paddys",
            nextLoc: 10
        }, {
            choiceName: "Watergate",
            nextLoc: 11
        }, {
            choiceName: "Rattle & Hum",
            nextLoc: 12
        }],
        content: "Everyone’s at the park and sparking up the grills and conversation. The sun is hovering, partially obscured by the horizon. Waves lap at the edge of the park and you bite into a juicy burger. You cavort among the people and as the sun lets out its last gasp of light, conversation turns to the nightlife. Should you go to Paddy’s? With a live band and Guinness it’s always a good time.  Or go fancy and enjoy cocktails at Watergate? Or maybe save some money and go cheap at Rattle and Hum? It’s all up to you now."
    }, {
        title: "Paddys",
        position: {
            lat: -16.480626,
            lng: 145.463149
        },
        map: map,
        marker: null,
        zoom: 15,
        icon: "../mapventure/img/beer.png",
        choices: [{
            choiceName: "Iron Bar",
            nextLoc: 13
        }],
        content: "Another rendition of Wagon Wheel is churned out by a travelling jug band. You go to the bar and ask for an Irish Car Bomb, but they don’t know what that is. Guess it’s an American thing. You grab a round of Guinness and go back to your group, reflecting on the day.  A few games of pool, and you’re ready to move on. It’s almost midnight and the bars here all have an odd habit of closing then. All except one. Iron Bar. You have accepted your fate."
    }, {
        title: "Watergate",
        position: {
            lat: -16.482792,
            lng: 145.464124
        },
        map: map,
        marker: null,
        zoom: 15,
        icon: "../mapventure/img/glass.png",
        choices: [{
            choiceName: "Iron Bar",
            nextLoc: 13
        }],
        content: "Deciding that tonight should be a special occasion, you don the one shirt you don’t wear for work and all parade into Watergate. You order an espresso martini, because you’ve never had one before. You feel fancy. After enjoying the atmosphere and feeling a little more elite than usual, you realize you should go easy on your wallet. The bar’s closing anyway and there’s only one place to go. Iron Bar. You gather your mates and get ready for your last hurrah."
    }, {
        title: "Rattle & Hum",
        position: {
            lat: -16.482889,
            lng: 145.465001
        },
        map: map,
        marker: null,
        icon: "../mapventure/img/bottle.png",
        zoom: 15,
        choices: [{
            choiceName: "Iron Bar",
            nextLoc: 13
        }],
        content: "Rattle and Hum? Really? Ok whatever. You reluctantly jockey for pool time as your friends trade rounds during happy hour. The bars mostly empty, so you spend more time with your mouth in a cup than talking. Luckily one of your mates has the idea to go to Iron Bar. Everywhere else is closing anyway. Embarrassed by your poor life choices, you finish your game of pool by losing and go to pick up the pieces of your ego in the only place where others leave it behind. Iron Bar."
    }, {
        title: "Iron Bar",
        position: {
            lat: -16.481059,
            lng: 145.462646
        },
        map: map,
        marker: null,
        zoom: 15,
        icon: "../mapventure/img/shots.png",
        choices: [{
            choiceName: "Restart",
            nextLoc: 0
        }],
        content: "Iron Bar. The final frontier. You order a pitcher, with previous experience telling you to avoid the house draft. Successfully imbibed you confidently saunter to the dance floor. The music pounds and you shake as the walls become blurred. It’s been a wonderful day, and you could do this all over again…"
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
    this.zoom = data.zoom;
    this.icon = data.icon;
};


var ViewModel = function() {
    var self = this; //self always maps to ViewModel
    self.allPlaces = []; //init allPlaces array
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
            title: self.currentPlace().title(),
            animation: google.maps.Animation.DROP,
            icon: "../mapventure/img/person.png"
        });
        google.maps.event.addListener(marker, 'click', function() {
            return function() {
                console.log("marker click" + this);
                console.log(this);
            };
        }(marker));
        currentMarker.push(marker);
        /*Pan to current position*/
        map.panTo(marker.getPosition());
            /*Zoom to appropriate level*/
        map.setZoom(self.currentPlace().zoom);
    }

    function addNextMarkers() {
        self.currentPlace().choicesArray.forEach(function(obj) {
            var marker = new google.maps.Marker({
                position: self.koPlacesArray()[obj.nextLoc].position,
                map: map,
                title: self.koPlacesArray()[obj.nextLoc].title(),
                animation: google.maps.Animation.DROP,
                icon: self.koPlacesArray()[obj.nextLoc].icon,
            });
            nextMarkers.push(marker);
        });
    }

    function removeMarkers(array) {
        for (var i = 0; i < array.length; i++) {
            array[i].setMap(null);
        }
    }

    self.btnClick = function() {
        /*Changes current place*/
        self.currentPlace(self.koPlacesArray()[this.nextLoc]);
        removeMarkers(currentMarker);
        addCurrentMarker();
        removeMarkers(nextMarkers);
        addNextMarkers();
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
    var h = document.createElement("H2"); // Create a <h1> element
    var errorMessage = document.createTextNode(" Oh No! Google Maps isn't working right now! Sorry but we kinda need it to use this app."); // Create a text node
    h.appendChild(errorMessage);

    var search = document.getElementById("search-list");
    row.insertBefore(h, search);
};