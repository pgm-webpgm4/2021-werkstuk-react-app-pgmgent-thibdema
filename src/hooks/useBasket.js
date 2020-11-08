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
    console.log(window.localStorage.getItem(this.basketStr));
    if(this.basket.find((e) => e.size === size && e.id === product.id)) {
      console.log('test');
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

  EditQuantity(id) {

  }

  RemoveProduct(id) {
    const item = this.basket.find((e) => e.id = id);
    window.localStorage.setItem(this.basketStr, JSON.stringify(this.basket.filter((e) => e.id !== id)));
    return `Product '${item.title}' is removed from your shopping basket.`;
  }

  ClearBasket() {
    window.localStorage.setItem(this.basketStr, JSON.stringify([]));
  }

}