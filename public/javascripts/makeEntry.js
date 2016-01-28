$(document).ready(init);

function init() {
    console.log('inside init of makeEntry.js');

    $('.btn-success').on('click', makeEntry);
}

function makeEntry() {
    var item = $('#item').val();
    var cost = $('#cost').val();
    var number = $('#number').val();
    var description = $('#description').val();
    var itemInfo = {
        item: item,
        cost: parseFloat(cost).toFixed(2),
        number: parseFloat(number).toFixed(0),
        description: description
    };

    $.post('/operations', itemInfo)
        .success(function (data) {
            //alert('saved');


        });
}