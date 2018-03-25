import * as network from '../../../common/network';
import { IOrderSummary } from '../../../common/Interfaces';
import { objToGrahqlStr } from '../../../common/util';
import { TOrderStatus } from '../../../common/Interfaces';

const ordersStatusFields = [
  '_id',
  'local',
  'localComplement',
  'status',
  'totalAmount',
  'createdOn',
];

export async function getOrders(orderTypes: string[]): Promise<any[]> {
  const params = `
    offset: ${0},
    limit: ${100},
    orderTypes: [${orderTypes.map(ot => `"${ot}"`).join(', ')}]
  `;
  const fieldsStr = ordersStatusFields.join(', ');
  const query = `query { orders( ${params} ) { ${fieldsStr} } }`;
  const result = await network.fetchQuery(query);
  return result.orders;
}

export async function getOrderDetails(orderId: string): Promise<any> {
  const params = `
    orderId: "${orderId}"
  `;
  const fields = [
    '_id',
    'local',
    'localComplement',
    'status',
    'totalAmount',
    'createdOn',
    'paymentOption',
    'telephoneNumber',
    'comments',
    'items { qty, itemTotalPrice, foodMenuItem { title, description, price } }'
  ];
  const fieldsStr = fields.join(', ');
  const query = `query { orderDetails( ${params} ) { ${fieldsStr} } }`;
  const result = await network.fetchQuery(query);
  return result.orderDetails;
}

export async function changeOrderStatus(orderId: string, status: TOrderStatus): Promise<string> {
  const mutation = `mutation { changeOrderStatus( orderId: "${orderId}", status: "${status}" ) }`;
  const result = await network.fetchQuery(mutation);
  return result.msg;
}
