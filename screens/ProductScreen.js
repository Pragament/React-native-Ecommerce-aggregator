import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import styles from './ProductScreen.styles';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const ProductScreen = ({ product, nutrition }) => {
  const { product_name, price, description, image_url, measurement } = product;
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('G'); 

  const measurementValue = measurement ? measurement.value : 'N/A';
  const measurementUnit = measurement ? measurement.unit : '';
  const finalUrl = encodeURI(image_url);

  const nutrientsByUnit =
    nutrition?.foodNutrients?.reduce((acc, nutrient) => {
      if (!acc[nutrient.unitName]) acc[nutrient.unitName] = [];
      acc[nutrient.unitName].push(nutrient);
      return acc;
    }, {}) || {};

  const availableUnits = Object.keys(nutrientsByUnit);

  const validUnits = ['G', 'MG', 'UG', 'KCAL'];
  const filteredUnits = availableUnits.filter(unit => validUnits.includes(unit));

  const validSelectedUnit = filteredUnits.includes(selectedUnit) ? selectedUnit : 'G';

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: finalUrl }}
        style={styles.image}
        onError={() => console.warn('Image failed to load:', finalUrl)}
      />
      <Text style={styles.productName} numberOfLines={2}>
        {product_name}
      </Text>
      <Text style={styles.productPrice}>₹{price}</Text>
      <Text style={styles.productDescription} numberOfLines={2}>
        {description}
      </Text>
      <Text style={styles.productMeasurement}>
        {measurementValue} {measurementUnit}
      </Text>

      {/* Single View Nutrition Details button styled like a button */}
      <TouchableOpacity style={styles.viewNutritionButtonContainer} onPress={() => setModalVisible(true)}>
        <Text style={styles.viewNutritionButton}>View Nutrition Details</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          setModalVisible(false);
          setDropdownVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{product_name}</Text>

          {/* Handle cases with valid units and dropdown */}
          {filteredUnits.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
              No supported units or nutrition information available.
            </Text>
          ) : (
            
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setDropdownVisible(!dropdownVisible)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                  <Text style={styles.dropdownButtonText}>{validSelectedUnit}</Text>
                  <Icon name="arrow-drop-down" size={24} color="#555" />
                </View>
              </TouchableOpacity>

              {/* Show dropdown list if available units */}
              {dropdownVisible && filteredUnits.length > 0 && (
                <View style={styles.dropdownList}>
                  {filteredUnits.map(unit => (
                    <TouchableOpacity
                      key={unit}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedUnit(unit);
                        setDropdownVisible(false); 
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{unit}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Nutrient list */}
          <ScrollView contentContainerStyle={styles.modalContent}>
            {filteredUnits.length > 0 && nutrientsByUnit[validSelectedUnit]?.length > 0 ? (
              nutrientsByUnit[validSelectedUnit].map(n => (
                <Text key={n.nutrientId} style={styles.nutrientText}>
                  {n.nutrientName}: {n.value} {n.unitName}
                </Text>
              ))
            ) : (
              <Text style={{ textAlign: 'center', color: '#999' }}>
                No nutrients available for {validSelectedUnit}.
              </Text>
            )}
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setDropdownVisible(false);
            }}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ProductScreen;
