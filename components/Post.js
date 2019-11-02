import React from 'react';
import { Text, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
class Post extends React.Component {
  renderPost({ item }) {
    return (
      <React.Fragment>
        <Image style={styles.image} source={{ uri: item.imgUrl }} />
        <Text style={styles.phrase}>#{item.phrase}</Text>
      </React.Fragment>
    );
  }
  render() {
    return (
      <FlatList
        contentContainerStyle={{ alignItems: 'center' }}
        // 上から投稿順に表示
        data={[...this.props.allPosts].sort(
          (a, b) => b.postIndex - a.postIndex,
        )}
        keyExtractor={item => item.postIndex}
        renderItem={this.renderPost}
      />
    );
  }
}