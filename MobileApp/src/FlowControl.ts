import { BackAndroid } from 'react-native';
import * as Paypal from './core/Paypal';

let _navigator = null;

export function setNavigator(navigator) {
  _navigator = navigator;
}


export function getInitialRouteId() {
  return 'kitchens';
}

/** Flow controls */

export const kitchensFlowControl = {
  onKitchenSelected: (id: string) => {
    Paypal.execute(0.70, 'Comida').then(res => console.log(res));
    //_navigator.push({id: 'food_menu' });
  }
};

export const foodMenuListFlowControl = {
  onFoodSelected: (id: string) => {
    _navigator.push({id: 'menu_item', menuItemId: id });
  },
  onMakeOrder: () => {
    _navigator.push({id: 'cart' });
  },
};

export const foodMenuItemFlowControl = {
  onBackClicked: () => {
    _navigator.pop();
  }
};

export const cartFlowControl = {
  onItemSelected: (id: string) => {
    _navigator.push({id: 'menu_item', menuItemId: id});
  },
  onOrderClicked: () => {
    _navigator.push({id: 'address'});
  },
};

export const addressFlowControl = {
  onPayClicked: () => {
    _navigator.push({id: 'credit_card'});
  }
};

/*
export const creditCardFlowControl = {
  afterPayment: () => {
    // _navigator.popToTop();
    _navigator.push({id: 'final_ok_page'});
  }
};
*/

export const finalOkPageFlowControl = {
  onOkClicked: () => {
    _navigator.resetTo({id: 'kitchens'});
  }
};

BackAndroid.addEventListener('hardwareBackPress', function() {
  _navigator.pop();
  return true;
});