import React, { Component } from 'react';

import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { styles } from './simple-form-layout.styles';
import { Root, Icon } from 'native-base';

export class SimpleFormLayoutComponent extends Component {
  getHeader(title) {
    return (
      <View style={styles.header}>
        <Text style={styles.pageTitle}>{title}</Text>
        <Icon name="add" style={styles.headerIcon} />
      </View>
    );
  }
  getFooter(label, onSubmitPress) {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={onSubmitPress}
          style={styles.submitContainer}
        >
          <Text style={styles.submitText}>{label}</Text>
          <Icon name="arrow-forward" style={styles.submitIcon} />
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <Root>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {this.getHeader(this.props.title)}
            <View style={styles.formContainer}>{this.props.children}</View>
            {this.getFooter(this.props.submitLabel, this.props.onSubmitPress)}
          </View>
        </SafeAreaView>
      </Root>
    );
  }
}
