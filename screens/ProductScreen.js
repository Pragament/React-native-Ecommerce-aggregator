import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './ProductScreen.styles';

const ProductScreen = ({ product }) => {
  const { product_name, price, description, image_url, measurement } = product;

  const measurementValue = measurement ? measurement.value : 'N/A';
  const measurementUnit = measurement ? measurement.unit : '';

  const finalUrl = encodeURI(image_url);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: finalUrl }}
        style={styles.image}
        onError={() => console.warn('Image failed to load:', finalUrl)}
      />
      <Text style={styles.productName} numberOfLines={2}>{product_name}</Text>
      <Text style={styles.productPrice}>₹{price}</Text>
      <Text style={styles.productDescription} numberOfLines={2}>{description}</Text>
      <Text style={styles.productMeasurement}>{measurementValue} {measurementUnit}</Text>
    </View>
  );
};

export default ProductScreen;
