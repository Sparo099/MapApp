import AsyncStorage from "@react-native-async-storage/async-storage";

// function take key and data and store it on local storage
export const saveDataToStorage = async (key, data) => {
  const value = JSON.stringify(data);
  await AsyncStorage.setItem(key, value);
};

//function take key and return true if key exist on local storage
export const isKeyExist = async (key) => {
  const keys = await AsyncStorage.getAllKeys();
  return keys.includes(key);
};

//function take key and default value, if key exist on local storage
// then will return the key value else will retrun the given default value
export const getDataFromStorage = async (key, defualt_value = null) => {
  const value = await AsyncStorage.getItem(key);
  if (value != null) {
    return JSON.parse(value);
  }

  return defualt_value;
};

// function take key and remove it from the local storage
export const removeDataFromStorage = async (key) => {
  await AsyncStorage.removeItem(key);
};
