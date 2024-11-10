import { StyleSheet } from 'react-native';
import TransactionHome from "@/components/expense/TransactionHome";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllExpenses } from '@/redux/slice/expenseSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllExpenses());
  }, []);

  return (
    <>
      <TransactionHome />
    </>
  );
}

const styles = StyleSheet.create({

});
