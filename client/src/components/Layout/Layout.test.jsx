import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Layout from './Layout';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('Should render one <Link />', () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });
  it('The <Link /> must route to /pokemons', () => {
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/pokemons');
  });
  it('Should render two <NavLink />', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });
  it('The first <NavLink /> must route to /addPokemon', () => {
    expect(wrapper.find(NavLink).at(0).prop('to')).toEqual('/addPokemon');
  });
  it('The second <NavLink /> must route to /caughtPokemons', () => {
    expect(wrapper.find(NavLink).at(1).prop('to')).toEqual('/caughtPokemons');
  });
});

describe('<Footer />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it('Should render six anchors', () => {
    expect(wrapper.find('a')).toHaveLength(6);
  });
  it('Should render one image', () => {
    expect(wrapper.find('img')).toHaveLength(1);
  });
});

describe('<Layout />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Layout />);
  });

  it('Should render one <Header />', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
  it('Should render one <Footer />', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });
});
