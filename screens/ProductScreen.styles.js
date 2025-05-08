import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 4,
  },
  productPrice: {
    color: 'green',
    fontSize: 13,
  },
  productDescription: {
    fontSize: 12,
    color: '#555',
  },
  productMeasurement: {
    fontSize: 12,
    color: '#777',
  },
  viewNutritionButtonContainer: {
    backgroundColor: '#fafafa', 
    borderRadius: 4,            
    paddingVertical: 5,
    paddingHorizontal: 12,      
    alignSelf: 'flex-start',    
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',     
    shadowColor: '#000',        
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,               
  },
  viewNutritionButton: {
    color: '#444',              
    fontWeight: '600',
    fontSize: 12,
  },
  
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dropdownContainer: {
    marginBottom: 12,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 14,
    flex: 1,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 14,
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    paddingBottom: 20,
  },
  nutrientText: {
    fontSize: 14,
    marginVertical: 2,
  },
});
