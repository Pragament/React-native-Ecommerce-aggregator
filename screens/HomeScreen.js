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
  const [nutritionData, setNutritionData] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productResponse = await fetch('https://staticapis.pragament.com/products/categorized_products.json');
      const productJson = await productResponse.json();
      setCategories(productJson.categories);

      const nutritionResponse = await fetch('https://staticapis.pragament.com/products/vegetables_fruits.json');
      const nutritionJson = await nutritionResponse.json();
      setNutritionData(nutritionJson.vegetables);
    } catch (error) {
      console.error('Failed to fetch products or nutrition data:', error);
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
  const selectedSubcategory = selectedCategory?.subcategories[selectedSubcategoryIndex];
  const products = selectedSubcategory?.products || [];

  const getNutritionForProduct = (productImageUrl) => {
    const relativeImagePath = productImageUrl.replace('https://staticapis.pragament.com/', '');
    return nutritionData.find(n => n.imagepath === relativeImagePath);
  };

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
                    selectedSubcategoryIndex === index && styles.selectedSubcategoryText,
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
            renderItem={({ item }) => {
              const fullImageUrl = `https://staticapis.pragament.com/${item.image_url}`;
              const nutritionInfo = getNutritionForProduct(fullImageUrl);

              return (
                <ProductCard
                  product={{ ...item, image_url: fullImageUrl }}
                  nutrition={nutritionInfo}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
