import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

export const enableExtension = async () => {
  const {web3Enable, web3Accounts} = await import('@polkadot/extension-dapp');

  const extensions = await web3Enable(publicRuntimeConfig.appName);

  if (extensions.length === 0) {
    // no extension installed, or the user did not accept the authorization
    // in this case we should inform the use and give a link to the extension
    return;
  }

  // we are now informed that the user has at least one extension and that we
  // will be able to show and use accounts
  const allAccounts = await web3Accounts();
  return allAccounts;
};

export const unsubscribeFromAccounts = async () => {
  const {web3AccountsSubscribe} = await import('@polkadot/extension-dapp');

  const allAccounts = enableExtension();

  if (allAccounts) {
    //// we subscribe to any account change and log the new list.
    //// note that `web3AccountsSubscribe` returns the function to unsubscribe
    const unsubscribe = await web3AccountsSubscribe(injectedAccounts => {
      injectedAccounts.map(accounts => {
        console.log('detail about the unsubscribed accounts: ', accounts);
      });
    });

    //// don't forget to unsubscribe when needed, e.g when unmounting a component
    unsubscribe && unsubscribe();
  } else {
    return;
  }
};
