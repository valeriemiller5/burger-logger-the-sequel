// create functions to make the buttons in index.handlebars work
$(function() {
    $(".change-devour").on("click", function(event) {
        var id = $(this).data("id");

        var eatStatus = {
            devoured: true
        }

        $.ajax("/api/burgers/" + id, {
            type: "PUT", 
            data: eatStatus
        }).then(function() {
                console.log("Eat Status: " + true);
                location.reload();
        });
    });

    $(".burgerForm").on("submit", function(event) {
        event.preventDefault();

        var name = $("[name=burgerName]").val().trim();

        if(name !== "") {
            var newBurger = {
                burger_name: name,
                devoured: false
            }

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("New burger logged");
            location.reload();
        });
        } else {
            $("[name=burgerName]").val("");
        };
    });
});