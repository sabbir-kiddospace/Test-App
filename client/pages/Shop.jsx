import {Page, Layout,Card, Text, Button} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';

const Shop = () => {

  let [storeName, setStoreName] = useState('')
  let [storeId, setStoreId] = useState('')

  let url = '/api/apps/store-name';

  useEffect(() => {
    (async() => {
      try {
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();


        setStoreName(data.text);
        setStoreId(data.storeId);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
    })()
  },[])


    return (
        <Page fullWidth>
        <Layout>
          <Layout.Section>
        <Card>
    
      <Text variant="headingXl" as="h2">
      Store Name : {storeName  || "Loading...."}
      </Text>
      <Text variant="headingXl" as="h2">
      Store ID : {storeId || "Loading...."} 
      </Text>

    </Card>
    </Layout.Section>
      </Layout>
    </Page>
    );
};

export default Shop;