import React from 'react'
import { Text } from 'react-native'
import { shallow } from 'enzyme'
import ListItem from '../../src/components/ListItem'

describe('ListItem', () => {
   it('renders one icon and 2 text components', () => {
      const wrapper = shallow(<ListItem text1="text1" text2="text2" mode="Fly"/>)
      expect(wrapper.contains(<Text>text1</Text>)).to.equal(true)
   })

   it('renders a flight icon', () => {
      const wrapper = shallow(<ListItem text1="text1" text2="text2" mode="Fly"/>)
      expect(wrapper.contains(<Text>text2</Text>)).to.equal(true)
   })

   describe('Rendering', () => {
      it('should match to snapshot', () => {
         const component = shallow(<ListItem text1="text1" text2="text2" mode="Fly"/>)
         expect(component).toMatchSnapshot()
      })
   })
})