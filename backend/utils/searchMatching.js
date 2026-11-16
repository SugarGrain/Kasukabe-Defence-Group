
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

function nameSimilarityScore(name1, name2) {
  const getWords = (name) => {
    return new Set(
      normalize(name)
        .replace(/[^a-z0-9]+/g, " ")
        .split(/\s+/)
        .filter(Boolean)
    );
  };

  const words1 = getWords(name1);
  const words2 = getWords(name2);

  if (words1.size === 0 || words2.size === 0) {
    return 0;
  }

  const common = [...words1].filter(word => words2.has(word));
  const union = new Set([...words1, ...words2]);

  const similarity = common.length / union.size;

  return Math.round(similarity * 15);
}

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
  
const namePoints = nameSimilarityScore(
  lost.itemName,
  found.itemName
);

score += namePoints;


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
