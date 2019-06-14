import React, { Component } from 'react';
import {
  Text,
  Button,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  Dimensions
} from 'react-native';
import { VesselListItemComponent } from '../../components/vessel-list-item/vessel-list-item.component';
import { styles } from './storybook.styles';
import { Search, YachtDetails } from '@product/services/requests';
import {
  asEntities,
  selectOrDefault,
  longitudeDelta,
  latitudeDelta
} from '@product/common';
import { Header, StaticHeader } from '../../components/header';
import { colors } from '@product/theme';
import MarkerViewerMap from '../../components/map/marker-viewer-map.component';
import CustomTextInput from '../../components/input-components/custom-text-input.component';
import ImageSlider from '../../components/image-slider/image-slider.component';
import CustomRadioButton from '../../components/input-components/custom-radio-button.component';
import CustomButton from '../../components/input-components/custom-button.component';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { InternetConnectionNotice } from '@modules/shared/shared.module';
import SearchFilterModal from '../../components/modals/search-filter-modal.component';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import CustomPhoneInput from '../../components/input-components/custom-phone-input.component';
import ImageAlbumComponent from '../../components/image-album/image-album.component';
import { VesselPlaceHolderComponent } from '../../components/vessel-placeholder/vessel-placeholder.component';
import SplashScreen from 'react-native-splash-screen';
import { isInternetConnected } from '@product/services/internet';
import { showMessage } from '@product/common';
import LocationSelectorMap from '../../components/map/location-selector-map.component';
import {
  SearchComponent,
  FilterTagsComponent
} from '@modules/shared/shared.module';
import EmailLoginButton from '../../components/compound-button/EmailLoginButton';
import FacebookLoginButton from '../../components/compound-button/FacebookLoginButton';
import GoogleLoginButton from '../../components/compound-button/GoogleLoginButton';
import SignOutButton from '../../components/compound-button/SignOutButton';
import MyBoatsButton from '../../components/compound-button/MyBoatsButton';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

var radio_props = [
  { label: 'param1', value: 10 },
  { label: 'param2', value: 20 }
];

const filters = [
  {
    icon: 'tag',
    name: 'Tag'
  },
  {
    icon: 'usd',
    name: '230$'
  },
  {
    icon: 'map-marker',
    name: 'Warszawa'
  },
  {
    icon: 'clock-o',
    name: 'Today'
  }
];
export class StorybookComponent extends Component {
  constructor() {
    super();

    this.state = {
      result: [],
      images: [],
      preview: [],
      selected_region: null,
      yachtsDetails: null,
      isSearchFilterVisible: false
    };
    this.onKeywordChange = this.onKeywordChange.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.images = [
      'https://source.unsplash.com/1024x768/?boats',
      'https://source.unsplash.com/1024x768/?fish',
      'https://source.unsplash.com/1024x768/?yacht',
      'https://source.unsplash.com/1024x768/?ocean'
    ];
    this.toggleSearchFilterModal = this.toggleSearchFilterModal.bind(this);
    this.onKeywordChange = this.onKeywordChange.bind(this);
    this.getYachtItem = this.getYachtItem.bind(this);
  }

  toggleSearchFilterModal() {
    this.setState({ isSearchFilterVisible: !this.state.isSearchFilterVisible });
  }
  onKeywordChange(term) {
    Search(term)
      .then(result => {
        if (asEntities(result)) {
          this.setState({ result: asEntities(result) });
        }
      })
      .catch(error => {});
  }
  componentDidMount() {
    SplashScreen && SplashScreen.hide && SplashScreen.hide();
    YachtDetails()
      .then(result => {
        this.setState({ yachtsDetails: result });
      })
      .catch(e => {});
  }

  getYachtItem(index) {
    return selectOrDefault(this.state.yachtsDetails, index);
  }
  onLayout = event => {
    if (this.state.dimensions) return;
    let { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  };
  render() {
    return (
      <SafeAreaView style={styles.container} onLayout={this.onLayout}>
        <ScrollView>
          <FilterTagsComponent filters={filters} />

          <LocationSelectorMap
            region={{
              latitude: 35.1522,
              longitude: 53.131,
              longitudeDelta: longitudeDelta,
              latitudeDelta: latitudeDelta
            }}
          />
          {this.rest()}
        </ScrollView>
      </SafeAreaView>
    );
  }
  rest() {
    const { navigation } = this.props;

    const selected_place = navigation.getParam('place', null);
    const places = [];
    if (selected_place != null) {
      places.push(selected_place);
    }
    return (
      <View>
        <VesselPlaceHolderComponent />

        <ImageAlbumComponent
          images={[
            'https://source.unsplash.com/1024x768/?boats',
            'https://source.unsplash.com/1024x768/?fish'
          ]}
        />

        <Text>{Dimensions.get('window').width}</Text>
        <ShimmerPlaceHolder
          autoRun={true}
          style={{ width: Dimensions.get('window').width, height: 50 }}
        />
        <Header
          leftIcon="md-arrow-round-back"
          leftIconColor={colors.orange}
          leftText="Go back"
          leftPressHandler={() => {}}
        />
        <InternetConnectionNotice />

        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed="auto"
          fetchDetails={true}
          renderDescription={row => row.description}
          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyAGbfcfpxrkV74gcb_pIXnWW8F2ZwpKQCo',
            language: 'en',
            types: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: '100%'
            },

            description: {
              fontWeight: 'bold'
            }
          }}
          currentLocation={true}
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch"
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3'
          ]}
          debounce={200}
        />
        <StaticHeader
          leftIcon="keyboard-o"
          leftText="Search for location, name, city"
          leftIconColor={colors.primary}
        />
        <Text style={styles.title}>Input Components</Text>
        <CustomTextInput
          LabelText={'Enter your first name:'}
          onChangeText={t => {}}
        />
        <Text style={styles.title}>Image Slider</Text>
        <ImageSlider imagesSource={this.images} onImagesPressed={() => {}} />
        <Text style={styles.title}>Vessel Item</Text>
        <VesselListItemComponent
          item={{
            image:
              'https://images.unsplash.com/photo-1513618827672-0d7c5ad591b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            title: 'Catz/Pauli pocket/an on 22 bast',
            location: 'Wroclaw, Poland',
            subtitle: '1 free bear with 120 points'
          }}
          onSelect={data => {}}
        />
        <Text style={styles.title}>Radio button vertical</Text>
        <CustomRadioButton
          radios={radio_props}
          onSelectedRadioChanged={value => {}}
          value={1}
        />
        <Text style={styles.title}>Radio button horizontal</Text>

        <CustomRadioButton
          radios={radio_props}
          onSelectedRadioChanged={value => {}}
          value={2}
          horizontal
        />
        <Text style={styles.title}>Search box</Text>
        <SearchComponent
          result={this.state.result}
          onKeywordChange={this.onKeywordChange}
        />
        <Text style={styles.title}>Yacht Equipment Options</Text>
        <Button
          onPress={() => this.props.navigation.navigate('YachtEquipments')}
          title="Yacht Equipment Options"
          color="#841584"
          style={styles.selectLocationBtn}
        />
        <EmailLoginButton />
        <FacebookLoginButton />
        <GoogleLoginButton />
        <SignOutButton />
        <MyBoatsButton value={12} />
        <Text style={styles.title}>Location</Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate('LocationSelector', {
              return_screen: 'Storybook'
            })
          }
          title="Select Location"
          color="#841584"
          style={styles.selectLocationBtn}
        />
        {/* <MarkerViewerMap places={places} /> */}

        <Text style={styles.title}>Yacht Details Single Page</Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate('YachtDetails', {
              item: this.getYachtItem(0)
            })
          }
          title="Yacht Details Single Page"
          color="#841584"
          style={styles.selectLocationBtn}
        />
        <Text style={styles.title}>Boat Registration</Text>
        <Button
          onPress={() => this.props.navigation.navigate('BoatRegistration')}
          title="Boat Registration"
          color="#841584"
          style={styles.selectLocationBtn}
        />

        <CustomButton
          title={'Custom button'}
          color="#841584"
          margin={10}
          onPress={() => {}}
        />
        <Text style={styles.title}>Custom Phone Input</Text>
        <CustomPhoneInput />
        <CustomButton
          title={'Check internet connection'}
          color="#841584"
          margin={10}
          onPress={() => {
            isInternetConnected().then(isConnected =>
              console.warn(isConnected)
            );
          }}
        />
        <CustomButton
          title={'my boats screen'}
          color="#841584"
          margin={10}
          onPress={() => this.props.navigation.navigate('UserYachts')}
        />
        <CustomButton
          title={'show message'}
          color="#841584"
          margin={10}
          onPress={() => {
            showMessage(
              'Error',
              'Test message',
              'OK',
              () => {},
              'Cancel',
              () => {}
            );
          }}
        />

        <Text style={styles.title}>Show search filter modal</Text>
        <CustomButton
          title={'Show Search Filter Modal'}
          color="#841584"
          margin={10}
          onPress={() => this.toggleSearchFilterModal()}
        />
        <SearchFilterModal
          isVisible={this.state.isSearchFilterVisible}
          visibilityStateChanged={visibility =>
            this.setState({ isSearchFilterVisible: visibility })
          }
          onFilterChange={filter => {}}
        />
        <Text>{JSON.stringify(this.state.preview, null, 2)}</Text>
        <Text style={{ marginBottom: 50 }} />
      </View>
    );
  }
}
