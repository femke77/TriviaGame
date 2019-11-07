$(document).ready(function () {

    var trivia = [{ q: "What color is the sky?", 1: "yellow", 2: "blue", 3: "orange", 4: "green", ans: "2" }];
    var index = 0;
    var guess;
    var wins = 0;

    $(".section_1").text(trivia[index].q);


    for (var i = 1; i < 5; i++) {

        $(".section_2").append(
            $("<button/>", {
                text: trivia[index][i],
                id: "btn_" + i,
                value: i,
                click: function () {
                    guess = $(this).val();
                    checkCorrect(guess);

                }
            }), "<br/>"
        )
    }


    function checkCorrect(g) {
        var answer = trivia[index].ans;
        var text = $("#btn_" + answer).text();
        if (g == answer) {
            wins++;
            $(".section_1").html("Correct!!");
            $(".section_2").html("");  //image here later

        } else {
            $(".section_1").html("Nope!!");
            $(".section_2").html("The correct answer was " + text);
        }



    }



});