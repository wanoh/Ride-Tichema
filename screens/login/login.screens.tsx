import { View, Text,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from '@/utils/container/auth-container'
import { windowHeight } from '@/themes/app.constant'
import styles from './styles'
import Images from '@/utils/images'
import { external } from '@/styles/external.style'
import SignInText from '@/components/login/signin.text'
import PhoneNumberInput from '@/components/login/phone-number.input'
import Button from '@/components/common/button'
import {  useToast } from 'react-native-toast-notifications' 
import axios from "axios"
import { router } from 'expo-router'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';



export default function LoginScreen() {

  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phone_number, setPhone_number] = useState('')
  const [countryCode, setCountryCode] = useState('+233')
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();


  const trySignIn = async () => {}

  const sendOTP = async () => {
    setLoading(true);
    console.log(phoneNumber)
    try {
      await signUp!.create({phoneNumber})

      signUp!.preparePhoneNumberVerification();
    } catch (error) {
      if(isClerkAPIResponseError(error)) {
        if(error.errors[0].code === 'form_identifier_exist') {

          console.log('user exist')
          await trySignIn()
      } else {
        setLoading(false)
        Alert.alert('Error', error.errors[0].message)
      }
      console.log(error)
    }
  }



  const handleSubmit = async () => {
    if(phone_number === "" || countryCode === ""){
      toast.show("Please fill the fields!", {
        placement : "bottom"
      })
    } else {
      // console.log(phone_number, countryCode) 

      const phoneNumber = `${countryCode}${phone_number}`

      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URI}/registration`,{
        phone_number : phoneNumber
      }).then ((res)=>{
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
  

  return (
    <AuthContainer
    topSpace={windowHeight(150)}
    imageShow ={true}
    container={
     <View>
      <View>
        <View>
          <Image style={styles.transformLine} source={Images.line}/>
          <SignInText/>
          <View style={[external.mt_25, external.Pb_10]}>
            <PhoneNumberInput
            phone_number = {phoneNumber}
            setPhone_number ={setPhoneNumber}
            countryCode = {countryCode}
            setCountryCode = {setCountryCode}
            />
            <View style={[external.mt_25, external.Pb_15]}>
              <Button
              title="Get OTP"
              onPress={()=> sendOTP()}
              // onPress={()=> router.push("/(routes)/otp-verification")}
              />
            </View>
          </View>
        </View>
      </View>

    </View>}  
    />
  )
}
}