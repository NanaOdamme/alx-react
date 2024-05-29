import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('App Component', () => {
  let wrapper;
  const mockLogOut = jest.fn();

  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    wrapper = mount(<App logOut={mockLogOut} />);
  });

  afterEach(() => {
    window.alert.mockRestore();
    wrapper.unmount();
  });

  it('calls logOut and shows alert when Control and H keys are pressed', () => {
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);

    expect(window.alert).toHaveBeenCalledWith('Logging you out');
    expect(mockLogOut).toHaveBeenCalled();
  });
});
