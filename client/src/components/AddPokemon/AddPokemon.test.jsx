import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import AddPokemon from './AddPokemon';
import Layout from '../Layout/Layout';

configure({ adapter: new Adapter() });

describe('<AddPokemon /> Structure', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AddPokemon />);
  });
  it('Must render a <Layout /> component', () => {
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
  it('Must render a <form>', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });
  it('The form must receive a function for onSubmit callback', () => {
    expect(wrapper.find('form').at(0).prop('onSubmit')).toBeInstanceOf(
      Function
    );
  });
  it('Must render 18 checkboxes for the Pokemon Types selection', () => {
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(18);
  });
});
