class Order {
  constructor(url, user, quantity) {
    this.link = url;
    this.user = user;
    this.quantity = quantity;
  }
  setPartNumber(partNumber) {
    this.partNumber = partNumber;
  }
  getPartNumber() {
    return this.partNumber;
  }
  setMPartNumber(partNumber) {
    this.mPartNumber = partNumber;
  }
  getMPartNumber() {
    return this.mPartNumber;
  }
  setDescription(description) {
    this.description = description;
  }
  getDescription() {
    return this.description;
  }
  setComment(comment) {
    this.comment = comment;
  }
  getComment() {
    return this.comment;
  }
  setLink(link) {
    this.link = link;
  }
  getLink() {
    return this.link;
  }
  setCost(cost) {
    this.cost = cost;
  }
  getCost() {
    return this.cost;
  }
  setQuantity(quantity) {
    this.quantity = quantity;
  }
  getQuantity() {
    return this.quantity;
  }
  setSupplier(supplier) {
    this.supplier = supplier;
  }
  getSupplier() {
    return this.supplier;
  }
  setUser(user) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
}

module.exports = Order;
