import React, { ReactNode, Component } from 'react';

type Props = {
  children: ReactNode;
};

export default class App extends Component {
  render() {
    const { children } = this.props
    return <>{children}</>;
  }
}
