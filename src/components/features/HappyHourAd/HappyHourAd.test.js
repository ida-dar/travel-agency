import React from 'react';
import { shallow } from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  descr: '.promoDescription',
};

const mockProps = {
  title: 'title',
  promoDescription: 'decription',
};

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatTime.js'); // instead of 'import' we use 'requireActual' to make sure that we are importing the actual code of this file, not the mocked version
  utilsModule.formatTime = jest.fn(seconds => seconds); // 'formatTime' is changed into mock function that always returns the argument passed to that function.
});

describe('Component HappyHourAd', () => {

  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });

  it('should render title and description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.descr)).toEqual(true);
  });

  it('should render correct title & description', () => {
    const component = shallow(<HappyHourAd {...mockProps} />);
    const expectedTitle = mockProps.title;

    expect(component.find(select.title).text()).toEqual(expectedTitle);
  });
});

/* The Date class is responsible for checking the current time (or the time defined by us, pretending to be the current time).
Timers, controlled by 'useFakeTimers' and 'advanceTimersByTime', affect when the function passed to 'setTimeout' or 'setInterval' is executed.
Those two types of time work independently from each other, so they need to be controled separately.*/

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
    global.Date = mockDate(`2021-07-25T${time}.135Z`); // The tests are run in NodeJS. There all global methods & classes are in object called 'global', 'cause there's no window object. Therefore, in order to replace class Date, global.Date is used.

    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.descr).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2021-07-25T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);

    const newTime = new Date(); // gets 'current' date, but with replaced Date with a class it will always return the same time
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime()); // from now on, Date will return as many seconds later as specified in the delaySeconds argument

    jest.advanceTimersByTime(delaySeconds * 1000); // constrols the time flow in JS. With advanceTimersByTime method the time flow is accelerated to make another refresh of the component.

    const renderedTime = component.find(select.descr).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});

describe('Component HappyHourAd with rendered promo description', () => {
  checkDescriptionAtTime('12:00:00', mockProps.promoDescription);
  checkDescriptionAtTime('12:57:58', mockProps.promoDescription);
  checkDescriptionAtTime('12:59:59', mockProps.promoDescription);
});

describe('Component HappyHourAd before & after promo', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('12:58:58', 0, mockProps.promoDescription);
  checkDescriptionAfterTime('14:00:00', 60 * 60, 21 * 60 * 60 + '');
});
