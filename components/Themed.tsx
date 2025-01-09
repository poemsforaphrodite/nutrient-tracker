import { Text as DefaultText, View as DefaultView } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export const Text = ThemedText;
export const View = ThemedView;

export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props']; 