var expect = require("chai").expect;

function badClients() {

}

var clients = [
  {firstName: "Princess", lastName: "Hernández", balance: 50},
  {firstName: "Darth", lastName: "Vader", balance: -20},
  {firstName: "Luke", lastName: "Skywalker", balance: -30},
  {firstName: "Han", lastName: "Solo", balance: 100}
];

describe("functional", function () {

  it("should return the full name of client with balance < 0", function() {
    expect(badClients(clients)).to.eql(["Darth Vader", "Luke Skywalker"])
  });

});