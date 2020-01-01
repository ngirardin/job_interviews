function missingWords(s, t) {
  // Write your code here
  // any word in s missing from t
  const input = s.split(" ");
  const search = t.split(" ");

  const missing = input.filter(inputWord => {
    return !search.includes(inputWord);
  });

  return missing;
}

console.log(
  missingWords(
    "I am using hackerrank to improve programming",
    "am hackerrank to improve"
  )
);
console.log(["I", "using", "programming"]);
console.log("---");

console.log(missingWords("I love programming", "programming"));
console.log("expected", ["I", "love"]);
