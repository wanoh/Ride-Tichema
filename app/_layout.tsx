import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
// import "react-native-reanimated";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { LogBox } from "react-native";
import { useFonts } from "expo-font";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "TT-Octosquares-Medium": require("../assets/fonts/TT-Octosquares-Medium.ttf"),
  });

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="/(routes)/onboarding/index" />
      </Stack>
    </ToastProvider>
  );
}


// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// // import "react-native-reanimated";
// import { Stack, useRouter, useSegments,router,RouteSegments } from "expo-router";
// import { ToastProvider } from "react-native-toast-notifications";
// import { LogBox } from "react-native";
// import { useFonts } from "expo-font";
// import {ClerkProvider, useAuth} from "@clerk/clerk-expo";
// import * as SecureStore from 'expo-secure-store';


// // const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// if (!CLERK_PUBLISHABLE_KEY) {
//   throw new Error("Missing Clerk Publishable Key. Make sure EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is defined in your environment.");
// }

// // Cache the Clerk JWT
// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       return SecureStore.getItemAsync(key);
//     } catch (err) {
//       return null;
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       return SecureStore.setItemAsync(key, value);
//     } catch (err) {
//       return;
//     }
//   },
// };

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from "expo-router";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// // SplashScreen.preventAutoHideAsync();

// const InitialLayout = () => {

//   // const router = useRouter();
//   const segments = useSegments();

//   const { isLoaded, isSignedIn } = useAuth();

//   const [loaded, error] = useFonts({
//     "TT-Octosquares-Medium": require("../assets/fonts/TT-Octosquares-Medium.ttf"),
//   });

//   useEffect(() => {
//     LogBox.ignoreAllLogs(true);
//     if (loaded || error) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded, error]);

 
//   useEffect(() => {
//     if (!isLoaded) return;

//     const inTabsGroup = segments[0] === '(tabs)';

//     if (isSignedIn && !inTabsGroup) {
//       router.replace('/(tabs)/home');
//     } else if (!isSignedIn) {
//       router.replace('/');
//     }
//   }, [isSignedIn]);


//   if (!loaded && !error) {
//     return null;
//   }

//   return (   
//     <ToastProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="index" />
//         <Stack.Screen name="/(routes)/onboarding/index" />
//       </Stack>
//     </ToastProvider>
//     )
// }

// const RootLayoutNav= () => {
//   return (
//     <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
//       <InitialLayout/>
//     </ClerkProvider>
//   );
// }

// export default RootLayoutNav;