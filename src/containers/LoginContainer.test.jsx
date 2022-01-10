import { fireEvent, render } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import LoginContainer from './LoginContainer';

jest.mock('react-redux');

describe('LoginContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
  });

  // 근데 이거는 컴포넌트 테스트 아닌가?
  it('renders email and password inputs and "Log In" button', () => {
    const { queryByLabelText, queryByRole } = render((
      <LoginContainer />
    ));

    expect(queryByLabelText('E-mail')).toBeInTheDocument();
    expect(queryByLabelText('Password')).toBeInTheDocument();

    expect(queryByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  // TODO: 이메일 입력 => 리덕스 상태 변경 액션 호출(dispatch)
  it('types E-mail and Password, calls dispatch', () => {
    const { getByLabelText } = render((
      <LoginContainer />
    ));

    fireEvent.change(getByLabelText('E-mail'), {
      target: { value: 'changed email' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'changeLoginField',
      payload: {
        name: 'email',
        value: 'changed email',
      },
    });

    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'changed password' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'changeLoginField',
      payload: {
        name: 'password',
        value: 'changed password',
      },
    });
  });

  // TODO: 입력하면 input 값이 입력한 값으로 변함
  // TODO: 로그인 버튼 클릭하면 로그인 이벤트 호출(dispatch login 기능)
});
