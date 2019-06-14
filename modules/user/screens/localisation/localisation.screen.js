import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import { NativeModules, Platform } from 'react-native';
import { Store } from '@product/services/store';
import { screen, connect } from '../../../shared/shared.helper';
import { styles } from './localisation.styles';
import { translate } from '../../../../shared/translate';
import { Icon, Button } from 'native-base';
import { colors } from '../../../../shared/theme';
import {
  UXSet,
  changeLanguage,
  changeCurrency
} from '../../../../shared/services/store';
import { CurrencyPickerComponent } from '../../components/currency-picker/currency-picker.component';
import { LanguagePickerComponent } from '../../components/language-picker/language-picker.component';

/**
 * @param ll_CC pass a locale, such as en_US, pl_PL
 */
function parseLocale(ll_CC) {
  let lang = 'en';
  let country = 'US';
  let currency = 'usd';
  if (ll_CC && ll_CC.length === 5) {
    [lang, country] = ll_CC.split('_');
  }
  if (country === 'PL') {
    currency = 'pln';
  }
  if (!['en', 'pl'].includes(lang)) {
    lang = 'en';
  }
  return { lang, country: country.toLocaleLowerCase(), currency };
}

@screen()
@connect({ locale: Store.localisation })
export class LocalisationScreen extends Component {
  subscription = null;
  constructor(props) {
    super(props);
    this.state = {
      form: {
        currency: 'usd',
        country: 'US',
        lang: 'en'
      }
    };
  }

  submit = () => {
    this.props.navigation.navigate('Home');
  };

  getLocale() {
    let localeString = 'pl_PL';
    try {
      localeString = Platform.select({
        android: () => NativeModules.I18nManager.localeIdentifier,
        ios: () => NativeModules.SettingsManager.settings.AppleLocale
      })();
    } catch (error) {}
    return localeString;
  }
  componentWillMount() {
    let localeString = this.getLocale();

    UXSet({
      userVisitedLocalisationScreen: true
    });
    const locale = parseLocale(localeString);
    changeLanguage(locale.lang);
    changeCurrency(locale.currency);
    this.setState({
      form: locale
    });
  }

  onCurrencyChange = currency => {
    this.setState({
      form: {
        ...this.state.form,
        currency
      }
    });
  };

  onLangChange = lang => {
    this.setState({
      form: {
        ...this.state.form,
        lang
      }
    });
  };

  render() {
    const { lang, currency } = this.state.form;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.localisationOptions}>
          <Image
            source={require('./language.png')}
            style={styles.languageImage}
          />
          <View style={{ minHeight: 80 }}>
            <Text style={styles.description}>
              {translate('please_select_localisation_initial')}
            </Text>
          </View>
          <Text>{}</Text>
          <View>
            <CurrencyPickerComponent
              value={currency}
              onCurrencyChange={this.onCurrencyChange}
              expanded
            />
            <LanguagePickerComponent
              value={lang}
              onChange={this.onLangChange}
            />
          </View>

          <Button light style={styles.continueButton} onPress={this.submit}>
            <Text style={{ color: colors.white }}>
              {translate('set_and_continue')}
            </Text>
            <Icon name="arrow-forward" style={{ color: colors.white }} />
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
