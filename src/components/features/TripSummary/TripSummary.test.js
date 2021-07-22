import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  const expectedTripId = 'abc',
    expectedTripLink = '/trip/abc',
    expectedImageSrc = 'image.jpg',
    expectedImageName = 'image',
    expectedTripCost = '$1000',
    expectedTripDays = 7,
    expectedTags = ['beach', 'skiing', 'surfing'];

  const component = shallow(<TripSummary
    id = {expectedTripId}
    image = {expectedImageSrc}
    name = {expectedImageName}
    cost = {expectedTripCost}
    days = {expectedTripDays}
    tags = {expectedTags}
  />);

  it('should render without crashing', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should generate correct link of trip address', () => {
    expect(component.find('.link').prop('to')).toEqual(expectedTripLink);
  });

  it('should check if name has correct src & alt', () => {
    expect(component.find('img').prop('src')).toEqual(expectedImageSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedImageName);
  });

  it('should render correctly props name, cost & days', () => {
    expect(component.find('.title').text()).toEqual(expectedImageName);
    expect(component.find('.details').childAt(0).text()).toEqual(`${expectedTripDays} days`);
    expect(component.find('.details').childAt(1).text()).toEqual(`from ${expectedTripCost}`);
  });

  it('should render tags correctly', () => {
    expect(component.find('.tag').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tag').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tag').at(2).text()).toEqual(expectedTags[2]);
  });

  it('should check whether to render tags container', () => {
    //expect(component.find('.tags')).toEqual(false);

    const tagsContainer = component.find('.tags');
    expect(tagsContainer.exists('.tag')).toEqual(false);

  });

});
