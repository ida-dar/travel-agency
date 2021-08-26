import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';
import {promoPrice} from '../../../utils/promoPrice';
import { getCountdownTime } from '../../../utils/getCountdownTime';

describe('Component TripSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<TripSummary
      id = 'abs'
      image = 'image.jpg'
      name = 'image'
      cost = '$1000'
      days = {7}
      tags = {['beach', 'skiing', 'surfing']}
    />);

    expect(component).toBeTruthy();
  });

  it('should generate correct link of trip address', () => {
    const expectedTripLink = '/trip/abc';
    const expectedId = 'abc';
    const component = shallow(<TripSummary id={expectedId} />);

    expect(component.find('.link').prop('to')).toEqual(expectedTripLink);
  });

  it('should check if name has correct src & alt', () => {
    const expectedImageSrc = 'image.jpg';
    const expectedImageName = 'name';
    const component = shallow(<TripSummary image={expectedImageSrc} name={expectedImageName} />);

    expect(component.find('img').prop('src')).toEqual(expectedImageSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedImageName);
  });

  it('should render correctly props name, cost & days', () => {
    const expectedImageName = 'name';
    const expectedTripDays = 7;
    const expectedTripCost = '$1000';
    const expectedPromoPrice = promoPrice(expectedTripCost, 20);
    const countDown = getCountdownTime();
    const component = shallow(<TripSummary name={expectedImageName} days={expectedTripDays} cost={expectedTripCost} />);

    expect(component.find('.title').text()).toEqual(expectedImageName);
    expect(component.find('.details').childAt(0).text()).toEqual(`${expectedTripDays} days`);
    countDown > 23 * 60 * 60 ?
      expect(component.find('.details').childAt(1).text()).toEqual(`from ${expectedTripCost}`) :
      (expect(component.find('.details').childAt(1).text()).toEqual(`Price from ${expectedPromoPrice}`),
      expect(component.find('.details').childAt(2).text()).toEqual(`Standard price from ${expectedTripCost}`));
  });

  it('should render tags correctly', () => {
    const tagOne = 'beach';
    const tagTwo = 'skiing';
    const tagThree = 'surfing';
    const expectedTags = [tagOne, tagTwo, tagThree];
    const component = shallow(<TripSummary tags={expectedTags} />);

    expect(component.find('.tag').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tag').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tag').at(2).text()).toEqual(expectedTags[2]);
  });

  it('should check whether to render tags container', () => {
    const component = shallow(<TripSummary />);

    expect(component.find('.tags').exists()).toEqual(false);
  });
});
