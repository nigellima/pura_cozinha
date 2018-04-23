import { expect } from 'chai';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import { Order } from '../../../server/src/db/models/Order';
import * as logger from 'winston';
import * as moment from 'moment-timezone';

describe('kitchen web app store', () => {

  beforeEach(async () => {
    await initFixtures();
  });

  it('get closed orders', async () => {
    const store = new Store();
    await store.onOrdersOpen('CLOSED');
    expect(store.orders).to.have.lengthOf(3);
    expect(store.orders[2].local).to.equal('Prédio 2');
    expect(store.orders[2].totalAmount).to.equal(48.0);
  });

  it('getOrderDetails', async () => {
    const store = new Store();
    await store.onOrdersOpen('OPEN');
    await store.onOrderSelected(store.orders[0]._id);
    expect(store.currentOrder.local).equal('Prédio 1');
    expect(store.currentOrder.items[0].qty).equal(2);
  });

  it('update order status', async () => {
    const store = new Store();
    await store.onOrdersOpen('OPEN');
    await store.onOrderSelected(store.orders[0]._id);
    await store.onStatusChanged('DELIVERED');
    const order = await Order.findById(store.orders[0]._id);
    expect(order.statusHistory).to.have.lengthOf(1);
    expect(order.statusHistory[0].status).to.equal('DELIVERED');
  });

  it('save kitchen comments', async () => {
    const store = new Store();
    await store.onOrdersOpen('OPEN');
    await store.onOrderSelected(store.orders[0]._id);
    store.onCommentsChanged('Cliente pediu sem cebola');
    await store.saveKitchenComments();
    expect(store.currentOrder.kitchenComments).to.equal('Cliente pediu sem cebola');
  });

});