const uri = "api/product";
let products = null;
function getCount(data) {
    const el = $("#counter");
    let name = "product";
    if (data) {
        if (data > 1) {
            name = "products";
        }
        el.text(data + " " + name);
    } else {
        el.html("No " + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        success: function (data) {
            $("#products").empty();
            getCount(data.length);
            $.each(data, function (key, item) {
                $("<tr><td>" + item.id+"</td><td>" + item.name + "</td>" +
                    "<td>" + item.description + "</td>" +
                    "<td>" + item.price + "</td>" +
                    "<td><button onclick=editItem(" + item.id + ")>Edit</button></td>" +
                    "<td><button onclick=deleteItem(" + item.id + ")>Delete</button></td>" +
                    "</tr>").appendTo($("#products"));
            });

            products = data;
        }
    });
}

function addItem() {
    const item = {
        "name": $("#add-name").val(),
        "description": $("#add-description").val(),
        "price": $("#add-price").val()
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("here");
        },
        success: function (result) {
            getData();
            $("#add-name").val("");
            $("#add-description").val("");
            $("#add-price").val("");
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(products, function (key, item) {
        if (item.id === id) {
            $("#edit-name").val(item.name);
            $("#edit-description").val(item.Description);
            $("#edit-price").val(item.Price);
            $("#edit-id").val(item.id);
        }
    });
    $("#spoiler").css({ "display": "block" });
}

$(".my-form").on("submit", function () {
    const item = {
        "id": $("#edit-id").val(),
        "name": $("#edit-name").val(),
        "description": $("#edit-description").val(),
        "price": $("#edit-price").val()        
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#spoiler").css({ "display": "none" });
}