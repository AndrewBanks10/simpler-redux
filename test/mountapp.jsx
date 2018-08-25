
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import App from './App'

configure({ adapter: new Adapter() })

// Mount the App
const appMount = mount(<App />)

export default appMount
