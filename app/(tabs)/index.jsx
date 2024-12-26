import { StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllExpenses } from '@/redux/slice/expenseSlice';

export default function HomeScreen() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllExpenses());
  // }, []);

  return (
    <>
      <Text>Home</Text>
    </>
  );
}

const styles = StyleSheet.create({

});
