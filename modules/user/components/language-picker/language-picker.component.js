import React, { Component } from 'react';
import { Store, changeCurrency } from '@product/services/store';
import { connect } from '../../../shared/shared.helper';
import { CustomRadioButton } from '@modules/shared/shared.module';
import { translate } from '../../../../shared/translate';
import { changeLanguage } from '../../../../shared/services/store';

const languages = () => [
  { label: translate('lang_en'), value: 'en' },
  { label: translate('lang_pl'), value: 'pl' }
];

@connect({
  locale: Store.localisation
})
export class LanguagePickerComponent extends Component {
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
    const field = 'lang';
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
  onChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    changeLanguage(value);
  };

  render() {
    return (
      <CustomRadioButton
        radios={languages()}
        labelText={translate('language')}
        onSelectedRadioChanged={this.onChange}
        value={this.state.value}
        horizontal
      />
    );
  }
}
