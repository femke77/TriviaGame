//TODO: get the countdown working and "out of time" display code

$(document).ready(function () {

    var trivia = [{ q: "What color is the sky?", 1: "yellow", 2: "blue", 3: "orange", 4: "green", ans: "2" },
                  { q: "What color is the ocean?", 1: "yellow", 2: "red", 3: "orange", 4: "blue", ans: "4" }];
    var index = 0;
    var wins = 0;
    var n;
    var timer;

    game();

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
                        checkAnswer(guess);
                    }
                }), "<br/>"
            )
        }
    }
    
    function checkAnswer(g) {
        clearTimeout(timer);
        var answer = trivia[index].ans;
        if (g == answer) {
            wins++;
            $(".section_1").html("Correct!!");
            $(".section_2").html("");  //image here later

        } else {
            $(".section_1").html("Nope!!");
            $(".section_2").html("The correct answer was " + $("#btn_" + answer).text());
        }    
        index++;
        setTimeout(game, 2000);
    }

    function game(){
        n = 5;
        if (index < trivia.length){
            countdown();
            $(".section_1").text(trivia[index].q);  
            $(".section_2").text("");
            answerButtons();
        } else {
            $(".timer").text("")
            $(".section_1").html("You got " + wins + " out of " + trivia.length + " questions correct!");
            $(".section_2").html("Good Job! <br/>");
            $(".section_2").append(
                $("<button/>", {
                    text: "Restart",
                    id: "restartBtn",
                    click: function () {
                        reset();
                    }
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
            index++;
            setTimeout(game, 2000);
        }
    }

    function reset(){
        wins = 0;
        index = 0;
        game();

    }

});