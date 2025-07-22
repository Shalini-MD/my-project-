import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="screens/Onboarding">
      {/* Define all screens for step-by-step flow */}
      <Stack.Screen name="screens/Onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="screens/PhoneAuth" options={{ title: 'Verify Phone' }} />
      <Stack.Screen name="screens/Captcha" options={{ title: 'Verify Human' }} />
      <Stack.Screen name="screens/OTPVerification" options={{ title: 'Enter OTP' }} />
      <Stack.Screen name="screens/Login" options={{ title: 'Login' }} />
      <Stack.Screen name="screens/Signup" options={{ title: 'Sign Up' }} />
    </Stack>
  );
}
