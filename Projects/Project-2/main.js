function updateTotal() {
  let total = 0;

  // check if item 1 exists
  const item1 = document.getElementById("item1");
  if (item1) {
    const price1 = parseInt(document.getElementById("item-price1").innerText);
    const qty1 = parseInt(document.getElementById("qty1").innerText);
    total += price1 * qty1;
  }

  // check if item 2 exists
  const item2 = document.getElementById("item2");
  if (item2) {
    const price2 = parseInt(document.getElementById("item-price2").innerText);
    const qty2 = parseInt(document.getElementById("qty2").innerText);
    total += price2 * qty2;
  }

  // update total display
  document.getElementById("cart-total").innerText = total;
}

function addqty(item) {
  if (item == 1) {
    let qty = parseInt(document.getElementById("qty1").innerText);
    document.getElementById("qty1").innerText = qty + 1;
  }
  if (item == 2) {
    let qty = parseInt(document.getElementById("qty2").innerText);
    document.getElementById("qty2").innerText = qty + 1;
  }
  updateTotal();
}

function delqty(item) {
  if (item == 1) {
    let qty = parseInt(document.getElementById("qty1").innerText);
    if (qty > 1) document.getElementById("qty1").innerText = qty - 1;
  }
  if (item == 2) {
    let qty = parseInt(document.getElementById("qty2").innerText);
    if (qty > 1) document.getElementById("qty2").innerText = qty - 1;
  }
  updateTotal();
}

function removeItem(item) {
  // remove that item from the page
  if (item == 1) {
    const itemDiv = document.getElementById("item1");
    itemDiv.remove();
  }
  if (item == 2) {
    const itemDiv = document.getElementById("item2");
    itemDiv.remove();
  }

  // update total after removal
  updateTotal();
}
