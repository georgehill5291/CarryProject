import React from 'react';
import { Text, View } from 'react-native';
import theme from '../../assets/theme';

const PublicHeader = ({ navigation, title = 'Carry Project' }) => {
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        backgroundColor: theme.colors.steelblue
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: theme.spacing.m
        }}>
        <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default PublicHeader;
