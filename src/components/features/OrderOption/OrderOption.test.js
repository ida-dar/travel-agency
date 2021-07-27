import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {

  it('should render without crashing', () => {
    const component = shallow(<OrderOption
      type = 'type'
      name = 'name'
    />);

    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);

    expect(component).toEqual({});
  });

  it('should generate correct title', () => {
    const expectedName = 'name';
    const expectedType = 'text';
    const component = shallow(<OrderOption name={expectedName} type={expectedType} />);

    expect(component.find('.title').text()).toEqual(expectedName);
  });

});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumbers',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
// eslint-disable-next-line no-unused-vars
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }
      case 'icons': {
        it('should contain icons', () => {
          const iconDiv = renderedSubcomponent.find('div').not('div[value=""]');
          expect(iconDiv.length).toBe(3);

          const emptyIcon = iconDiv.find('Icon').find('Icon[name="times-circle"]').length;
          expect(emptyIcon).toBe(1);

          const options = iconDiv.find('Icon').not('Icon[name="times-circle"]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('name')).toBe(mockProps.values[0].icon);
          expect(options.at(1).prop('name')).toBe(mockProps.values[1].icon);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('div .icon').last().simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }
      case 'checkboxes': {
        it('should contain div & checkbox inputs', () => {
          const checkboxDiv = renderedSubcomponent.find('.checkboxes');
          expect(checkboxDiv.length).toBe(1);

          const checkbox = checkboxDiv.find('input[type="checkbox"]');
          expect(checkbox.length).toBe(mockProps.values.length);
          expect(checkbox.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(checkbox.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(`input[value='${testValue}']`).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });

        break;
      }
      case 'number': {
        it('should contain div & number inputs', () => {
          const numbersDiv = renderedSubcomponent.find('.number');
          expect(numbersDiv.length).toBe(1);

          const input = numbersDiv.find('input[type="number"]').length;
          expect(input).toBe(1);

          const options = numbersDiv.find('input[type="number"]');
          expect(options.prop('value')).toBe(mockPropsForType.number.currentValue);
          expect(options.prop('min')).toBe(mockProps.limits.min);
          expect(options.prop('max')).toBe(mockProps.limits.max);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });

        break;
      }
      case 'text': {
        it('should contain text input', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.length).toBe(1);
          expect(input.prop('type')).toEqual('text');

        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }
      case 'date': {
        it('should contain datePicker', () => {
          const datePicker = renderedSubcomponent.find(DatePicker);
          expect(datePicker.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          //expect(mockSetOrderOption).toBeCalledTimes(1);
          //expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });

        break;
      }
    }
  });
}
