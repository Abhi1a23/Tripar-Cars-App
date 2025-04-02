import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

// This is a sample data - in a real app, you would fetch from an API
const popularCars = [
  {
    id: '1',
    name: 'Tesla Model S',
    image: require('../../../assets/images/logo.png'), // Replace with actual car images
    price: '$120/day',
    type: 'Electric',
  },
  {
    id: '2',
    name: 'BMW X5',
    image: require('../../../assets/images/logo.png'), // Replace with actual car images
    price: '$90/day',
    type: 'SUV',
  },
  {
    id: '3',
    name: 'Mercedes C-Class',
    image: require('../../../assets/images/logo.png'), // Replace with actual car images
    price: '$85/day',
    type: 'Sedan',
  },
];

const categories = [
  { id: '1', name: 'SUV', icon: 'terrain' },
  { id: '2', name: 'Sedan', icon: 'directions-car' },
  { id: '3', name: 'Electric', icon: 'electric-car' },
  { id: '4', name: 'Luxury', icon: 'star' },
];

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('User');

  // In a real app, you would fetch this from your state/context
  useEffect(() => {
    setUsername('John');
  }, []);

  const handleCarPress = (car) => {
    navigation.navigate('Cars', {
      screen: 'CarDetail',
      params: { car },
    });
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('Cars', {
      screen: 'CarList',
      params: { filter: category.name },
    });
  };

  const renderCarItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carCard}
      onPress={() => handleCarPress(item)}
    >
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{item.name}</Text>
        <View style={styles.carDetails}>
          <Text style={styles.carType}>{item.type}</Text>
          <Text style={styles.carPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={styles.categoryIcon}>
        <MaterialIcons name={item.icon} size={24} color={colors.primary} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Hello, {username}</Text>
          <Text style={styles.subGreeting}>Find your perfect car</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialIcons name="person" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar - In a real app, you would implement search functionality */}
        <TouchableOpacity 
          style={styles.searchBar} 
          onPress={() => navigation.navigate('Cars', { screen: 'CarList' })}
        >
          <MaterialIcons name="search" size={24} color="#777" />
          <Text style={styles.searchText}>Search for a car</Text>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Car Categories</Text>
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        {/* Popular Cars */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Cars</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cars', { screen: 'CarList' })}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={popularCars}
          renderItem={renderCarItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carsList}
        />

        {/* Special Offers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
        </View>
        <View style={styles.offerCard}>
          <View style={styles.offerContent}>
            <Text style={styles.offerTitle}>Weekend Special</Text>
            <Text style={styles.offerDescription}>Get 20% off on weekend rentals</Text>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
          <MaterialIcons name="local-offer" size={48} color={colors.primary} style={styles.offerIcon} />
        </View>

        {/* Add padding at the bottom for better scrolling experience */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  subGreeting: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#777',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: colors.text,
  },
  carsList: {
    paddingHorizontal: 15,
  },
  carCard: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f9f9f9',
  },
  carInfo: {
    padding: 12,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  carDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carType: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  carPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  offerCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
  },
  offerDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  offerButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  offerIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  bottomPadding: {
    height: 30,
  },
});

export default HomeScreen;