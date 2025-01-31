import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LikedIcon from '@/components/shared/Icons/LikedIcon'
import Eye from '@/components/shared/Icons/Eye'

const AnalyticsCard = ({ views, likes }: {views: number, likes: number}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.label}>Profile Views</Text>
        <View style={styles.statRow}>
          {/* <Icon name="eye" size={20} color="#FF4D4D" /> */}
          <Eye />
          <Text style={styles.statValue}>{views}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.statItem}>
        <Text style={styles.label}>Likes</Text>
        <View style={styles.statRow}>
          {/* <Icon name="heart-o" size={20} color="#FF4D4D" /> */}
          <LikedIcon active={true}/>
          <Text style={styles.statValue}>{likes}</Text>
        </View>
      </View>
    </View>
  )
}

export default AnalyticsCard

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#FFF5F5',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: "100%",
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
      
    },
    statValue: {
      fontSize: 14,
      color: '#000',
      marginLeft: 6,
      fontFamily: "Oswald-Regular"
    },
    label: {
      fontSize: 14,
      color: '#333',
      fontFamily: "Oswald-Light"
    },
    divider: {
      width: 1,
      backgroundColor: '#F0AFAF',
      height: '60%',
    },
  });
  