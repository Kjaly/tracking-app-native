import React, {useEffect, useState} from 'react';
import {Button, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import moment from 'moment'

export default function App() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState('')
    const [data, setData] = useState([
        {date: moment().format('LL'), amount: 2000},
        {date: moment().subtract(1, 'days').format('LL'), amount: 2500},
        {date: moment().subtract(1, 'days').format('LL'), amount: 3500},
        {date: moment().subtract(2, 'days').format('LL'), amount: 3500},
        {date: moment().subtract(2, 'days').format('LL'), amount: 3500},
        {date: moment().subtract(1, 'days').format('LL'), amount: 5500},
        {date: moment().subtract(4, 'days').format('LL'), amount: 4500},
    ])
    const [transformedData, setTransformedData] = useState([])

    useEffect(() => {
        setTransformedData(transformData(groupBy(data, 'date')))
    }, [data])

    const groupBy = (array, key) =>
        array.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x)
            return rv
        }, {})

    const [gigs, setGigs] = useState([
        {
            description: 'Freelance job',
            amount: 499.99,
            timestamp: new Date(),
        },
    ]);
    const getDates = () => transformedData.map(pair => pair.date)
    const getAmounts = () => transformedData.map(pair => pair.amount)
    const transformData = (groupedData) => {
        const transformedArray = []
        Object.entries(groupedData).forEach(entry => {
            const total = entry[1].reduce((total, pair) => total + pair.amount, 0)
            transformedArray.push({date: moment(entry[0]).format('MM/DD'), amount: total})
        })
        const sortedArray = transformedArray.sort((a, b) => moment(a['date']).diff(b['date']))

        return sortedArray
    }
    useEffect(() => {
        setTotal(gigs.reduce((total, gig) => {
            return total + (+gig.amount)
        }, 0))

    }, [gigs])

    const addGig = () => {
        setGigs([...gigs, {
            description: description,
            amount: amount,
        }]);
        setData([
            ...data,
            {
                date: moment().format('LL'),
                amount: +amount
            }

        ])
        setDescription('')
        setAmount('')
    }


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.titleBar}>Tracking app</Text>
            </View>
            <View style={{marginTop: 30}}>
                <Text>Bezier Line Chart</Text>
                <LineChart
                    data={{
                        labels: getDates(),
                        datasets: [
                            {
                                data: getAmounts()
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel="$"
                    // yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#ff0505",
                        backgroundGradientFrom: "#0f4f3e",
                        backgroundGradientTo: "#23a07f",
                        decimalPlaces: null, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#217c2e"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 8
                    }}
                />
            </View>
            <Text>Total Income: ${total}</Text>
            <TextInput
                style={styles.input}
                value={description}
                placeholder='Enter a description'
                onChangeText={text => setDescription(text)}/>
            <TextInput
                style={styles.input}
                value={amount}
                keyboardType='numeric'
                placeholder='Enter the amount you made in USD (?)'
                onChangeText={text => setAmount(text)}/>

            <Button disabled={!amount || !description} onPress={addGig} title={'Add GIG 🚀 '}/>
            {gigs.map(gig => (
                <View>
                    <Text>{gig.description}</Text>
                    <Text>${gig.amount}</Text>
                </View>
            ))}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleBar: {
        fontSize: 34,
        fontWeight: '700',
    },
    input: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
        padding: 5,
        height: 40,
        borderColor: 'red',
        borderWidth: 1
    },
    container: {
        flex: 1,
        textAlign: 'center'
        // paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});

