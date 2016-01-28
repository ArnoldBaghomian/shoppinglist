$(document).ready(init);

var sumCost = 0;
var rowArray = [];
var itemArray = [];

function init() {
    console.log('!!!inside init of main.js');
    $('.items-list').on('click', '.detail-col', showDetail);
    $('.items-list').on('click', '.change-col', changeEntry);
    $('.items-list').on('click', '.delete-col', deleteEntry);
    showList();
}


function changeEntry() {
    var indexOfItem = $(this).closest('.row-container').index()-1;
    var itemObject = itemArray[indexOfItem];
    var itemId = itemObject._id;
    location.href = '/changeEntry' + itemId;
}

function deleteEntry() {

    var index = $(this).closest('.row-container').index()-1;

    var id = itemArray[index]._id;

    $.ajax({
            method: "DELETE",
            url: "/operations/" + id
        })
        .done(function (status) {
            sumCost = 0;
            showList();
        });

}

function findSum() {
    itemArray.map(function (item, index) {
        return sumCost += item.cost * item.number;
    });
}

function showDetail() {
    var index = $(this).closest('.row-container').index()-1;
    var id = itemArray[index]._id;
    location.href = '/itemDetails' + id;
}

function makeTable() {
    $('.items-list').empty();  // empty the html table
    rowArray.splice(0, rowArray.length); //empty the global array

    var $headers = $('<tr>').addClass('row row-container row-title');

    var $itemHeader = $('<th>').addClass('item-col col-md-2 col-xs-2').text('item');
    var $costHeader = $('<th>').addClass('item-col col-md-1 col-xs-1').text('cost');
    var $numberHeader = $('<th>').addClass('item-col col-md-1 col-xs-1').text('number');
    $headers.append($itemHeader);
    $headers.append($costHeader);
    $headers.append($numberHeader);

    rowArray.push($headers);

    itemArray.map(function (entry) {
        var $row = $('<tr>').addClass('row row-container');
        var $item = $('<td>').addClass('item-col col-md-2 col-xs-2 text-left').text(entry.item);
        var $cost = $('<td>').addClass('cost-col col-md-1 col-xs-1').text('$' + entry.cost.toFixed(2));
        var $number = $('<td>').addClass('number-col col-md-1 col-xs-1').text('' + entry.number);
        var $details = $('<td>').addClass("detail-col col-md-2 col-xs-2 btn-info btn-rounded  details").text('Details');
        var $spaceColumn = $('<td>').addClass("space-col col-md-1 col-xs-1").text(' ');
        var $change = $('<td>').addClass("change-col col-md-2 col-xs-2 btn-primary btn-rounded changeEntry").text('Change');
        var $spaceColumn2 = $('<td>').addClass("space-col col-md-1 col-xs-1").text(' ');
        var $delete = $('<td>').addClass("delete-col col-md-2 col-xs-2 btn-danger btn-rounded deleteEntry").text('Delete');
        $row.append($item);
        $row.append($cost);
        $row.append($number);
        $row.append($details);
        $row.append($spaceColumn);
        $row.append($change);
        $row.append($spaceColumn2);
        $row.append($delete);
        rowArray.push($row);
    });

}

function showList() {
    $.get('/operations', function (data) {
        itemArray = data;
        findSum();
        makeTable();
        showTable();
    });
}

function showTable() {
    $('.items-list').append(rowArray);
    $('.bottomLine').text(''+sumCost.toFixed(2));
}