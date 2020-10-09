// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

/**
 * needed because of CRA not managing nanoid v3.x in tests
 * (see: https://github.com/ai/nanoid/issues/205)
 */
jest.mock('nanoid', () => ({ nanoid: () => '123456789012', }));
