import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ImageBackground
} from 'react-native';
import { styles } from './profile.style';
import { Store } from '@product/services/store';
import { InternetConnectionNotice } from '@modules/shared/shared.module';
import SplashScreen from 'react-native-splash-screen';
import { Toast, Root, Icon } from 'native-base';
import { autobind } from 'core-decorators';
import MyBoatsButton from '../compound-button/MyBoatsButton';
import SignOutButton from '../compound-button/SignOutButton';
import {
  ResetUser,
  SetUser,
  profileImageHandler,
  photoSourceActionSheet
} from '../../user.actions';
import { translate } from '../../../../shared/translate';
import { LocalisationOptionsComponent } from '../localisation-options/localisation-options.component';

export class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localisation: {},
      boatsCount: 0
    };
    this.profileImageHandler = profileImageHandler.bind(this);
    this.photoSourceActionSheet = photoSourceActionSheet.bind(this);
  }

  componentWillMount() {
    this.$sub = Store.localisation.subscribe(localisation => {
      this.setState({ localisation });
    });
  }

  componentDidMount() {
    SplashScreen && SplashScreen.hide && SplashScreen.hide();
  }

  signout = () => {
    ResetUser();
  };

  onMyBoatsPressed = () => {
    this.props.navigation.navigate('UserYachts');
  };

  @autobind
  onPressEditProfile() {
    this.props.navigation.navigate('EditProfile');
  }

  alert(data) {
    Toast.show({
      duration: 3000,
      position: 'top',
      ...data
    });
  }

  render() {
    const { user, screen } = this.props;

    const flexDirection =
      screen.isPortrait === false ? 'row-reverse' : 'column';
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <InternetConnectionNotice />

            <View
              style={{
                flexDirection
              }}
            >
              <View
                style={[
                  styles.header,
                  { flex: 1 },
                  !screen.isPortrait ? { backgroundColor: 'transparent' } : null
                ]}
              >
                {user ? this.getProfilePicture(user) : null}
              </View>
              <View style={[{ flex: 1 }]}>
                {this.profileInfo(user)}
                {this.actionButtons()}
              </View>
            </View>
          </View>
        </ScrollView>
        {this.photoSourceActionSheet(this.profileImageHandler)}
      </>
    );
  }

  getProfilePicture(user) {
    let source = require('../../assets/user.png');
    if (user.picture) {
      source = {
        uri: user.picture
      };
    }
    return (
      <TouchableOpacity onPress={() => this.ImageSourceSelector.show()}>
        <View style={styles.profilePictureHolder}>
          <Image style={styles.image} source={source} />
        </View>
      </TouchableOpacity>
    );
  }

  actionButtons() {
    return (
      <>
        <TouchableOpacity onPress={this.onPressEditProfile}>
          <View style={styles.rowContainer}>
            <Icon name="md-person" style={styles.rowIcon} />
            <Text style={styles.rowText}>{translate('edit_profile')}</Text>
          </View>
        </TouchableOpacity>

        <SignOutButton onPress={this.signout} />
      </>
    );
  }

  profileInfo(user) {
    return (
      <>
        <Text style={styles.title}>
          {user.firstname} {user.lastname}
        </Text>
        <View style={styles.rowContainer}>
          <Icon name="md-mail" style={styles.rowIcon} />
          <Text style={styles.rowText}>{user.email || user.phone}</Text>
        </View>
      </>
    );
  }
}
