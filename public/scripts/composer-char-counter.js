$(document).ready(function() {
    $("#tweetbox").keyup(function() {
        let tyChar = this.value.length
        const maxChar = 140;
        let remChar = (maxChar - tyChar);
        $("span.counter").text(remChar);
        if (remChar <0) {
            document.getElementById("counter").style.color = "#ff0000";
        } else {
            document.getElementById("counter").style.color = "#000000";
        }
   });
});