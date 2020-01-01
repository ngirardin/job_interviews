const difference = arr => {
  const [n, ...rest] = arr;

  let maxDifference = -1;

  for (let i = 0; i < rest.length; i++) {
    const curr = rest[i];

    console.log(`checking diff for ${curr}`);

    for (let j = 0; j < i; j++) {
      const prev = rest[j];
      const diff = curr - prev;

      console.log(`${curr} - ${prev} = ${diff}`);

      if (diff > maxDifference) {
        maxDifference = diff;
        console.log(`updating max to:${maxDifference}`);
      }
    }
  }

  return maxDifference;
};

console.log(difference([7, 2, 3, 10, 2, 4, 8, 1]));
console.log("expected", 8);

console.log("---");
console.log(difference([6, 7, 9, 5, 6, 3, 2]));
console.log("expected", 2);

console.log("----");
console.log(difference([5, 10, 8, 7, 6, 5]));
console.log("expected", -1);
