import React from 'react';
import { values, isEqual } from 'lodash';
import { combineLatest } from 'rxjs';
import { Text } from 'react-native';
import { Store } from '../../shared/services/store';
import SplashScreen from 'react-native-splash-screen';
import { bootstrap } from '../../shared/services/bootstrap';
import { NavigationEvents } from 'react-navigation';
import { autobind } from 'core-decorators';
import { alert } from '../../shared/common';
import { Root } from 'native-base';
import { FullLoadingComponent } from './components/full-loading/full-loading.component';

export function cacheProps(callable = null) {
  return function(ComposedComponent) {
    return class extends React.Component {
      shouldComponentUpdate(nextProps) {
        const cacheContent =
          typeof callable === 'function' ? callable(nextProps) : nextProps;
        if (nextProps.options && isEqual(this.cacheContent, cacheContent)) {
          return false;
        }
        this.cacheContent = cacheContent;
        return true;
      }
      render() {
        return <ComposedComponent {...this.props} />;
      }
    };
  };
}

/**
 * When a component will be used as a screen, use this decorator
 * to make some initialises.
 */
export function screen() {
  return function(ComposedComponent) {
    return class extends React.Component {
      static navigationOptions = ComposedComponent.navigationOptions;
      constructor(...args) {
        super(...args);
        this.state = {
          bootstraping: true
        };
      }
      async componentWillMount() {
        Store.navigation = this.props.navigation;
        await bootstrap();

        isBootstrapped = true;
        this.setState({ bootstraping: false });
      }

      @autobind
      onDidFocus() {
        if (Store.screenMessage) {
          alert({ text: Store.screenMessage });
          Store.screenMessage = '';
        }
      }
      componentDidMount() {
        SplashScreen && SplashScreen.hide && SplashScreen.hide();
      }
      render() {
        if (this.state.bootstraping) {
          return <FullLoadingComponent />;
        }
        return (
          <Root>
            <NavigationEvents onDidFocus={this.onDidFocus} />
            <ComposedComponent {...this.props} />
          </Root>
        );
      }
    };
  };
}

/**
 * @description Connects the component to store. You need to pass { user: Store.user } kinda object as a param
 * and it will be accessebile using this.props.store. values
 * @example 
   @connect({user: Store.user })
   export class UserProfile {}
 */
export function connect(subjectBehaviors = {}) {
  return function(ComposedComponent) {
    return class extends React.Component {
      static navigationOptions = ComposedComponent.navigationOptions;

      constructor(props) {
        super(props);
        this.state = {
          store: null
        };
      }
      subscription = null;
      componentWillMount() {
        const vars = Object.keys(subjectBehaviors);
        const vals = values(subjectBehaviors);
        this.subscription = combineLatest(...vals).subscribe(result => {
          const store = {};
          result.forEach((item, index) => {
            store[vars[index]] = item;
          });
          this.setState({ store });
        });
      }
      componentWillUnmount() {
        if (this.subscription && this.subscription.unsubscribe) {
          this.subscription.unsubscribe();
        }
      }
      render() {
        return (
          <ComposedComponent {...this.props} store={this.state.store || {}} />
        );
      }
    };
  };
}
