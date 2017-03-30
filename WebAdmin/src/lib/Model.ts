
export interface Kitchen {
  _id?: string;
  name: string;
  address: string;
}

export interface FoodMenuItem {
  _id?: string;
  title: string;
  description: string;
  price: Number;
  imgURL: string;
}

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

  /** Kitchen */

  async getKitchens(): Promise<Kitchen[]> {
    const fields = '_id, name, address';
    const query = `query { kitchens { ${fields} } }`;
    const result = await this.network.fetchQuery(query);
    return result.kitchens;
  }

  async getKitchen(id: string): Promise<Kitchen> {
    const fields = 'name, address';
    const query = `query { kitchen(id: "${id}") { ${fields} } }`;
    const result = await this.network.fetchQuery(query);
    return result.kitchen;
  }

  async saveKitchen(kitchen: Kitchen) {
    const kitchenFields = 'name, address';
    const kitchenValues = `{ name: "${kitchen.name}", address: "${kitchen.address}" }`;
    const mutSave = `mutation { saveKitchen(newKitchenData: ${kitchenValues}) { ${kitchenFields} } }`;
    const result = await this.network.fetchQuery(mutSave);
    return result.kitchens;
  }

  async updateKitchen(kitchen: Kitchen) {
    const kitchenValues = `{ id: "${kitchen._id}", name: "${kitchen.name}", address: "${kitchen.address}" }`;
    const mutSave = `mutation { updateKitchen(newKitchenData: ${kitchenValues}) }`;
    const result = await this.network.fetchQuery(mutSave);
    return result.updateKitchen;
  }

  async deleteKitchen(kitchenId: string) {
    const mutSave = `mutation { deleteKitchen(kitchenId: "${kitchenId}") }`;
    const result = await this.network.fetchQuery(mutSave);
    return result.deleteKitchen;
  }

  /** Food menu items */

  async saveFoodMenuItem(foodMenuItem: FoodMenuItem) {
    // TODO use removeJSONQuotes
    const values =
      `{
         title: "${foodMenuItem.title}",
         description: "${foodMenuItem.description}",
         price: ${foodMenuItem.price},
         imgURL: "${foodMenuItem.imgURL}",
      }`;
    const mutSave = `mutation { saveFoodMenuItem(fmiData: ${values}) }`;
    const result = await this.network.fetchQuery(mutSave);
    return result.saveFoodMenuItem;
  }

  async updateFoodMenuItem(foodMenuItem: FoodMenuItem) {
    // TODO use removeJSONQuotes
    const values =
      `{
         id: "${foodMenuItem._id}",
         title: "${foodMenuItem.title}",
         description: "${foodMenuItem.description}",
         price: ${foodMenuItem.price},
         imgURL: "${foodMenuItem.imgURL}",
      }`;
    const mutSave = `mutation { updateFoodMenuItem(fmiData: ${values}) }`;
    const result = await this.network.fetchQuery(mutSave);
    return result.updateFoodMenuItem;
  }

  async getFoodMenuItem(id: string): Promise<FoodMenuItem> {
    const fields = 'title, description, price, imgURL';
    const query = `query { foodMenuItem(id: "${id}") { ${fields} } }`;
    const result = await this.network.fetchQuery(query);
    return result.foodMenuItem;
  }

  async deleteFoodMenuItem(id: string) {
    const mutDelete = `mutation { deleteFoodMenuItem(fmiID: "${id}") }`;
    const result = await this.network.fetchQuery(mutDelete);
    return result.deleteFoodMenuItem;
  }
}
