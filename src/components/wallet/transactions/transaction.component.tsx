import React, {useEffect, useState, useImperativeHandle} from 'react';
import {useSelector} from 'react-redux';

import Link from 'next/link';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {useStyles} from './transaction-style';
import TransactionListComponent from './transactionList.component';

import {useTransaction} from 'src/hooks/use-transaction.hooks';
import {RootState} from 'src/reducers';
import {UserState} from 'src/reducers/user/reducer';

interface TransactionProps {
  forwardedRef: React.ForwardedRef<any>;
  detailed?: boolean;
}

const TransactionComponent: React.FC<TransactionProps> = ({forwardedRef, detailed}) => {
  const styles = useStyles();

  const {user} = useSelector<RootState, UserState>(state => state.userState);
  const {loading, error, transactions, loadInitTransaction} = useTransaction();
  const [walletTabIdx, setWalletTabIdx] = useState(0);

  useEffect(() => {
    window.localStorage.setItem('walletTabIdx', String(walletTabIdx));
  }, [walletTabIdx]);

  useEffect(() => {
    loadInitTransaction();
  }, []);

  useImperativeHandle(forwardedRef, () => ({
    triggerRefresh: () => {
      loadInitTransaction();
    },
  }));

  const handleClick = () => {
    setWalletTabIdx(1);
  };

  if (!user) return null;

  const TippingJarHeader = () => {
    return (
      <div className={styles.rootPanel}>
        <Typography variant="h4" className={styles.panelHeader}>
          {'My Tipping Jar'}
        </Typography>
      </div>
    );
  };

  const LoadingComponent = () => {
    return (
      <Grid container justify="center">
        <CircularProgress className={styles.loading} />
      </Grid>
    );
  };

  const ErrorComponent = () => {
    return (
      <Grid container justify="center">
        <Typography>Error, please try again later!</Typography>
      </Grid>
    );
  };

  const EmptyTransactionComponent = () => {
    return (
      <Grid container justify="center">
        <Typography>Data not available</Typography>
      </Grid>
    );
  };

  return (
    <div ref={forwardedRef}>
      <TippingJarHeader />
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent />
      ) : transactions.length === 0 ? (
        <EmptyTransactionComponent />
      ) : (
        <>
          <TransactionListComponent transactions={transactions} user={user} />
          <Link href={`/${user.id}`} passHref>
            <Button
              className={styles.expandButton}
              onClick={handleClick}
              variant="contained"
              color="primary">
              See Wallet Details
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default TransactionComponent;
