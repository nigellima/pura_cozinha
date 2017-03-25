
export class Model {

  private network: any;

  constructor(network) {
    this.network = network;
  }

  async getFoodMenuItems() {
    try {
      const fields = '_id, title, price, description, imgURL';
      const query = `query { menuItems(lat: 0.0, lng: 0.0) { ${fields} } }`;
      const result = await this.network.fetchQuery(query);
      return result.menuItems;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async getOrders() {
    const fields = 'id, kitchen { _id, name }, total, datetime, status';
    const query = `query { orders { ${fields} } }`;
    const result = await this.network.fetchQuery(query);
    return result.orders;
  }


}
