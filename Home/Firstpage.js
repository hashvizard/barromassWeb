import React, {useRef,useEffect,useState} from 'react';
import {Animated, SafeAreaView, StatusBar, StyleSheet,Text,View} from 'react-native';
import Header from '../Components/Header';
import ListItem from '../Components/ListItem';
import {generateData} from './data';
import Location from './Location';
import Popular from './Popular';
import {getCloser} from './utils';
import axios from 'react-native-axios'
import url from '../Constants/Database';
import Colors from '../Constants/Colors';
import {List} from 'react-native-paper'
import Banner from './Banner';
import Luxury from './Luxury';

const {diffClamp} = Animated;
const headerHeight = 58 * 2;

const Firstpage = (props) => {
  const [data,setdata] =useState([]);

  const ref = useRef(null);

  useEffect(() => {

    axios.get(`${url}/HomePage/Categories.php`)
      .then(function (response) {

        console.log("trhus",response.data)
        let dataw=response.data;
              dataw.reverse(); 
              setdata(dataw)
       

      })
      .catch(function (error) {
        console.log(error);
        return(false);
      });
    
    
}, [])


  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });

  const translateYNumber = useRef();

  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const handleSnap = ({nativeEvent}) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight / 2
      )
    ) {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
            -headerHeight / 2
              ? offsetY + headerHeight / 2
              : offsetY - headerHeight / 2,
        });
      }
    }
  };


  


  const ShowHeader=()=>{
      return(<View style={{width:"100%"}}>
          
            <Banner {...props}/>
            <Luxury {...props}/>
            <Location {...props}/> 
            <Popular {...props}/>
          </View>
      )
  }

  const ShowFooter=()=>{
    return(<View style={{width:"100%"}}>
         <List.Section>
    <List.Subheader>About Us</List.Subheader>
    <List.Item 
   
    onPress={()=>props.navigation.navigate("Terms")}
    title="Terms & Condition" left={() => <List.Icon icon="lock-outline" />} />
    <List.Item title="Privacy Policy"
     onPress={()=>props.navigation.navigate("Privacy")}
    left={() => <List.Icon icon="fingerprint" />} />
    <List.Item title="Cancellation Policy" 
     onPress={()=>props.navigation.navigate("Cancelation")}
    left={() => <List.Icon icon="close-circle" />} />
    <List.Item title="Contact Us" 
     onPress={()=>props.navigation.navigate("Contact")}
    left={() => <List.Icon icon="email-outline" />} />
   
  </List.Section>
        
        </View>
    )
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.ORANGE} style="light" />
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        <Header {...{headerHeight}} {...props}/>
      </Animated.View>
 
      <Animated.FlatList
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: headerHeight}}
        onScroll={handleScroll}
        numColumns={2}
        columnWrapperStyle={{justifyContent:"space-evenly"}}
        ListHeaderComponent={ShowHeader}
        ListFooterComponent={ShowFooter}
        
        ref={ref}
        onMomentumScrollEnd={handleSnap}
        data={data}
        renderItem={(item)=>{return(<ListItem {...props} data={item} />)}}
        keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
      />
 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
  subHeader: {
    height: headerHeight / 2,
    width: '100%',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
});

export default Firstpage;