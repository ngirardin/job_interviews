const bundleQuantities = [20, 19];
const bundleCosts = [24, 20];

function budgetShopping(n, bundleQuantities, bundleCosts) {
  const offers = bundleQuantities
    .map((qty, index) => {
      const cost = bundleCosts[index];
      const unitPrice = cost / qty;

      return { cost: cost, qty: qty, unitPrice: unitPrice };
    })
    .sort((i1, i2) => {
      return i1.unitPrice - i2.unitPrice;
    });

  let budget = n;
  let qty = 0;

  for (offer of offers) {
    console.log(offer);
    const canBuyMax = Math.floor(budget / offer.unitPrice);

    console.log(`Can buy ${canBuyMax} at ${offer.unitPrice}`);

    if (canBuyMax > offer.qty) {
      console.log(
        `Bundle the whole budnle: ${offer.qty} books for ${offer.cost}`
      );
      qty = qty + offer.qty;
      budget = budget - offer.cost;
    } else {
      console.log(
        `Buying the whole bunle ${canBuyMax} at ${
          offer.unitPrice
        } = ${canBuyMax * offer.unitPrice}`
      );
      qty = qty + canBuyMax;
      budget = budget - qty * offer.unitPrice;
    }

    console.log(`now having ${qty} books with remaining budget ${budget}`);

    if (budget === 0) {
      console.log(`No more budget, bought ${qty}`);
      return qty;
    }

    if (budget < 0) {
      throw new Error("Uh oh, spent too much money!");
    }
  }
}

console.log(budgetShopping(50, bundleQuantities, bundleCosts));
