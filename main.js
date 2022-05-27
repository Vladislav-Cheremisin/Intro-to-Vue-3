const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: false,
      productDetails: 'The pair of warm fuzzy socks',
    };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeCartElement(id) {
      const lastCurrentElement = this.cart.lastIndexOf(id);

      this.cart.splice(lastCurrentElement, 1);
    },
  },
});
