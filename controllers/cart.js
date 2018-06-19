module.exports = function Cart(oldcart){
  this.items = oldcart.items || {};
  this.totalQty = oldcart.totalQty || 0;
  this.totalPrice = oldcart.totalPrice || 0;

  this.add = function(item, id){
    var storedItem = this.items[id];
    if(!storedItem)
    {
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
    }
    storedItem.qty++;
    storedItem.price = storedItem.qty * storedItem.item.price;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  this.generatearray = function(){
    var arr = [];
    for(var id in this.items)
    {
      arr.push(this.items[id]);
    }
  
    return arr;
  };
};
