
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  searchItems,
  suggestMatches
} = require("./searchMatching");

const lostItem = {
  itemName: "Black Wallet",
  category: "Wallet",
  color: "Black",
  location: "IUB",
  dateLost: "2026-11-10"
};

const foundItems = [
  {
    itemName: "Black Wallet",
    description: "Leather wallet",
    category: "Wallet",
    color: "Black",
    location: "IUB",
    dateFound: "2026-11-11",
    status: "Available"
  },
  {
    itemName: "Silver Phone",
    description: "Samsung phone",
    category: "Electronics",
    color: "Silver",
    location: "Dhaka",
    dateFound: "2026-11-12",
    status: "Available"
  }
];

test("search by keyword", () => {
  assert.equal(
    searchItems(foundItems, { keyword: "wallet" }).length,
    1
  );
});

test("filter by category and location", () => {
  assert.equal(
    searchItems(foundItems, {
      category: "Wallet",
      location: "IUB"
    }).length,
    1
  );
});

test("suggest a matching item", () => {
  const matches = suggestMatches(lostItem, foundItems);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].matchScore, 100);
});

test("should reject incorrect date sequence", () => {
  const { matchScore } = require("./searchMatching");

  const lost = {
    itemName: "Black Wallet",
    category: "Wallet",
    color: "Black",
    location: "IUB",
    dateLost: "2026-11-10"
  };

  const found = {
    itemName: "Black Wallet",
    category: "Wallet",
    color: "Black",
    location: "IUB",
    dateFound: "2026-11-09"
  };

  const score = matchScore(lost, found);

  assert.equal(score, 85);
});
