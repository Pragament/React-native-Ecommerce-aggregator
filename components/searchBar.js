import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const SearchBar = () => {
  return (
    <View className=" flex flex-row items-center p-3 rounded-full border ml-5 mr-5">
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
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar
