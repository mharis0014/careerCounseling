import React, {useState} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';

const Popup = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button
        title="Show Dialog"
        onPress={() => {
          setVisible(true);
        }}
      />
      <Dialog
        visible={visible}
        onTouchOutside={() => {
          setVisible(false);
        }}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        dialogTitle={<DialogTitle title="User is Calling You" />}
        footer={
          <DialogFooter>
            <DialogButton
              text="REJECT"
              onPress={() => {
                console.log('Rejected');
                setVisible(false);
              }}
            />
            <DialogButton
              text="ACCEPT"
              onPress={() => {
                console.log('accepted');
                setVisible(false);
              }}
            />
          </DialogFooter>
        }>
        <DialogContent>
          <Text>
            To answer the call press Accept button. To reject press Reject
            Button
          </Text>
        </DialogContent>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default Popup;
