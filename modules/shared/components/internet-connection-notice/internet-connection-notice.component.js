import React, { Component } from 'react';
import { View, Text, NetInfo } from 'react-native';
import { styles } from './internet-connection-notice.style';
import { translate } from '../../../../shared/translate';

export class InternetConnectionNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true
    };
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    this.isConnectedToInternet = this.isConnectedToInternet.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
    this.isConnectedToInternet();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };
  isConnectedToInternet() {
    NetInfo.isConnected
      .fetch()
      .then(isConnected => {
        this.setState({ isConnected });
      })
      .catch();
  }
  render() {
    if (!this.state.isConnected) {
      return (
        <View style={styles.Container}>
          <Text style={styles.offlineText}>
            {translate('no_internet_connection')}
          </Text>
        </View>
      );
    }
    return null;
  }
}
