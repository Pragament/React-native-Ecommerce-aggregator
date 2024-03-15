import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const ProductScreen = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://192.168.0.109:8000/products');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const productsData = await response.json();
            console.log('This is the products data:', productsData);
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching the products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ScrollView className = " mt-3">
            {products.map((item)=>(
                <View key={item._id} className="flex-row bg-white rounded-lg shadow-md p-4 m-2">
                    <Image source={{ uri: item.imageURL }} className="w-24 h-24 mr-4 rounded"/>
                    <View className="flex-1">
                        <Text className="font-bold text-lg mb-1">{item.brand}</Text>
                        <Text className="text-md mb-1">{item.name}</Text>
                        <Text className="text-md mb-1">Price: ₹{item.price}</Text>
                        <Text className="text-md">Quantity: {item.quantity}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default ProductScreen;
