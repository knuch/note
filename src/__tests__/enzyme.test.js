import React from 'react';
import { shallow, mount } from 'enzyme';


const testElement = <div>
  <div>
    <p>shallow</p>
    <div>
      <div>
        <div>
          <p>deep</p>
        </div>
      </div>
    </div>
  </div>
</div>;
describe('Enzyme', () => {
  test('shallow works', () => {
    const wrap = shallow(testElement);
    expect(wrap).toMatchSnapshot();
  });
  test('mount works', () => {
    const wrap = mount(testElement);
    expect(wrap).toMatchSnapshot();
  });
});
