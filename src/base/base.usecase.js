
export class BaseUsecase {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(filter = {}) {
    return this.repository.findAll(filter);
  }

  async update(id, update) {
    return this.repository.updateById(id, update);
  }
}
