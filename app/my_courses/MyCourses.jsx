    import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    Animated,
    Pressable,
    ScrollView,
    } from 'react-native';
    import { useState } from 'react';
    import React from 'react';
    import CourseCard from './CourseCard';
    import SearchIcon from '../assets/svg/SearchIcon';
    import CloseIcon from '../assets/svg/CloseIcon';
    import SkeletonCard from './SkeletonCard';

    export default function MyCourses() {
    const course = [
    {
        id: 282331,
        name: 'New Product Development and Innovations - Level 1D - Artistic Design Vertical',
        img: '../../assets/images/56.png',
    },
    {
        id: 342236,
        name: 'Problem Solving Skills - Daily Challenge',
        img: '../../assets/images/56.png',
    },
    {
        id: 342237,
        name: 'Digital Assurance Level - 1',
        img: '../../assets/images/56.png',
    },
    {
        id: 441776,
        name: 'C Programming Level - 6',
        img: '../../assets/images/56.png',
    },
    {
        id: 478115,
        name: 'TRIZ Level 0',
        img: '../../assets/images/56.png',
    },
    {
        id: 478342,
        name: 'Aptitude Level - 1A',
        img: '../../assets/images/56.png',
    },
    {
        id: 535412,
        name: 'Reading Classroom - WW226',
        img: '../../assets/images/56.png',
    },
    {
        id: 575656,
        name: 'Reading Classroom - WW207',
        img: '../../assets/images/56.png',
    },
    {
        id: 575658,
        name: 'Reading Classroom - WW225',
        img: '../../assets/images/56.png',
    },
    {
        id: 575659,
        name: 'Reading Classroom - EW206',
        img: '../../assets/images/56.png',
    },
    {
        id: 575660,
        name: 'Reading Classroom - EW212',
        img: '../../assets/images/56.png',
    },
    {
        id: 575661,
        name: 'Reading Classroom - EW218',
        img: '../../assets/images/56.png',
    },
    {
        id: 674823,
        name: 'IPR-Patent Search - Level 0',
        img: '../../assets/images/56.png',
    },
    {
        id: 678145,
        name: 'Data Science Level 0 ',
        img: '../../assets/images/56.png',
    },
    {
        id: 788670,
        name: 'Programming Python Level - 4',
        img: '../../assets/images/56.png',
    },
    {
        id: 791669,
        name: 'Communication Level - 1A',
        img: '../../assets/images/56.png',
    },
    {
        id: 804575,
        name: 'System Administration - Level 0',
        img: '../../assets/images/56.png',
    },
    {
        id: 863979,
        name: 'Aptitude Level - 1H',
        img: '../../assets/images/56.png',
    },
    ];

    const [isDataAvailable , setIsDataAvailable] = useState(true); //this is used for checking if response recieved or not
    const [search, setSearch] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);

    const repeat = 10 //number of skeleton cards to show while loading

    const animatedValue = React.useRef(new Animated.Value(0)).current;

    const filteredCourses = course?.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()),
    );

    const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
    }).start();
    };

    const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
    }).start();
    };

    const searchBarStyle = {
        borderColor: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#E5E7EB', 'rgba(125, 83, 246,0.75)'],
        }),
        shadowOpacity: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.1, 0.2],
        }),
        transform: [
        {
            scale: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.02],
            }),
        },
        ],
    };

    //helper function for showing skeleton loaders
    function range(start, end, step = 1) {
        // Handle cases where only 'end' is provided, assuming start = 0
        if (typeof end === 'undefined') {
        end = start;
        start = 0;
        }

        const length = Math.ceil((end - start) / step);

        return Array.from({ length }, (_, i) => start + i * step);
    }
    return (
        <View style={styles.container}>
        {/* Enhanced Search Bar */}
        <Animated.View style={[styles.searchContainer, searchBarStyle]}>
            <View style={styles.searchIconContainer}>
            <SearchIcon size={20} />
            </View>
                <TextInput
                style={styles.searchInput}
                placeholder="Search for courses..."
                value={search}
                onChangeText={setSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholderTextColor="#9CA3AF"
                />
            {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
                <CloseIcon />
            </Pressable>
            )}
        </Animated.View>
                {/* Header Section */}
        <View style={styles.header}>
            <Text style={styles.headerSubtitle}>
            {isDataAvailable ? course?.length : 0} courses available
            </Text>
        </View>
        {/* Search Results Counter */}
        {isDataAvailable && search.length > 0 && (
            <View style={styles.resultsCounter}>
            <Text style={styles.resultsText}>
                {filteredCourses.length} result
                {filteredCourses.length !== 1 ? 's' : ''} found
            </Text>
            </View>
        )}

        {/* Course List */}
        {isDataAvailable ? (
            filteredCourses.length === 0 ? (
            <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsEmoji}>📚</Text>
                <Text style={styles.noResultsTitle}>No courses found</Text>
                <Text style={styles.noResultsSubtitle}>
                {search.length > 0
                    ? `Try adjusting your search for "${search}"`
                    : 'No courses available at the moment'}
                </Text>
            </View>
            ) : (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredCourses}
                renderItem={({ item, index }) => (
                <View
                    style={
                    index === filteredCourses.length - 1
                        ? { marginBottom: 50 }
                        : null
                    }
                >
                    <CourseCard name={item.name} Img={item.img} />
                </View>
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
            />
            )
        ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
            {range(0, repeat).map(key => (
                <View key={key} style={ key === repeat-1 ? { marginBottom: 100 } : null }>
                <SkeletonCard  />
                </View>
            ))}
            </ScrollView>
        )}
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    },
    header: {
        paddingVertical:10
    },
    headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    },
    headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    },
    searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop:30,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowRadius: 12,
    elevation: 8,
    },
    searchIconContainer: {
    marginRight: 12,
    padding: 4,
    },
    searchIcon: {
    fontSize: 20,
    opacity: 0.6,
    },
    searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    paddingVertical: 3,
    },
    clearButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: "100%",
    marginLeft: 8,
    },
    clearButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    },
    resultsCounter: {
    marginBottom: 12,
    paddingHorizontal: 4,
    },
    resultsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    },
    noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    },
    noResultsEmoji: {
    fontSize: 48,
    marginBottom: 16,
    },
    noResultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
    },
    noResultsSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    },
    flatListContent: {
    paddingBottom: 20,
    },
    });
