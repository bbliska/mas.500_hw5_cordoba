/** 
 * This is the main object that manages our application.  It has no logic of it's own,
 * but just loads up data and then lets the Backbone router take care of everything.
 * This where phone-events are handled (delegated).
 */
var app = {

    countryCollection: null,    // the country list data will be loaded in this variable

    /**
     * Call this to start up the application
     */
    initialize: function() {
        this.bindEvents();
        console.log("App: events bound, waiting for deviceready event");
    },

    /**
     * Helper that loads the static data into a Backbone collection for the views to use
     */
    loadData: function(){
        console.log("App: started to load data")
        var countryData = [{id: "0",name: "Canada",url: "/-/world/north-america/canada/"},{id: "1",name: "East Timor",url: "/-/world/east-asia/east-timor/"},{id: "2",name: "Sao Tome and Principe",url: "/-/world/sub-saharan-africa/sao-tome-and-principe/"},{id: "3",name: "Turkmenistan",url: "/-/world/central-asia-caucasus/turkmenistan/"},{id: "4",name: "Saint Helena",url: "/-/world/sub-saharan-africa/saint-helena/"},{id: "5",name: "Lithuania",url: "/-/world/eastern-central-europe/lithuania/"},{id: "6",name: "Cambodia",url: "/-/world/east-asia/cambodia/"},{id: "7",name: "Trinidad &amp; Tobago",url: "/-/world/caribbean/trinidad-tobago/"},{id: "8",name: "Switzerland",url: "/-/world/western-europe/switzerland/"},{id: "9",name: "Ethiopia",url: "/-/world/sub-saharan-africa/ethiopia/"},{id: "10",name: "Aruba",url: "/-/world/caribbean/aruba/"},{id: "11",name: "Swaziland",url: "/-/world/sub-saharan-africa/swaziland/"},{id: "12",name: "Palestine",url: "/-/world/middle-east-north-africa/palestine/"},{id: "13",name: "Argentina",url: "/-/world/latin-america/argentina/"},{id: "14",name: "Bolivia",url: "/-/world/latin-america/bolivia/"},{id: "15",name: "Cameroon",url: "/-/world/sub-saharan-africa/cameroon/"},{id: "16",name: "Burkina Faso",url: "/-/world/sub-saharan-africa/burkina-faso/"},{id: "17",name: "Ghana",url: "/-/world/sub-saharan-africa/ghana/"},{id: "18",name: "Saudi Arabia",url: "/-/world/middle-east-north-africa/saudi-arabia/"},{id: "19",name: "St. Vincent &amp; the Grenadines",url: "/-/world/caribbean/st-vincent-the-grenadines/"},{id: "20",name: "Japan",url: "/-/world/east-asia/japan/"},{id: "21",name: "Cape Verde",url: "/-/world/sub-saharan-africa/cape-verde/"},{id: "22",name: "Slovenia",url: "/-/world/eastern-central-europe/slovenia/"},{id: "23",name: "Guatemala",url: "/-/world/latin-america/guatemala/"},{id: "24",name: "Kuwait",url: "/-/world/middle-east-north-africa/kuwait/"},{id: "25",name: "Jordan",url: "/-/world/middle-east-north-africa/jordan/"},{id: "26",name: "Dominica",url: "/-/world/caribbean/dominica/"},{id: "27",name: "Liberia",url: "/-/world/sub-saharan-africa/liberia/"},{id: "28",name: "Maldives",url: "/-/world/south-asia/maldives/"},{id: "29",name: "Pakistan",url: "/-/world/south-asia/pakistan/"},{id: "30",name: "Oman",url: "/-/world/middle-east-north-africa/oman/"},{id: "31",name: "Tanzania",url: "/-/world/sub-saharan-africa/tanzania/"},{id: "32",name: "Martinique",url: "/-/world/caribbean/martinique/"},{id: "33",name: "Seychelles",url: "/-/world/sub-saharan-africa/seychelles/"},{id: "34",name: "Gabon",url: "/-/world/sub-saharan-africa/gabon/"},{id: "35",name: "Monaco",url: "/-/world/western-europe/monaco/"},{id: "36",name: "New Zealand",url: "/-/world/oceania/new-zealand/"},{id: "37",name: "Yemen",url: "/-/world/middle-east-north-africa/yemen/"},{id: "38",name: "Jamaica",url: "/-/world/caribbean/jamaica/"},{id: "39",name: "Albania",url: "/-/world/eastern-central-europe/albania/"},{id: "40",name: "Samoa",url: "/-/world/oceania/samoa/"},{id: "41",name: "St. Eustatius",url: "/-/world/caribbean/st-eustatius/"},{id: "42",name: "Uruguay",url: "/-/world/latin-america/uruguay/"},{id: "43",name: "India",url: "/-/world/south-asia/india/"},{id: "44",name: "Azerbaijan",url: "/-/world/central-asia-caucasus/azerbaijan/"},{id: "45",name: "Taiwan (ROC)",url: "/-/world/east-asia/taiwan-roc/"},{id: "46",name: "Lesotho",url: "/-/world/sub-saharan-africa/lesotho/"},{id: "47",name: "United Arab Emirates",url: "/-/world/middle-east-north-africa/united-arab-emirates/"},{id: "48",name: "Kenya",url: "/-/world/sub-saharan-africa/kenya/"},{id: "49",name: "South Korea",url: "/-/world/east-asia/south-korea/"},{id: "50",name: "Tajikistan",url: "/-/world/central-asia-caucasus/tajikistan/"},{id: "51",name: "Turkey",url: "/-/world/middle-east-north-africa/turkey/"},{id: "52",name: "Afghanistan",url: "/-/world/central-asia-caucasus/afghanistan/"},{id: "53",name: "Bangladesh",url: "/-/world/south-asia/bangladesh/"},{id: "54",name: "Mauritania",url: "/-/world/sub-saharan-africa/mauritania/"},{id: "55",name: "Saint Lucia",url: "/-/world/caribbean/saint-lucia/"},{id: "56",name: "San Marino",url: "/-/world/western-europe/san-marino/"},{id: "57",name: "Mongolia",url: "/-/world/central-asia-caucasus/mongolia/"},{id: "58",name: "France",url: "/-/world/western-europe/france/"},{id: "59",name: "Bermuda",url: "/-/world/caribbean/bermuda/"},{id: "60",name: "Slovakia",url: "/-/world/eastern-central-europe/slovakia/"},{id: "61",name: "Somalia",url: "/-/world/sub-saharan-africa/somalia/"},{id: "62",name: "Peru",url: "/-/world/latin-america/peru/"},{id: "63",name: "Laos",url: "/-/world/east-asia/laos/"},{id: "64",name: "Republic of Congo",url: "/-/world/sub-saharan-africa/republic-of-congo/"},{id: "65",name: "Norway",url: "/-/world/western-europe/norway/"},{id: "66",name: "Cote d'Ivoire",url: "/-/world/sub-saharan-africa/cote-divoire/"},{id: "67",name: "Cook Islands",url: "/-/world/oceania/cook-islands/"},{id: "68",name: "Benin",url: "/-/world/sub-saharan-africa/benin/"},{id: "69",name: "Western Sahara",url: "/-/world/middle-east-north-africa/western-sahara/"},{id: "70",name: "Cuba",url: "/-/world/latin-america/cuba/"},{id: "71",name: "Montenegro",url: "/-/world/eastern-central-europe/montenegro/"},{id: "72",name: "Togo",url: "/-/world/sub-saharan-africa/togo/"},{id: "73",name: "D.R. of Congo",url: "/-/world/sub-saharan-africa/dr-of-congo/"},{id: "74",name: "China",url: "/-/world/east-asia/china/"},{id: "75",name: "Armenia",url: "/-/world/central-asia-caucasus/armenia/"},{id: "76",name: "Dominican Republic",url: "/-/world/latin-america/dominican-republic/"},{id: "77",name: "Ukraine",url: "/-/world/eastern-central-europe/ukraine/"},{id: "78",name: "Bahrain",url: "/-/world/middle-east-north-africa/bahrain/"},{id: "79",name: "Tonga",url: "/-/world/oceania/tonga/"},{id: "80",name: "Cayman Islands",url: "/-/world/caribbean/cayman-islands/"},{id: "81",name: "Libya",url: "/-/world/middle-east-north-africa/libya/"},{id: "82",name: "Somaliland",url: "/-/world/sub-saharan-africa/somaliland/"},{id: "83",name: "Finland",url: "/-/world/western-europe/finland/"},{id: "84",name: "Central African Republic",url: "/-/world/sub-saharan-africa/central-african-republic/"},{id: "85",name: "Mauritius",url: "/-/world/sub-saharan-africa/mauritius/"},{id: "86",name: "Liechtenstein",url: "/-/world/western-europe/liechtenstein/"},{id: "87",name: "Australia",url: "/-/world/oceania/australia/"},{id: "88",name: "British Virgin Islands",url: "/-/world/caribbean/british-virgin-islands/"},{id: "89",name: "Mali",url: "/-/world/sub-saharan-africa/mali/"},{id: "90",name: "Vatican City",url: "/-/world/western-europe/vatican-city/"},{id: "91",name: "Russia",url: "/-/world/eastern-central-europe/russia/"},{id: "92",name: "Bulgaria",url: "/-/world/eastern-central-europe/bulgaria/"},{id: "93",name: "Romania",url: "/-/world/eastern-central-europe/romania/"},{id: "94",name: "Curaçao",url: "/-/world/caribbean/curacao/"},{id: "95",name: "Angola",url: "/-/world/sub-saharan-africa/angola/"},{id: "96",name: "Chad",url: "/-/world/sub-saharan-africa/chad/"},{id: "97",name: "South Africa",url: "/-/world/sub-saharan-africa/south-africa/"},{id: "98",name: "Cyprus",url: "/-/world/western-europe/cyprus/"},{id: "99",name: "U.S.A.",url: "/-/world/north-america/usa/"},{id: "100",name: "Sweden",url: "/-/world/western-europe/sweden/"},{id: "101",name: "Qatar",url: "/-/world/middle-east-north-africa/qatar/"},{id: "102",name: "Malaysia",url: "/-/world/east-asia/malaysia/"},{id: "103",name: "Austria",url: "/-/world/western-europe/austria/"},{id: "104",name: "Vietnam",url: "/-/world/east-asia/vietnam/"},{id: "105",name: "Mozambique",url: "/-/world/sub-saharan-africa/mozambique/"},{id: "106",name: "Uganda",url: "/-/world/sub-saharan-africa/uganda/"},{id: "107",name: "Hungary",url: "/-/world/eastern-central-europe/hungary/"},{id: "108",name: "Niger",url: "/-/world/sub-saharan-africa/niger/"},{id: "109",name: "Brazil",url: "/-/world/latin-america/brazil/"},{id: "110",name: "Puerto Rico (U.S.)",url: "/-/world/latin-america/puerto-rico-us/"},{id: "111",name: "Guinea",url: "/-/world/sub-saharan-africa/guinea/"},{id: "112",name: "Panama",url: "/-/world/latin-america/panama/"},{id: "113",name: "Costa Rica",url: "/-/world/latin-america/costa-rica/"},{id: "114",name: "Luxembourg",url: "/-/world/western-europe/luxembourg/"},{id: "115",name: "American Samoa",url: "/-/world/oceania/american-samoa/"},{id: "116",name: "Bahamas",url: "/-/world/caribbean/bahamas/"},{id: "117",name: "Ireland",url: "/-/world/western-europe/ireland/"},{id: "118",name: "Nigeria",url: "/-/world/sub-saharan-africa/nigeria/"},{id: "119",name: "Ecuador",url: "/-/world/latin-america/ecuador/"},{id: "120",name: "Czech Republic",url: "/-/world/eastern-central-europe/czech-republic/"},{id: "121",name: "Brunei",url: "/-/world/east-asia/brunei/"},{id: "122",name: "Belarus",url: "/-/world/eastern-central-europe/belarus/"},{id: "123",name: "Iran",url: "/-/world/middle-east-north-africa/iran/"},{id: "124",name: "Algeria",url: "/-/world/middle-east-north-africa/algeria/"},{id: "125",name: "El Salvador",url: "/-/world/latin-america/el-salvador/"},{id: "126",name: "St. Barthélémy",url: "/-/world/caribbean/st-barthelemy/"},{id: "127",name: "Chile",url: "/-/world/latin-america/chile/"},{id: "128",name: "Belgium",url: "/-/world/western-europe/belgium/"},{id: "129",name: "Thailand",url: "/-/world/east-asia/thailand/"},{id: "130",name: "Haiti",url: "/-/world/caribbean/haiti/"},{id: "131",name: "Belize",url: "/-/world/caribbean/belize/"},{id: "132",name: "Sierra Leone",url: "/-/world/sub-saharan-africa/sierra-leone/"},{id: "133",name: "Georgia",url: "/-/world/central-asia-caucasus/georgia/"},{id: "134",name: "Hong Kong (China)",url: "/-/world/east-asia/hong-kong-china/"},{id: "135",name: "Gambia",url: "/-/world/sub-saharan-africa/gambia/"},{id: "136",name: "Philippines",url: "/-/world/east-asia/philippines/"},{id: "137",name: "Moldova",url: "/-/world/eastern-central-europe/moldova/"},{id: "138",name: "Morocco",url: "/-/world/middle-east-north-africa/morocco/"},{id: "139",name: "Croatia",url: "/-/world/eastern-central-europe/croatia/"},{id: "140",name: "Guinea-Bissau",url: "/-/world/sub-saharan-africa/guinea-bissau/"},{id: "141",name: "Namibia",url: "/-/world/sub-saharan-africa/namibia/"},{id: "142",name: "Grenada",url: "/-/world/caribbean/grenada/"},{id: "143",name: "Bonaire",url: "/-/world/caribbean/bonaire/"},{id: "144",name: "Portugal",url: "/-/world/western-europe/portugal/"},{id: "145",name: "Estonia",url: "/-/world/eastern-central-europe/estonia/"},{id: "146",name: "Kosovo",url: "/-/world/eastern-central-europe/kosovo/"},{id: "147",name: "Mexico",url: "/-/world/latin-america/mexico/"},{id: "148",name: "Lebanon",url: "/-/world/middle-east-north-africa/lebanon/"},{id: "149",name: "Uzbekistan",url: "/-/world/central-asia-caucasus/uzbekistan/"},{id: "150",name: "Tunisia",url: "/-/world/middle-east-north-africa/tunisia/"},{id: "151",name: "Djibouti",url: "/-/world/sub-saharan-africa/djibouti/"},{id: "152",name: "Rwanda",url: "/-/world/sub-saharan-africa/rwanda/"},{id: "153",name: "Antigua and Barbuda",url: "/-/world/caribbean/antigua-and-barbuda/"},{id: "154",name: "Spain",url: "/-/world/western-europe/spain/"},{id: "155",name: "Colombia",url: "/-/world/latin-america/colombia/"},{id: "156",name: "Reunion",url: "/-/world/sub-saharan-africa/reunion/"},{id: "157",name: "Burundi",url: "/-/world/sub-saharan-africa/burundi/"},{id: "158",name: "Fiji",url: "/-/world/oceania/fiji/"},{id: "159",name: "Barbados",url: "/-/world/caribbean/barbados/"},{id: "160",name: "Madagascar",url: "/-/world/sub-saharan-africa/madagascar/"},{id: "161",name: "Italy",url: "/-/world/western-europe/italy/"},{id: "162",name: "Bhutan",url: "/-/world/south-asia/bhutan/"},{id: "163",name: "Sudan",url: "/-/world/sub-saharan-africa/sudan/"},{id: "164",name: "Nepal",url: "/-/world/south-asia/nepal/"},{id: "165",name: "Malta",url: "/-/world/western-europe/malta/"},{id: "166",name: "St.Kitts &amp; Nevis",url: "/-/world/caribbean/stkitts-nevis/"},{id: "167",name: "Bosnia Herzegovina",url: "/-/world/eastern-central-europe/bosnia-herzegovina/"},{id: "168",name: "Netherlands",url: "/-/world/western-europe/netherlands/"},{id: "169",name: "Suriname",url: "/-/world/caribbean/suriname/"},{id: "170",name: "Anguilla",url: "/-/world/caribbean/anguilla/"},{id: "171",name: "Venezuela",url: "/-/world/latin-america/venezuela/"},{id: "172",name: "Israel",url: "/-/world/middle-east-north-africa/israel/"},{id: "173",name: "Myanmar (Burma)",url: "/-/world/east-asia/myanmar-burma/"},{id: "174",name: "Wallis &#038; Futuna",url: "/-/world/oceania/wallis-futuna/"},{id: "175",name: "Indonesia",url: "/-/world/east-asia/indonesia/"},{id: "176",name: "Iceland",url: "/-/world/western-europe/iceland/"},{id: "177",name: "Zambia",url: "/-/world/sub-saharan-africa/zambia/"},{id: "178",name: "Senegal",url: "/-/world/sub-saharan-africa/senegal/"},{id: "179",name: "Papua New Guinea",url: "/-/world/oceania/papua-new-guinea/"},{id: "180",name: "Malawi",url: "/-/world/sub-saharan-africa/malawi/"},{id: "181",name: "Macau (China)",url: "/-/world/east-asia/macau-china/"},{id: "182",name: "St. Maarten",url: "/-/world/caribbean/st-maarten/"},{id: "183",name: "Zimbabwe",url: "/-/world/sub-saharan-africa/zimbabwe/"},{id: "184",name: "Germany",url: "/-/world/western-europe/germany/"},{id: "185",name: "Denmark",url: "/-/world/western-europe/denmark/"},{id: "186",name: "Kazakhstan",url: "/-/world/central-asia-caucasus/kazakhstan/"},{id: "187",name: "Poland",url: "/-/world/eastern-central-europe/poland/"},{id: "188",name: "Eritrea",url: "/-/world/sub-saharan-africa/eritrea/"},{id: "189",name: "Kyrgyzstan",url: "/-/world/central-asia-caucasus/kyrgyzstan/"},{id: "190",name: "Tahiti",url: "/-/world/oceania/tahiti/"},{id: "191",name: "Mayotte",url: "/-/world/sub-saharan-africa/mayotte/"},{id: "192",name: "Iraq",url: "/-/world/middle-east-north-africa/iraq/"},{id: "193",name: "Montserrat",url: "/-/world/caribbean/montserrat/"},{id: "194",name: "New Caledonia",url: "/-/world/oceania/new-caledonia/"},{id: "195",name: "Macedonia",url: "/-/world/eastern-central-europe/macedonia/"},{id: "196",name: "North Korea",url: "/-/world/east-asia/north-korea/"},{id: "197",name: "Sri Lanka",url: "/-/world/south-asia/sri-lanka/"},{id: "198",name: "Latvia",url: "/-/world/eastern-central-europe/latvia/"},{id: "199",name: "South Sudan",url: "/-/world/sub-saharan-africa/south-sudan/"},{id: "200",name: "Guyana",url: "/-/world/caribbean/guyana/"},{id: "201",name: "Syria",url: "/-/world/middle-east-north-africa/syria/"},{id: "202",name: "Guadeloupe",url: "/-/world/caribbean/guadeloupe/"},{id: "203",name: "Turks &amp; Caicos Isl.",url: "/-/world/caribbean/turks-caicos-isl/"},{id: "204",name: "Honduras",url: "/-/world/latin-america/honduras/"},{id: "205",name: "Equatorial Guinea",url: "/-/world/sub-saharan-africa/equatorial-guinea/"},{id: "206",name: "Egypt",url: "/-/world/middle-east-north-africa/egypt/"},{id: "207",name: "Nicaragua",url: "/-/world/latin-america/nicaragua/"},{id: "208",name: "Singapore",url: "/-/world/east-asia/singapore/"},{id: "209",name: "Serbia",url: "/-/world/eastern-central-europe/serbia/"},{id: "210",name: "Botswana",url: "/-/world/sub-saharan-africa/botswana/"},{id: "211",name: "United Kingdom",url: "/-/world/western-europe/united-kingdom/"},{id: "212",name: "Greece",url: "/-/world/western-europe/greece/"},{id: "213",name: "Paraguay",url: "/-/world/latin-america/paraguay/"},{id: "214",name: "French Guiana",url: "/-/world/caribbean/french-guiana/"},{id: "215",name: "Comoros",url: "/-/world/sub-saharan-africa/comoros/"}];
        var sortedCountries = _.sortBy(countryData,'name');
        var models = _.map(sortedCountries,function(countryData){
            return new Country(countryData);
        });
        app.countryCollection = new CountryCollection(models);
    },

    /**
     * Setup event listeners (ie. code that is run when something happens)
     */
    bindEvents: function() {
        // We need to disable all these events to get Backbone's history to 
        // work correctly
        $.mobile.ajaxEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.pushStateEnabled = false;
        // setup PhoneGap event listeners
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);
    },
    //function to check network connection using plugin
    
    function checkConnection() {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        
        if (networkState==Connection.NONE){
            alert("No network connection found.");
        }
    }
    
    
    /**
     * deviceready Event Handler
     * Don't run any javascript code until this event is fired!!!
     * http://docs.phonegap.com/en/1.0.0/phonegap_events_events.md.html
     * (remember 'this' is the event, not the app object )
     */
    onDeviceReady: function() {
        //check connection
        checkConnection();
        app.loadData();
        console.log("App: created collection ("+app.countryCollection.length+")");
        app.router = new AppRouter();
        console.log("App: router created");
        Backbone.history.start();
        console.log("App: history started");
    },

    /**
     * pause Event Handler
     * This is run when your application is put into the background
     */
     onPause: function() {
        console.log("App: pausing! bye bye")
     },

    /**
     * resume Event Handler
     * This is run when your application is returned to after being closed
     */
     onResume: function() {
        console.log("App: resuming")
        checkConnection();
     }

};
