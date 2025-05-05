import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ProductCard from './ProductScreen';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://staticapis.pragament.com/products/categorized_products.json'
      );
      const json = await response.json();
      setCategories(json.categories);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const selectedCategory = categories[selectedCategoryIndex];
  const selectedSubcategory =
    selectedCategory?.subcategories[selectedSubcategoryIndex];
  const products = selectedSubcategory?.products || [];

  return (
    <View style={styles.container}>
      {/* Categories bar */}
      <View style={styles.categoryBarContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item, index) => item.category_id + '-' + index}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategoryIndex(index);
                setSelectedSubcategoryIndex(0);
              }}
              style={[
                styles.categoryBox,
                selectedCategoryIndex === index && styles.selectedCategoryBox,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategoryIndex === index && styles.selectedCategoryText,
                ]}
              >
                {item.category}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.content}>
        {/* Subcategories list on the left */}
        <View style={styles.subcategories}>
          <FlatList
            data={selectedCategory.subcategories}
            keyExtractor={(item, index) => item.subcategory_id + '-' + index}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setSelectedSubcategoryIndex(index)}>
                <Text
                  style={[
                    styles.subcategoryText,
                    selectedSubcategoryIndex === index &&
                      styles.selectedSubcategoryText,
                  ]}
                >
                  {item.subcategory}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Products in 2 columns */}
        <View style={styles.products}>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => item.product_id + '-' + index}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <ProductCard
                product={{
                  ...item,
                  image_url: `https://staticapis.pragament.com/${item.image_url}`,
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
