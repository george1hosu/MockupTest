var utils = require('utils');
var x = require('casper').selectXPath;
var tStamp = new Date().getTime();
var DelXPath = '';
var colorizer = require('colorizer').create('Colorizer');

var unorderdList = [];
var orderedList = [];
for (var i = 0; i < 5; i++) {
    unorderdList[i] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
}

//var casper = require('casper').create();
phantom.casperTest = true;

var textFileData = require('fs').open('data.txt', 'r');
var data = textFileData.readLine();

casper.start();

function sortList(list) {
    casper.then(function() {
        this.echo('==================================');
        this.echo('SORTING LIST');
        this.echo('==================================');
    });
    casper.wait(500);
    orderedList = list.sort();
    casper.wait(500);
}

function checkSort(l) {
    casper.then(function() {
        this.echo('==================================');
        this.echo('CHECKING IF LIST IS SORTED CORRECTLY');
        this.echo('==================================');
    });
    casper.then(function() {
        this.echo(l[0]);
        this.echo(l[1]);
        this.echo(l[2]);
        this.echo(l[3]);
        this.echo(l[4]);
    });
    casper.then(function() {
    casper.test.assert((l[0] <= l[1]) && (l[1] <= l[2]) && (l[2] <= l[3]) && (l[3] <= l[4]),
        "The list has been indeed sorted");
    });

}

function equalsOne() {
    casper.then(function() {
        this.echo('==================================');
        this.echo('CHECKING IF UNITY IS INDEED WELL DEFINE');
        this.echo('==================================');
    });
    casper.test.assert(1 == 1*1 == 2/2 == ((10010 / 10) - 1)*0.001, "The universe is working");
}

function checkContent(data) {
    casper.then(function() {
        this.echo('==================================');
        this.echo('CHECKING THE CONTENTS OF "data.txt"');
        this.echo('==================================');
    });
    casper.test.assert(data == "Datele_Testului", "The data is correct");
}

casper.test.begin('Mockup Test', 3, function(test) {
    sortList(unorderdList);
    casper.wait(500);
    checkSort(orderedList);
    equalsOne();
    checkContent(data);
});

casper.run(function() {
    this.test.done();
});