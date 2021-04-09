import React from 'react';
import { View, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../../styles/InboxStyles';
import { useSelector } from 'react-redux';

const InboxScreen = ({ navigation }) => {
    const usersOnline = useSelector((state) => state.usersOnline);
  return (
    <Container>
      <FlatList
        data={usersOnline}
        keyExtractor={(item) => item.userId}
        renderItem={({item}) => {
          return !item.username.toLowerCase().trim().startsWith('c_') ? (
            <Card
              onPress={() => {
                props.navigation.navigate('Chat Screen', {
                  name: item.username,
                  userId: item.userId,
                  type: 'counselor',
                });
              }}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg
                    source={require('../../assets/logo_transparent.png')}
                  />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>2 hours ago</PostTime>
                  </UserInfoText>
                  <MessageText>
                    Hey there, this is my test for chat App in react native!.
                  </MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          ) : (
            <View />
          );
        }}
      />
    </Container>
  );
};

export default InboxScreen;
