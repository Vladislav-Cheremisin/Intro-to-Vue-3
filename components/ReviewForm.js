app.component('review-form', {
  template:
    /*html*/
    `<form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="name">

    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <p>Will you be able to recommend this product to other users?</p>
    <div class="radio-container">
      <label for="yes-choice">Yes</label>
      <input type="radio" value="Yes" name="recommend-choice" id="yes-choice" v-model="recommendation">

      <label for="yes-choice">No</label>
      <input type="radio" value="No" name="recommend-choice" id="yes-choice" v-model="recommendation">
    </div>

    <input class="button" type="submit" value="Submit">  
  </form>`,
  data() {
    return {
      name: '',
      review: '',
      rating: null,
      recommendation: '',
    };
  },
  methods: {
    onSubmit() {
      if (this.name === '' || this.review === '' || this.rating === null || this.recommendation === '') {
        alert('Review is incomplete. Please fill out every field.');
        return;
      }

      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        recommendation: this.recommendation,
      };
      this.$emit('review-submitted', productReview);

      this.name = '';
      this.review = '';
      this.rating = null;
      this.recommendation = '';

      console.log(productReview);
    },
  },
});
