function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

function formatCurrency(amount) {
  return '$' + amount.toFixed(2);
}

var ShoppingCart = {
  items: [],

  addItem: function (item) {
    this.items.push(item);
  },

  removeItem: function (itemId) {
    var self = this;
    this.items = this.items.filter(function (item) {
      return item.id !== itemId;
    });
  },

  getTotal: function () {
    return calculateTotal(this.items);
  },

  clear: function () {
    this.items = [];
  },
};

module.exports = {
  calculateTotal: calculateTotal,
  formatCurrency: formatCurrency,
  ShoppingCart: ShoppingCart,
};
