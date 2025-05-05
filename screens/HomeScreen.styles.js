import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryBarContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },

  categoryBox: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  selectedCategoryBox: {
    backgroundColor: '#e0e0e0',
    borderColor: '#b0b0b0',
  },

  categoryText: {
    fontSize: 14,
    color: '#555',
  },

  selectedCategoryText: {
    color: '#333',
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    flexDirection: 'row',
  },

  subcategories: {
    width: 100,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },

  subcategoryText: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 13,
    color: '#444',
    borderRadius: 5,
  },

  selectedSubcategoryText: {
    backgroundColor: '#d0e1f9', 
    color: '#333',
    fontWeight: 'bold',
  },

  products: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
