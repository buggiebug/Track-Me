import { StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllExpenses } from '@/redux/slice/expenseSlice';
import Home from '@/components/Home';

export default function HomeScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllExpenses());
  }, []);

  return (
    <>
      <Home />
    </>
  );
}

const styles = StyleSheet.create({

});
