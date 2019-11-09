//TODO: 
//      add the quiz
//      finish the styling, add images

//      make all the times correct, 4-5 seconds btwn and 30 sec for answers

$(document).ready(function () {

    var trivia = [{ q: "What Manhattan neighborhood did Jerry reside in?", 1: "Lower East Side", 2: "Upper East Side", 3: "Upper West Side", 4: "Soho", ans: "3" },
    { q: "Which Seinfeld writer voiced George Steinbrenner on and off from seasons five through nine?", 1: "Larry David", 2: "Peter Mehlman", 3: "Larry Charles", 4: "Spike Feresten", ans: "1" },
    { q: "Guest-star Teri Hatcher’s breasts, as confirmed by her character Sidra in season four’s 'The Implant,' were not only real, but …", 1: "unforgettable", 2: "remarkable", 3: "spectacular", 4: "exceptional", ans: "3" },
    { q: "In season six’s 'The Doorman,' Frank Costanza wants to name the chest-support garment he and Kramer invent 'the Manssiere,' but Kramer prefers…", 1: "'the Bro'", 2: "'Man's Best Friend'", 3: "'the Breast Man'", 4: "'the Buddy System'", ans: "1" },
    { q: "Which of these occupations did George’s alias, Art Vandelay, NOT purport to peddle in?", 1: "latex salesman", 2: "garbageman", 3: "novelist", 4: "importer-exporter", ans: "2" },
    { q: "The Tao of Jerry: Newman is the _________ to his Superman.", 1: "Kryptonite", 2: "Lex Luthor", 3: "Lois Lane", 4: "Jimmy Olsen", ans: "2" },
    { q: "The last Seinfeld episode written or co-written by Larry David was …", 1: "'The Finale'", 2: "'The Cadillac'", 3: "'The Invitations'", 4: "'The Contest'", ans: "1" },
    { q: "In later seasons, Kramer frequently sought the counsel of an excitable attorney who parodied which member of O.J. Simpson’s defense team?", 1: "Robert Kardashian", 2: "Johnnie Cochran", 3: "Alan Dershowitz", 4: "F. Lee Bailey", ans: "2" },
    { q: "Elaine’s preferred 'big salad' is, per her illustration, like a salad, 'only bigger, ________.'", 1: "with more of everything", 2: "with lots of stuff in it", 3: "with more ingredients", 4: "like a big salad", ans: "2" },
    { q: "Elaine has many talents, including copyediting and recreational skiing. But, as we learn in season eight’s 'The Little Kicks,' this skill is not one of them.", 1: "singing", 2: "cooking", 3: "dancing", 4: "soccer", ans: "3" }
    ];
    var index = 0;
    var wins = 0;
    var losses = 0;
    var timeOuts = 0;
    var n;
    var timer;


    start();

    function start() {
        $(".timer").html("")
        $(".section_1").html("Ready to play?")
        $(".section_2").html(
            $("<button/>", {
                text: "Start Playing!",
                click: game
            })
        )
    }

    function answerButtons() {
        var guess;
        for (var i = 1; i < 5; i++) {
            $(".section_2").append(
                $("<button/>", {
                    text: trivia[index][i],
                    id: "btn_" + i,
                    value: i,
                    click: function () {
                        guess = $(this).val();
                        $(this).css("background-color" , "pink");
                        setTimeout(function(){
                            checkAnswer(guess);
                        }, 1000);                       
                    }
                }), "<br/>"
            )
        }
    }
    
    function checkAnswer(guess) {
        clearTimeout(timer);
        var answer = trivia[index].ans;
        if (guess== answer) {
            wins++;
            $(".section_1").html("Correct!!");
            $(".section_2").html("");  //image here later

        } else {
            losses++;
            $(".section_1").html("Nope!!");
            $(".section_2").html("The correct answer was " + $("#btn_" + answer).text());
        }    
        index++;
        setTimeout(game, 2000);
    }

    function game() {
        n = 5;
        if (index < trivia.length) {
            countdown();
            $(".section_1").text(trivia[index].q);
            $(".section_2").text("");
            answerButtons();
        } else {
            $(".timer").text("")
            $(".section_1").html("You got " + wins + " out of " + trivia.length + " questions correct! <br/> You got " + losses
                + " questions incorrect. <br/> You missed " + timeOuts + " questions.");
            $(".section_2").html("Good Job! <br/>");
            $(".section_2").append(
                $("<button/>", {
                    text: "Restart",
                    id: "restartBtn",
                    click: reset
                })
            )
        }
    }

    function countdown() {
        $(".timer").text("Time remaining: " + n + " seconds.")
        timer = setTimeout(() => {
            countdownHelper(n)
        }, 1000)
    }

    function countdownHelper(){
        n--       
        if (n > 0){
            countdown();
        } else {
            $(".timer").text("Time remaining: 0 seconds.");
            $(".section_1").text("Out of time!");
            $(".section_2").text("");
            timeOuts++;
            index++;
            setTimeout(game, 2000);
        }
    }

    function reset(){
        wins = 0;
        index = 0;
        start();

    }

});