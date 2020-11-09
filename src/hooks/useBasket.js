export class Basket {
  constructor() {
    this.basketStr = 'basket';
    this.ValidateBasket();
    this.basket = JSON.parse(window.localStorage.getItem(this.basketStr));
  }

  GetBasket() {
    return this.basket;
  }

  ValidateBasket() {
    const basket = JSON.parse(window.localStorage.getItem(this.basketStr));
    if(!basket || !Array.isArray(basket)) this.ClearBasket();
  }

  AddProduct(product, size) {
    if(this.basket.find((e) => e.size === size && e.id === product.id)) {
      const newarr = this.basket.map((e) => {
        if(e.size === size && product.id === e.id) {
          const newQuantity = e.quantity + 1;
          return {...product, size: size, quantity: newQuantity}
        } else {
          return e;
        }
      });
      window.localStorage.setItem(this.basketStr, JSON.stringify(newarr));
    } else {
      window.localStorage.setItem(this.basketStr, JSON.stringify([...this.basket, {...product, size: size, quantity: 1}]));
    }
    return `Product '${product.title}' is added to your shopping basket.`;
  }

  EditQuantity(key, quantity) {
    this.basket[key].quantity = quantity;
    window.localStorage.setItem(this.basketStr, JSON.stringify(this.basket));
  }

  RemoveProduct(index) {
    const item = this.basket.find((e, key) => key !== index);
    window.localStorage.setItem(this.basketStr, JSON.stringify(this.basket.filter((e, key) => key !== index)));
    return `Product '${item.title}' is removed from your shopping basket.`;
  }

  ClearBasket() {
    window.localStorage.setItem(this.basketStr, JSON.stringify([]));
  }

}