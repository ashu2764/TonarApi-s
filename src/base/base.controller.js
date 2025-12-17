export class BaseController {
  constructor(usecase) {
    this.usecase = usecase;
  }

  async getAll(req, res) {
    const data = await this.usecase.getAll(req.query);
    res.json(data);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = await this.usecase.update(id, req.body);
    res.json(data);
  }
}
