//displays leaderboard periodically
function cycleLeaders() {
    window.setInterval(function () {
        getLeaders(getRan(1, 4));
    }, 30000);
};

function getLeaders(gameMode) {
    var toSend = "mode=" + gameMode;
    $.ajax({
        url: 'eb/display_leaders.php',
        type: "POST",
        data: toSend,
        success: function (data) {
            $('#leaderBoard').html(data);
        }, error: function() {
            console.log("Error.\n");
        }
    });
}


// Checks input and adds scores to leaderboard database
function getInitials() {
    var initialsIn = $("#initialInput").val();
    var initials = [];
    for (var i = 0; i < initialsIn.length; i++) {
        if (initialsIn.charCodeAt(i) >= 65 && initialsIn.charCodeAt(i) <= 90) {
            initials.push(initialsIn[i]);
        }
        else if (initialsIn.charCodeAt(i) >= 97 && initialsIn.charCodeAt(i) <= 122) {
            initials.push(initialsIn[i].toUpperCase());
        }
    }
    if (initials.length > 2 && initials.length < 6) {
        if ($("#initialInput").hasClass("invalidInput")) {
            $("#initialInput").removeClass("invalidInput");
        }
        addScore(initials.join(""));
    } else {
        $("#initialInput").addClass("invalidInput");
        return 0;
    }
}

function addScore(initials) {
    var toSend = "mode=" + gameMode + "&initials=" + initials + "&score="+score;

    $(function () {
        $.ajax({
            url: 'eb/add.php',
            type: 'POST',
            data: toSend,
            success: function (data) {
                console.log(data);
            }, error: function() {
                console.log("Error.\n");
            }
        });
    });
}
