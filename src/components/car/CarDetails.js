import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import Button from '../common/Button';

const { width } = Dimensions.get('window');

const CarDetails = ({ car, onBookNow }) => {
  const {
    name,
    images = [car.image], // Use image as fallback if images array is not provided
    price,
    type,
    rating = 4.5,
    description = 'No description available',
    features = [],
    specifications = {
      seats: 5,
      doors: 4,
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      year: 2023,
      mileage: '0 km',
    },
  } = car;

  const renderFeature = (feature, index) => (
    <View key={index} style={styles.featureItem}>
      <MaterialIcons name="check-circle" size={18} color={colors.success} />
      <Text style={styles.featureText}>{feature}</Text>
    </View>
  );

  const renderSpecificationItem = (icon, label, value) => (
    <View style={styles.specItem}>
      <MaterialIcons name={icon} size={22} color={colors.primary} />
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Car Images */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageContainer}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Header Info */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={18} color={colors.accent} />
            <Text style={styles.rating}>{rating}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.priceLabel}>/day</Text>
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Specifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specifications</Text>
        <View style={styles.specificationsContainer}>
          {renderSpecificationItem('people', 'Seats', specifications.seats)}
          {renderSpecificationItem('door', 'Doors', specifications.doors)}
          {renderSpecificationItem(
            specifications.transmission === 'Automatic' ? 'autorenew' : 'settings',
            'Transmission',
            specifications.transmission
          )}
          {renderSpecificationItem('local-gas-station', 'Fuel Type', specifications.fuelType)}
          {renderSpecificationItem('event', 'Year', specifications.year)}
          {renderSpecificationItem('speed', 'Mileage', specifications.mileage)}
        </View>
      </View>

      {/* Features */}
      {features.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresContainer}>
            {features.map(renderFeature)}
          </View>
        </View>
      )}

      {/* Book Now Button */}
      <View style={styles.buttonContainer}>
        <Button title="Book Now" onPress={onBookNow} type="primary" size="large" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    height: 250,
  },
  image: {
    width,
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  type: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  priceLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  specificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  specItem: {
    width: '50%',
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  specLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    marginRight: 4,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: spacing.md,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  buttonContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
});

export default CarDetails;