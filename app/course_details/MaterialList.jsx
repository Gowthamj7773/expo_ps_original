import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import UpArrow from '../assets/svg/UpArrow';
import DownArrow from '../assets/svg/DownArrow';
import Tick from '../assets/svg/Tick';
import NoTick from '../assets/svg/NoTick';
import YoutubePlayButton from '../assets/svg/YoutubePlayButton';
import LinkIcon from '../assets/svg/LinkIcon';
import { Ionicons } from '@expo/vector-icons';
import DocumentTextIcon from '../assets/svg/DocumentTextIcon';

export default function MaterialList({ serialNum, details, sectionIndex, HandleTopBox, updateMaterialCompletion, isFirst, isLast }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedTopicId, setSelectedTopicId] = useState(null);

    function getTypeIcon(type) {
        switch (type) {
            case 'youtube':
                return <YoutubePlayButton size={16}/>;
            case 'link':
                return <LinkIcon size={16} color="#6B7280" />;
            case 'text':
                return <DocumentTextIcon name="document-text" size={16} color="#6B7280" />;
            default:
                return <Ionicons name="document" size={16} color="#6B7280" />;
        }
    }

    function handleTopicPress(item, index) {
        setSelectedTopicId(index);
        HandleTopBox(item);
    }

    function handleTickToggle(topicIndex) {
        const currentStatus = details.topics[topicIndex].completed;
        updateMaterialCompletion(sectionIndex, topicIndex, !currentStatus);
    }

    // Get border radius styles based on position
    function getBorderRadius() {
        if (isFirst && isLast) {
            return { borderRadius: 8 }; // All corners rounded if only one item
        } else if (isFirst) {
            return { borderTopLeftRadius: 8, borderTopRightRadius: 8 };
        } else if (isLast) {
            return { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 };
        }
        return {}; // No border radius for middle items
    }

    return (
        <View style={[styles.sectionContainer, getBorderRadius()]}>
            <Pressable
                onPress={() => setIsExpanded(prev => !prev)}
                style={[
                    styles.headerContainer,
                    { backgroundColor: isExpanded ? '#ddd7fc' : 'white' },
                    isFirst && { borderTopLeftRadius: 8, borderTopRightRadius: 8 },
                    isLast && !isExpanded && { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }
                ]}
            >
                <View style={styles.headerContent}>
                    <View style={styles.headerTop}>
                        <Text style={styles.sectionTitle}>
                            Section {serialNum}: {details?.section}
                        </Text>
                        {isExpanded ? (
                            <UpArrow size={20} color="#6B7280" strokeWidth={2} />
                        ) : (
                            <DownArrow size={20} color="#6B7280" strokeWidth={2} />
                        )}
                    </View>
                </View>
            </Pressable>

            {isExpanded && (
                <View style={[
                    styles.topicsContainer,
                    isLast && { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }
                ]}>
                    {details?.topics.map((item, id) => (
                        <Pressable 
                            key={id} 
                            onPress={() => handleTopicPress(item, id)}
                            style={[
                                styles.topicContainer,
                                selectedTopicId === id && styles.topicSelected,
                                isLast && id === details?.topics.length - 1 && { 
                                    borderBottomLeftRadius: 8, 
                                    borderBottomRightRadius: 8 
                                }
                            ]}
                        >
                            <Pressable 
                                onPress={() => handleTickToggle(id)} 
                                style={styles.tickContainer}
                            >
                                {item.completed ? (
                                    <Tick/>
                                ) : (
                                    <NoTick />
                                )}
                            </Pressable>
                            
                            <View style={styles.topicContent}>
                                <Text style={styles.topicTitle}>
                                    {id + 1}. {item.title}
                                </Text>
                                <View style={styles.topicMeta}>
                                    <View style={styles.topicTypeContainer}>
                                        {getTypeIcon(item.type)}
                                        <Text style={styles.topicType}>
                                            {item.type}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    headerContainer: {
        padding: 16,
    },
    headerContent: {
        width: '100%',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
        flex: 1,
    },
    materialsCount: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },
    topicsContainer: {
        backgroundColor: 'white',
    },
    topicContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },
    topicSelected: {
        backgroundColor: '#EEEEEE'
    },
    tickContainer: {
        marginRight: 12,
        marginTop: 2,
    },
    checkedBox: {
        width: 20,
        height: 20,
        backgroundColor: '#7D53F6',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uncheckedBox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        borderRadius: 4,
        backgroundColor: 'white',
    },
    topicContent: {
        flex: 1,
    },
    topicTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 4,
    },
    topicMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topicTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    topicType: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },
    topicDuration: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },
});