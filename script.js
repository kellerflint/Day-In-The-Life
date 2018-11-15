window.onload = load;

/*global $*/

// Constants
const TOTAL_ENDINGS = 3;
const IMG_DIR = "assn6_img/"
const FADE_TIME = 2000; // 0 for Debug; 2000 for final

// list of scenes/vertices that make up the game
let scenes = [{
    name: "wakeUp",
    label: "",
    quote: "",
    text: [
        "You wake up to a beautiful Tuesday morning. The sun is shining, birds are singing and the city garbage trucks are clanging down the road at a million decibels an hour.",
        "What adventures could this new day hold? What excitement might await you just around the corner? What choices will you make today?",
    ]
},
{
    name: "leave",
    label: "Leave the room",
    quote: "I have to go to work soon unlike SOME of us. Please clean the kitchen at somepoint. It's getting disgusting.",
    text: ["You leave the room and find your roommate waiting for you.",
        "Apparently he wants you to clean the kitchen. You must have forgotten to clean up last night."
    ]
},
{
    name: "hide",
    label: "Stay in the room",
    quote: "",
    text: ["But you simply can’t handle the pressure. What if you have to make an important decision? What if a crucial outcome falls under your responsibility? You just aren’t ready for that.",
        "No, that won’t do at all. The only way leaving this room can go is badly. The best thing to do now is to wait here, where you know that you’re safe, where nothing can hurt you.",
        "So you wait. Hours pass, then days. Has it been months already? You no longer have the ability to tell. But the one thing you know for sure is that if you wait long enough, the answers will come. Eventually, someday, they will arrive.",
        "The End."
    ]
},
{
    name: "window",
    label: "Look out the window",
    quote: "",
    text: ["Oh yes, a beautiful day indeed! An entire universe of possibility just beyond this glass.",
        "Maybe you'll go for a walk, or ride your bike in town, or hitchhike to Las Vegas on a truck of circus performers. Anything could happen.",
        "But to find out you will, of course, have to leave this room at somepoint."
    ]
},
{
    name: "messBed",
    label: "Leave the room",
    quote: "",
    text: ["But before you can leave the unsightly image of your unmade bed catches your eye.",
        "You could of course leave it. But what a thing to come back to! Making it would take just a moment, but what opportunities might you be missing out on?"
    ]
},
{
    name: "makeBed",
    label: "Make the bed",
    quote: "",
    text: ["No doubt about it, making that bed was worth it. What a way to spend your time!",
        "It was truely an unforgettable experience. The sheer thrill of folding each corner under the mattress ranks among the best moments of your life.",
        "This was well worth the delay but sadly you can't just make beds all day."
    ]
},
{
    name: "kitchen",
    label: "Go to kitchen",
    quote: "",
    text: ["You step into the kitchen and find it in complete disarray.",
        "Pots and pans are scattered everywhere and some of the dishes don't look like they've been cleaned in a week.",
        "A responsible adult would be ashamed."
    ]
},
{
    name: "washer",
    label: "Clean the kitchen",
    quote: "",
    text: ["You find the washer full of clean dishes. One could argue that technically, the dishes are already clean and therefore not something you have to deal with.",
        "On the other hand, it is a fairly trivial chore."
    ]
},
{
    name: "emptyWasher",
    label: "RETURN TO SANITY",
    quote: "",
    text: ["The cinnamon is strange but really nothing to get worked up over.",
        "You unload the rest of the dishwasher without incident."
    ]
},
{
    name: "cinnamonShelf",
    label: "Unload the dishwasher",
    quote: "",
    text: ["You open the cabinet to unload the dishes and find something quite unexpected.",
        "There is a plate filled with cinnamon just sitting with the clean dishes.",
        "At first you are baffled. Why would there be cinnamon here? Who left it and for what purpose? What could it mean?",
    ]
},
{
    name: "cinnamonAll",
    label: "Decipher the cinnamon's purpose",
    quote: "",
    text: ["At first it isn't clear at all but the more you think about it, the more the picture begins to come together.",
        "You had been surrounded by cinnamon all along. There was cinnamon in your bed when you first woke up. There was cinnamon dust coating the entire kitchen. There is even an entire pot of cinnamon being cooked on the stove at this very moment!",
        "But who put it there? Where did it all come from?",
    ]
},
{
    name: "cinnamon",
    label: "DISCOVER THE TRUTH",
    quote: "",
    text: ["It was you all along. You were never anything more than a jar of cinnamon, imagining a life of choice and adventure.",
        "It all makes perfect sense now and you are happy to have solved the mystery until you remember one very important fact.",
        "Cinnamon can't think.",
        "The End."
    ]
},
{
    name: "clean",
    label: "Finish cleaning",
    quote: "",
    text: ["You finish cleaning the Kitchen. It looks great!",
        "If only it would stay clean for more than 12 hours..."
    ]
},
{
    name: "unclean",
    label: "Don't clean the kitchen",
    quote: "",
    text: ["You leave the kitchen a mess. It's really not your problem afterall.",
        "No, if your roommate wants it clean, he'll just have to do it himself. You have an exciting day to get to!"
    ]
},
{
    name: "workToDo",
    label: "Get to work",
    quote: "",
    text: ["You have work to do. The life of a procrastinating student leaves you piles of homework and perpetually approaching deadlines.",
        "There's so much to do it's hard to decide where to start."
    ]
},
{
    name: "IT-207",
    label: "Work on IT-207 Project",
    quote: "",
    text: ["You decide to start with a JavaScript project you've been planning for sometime.",
        "It's a very interesting idea in which the player chooses different paths through a day in your life.",
        "Unfortunatley you're finding it hard. Especially when you come to the scene where you choose to work on the IT-207 project",
        "It's confusing how to even start. Writing a game about the game you're writing about the game... You aren't sure that it's actually possible."
    ]
},
{
    name: "confusion",
    label: "Do it anyways",
    quote: "",
    text: ["Interesting things are always hard. That's just life. You double down on your efforts to write the scene.",
        "But it's getting difficult. Strange things are happening.",
        "Apparently 1/0 is equal to infinity and assignments are failing without errors.",
        "typeof(NaN) returns a number, which seems like a paradox and NaN isn't even equal to itself.",
        "Things are getting very strange."
    ]
},
{
    name: "recursion",
    label: "Escape",
    quote: "",
    text: ["It's too late for you.",
        "There is no way out.",
        "The End",
        "is Never",
        "The End",
        "is never",
        "The End",
        "is never",
        "The End",
        "is never",
        "RuntimeError: maximum recursion depth exceeded",
        "The End."
    ]
}

];

// list of edges to add to graph
let edges = [
    ["wakeUp", "leave"],
    ["wakeUp", "hide"],
    ["wakeUp", "window"],
    ["window", "messBed"],
    ["messBed", "makeBed"],
    ["messBed", "leave"],
    ["makeBed", "kitchen"],
    ["leave", "kitchen"],
    ["kitchen", "washer"],
    ["kitchen", "unclean"],
    ["washer", "cinnamonShelf"],
    ["cinnamonShelf", "cinnamonAll"],
    ["cinnamonAll", "cinnamon"],
    ["cinnamonAll", "emptyWasher"],
    ["emptyWasher", "clean"],
    ["washer", "clean"],
    ["clean", "workToDo"],
    ["unclean", "workToDo"],
    ["workToDo", "IT-207"],
    ["IT-207", "confusion"],
    ["confusion", "recursion"]
];

// Defines a graph class
class Graph {

    // Initializes the number of vertices and the adjacency list
    constructor(vertNum) {
        this.noOfVertices = vertNum;
        this.AdjList = new Map();
    }

    // Add a vertex to the graph given vertex v
    addVertex(v) {
        this.AdjList.set(v, []);
    }

    // Add an edge to the graph given vertices v and w
    addEdge(v, w) {
        this.AdjList.get(v).push(w);
    }

    // Outputs graph to the console for debug
    consolePrintGraph() {
        // get all the vertices 
        let verts = this.AdjList.keys();

        // iterate over the vertices 
        for (let i of verts) {
            // gets the adjacency list for the vertex 
            let values = this.AdjList.get(i);
            let conc = "";

            // concatenates adjacency list into a string 
            for (let x of values) {
                conc += x.name + " ";
            }

            // print the vertex and its adjacency list 
            console.log(i.name + " -> " + conc);
        }
    }
}

let graph = new Graph(scenes.length);

let endings = [];
let restarts = -1;

let currentScene;
let currentTextIndex;

// Starts game intro and calls functions to build the game graph
function load() {
    convertToIndex();
    buildGraph();
    graph.consolePrintGraph();
    gameIntro();
    $("#newGame").click(start);
}

// Adds all vertices and edges to graph
function buildGraph() {
    for (let i = 0; i < scenes.length; i++) {
        graph.addVertex(scenes[i]);
    }

    for (let i = 0; i < edges.length; i++) {
        let origin = scenes[edges[i][0]];
        let target = scenes[edges[i][1]];
        graph.addEdge(origin, target);
    }
}

// Converts edges from strings into indexes of the objects with the 
// corresponding name
function convertToIndex() {
    for (let i = 0; i < edges.length; i++) {
        for (let x = 0; x < scenes.length; x++) {
            if (edges[i][0] == scenes[x].name) {
                edges[i][0] = x;
            }
            if (edges[i][1] == scenes[x].name) {
                edges[i][1] = x;
            }
        }
    }
}

// Initializes the game the first time it is loaded. Gets information from
// user that will be used across game instances.
function gameIntro() {
    let time = 0;
    // This is so dumb
    $(".setup").each(function () {
        $(this).delay(time).fadeIn(FADE_TIME);
        time += FADE_TIME;
    });
}

// Restarts game from first scene
function start() {
    restarts++;
    currentScene = scenes[0];
    currentTextIndex = 0;

    setMainImage();
    setMainText();
    hideSetup();
    updateStats();
}

// Hides setup from view once the player starts the first game
function hideSetup() {
    $("#title").removeClass("setup");
    $("#newGame").removeClass("setup");
    $("#newGame").text("New Game");
    $(".setup").hide();
    $("#stats-div").fadeIn(FADE_TIME);
}

// generates image path given the scene name
function getImagePath(name) {
    return IMG_DIR + name + ".jpg";
}

// Sets the main image for the game's current scene
function setMainImage() {

    // Remove previous image
    $("#next-image-div").empty();
    $("#main-image-div").empty();

    // Create image and add path and event listener
    let path = getImagePath(currentScene.name);
    let img = $("<img>").attr("src", path);
    img.click(continueGame);

    let quote = "";
    if (currentScene.quote != "") {
        quote = $("<p></p>").text(currentScene.quote);
        quote.addClass("speech middle");
    }


    // On hover functions changes border and displays quote if any
    img.hover(function () {
        img.addClass("hover");
        if (quote != "")
            quote.fadeIn(FADE_TIME);
    }, function () {
        img.removeClass("hover");
        if (quote != "")
            quote.fadeOut(FADE_TIME);
    });

    // Add image to game
    $("#main-image-div").append(img);
    $("#main-image-div").append(quote);
}

// Sets the text for the main image
function setMainText() {
    $("#main-text-div").empty();
    let text = currentScene.text[currentTextIndex];
    let paragraph = $("<p></p>").text(text);
    paragraph.addClass("cap");
    $("#main-text-div").append(paragraph);
    currentTextIndex++;
}

// Sets next possible images for player to select from the current scene's
// adjacency list
function setNextImages() {
    // Get next scenes list
    let nextScenes = graph.AdjList.get(currentScene);

    // Add each scene
    for (let i = 0; i < nextScenes.length; i++) {
        let path = getImagePath(nextScenes[i].name);
        let img = $("<img>").attr("src", path);
        let label = $("<p></p>").text(nextScenes[i].label);

        // Creating div to wrap each image (prevents blur overflow) and div to
        // wrap both scene image and text (for nice formatting)
        let blurDiv = $("<div></div>").addClass("blurContainer");
        let sceneDiv = $("<div></div>").addClass("sceneDiv");

        // On hover functions to change border color
        blurDiv.hover(function () {
            blurDiv.addClass("blurHover");
        }, function () {
            blurDiv.removeClass("blurHover");
        });

        // Add event listener to image
        img.addClass("next");
        img.click(function (event) {
            changeScene(event);
        });

        // Building elements and adding them to the page
        blurDiv.append(img);
        sceneDiv.append(blurDiv);
        sceneDiv.append(label);
        $("#next-image-div").append(sceneDiv);

    }

}

// Sets the next scene to the selected scene
function changeScene(event) {
    currentTextIndex = 0;

    let nextScenes = graph.AdjList.get(currentScene);
    for (let i = 0; i < nextScenes.length; i++) {
        let path = getImagePath(nextScenes[i].name);
        if (event.target.src.indexOf(path) >= 0) {
            currentScene = nextScenes[i];
            setMainImage();
            setMainText();
        }
    }
}

// Adds ending to endings list and displays to user
function addEnding() {
    if (!endings.includes(currentScene.name)) {
        endings.push(currentScene.name);
        let endItem = $("<li></li>").text(currentScene.name);
        $("#endings-list").append(endItem);
    }
}

// Updates statistics on page
function updateStats() {
    let contents = "Restarts: " + restarts;
    $("#restarts").text(contents);

    contents = "Endings: " + endings.length + "/" + TOTAL_ENDINGS;
    $("#totalEndings").text(contents);
}

// Main game logic decides what to do when user clicks on main image.
// Increments text, calls nextImages if there is no more text, or ends the game
function continueGame() {
    if (currentScene.text.length > currentTextIndex) {
        if (currentScene.text[currentTextIndex] == "The End.") {
            addEnding();
            updateStats();
            console.log("The game ends.");
        }

        setMainText();

        if (graph.AdjList.get(currentScene).length > 0 &&
            currentScene.text.length == currentTextIndex) {
            setNextImages();
        }
    } else if (graph.AdjList.get(currentScene).length <= 0) {
        console.log("The game is already over.");
    }
}