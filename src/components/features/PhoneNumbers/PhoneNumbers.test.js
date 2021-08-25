import React from 'react';
import { shallow } from 'enzyme';
import PhoneNumbers from './PhoneNumbers';

const select = {
  descr: 'span',
};

describe('Component PhoneNumbers', () => {

  it('should render without crashing', () => {
    const component = shallow(<PhoneNumbers />);
    expect(component).toBeTruthy();
  });
});


const trueDate = Date;

const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2021-07-25T${time}.135Z`);

    const component = shallow(<PhoneNumbers />);
    const renderedTime = component.find(select.descr).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component PhoneNumbers with mocked Time', () => {
  checkDescriptionAtTime('03:57:58', 'The office opens at 8:00 UTC');
  checkDescriptionAtTime('07:59:59', 'The office opens at 8:00 UTC');
  checkDescriptionAtTime('22:00:00', 'The office opens at 8:00 UTC');

  checkDescriptionAtTime('08:00:00', 'Amanda, 678.243.8455');
  checkDescriptionAtTime('08:57:58', 'Amanda, 678.243.8455');
  checkDescriptionAtTime('11:59:59', 'Amanda, 678.243.8455');

  checkDescriptionAtTime('12:00:00', 'Tobias, 278.443.6443');
  checkDescriptionAtTime('14:00:00', 'Tobias, 278.443.6443');
  checkDescriptionAtTime('15:59:59', 'Tobias, 278.443.6443');

  checkDescriptionAtTime('16:00:00', 'Helena, 167.280.3970');
  checkDescriptionAtTime('19:00:00', 'Helena, 167.280.3970');
  checkDescriptionAtTime('21:59:59', 'Helena, 167.280.3970');
});
