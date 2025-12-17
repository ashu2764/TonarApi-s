export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filter = {}) {
    return this.model.find(filter);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async updateById(id, update) {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }
}
