import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-key";


export const onSignIn = () => AsyncStorage.setItem(USER_KEY, 'true');


export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = async () => {
    try{
        const _key = await AsyncStorage.getItem(USER_KEY);
        if(_key !==null){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
}