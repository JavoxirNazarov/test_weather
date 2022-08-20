import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BottomSheetProps, BottomSheetRef } from './interfaces';
import { Portal } from 'react-native-portalize';

const { height } = Dimensions.get('screen');

const MIDDLE_OFFSET = -(height / 1.5);
const MAX_OFFSET = -(height - 1.2);
const HANDLER_HEIGHT = 50;

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children }, ref) => {
    const offsetY = useSharedValue(0);
    const startOffsetY = useSharedValue(0);
    const [initialized, setInitialized] = useState(false);

    const closeModal = () => {
      'worklet';
      offsetY.value = withTiming(0);
    };

    useImperativeHandle(
      ref,
      () => ({
        showModal: () => {
          'worklet';
          if (!initialized) {
            setInitialized(true);
          }
          offsetY.value = withSpring(MIDDLE_OFFSET);
        },
      }),
      [offsetY, initialized],
    );

    const offsetStyles = useAnimatedStyle(() => {
      return { transform: [{ translateY: offsetY.value }] };
    });

    const contentContainerStyles = useAnimatedStyle(() => {
      return { height: -(offsetY.value + HANDLER_HEIGHT) };
    });

    const overlayStyles = useAnimatedStyle(() => {
      return {
        height: offsetY.value < 0 ? height : 0,

        opacity: interpolate(offsetY.value, [5, MIDDLE_OFFSET], [0, 0.7]),
      };
    });

    const gesture = Gesture.Pan()
      .onBegin(() => {
        startOffsetY.value = offsetY.value;
      })
      .onUpdate(e => {
        const newValue = startOffsetY.value + e.translationY;

        if (newValue > MAX_OFFSET) {
          offsetY.value = newValue;
        }
      })
      .onEnd(() => {
        if (offsetY.value < MIDDLE_OFFSET) {
          offsetY.value = withSpring(MIDDLE_OFFSET);
        } else if (offsetY.value > MIDDLE_OFFSET) {
          offsetY.value = withTiming(0);
        }
      });

    return (
      <Portal>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Animated.View style={[styles.overlay, overlayStyles]} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.container, offsetStyles]}>
          <GestureDetector gesture={gesture}>
            <View style={styles.handler}>
              <View style={styles.line} />
            </View>
          </GestureDetector>
          {/* MADE EXPANDABLE VIEW PROTECT FROM OVERFLOW */}
          <Animated.View style={[styles.content, contentContainerStyles]}>
            {initialized && children()}
          </Animated.View>
        </Animated.View>
      </Portal>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000000',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  container: {
    zIndex: 2,

    width: '100%',
    height: height,
    position: 'absolute',
    left: 0,
    bottom: -height,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  handler: {
    height: HANDLER_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 30,
    height: 4,
    borderRadius: 10,
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
