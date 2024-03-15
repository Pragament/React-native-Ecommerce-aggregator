import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';



const HomeScreen = () => {
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const navigation = useNavigation();
  const categoriesFetch = async () => {
    try {
      const response = await fetch('http://192.168.0.109:8000/categories', {
        method: 'GET'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const categories = await response.json()
      console.log('This is the categories data:', categories)
      setCategories(categories)
    } catch (error) {
      console.error('Error fetching categories:', error.message)
    }
  }

  const subCategoriesFetch = async () => {
    try {
      const response = await fetch('http://192.168.0.109:8000/subcategories', {
        method: 'GET'
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const subCategories = await response.json()
      console.log('These are the subCategories:', subCategories)
      setSubCategories(subCategories)
    } catch (error) {
      console.log('Error fetching subCategories:', error)
    }
  }


  useEffect(() => {
    categoriesFetch()
    subCategoriesFetch()
  }, [])

  const filteredData = [...categories,...subCategories].filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <SafeAreaView className=" ">
      <View className=" flex flex-row items-center p-3 rounded-full border ml-5 mr-5 mt-10">
        <TouchableOpacity
          onPress={() => {}}
          className=" border rounded-full bg-black"
        >
          <Ionicons name="arrow-back-outline" color={'white'} size={20} />
        </TouchableOpacity>
        <TouchableOpacity className=" flex flex-row w-[90%] ml-2 ">
          <Ionicons name="search" size={30} />
          <TextInput
            className=" text-base"
            placeholder="Search For Your Product"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </TouchableOpacity>
      </View>
      {searchQuery !== '' && (
        <ScrollView>
          {filteredData.map((item) => (
              <TouchableOpacity onPress={()=>{
                navigation.navigate("Products")
              }} key={item._id} className=" flex flex-row items-center p-3">
                <Image
                  source={{ uri: item.imageURL }}
                  style={{ width: 50, height: 50 }}
                  className=" rounded-full"
                />
                <Text className =" text-lg font-semibold ml-3">{item.name}</Text>
              </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default HomeScreen
