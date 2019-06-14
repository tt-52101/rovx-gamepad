import React, { Component } from 'react';
import { Store, changeCurrency } from '@product/services/store';
import { connect } from '../../../shared/shared.helper';
import { CustomRadioButton } from '@modules/shared/shared.module';
import { translate } from '../../../../shared/translate';
import { FormPicker } from '../../../shared/components/form-picker/form-picker.component';
import { autobind } from 'core-decorators';

const currencies = () => [
  { label: 'USD', value: 'usd' },
  { label: 'Euro', value: 'euro' },
  { label: 'Złoty', value: 'pln' }
];

@connect({
  locale: Store.localisation
})
export class CurrencyPickerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }
  componentWillMount() {
    const { value } = this.props;
    if (value && value !== this.state.value) {
      this.setState({
        value
      });
    }
  }
  componentWillReceiveProps(props) {
    const field = 'currency';
    if (props.value && props.value !== this.state.value) {
      this.setState({
        value: props.value
      });
    } else if (!props.value && props.store.locale[field] !== this.state.value) {
      this.setState({
        value: props.store.locale[field]
      });
    }
  }

  @autobind
  onChange(value) {
    if (this.props.onCurrencyChange) {
      this.props.onCurrencyChange(value);
    }
    changeCurrency(value);
  }

  selectorView(value) {
    return (
      <FormPicker
        field="type"
        value={value}
        placeholder={translate('your_currency')}
        collection={currencies()}
        onChangeText={this.onChange}
      />
    );
  }

  expandedView(value) {
    return (
      <CustomRadioButton
        radios={currencies()}
        labelText={translate('your_currency')}
        onSelectedRadioChanged={this.onChange}
        value={value}
        horizontal
      />
    );
  }

  render() {
    let value = this.state.value;
    return this.props.expanded
      ? this.expandedView(value)
      : this.selectorView(value);
  }
}
