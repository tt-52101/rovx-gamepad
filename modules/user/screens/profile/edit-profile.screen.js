import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { autobind } from 'core-decorators';
import { FormInput } from '@modules/shared/shared.module';
import { Root, Icon } from 'native-base';
import { styles } from './edit-profile.style';
import { asEntities, trimObjectProperties } from '@product/common';

import { InternetConnectionNotice } from '@modules/shared/shared.module';
import { EditProfilePost } from '@product/services/requests';

import {
  NavigateToProfile,
  SetUser,
  profileImageHandler,
  photoSourceActionSheet
} from '../../user.actions';
import { Store } from '@product/services/store';
import { connect, screen } from '../../../shared/shared.helper';
import { alert } from '../../../../shared/common';
import { translate } from '../../../../shared/translate';
import { ProgressbarComponent } from '../../components/progressbar/progressbar.component';
import { colors } from '../../../../shared/theme';

@screen()
@connect({
  user: Store.user,
  userYachts: Store.userVessels
})
export class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.profileImageHandler = profileImageHandler.bind(this);
    this.photoSourceActionSheet = photoSourceActionSheet.bind(this);
  }

  componentDidMount() {
    SplashScreen && SplashScreen.hide && SplashScreen.hide();
  }

  initialState() {
    return {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      isPosting: false,
      response: null,
      isUploading: false
    };
  }

  componentWillMount() {
    if (this.props.store.user) {
      this.setState({
        ...this.props.store.user
      });
    }
  }

  componentWillReceiveProps(props) {
    if (props.store.user) {
      this.setState({
        ...props.store.user
      });
    }
  }

  normalizeForm(data) {
    return {
      firstname: data.firstname,
      lastname: data.lastname,
      picture: data.picture,
      phone: data.phone
    };
  }

  @autobind
  async onSubmitPress() {
    const data = trimObjectProperties(this.state);
    this.setState({ isPosting: true });
    try {
      const response = await EditProfilePost(this.normalizeForm(data));
      this.setState({
        response,
        isPosting: false
      });
      const entities = asEntities(response);
      if (!entities && response.error) {
        return alert({
          text: response.error.message || translate('something_went_wrong')
        });
      }
      if (entities.length) {
        alert({
          text: translate('account_been_updated').replace(
            '%name%',
            data.firstname
          )
        });
        SetUser({ ...data, ...entities[0].user }, entities[0].token);
        NavigateToProfile();
      }
    } catch (error) {
      this.setState({
        isPosting: false
      });
      alert({
        text: (error && error.message) || translate('try_again_later')
      });
    }
  }

  getProfilePicture(user) {
    return (
      <View style={styles.profilePictureHolder}>
        <View style={styles.rowCenter}>
          <TouchableOpacity onPress={() => this.ImageSourceSelector.show()}>
            <Image
              style={styles.image}
              source={{
                uri: user.picture
              }}
            />
            <Icon
              name="ios-add-circle-outline"
              style={styles.profileImageIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  changePictureButton() {
    return (
      <TouchableOpacity
        onPress={() => this.ImageSourceSelector.show()}
        style={styles.changePictureHolder}
      >
        <View style={styles.rowChangePictureItem}>
          <Icon name="ios-add-circle-outline" style={styles.plusIcon} />
          <Text style={styles.changePictureText}>
            {translate('change_picture')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  getHeader(user) {
    return <View style={styles.header}>{this.changePictureButton()}</View>;
  }

  @autobind
  onFieldChange(value, field) {
    this.setState({
      [field]: value
    });
  }

  @autobind
  goToProfile() {
    NavigateToProfile();
  }

  getForm() {
    const { response } = this.state;

    return (
      <View style={styles.scrollViewStyle}>
        <View style={styles.formContainer}>
          <View style={styles.rowItem}>
            <Icon name="md-mail" style={styles.mailIcon} />
            <Text style={styles.mailText}>{this.state.email}</Text>
          </View>
          <KeyboardAvoidingView
            behavior="position"
            enabled
            keyboardVerticalOffset={-50}
          >
            <FormInput
              response={response}
              field="firstname"
              value={this.state.firstname}
              disabled={false}
              onChangeText={this.onFieldChange}
              placeholder={translate('first_name')}
            />
            <FormInput
              response={response}
              field="lastname"
              value={this.state.lastname}
              disabled={false}
              onChangeText={this.onFieldChange}
              placeholder={translate('last_name')}
            />
            <FormInput
              response={response}
              field="phone"
              value={this.state.phone}
              disabled={false}
              onChangeText={this.onFieldChange}
              placeholder={translate('phone')}
              keyboardType="phone-pad"
            />
            <FormInput
              response={response}
              value={this.state.password}
              field="password"
              disabled={false}
              onChangeText={this.onFieldChange}
              secureTextEntry={true}
              placeholder={translate('password')}
            />
            <FormInput
              response={response}
              value={this.state.confirm_password}
              field="confirm_password"
              disabled={false}
              onChangeText={this.onFieldChange}
              secureTextEntry={true}
              placeholder={translate('confirm_password')}
            />

            <TouchableOpacity
              style={styles.backToProfileContainer}
              onPress={this.goToProfile}
            >
              <Icon name="md-arrow-back" style={styles.backToProfileIcon} />
              <Text style={styles.backToProfileText}>
                {translate('back_to_profile')}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }

  getFooter() {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={this.onSubmitPress}
          style={styles.submitContainer}
        >
          <Text style={styles.submitText}>{translate('update_profile')}</Text>
          <Icon name="arrow-forward" style={styles.submitIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const user = this.props.store.user;
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <InternetConnectionNotice />
            {this.getHeader(user)}
            <View style={{ position: 'relative', height: 5 }}>
              {this.state.isPosting || this.state.isUploading ? (
                <ProgressbarComponent />
              ) : null}
            </View>
            {user ? this.getProfilePicture(user) : null}
            {this.getForm(user)}
          </View>
        </ScrollView>
        {this.photoSourceActionSheet(this.profileImageHandler)}
        {this.getFooter()}
      </View>
    );
  }
}
