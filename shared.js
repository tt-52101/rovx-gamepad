import React from 'react';
import { combineLatest } from 'rxjs';

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
