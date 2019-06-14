import React, { Component } from 'react';
import { View } from 'react-native';
import { Store } from '@product/services/store';
import { connect } from '../../../shared/shared.helper';
import { styles } from './localisation-options.style';
import { CurrencyPickerComponent } from '../currency-picker/currency-picker.component';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';

@connect({
  locale: Store.localisation
})
export class LocalisationOptionsComponent extends Component {
  currencyWarning() {
    return (
      <View style={styles.currencyWarning}>
        <Icon style={styles.currencyIcon} name="info-circle" />
        <Text style={styles.currencyNotice}>
          {translate('currency_notice')}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <CurrencyPickerComponent
          value={this.props.store.locale.currency}
          expanded={false}
        />
        <LanguagePickerComponent value={this.props.store.locale.lang} />
      </View>
    );
  }
}
