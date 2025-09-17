import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import UpArrow from '../assets/svg/UpArrow';
import DownArrow from '../assets/svg/DownArrow';
import Tick from '../assets/svg/Tick';
import NoTick from '../assets/svg/NoTick';

export default function MaterialList({ serialNum, details, HandleTopBox }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTicked , setIsTicked] = useState(false);
    const [checkId , setCheckId] = useState(null);

    // later this function can be changed to post function for updating tick mark in backend (which fixes materials completed count in header [e.g: materials: 0/2])
    function UpdateDetails(id){
        details.topics[id].completed = true;
    }
    return (
        <View>
            <Pressable
                onPress={() => setIsExpanded(prev => !prev)}
                style={styles.headerContainer}
            >
                <View style={styles.headerContent}>
                    <View className='flex-row'>
                        <Text style={styles.sectionTitle}>{serialNum}.  </Text>
                        <Text style={styles.sectionTitle}>{details?.section}</Text>
                    </View>
                    <Text style={styles.materialsCount}>
                        Materials: {details?.completed}/{details?.topics.length}
                    </Text>
                </View>
                {isExpanded ? (
                    <UpArrow size={25} color="#6B7280" strokeWidth={2.5} />
                ) : (
                    <DownArrow size={25} color="#6B7280" strokeWidth={2.5} />
                )}
            </Pressable>

            {isExpanded &&
                details?.topics.map((item, id) => (
                    <Pressable key={id} onPress={() => {HandleTopBox(item)}}>
                        <View style={styles.topicContainer}>
                            {/* below pressable func can be changed to post function for updating tick mark in backend */}
                            <Pressable onPress={()=>{setCheckId(id) ; setIsTicked(prev => !prev) ; UpdateDetails(id)}} style={styles.tickContainer}>
                                {item.completed || (isTicked && checkId == id)? (
                                    <Tick size={20} color="#7D53F6" strokeWidth={2.5} />
                                ) : (
                                    <NoTick size={20} color="#6B7280" strokeWidth={2.5} />
                                )}
                            </Pressable>
                            <View style={styles.topicContent}>
                                <Text style={styles.topicTitle}>
                                    {id + 1}. {item.title}
                                </Text>
                                <Text style={styles.topicType}>{item.type}</Text>
                            </View>
                        </View>
                        {id < details?.topics?.length-1 && <View style={styles.separator} />}
                    </Pressable>
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContent: {
        width: '85%',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
    },
    materialsCount: {
        fontSize: 16,
        color: '#6B7280',
        marginLeft: 20,
    },
    topicContainer: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    tickContainer: {

        padding:6,
        marginRight: 9,
        paddingTop: 2,
    },
    topicContent: {
        width: '85%',
    },
    topicTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
    },
    topicType: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    separator: {
        backgroundColor: '#ddd7fc',
        height: 1,
        marginHorizontal: 10,
    },
});