app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
    productDetails: {
      type: String,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :class="{ 'out-of-stock-img': !inStock }" :src="image">
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
  
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          
          <p>Shipping: {{ shipping }}</p>
          <p>Product details: {{ productDetails }}</p>
          <div class="circle-container">
            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)" 
              class="color-circle" 
              :style="{ backgroundColor: variant.color }">
            </div>
          </div>
          
          <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            @click="addToCart">
            Add to Cart
          </button>
          <button
            class="button"
            :class="{ disabledButton: isCartEmpty}"
            :disabled="isCartEmpty" 
            @click="removeFromCart">
            Remove
          </button>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 5 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 2 },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.id);
      this.variants[this.selectedVariant].quantity -= 1;
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.id);

      this.variants[this.selectedVariant].quantity += 1;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }

      return '2.99';
    },
    id() {
      return this.variants[this.selectedVariant].id;
    },
    isCartEmpty() {
      return !Boolean(this.cart.includes(this.id));
    },
  },
});
