export function ratingTextToSymbol(rating) {
  switch (rating) {
    case "fav":
      return "⭐️";
    case "great":
      return "👍👍";
    case "good":
      return "👍";
    case "mid":
      return "😑";
    case "bad":
      return "👎";
    default:
      return "❔";
  }
}

export function ratingSymbolToText(rating) {
  switch (rating) {
    case "⭐️":
      return "fav";
    case "👍👍":
      return "great";
    case "👍":
      return "good";
    case "😑":
      return "mid";
    case "👎":
      return "bad";
    case "❔":
      return "";
  }
}

export const ratingOrderingRaw = ["fav", "great", "good", "mid", "bad", ""];
export const ratingOrdering = ratingOrderingRaw.map(ratingTextToSymbol);
