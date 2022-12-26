// REFACTORING API FEATURES

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString; // Query obj that we get from req
  }

  filter() {
    // 1) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // We must do this before filtering always
    excludedFields.forEach(el => delete queryObj[el]); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // 2) Advanced filtering  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let queryStr = JSON.stringify(queryObj);

    // Regular expression (just find them on google)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    this.query.find(JSON.parse(queryStr)); // Find returns the query
    return this;
  }

  sort() {
    // 3) Sorting //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! // sort('price createdAt slug')
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    // 4) Field limiting //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! // select('price createdAt slug color')
    } else {
      this.query = this.query.select('-__v'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    return this;
  }

  paginate() {
    // 5) Pagination  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

    return this;
  }
}

module.exports = APIFeatures;
