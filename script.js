var bet = [];
var deck;
var coins = 100;
var coinBet = 1;
var ns = ['A', '2', '3', '4', '5', '6', '7', '8'];
var nsTypes = ['ACE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT'];
var suits = ['SPADES', 'CLUBS', 'HEARTS', 'DIAMONDS'];

function load() {
    deck = [];

    for (var i = 0; i < 32; i++) {
        deck.push(i);
    }

    //shuffle
    for (var i = deck.length - 1; i > 0; i--) {
        var other = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[other];
        deck[other] = temp;
    }

    createNumbers();
    updateCoins();
}

function createNumbers() {
    var t = 0;

    for (var i = 0; i < ns.length; i++) {
        var row = $("<div class='" + ns[i] + "'>");

        for (var j = 0; j < suits.length; j++) {
            var suit = suits[j];

            row.append("<div class='" + suit + " " + nsTypes[i] + " number" + "'id='" + t++ + "' onclick='selectNumber(this)'>" + ns[i] + "</div>");
        }

        $('#numbers').append(row);
    }
}

function showPercentage() {
    var percentage = (bet.length / deck.length) * 100;
    $("#percentage").text(percentage + "% (" + bet.length + "/" + deck.length + ")");
}

function updateCoins() {
    $("#coins").text("Coins: " + coins);
}

function selectNumber(element) {
    clearBet();

    if ($(element).hasClass("removed")) {
        console.log("empty");
        return;
    }

    bet.push(parseInt($(element).attr("id")));

    $(element).addClass("selected");
    $(playbutton).prop("disabled", false);

    showPercentage()
}


function clearBet() {
    $(".number").removeClass("selected");

    bet = [];
}

function selectSuit(suit) {
    clearBet();

    var temp = $("." + suit).not(".removed").toArray();

    if (temp.length == 0) {
        console.log("empty");
        return;
    }

    for (var i = 0; i < temp.length; i++) {
        bet.push(parseInt($(temp[i]).attr("id")));
    }

    $(temp).addClass("selected");
    $(playbutton).prop("disabled", false);

    showPercentage()
}

function play() {
    if (bet.length == 0) {
        alert("Escolha uma aposta.");
        return;
    }

    var outcome = deck.pop();

    $("#" + outcome).text("");
    $("#" + outcome).addClass("removed");

    if (bet.includes(outcome)) {
        alert("won! bet: " + bet + " outcome: " + outcome);
    } else {
        alert("lost! bet: " + bet + " outcome: " + outcome);
    }

    clearBet();
    showPercentage();
}