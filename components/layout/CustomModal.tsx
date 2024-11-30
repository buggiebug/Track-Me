import React from 'react'
import { View, Modal, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Icons } from '../utils/Icons';

export function CustomModal({ children, title, modalVisible, setModalVisible }: any) {
  return (
    <>
      {/* Show Modal */}
      <Pressable
        style={[styles.button, styles.buttonOpen, { display: 'none' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.textStyle]}>Show Modal</Text>
      </Pressable>
      <View style={[styles.centeredView, { display: !modalVisible ? "none" : "flex" }]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            {/* Close Modal */}
            <View style={styles.modalHide}>
              <View style={styles.modalHideButtonBox}>
                <Text style={[styles.modalTitle]}>{title || 'View'}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>
                    <Icons name='close-circle-outline' color='red' />
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Show Modal Data */}
            <View style={styles.modalData}>
              <ScrollView style={{ width: "100%" }}>
                <View>
                  {children}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  centeredView: {
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "100%",
    padding: 10,
  },

  modalHide: {
    width: "100%",
  },

  modalHideButtonBox: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    marginLeft: 20,
    fontSize: 18
  },

  modalData: {
    width: "100%",
    marginBottom: 0,// 70,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },

  // Buttons...
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    cursor: "pointer"
  },
  buttonClose: {
    backgroundColor: '#fff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});