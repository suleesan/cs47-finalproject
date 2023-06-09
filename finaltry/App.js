import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import LoginScreen from "./screens/LoginScreen";
import { SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { supabase } from './supabase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TipsScreen from './screens/TipsScreen';
import CalendarScreen from './screens/CalendarScreen';

const Stack = createStackNavigator();

export default () => {

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
    <ApplicationProvider
          {...eva}
          theme={eva.light}
        >
          <Layout style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, position: "relative" }}>
              {session ? (
                <>
                   <HomeScreen/>
                </>
              ) : (
                <>
                  <LoginScreen />
                </>
              )}
            </SafeAreaView>
          </Layout>
        </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  });