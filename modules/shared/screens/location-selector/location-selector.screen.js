import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { styles } from './location-selector.styles';
import { Header, StaticHeader } from '../../components/header';
import { colors } from '@product/theme';
import LocationSelectorMap from '../../components/map/location-selector-map.component';
import { InternetConnectionNotice } from '@modules/shared/shared.module';

export class LocationSelectorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedLocation: null,
      return_screen: ''
    };
    this._onDownBtnPressed = this._onDownBtnPressed.bind(this);
    this._goBack = this._goBack.bind(this);
    this.onPanChange = this.onPanChange.bind(this);
  }
  _onDownBtnPressed() {
    const selected_place = {
      name: 'user1',
      coords: this.state.SelectedLocation
    };
    this.props.navigation.navigate(this.state.return_screen, {
      place: selected_place
    });
  }
  componentDidMount() {
    const { navigation } = this.props;
    const return_screen = navigation.getParam('return_screen', null);
    this.setState({
      return_screen
    });
  }
  _goBack() {
    this.props.navigation.goBack();
  }
  onPanChange(data) {
    if (!this.firstTime) {
      this.firstTime = true;
      return;
    }
    const locationPan = {
      latitude: data.region.latitude,
      longitude: data.region.longitude
    };
    this.setState({
      SelectedLocation: locationPan
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          leftIcon="md-arrow-round-back"
          leftIconColor={colors.orange}
          leftText="Go back"
          leftPressHandler={this._goBack}
          RightPressHandler={this._onDownBtnPressed}
          RightText="Done"
        />
        <InternetConnectionNotice />
        <StaticHeader
          leftIcon="keyboard-o"
          leftText="Search for location, name, city"
          leftIconColor={colors.primary}
        />
        <ScrollView>
          <LocationSelectorMap
            region={{
              latitude: 35.1522,
              longitude: 53.131,
              longitudeDelta: 0.25,
              latitudeDelta: 0.25
            }}
            onPanChange={this.onPanChange}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
