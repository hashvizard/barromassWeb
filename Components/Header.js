import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Colors from '../Constants/Colors';
import Add from '../Home/assets/svg/Add';
import Menu from '../Home/assets/svg/Menu';
import Search from '../Home/assets/svg/Search';

const Header = (props) => {
  const {headerHeight} = props;
  return (
    <>
      <View
        style={[
          styles.subHeader,
          {
            height: headerHeight / 2 -3,
          },
        ]}>
        <Menu {...props} />
        <Text style={styles.conversation}>Baaromaas Travel</Text>
        <Add />
      </View>
      <View
        style={[
          styles.subHeader,
          {
            height: headerHeight / 2 ,
          },
        ]}>
        <TouchableOpacity
        onPress={()=>props.navigation.navigate("Search")}
        style={styles.searchBox}>
          <Search />
          <Text style={styles.searchText}>Search for Treks</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: Colors.Orange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversation: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  searchText: {
    color: '#8B8B8B',
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
  },
  searchBox: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
export default Header;