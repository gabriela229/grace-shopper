/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {ProductsList} from './ProductsList.js'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let productsList;

  beforeEach(() => {
    productsList = shallow(<ProductsList/>);
  })

  it('it has search bar', () => {
    // noting here yet
    expect(productsList.find('form').to.be.true);
  })
});
