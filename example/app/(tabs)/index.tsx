import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, DateTimePicker, dropdownMenu, IconButton, Input, SearchInput, Select } from '@scr-ui/components';
import { useState } from 'react';
import { useScrUi } from '@scr-ui/hooks';

export default function HomeScreen() {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      {/* <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
      {/* <Button title="Click me" onPress={() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }} loading={loading} />
      <Button title="Click me" variant='secondary' size='small' icon='AArrowDown' loading={loading} />
      <Button title="Click me" variant='error' size='large' icon='AArrowDown' spaced loading={loading} />
      <Button title="Click me" onPress={() => dropdownMenu.open([
          { label: 'Option 1', action: () => console.log('Option 1 sélectionnée') },
          { label: 'Option 2', action: () => console.log('Option 2 sélectionnée') },
          { label: 'Supprimer', action: () => console.log('Suppression...'), isError: true }
        ])} /> */}
      {/* @ts-ignore */}
      {/* <DateTimePicker value={date} onChange={(date) => setDate(date)} mode='date'/>
      <IconButton icon='AArrowDown' loading={loading} />
      <IconButton icon='AArrowDown' size='small' variant='secondary' loading={loading} />
      <IconButton icon='AArrowDown' size='large' variant='error' loading={loading} />
      <Input placeholder='Entrez votre nom' value={name} onChangeText={setName} />
      <ThemedText>{name}</ThemedText> */}
      {/* <SearchInput placeholder='Rechercher...' value={name} onChangeText={setName} />
      <ThemedText>{name}</ThemedText> */}
      <Select placeholder='Sélectionner une option' items={[{ label: 'Option 1', value: 'option1' }, { label: 'Option 2', value: 'option2' }]} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
