import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 100 - 40) / 2;

export default StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    margin: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain',
    backgroundColor: '#f9f9f9',
  },
  productName: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    color: '#d32f2f',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  productMeasurement: {
    fontSize: 11,
    color: '#999',
    marginTop: 3,
  },
});
