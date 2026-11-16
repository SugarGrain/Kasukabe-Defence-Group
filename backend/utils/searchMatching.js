
function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

// Search lost or found items
function searchItems(items, filters = {}) {
  const { keyword = "", category = "", location = "" } = filters;

  return items.filter((item) => {
    const text = normalize(
      `${item.itemName} ${item.description}`
    );

    return (
      text.includes(normalize(keyword)) &&
      (!category ||
        normalize(item.category) === normalize(category)) &&
      (!location ||
        normalize(item.location).includes(normalize(location)))
    );
  });
}

// Calculate a rule-based matching score
function matchScore(lost, found) {
  if (
    !normalize(lost.category) ||
    normalize(lost.category) !== normalize(found.category)
  ) {
    return 0;
  }

  let score = 30;

  // Location matching
  if (
    normalize(lost.location) &&
    normalize(lost.location) === normalize(found.location)
  ) {
    score += 25;
  }

  // Color matching
  if (
    normalize(lost.color) &&
    normalize(lost.color) === normalize(found.color)
  ) {
    score += 15;
  }

  // Date matching - corrected version
  const lostTime = Date.parse(lost.dateLost);
  const foundTime = Date.parse(found.dateFound);

  if (
    Number.isFinite(lostTime) &&
    Number.isFinite(foundTime)
  ) {
    const days = (foundTime - lostTime) / 86400000;

    if (days >= 0 && days <= 7) {
      score += 15;
    }
  }

  // Item name matching
  const lostName = normalize(lost.itemName);
  const foundName = normalize(found.itemName);

  if (lostName && lostName === foundName) {
    score += 15;
  } else {
    const words = lostName.split(/\s+/).filter(Boolean);

    if (
      words.some((word) =>
        foundName.split(/\s+/).includes(word)
      )
    ) {
      score += 8;
    }
  }

  return score;
}

// Suggest possible matches
function suggestMatches(lostItem, foundItems) {
  return foundItems
    .filter((item) => normalize(item.status) === "available")
    .map((item) => ({
      ...item,
      matchScore: matchScore(lostItem, item)
    }))
    .filter((item) => item.matchScore >= 50)
    .sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = {
  searchItems,
  matchScore,
  suggestMatches
};
