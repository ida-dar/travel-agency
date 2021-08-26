import { formatPrice } from './formatPrice';

export const promoPrice = (cost, discount) => {

  if(cost === undefined || discount === undefined){
    return null;
  } else if(typeof (cost) !== 'number' && typeof (discount) === 'number'){

    const formattedPrice = cost.replace(/^\$\s*/, '').replace(/,/g, '');
    console.log(cost);
    const price = formattedPrice * 0.01 * (100 - discount);

    return formatPrice(price);
  }
};
