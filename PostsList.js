import React, {PureComponent} from 'react';
import {View, Text} from 'react-native-ui-lib';

class PostsList extends PureComponent {

  render() {
    return (
      <View flex center bg-blue70>
        <Text text40>Posts List Screen</Text>
      </View>
    );
  }
}

export default PostsList;