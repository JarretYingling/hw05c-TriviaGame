// javascript

$(document).ready(function () {

    let triviaGame = {
        min: 0,
        max: 49,
        answers: [null, null, null, null],
        correctAnswer: null,
        target: 3,
        limit: 3,
        correct: 0,
        incorrect: 0,
        gameState: false,
        timeLimit: 7000, // milliseconds
        timer: 0,
        counter: 0,
        interval: [],
        wins: 0,
        losses: 0,
        states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusettes", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New York", "New Mexico", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennslyvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        capitals: ["Montgomery", "Juneau", "Phoenix", "Little Rock", "Sacramento", "Denver", "Hartford", "Dover", "Tallahasse", "Atlanta", "Honolulu", "Boise", "Springfield", "Indianapolis", "Des Moines", "Topeka", "Frankfort", "Baton Rouge", "Augusta", "Annapolis", "Boston", "Lansing", "Saint Paul", "Jackson", "Jefferson City", "Helena", "Lincoln", "Carson City", "Concord", "Trenton", "Albany", "Santa Fe", "Raleigh", "Bismark", "Columbus", "Oklahoma City", "Salem", "Harrisburg", "Providence", "Columbia", "Pierre", "Nashville", "Austin", "Salt Lake City", "Montpelier", "Richmond", "Olympia", "Charleston", "Madison", "Cheyenne"],
        getRandomInt: function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            let randomInt = Math.floor((Math.random() * (max - min + 1)) + min);
            return randomInt;
        },
        checkAnswer: function (id) {
            clearInterval(triviaGame.interval.pop());
            triviaGame.counter = 0;
            switch (id) {
                case this.correctAnswer.toString():
                    $("#result").html("<h2>Right!</h2>");
                    this.correct++;
                    $("#correct").text(this.correct);
                    break;
                default:
                    $("#result").html("<h2>Wrong!</h2>");
                    this.incorrect++;
                    $("#incorrect").text(this.incorrect);
            }
            console.log(this);
            this.updateGame();
        },
        updateGame: function () {
            if (this.correct >= this.target) {
                this.wins++;
                $("#result").html("<h2>WINNER!</h2>");
                $("#timer").html("<button>click to play again</button>");
                this.gameState = false;
                return;
            } else if (this.incorrect >= this.limit) {
                this.losses++;
                $("#result").html("<h2>LOSER!</h2>");
                $("#timer").html("<button>click to play again</button>");
                this.gameState = false;
                return;
            }
            for (let i = 0; i < this.answers.length; i++) {
                this.answers[i] = this.getRandomInt(this.min, this.max);
                // force unique capitals
                for (j = 0; j < i; j++) {
                    if (this.answers[i] == this.answers[j]) {
                        i--;
                        break;
                    }
                }
            };
            this.correctAnswer = this.getRandomInt(this.min, this.answers.length - 1);
            $("#target").text(this.states[this.answers[this.correctAnswer]]);
            $("#0").text(this.capitals[this.answers[0]]);
            $("#1").text(this.capitals[this.answers[1]]);
            $("#2").text(this.capitals[this.answers[2]]);
            $("#3").text(this.capitals[this.answers[3]]);
            console.log(this);
            // display timer
            $("#timer").text("timer");
            this.interval.push(setInterval(function () {
                triviaGame.counter += 100;
                triviaGame.timer = (triviaGame.timeLimit - triviaGame.counter) / 1000;
                $("#timer").text(triviaGame.timer);
                if (triviaGame.timer <= 0) {
                    triviaGame.checkAnswer();
                }
            }, 100));
        },
        resetGame: function () {
            $("#wins").text(this.wins);
            $("#losses").text(this.losses);
            this.correct = 0;
            $("#correct").text(this.correct);
            this.incorrect = 0;
            $("#incorrect").text(this.incorrect);
            this.gameState = true;
            $("#result").text("");
            this.updateGame();
        }
    };

    // display and alert rules
    $("#rules").html(`<p>Click the correct state capital in ${triviaGame.timeLimit / 1000} seconds.</p><p>Click ${triviaGame.target} correct state capitals and WIN!!!</p><p>Click ${triviaGame.limit} incorrect state capitals and LOSE!!!</p><p>Click the start button beside the timer below to begin!</p>`);

    // on answer click
    $(".answer").on("click", function () {
        if (triviaGame.gameState == true) {
            triviaGame.checkAnswer($(this).attr("id"));
        }
    });

    // on reset click
    $("#timer").on("click", function () {
        if (triviaGame.gameState == false) {
            triviaGame.resetGame();
        }
    });

});