import { mount } from '@vue/test-utils'
import Home from '../../src/views/Home.vue'

describe('Home.vue', () => {
  it('renders home view', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toMatch('Home page')
  })
})
