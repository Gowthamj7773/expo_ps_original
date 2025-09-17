    import { View, StyleSheet } from 'react-native';
    import React from 'react';

    export default function SkeletonCard() {
    return (
    <View style={styles.container}>
        {/* Image Skeleton */}
        <View style={styles.imageSkeleton} />

        {/* Text Skeleton */}
        <View style={styles.textContainer}>
        <View style={styles.textLine} />
        <View style={[styles.textLine, { width: '70%' }]} />
        </View>
    </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    },
    imageSkeleton: {
    width: '100%',
    height: 240,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    },
    textContainer: {
    marginTop: 10,
    },
    textLine: {
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
    width: '100%',
    },
    });
