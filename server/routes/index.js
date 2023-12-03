import { Router } from "express";
import clientProvider from "../../utils/clientProvider.js";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
  const sendData = { text: "This is coming from /apps/api route." };

  return res.status(200).json(sendData);
});

userRoutes.put("/update-product", async (req, res) => {
  const { id, title, description } = req.body;

  try {
    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: false,
    });
 
    const updateProductMutation = await client.query({
      data: `
      mutation {
        productUpdate(input: {
          id: "gid://shopify/Product/${id}", 
          title: "${title}",
          descriptionHtml: "${description}"
        
          }) {
          product {
            id
            title
            descriptionHtml
          }
        }
      }
      `,
    });

    const responseData = updateProductMutation.body.data.productUpdate.product;
    console.log(responseData);

    if (!responseData) {
      throw new Error('The "collection" property is missing in the response data.');
    }

    console.log(responseData);
    res.status(200).json({ data: responseData });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

userRoutes.get("/get-product-by-id", async (req, res) => {

  try {

    let id = req.query.id 

    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: false,
    });

    const data = await client.query({

      data: `
      query {
        product(id: "gid://shopify/Product/${id}") {
          title
          description
          onlineStoreUrl
        }
      }
      `

    });

    console.log(data.body.data.product)
    res.status(200).json(data.body.data.product)

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

userRoutes.get("/get-products-by-collection", async (req, res) => {

  try {

    let id = req.query.id 

    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: false,
    });

    const data = await client.query({

      data: `
      query {
        collection(id: "gid://shopify/Collection/${id}") {
          id
          title
          products(first: 10) {
            edges {
              node {
                id
                title
                description
              }
            }
          }
        }
      }
      
      `

    });

    console.log(data.body.data.collection.products.edges)
    res.status(200).json(data.body.data.collection.products.edges)

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

userRoutes.get("/get-collection", async (req, res) => {

  try {

    let id = req.query.id

    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: false,
    });

    const data = await client.query({

      data: `query {
    collection(id: "gid://shopify/Collection/${id}") {
      title
      id
      description
    }
  }`

    });


    res.status(200).json(data.body.data.collection)

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

userRoutes.put("/update-collection", async (req, res) => {
  const { id, title, description } = req.body;

  try {
    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: false,
    });

    const updateCollectionMutation = await client.query({
      data: `
      mutation {
        collectionUpdate(input: {
          id: "gid://shopify/Collection/${id}",
          title: "${title}",
          descriptionHtml: "${description}"
        }) {
          collection {
            id
            title
            descriptionHtml
          }
          userErrors {
            field
            message
          }
        }
      }
      `,
    });

    const responseData = updateCollectionMutation.body.data.collectionUpdate;
    console.log(responseData);

    if (!responseData) {
      throw new Error('The "collection" property is missing in the response data.');
    }

    console.log(responseData);
    res.status(200).json({ data: responseData });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

userRoutes.post("/create-collection", async (req, res) => {
  const { title, description } = req.body;

  try {
    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: false,
    });

    const createCollectionMutation = await client.query({
      data: `
        mutation {
          collectionCreate(input: {
            title: "${title}"
            descriptionHtml: "${description}"
          }) {
            collection {
              id
              title
              descriptionHtml
            }
            userErrors {
              field
              message
            }
          }
        }
      `
    });

    const responseData = createCollectionMutation.body.data.collectionCreate;
    console.log(responseData)

    if (!responseData) {
      throw new Error('The "collection" property is missing in the response data.');
    }

    console.log(responseData);
    res.status(200).json({ data: responseData });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }


})

userRoutes.get("/collection-list", async (req, res) => {

  //false for offline session, true for online session
  const { client } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: false,
  });

  const collectionLists = await client.query({
    data: `{
        collections(first:250) {
          edges {
            node {
              id
              image {
                originalSrc
                altText
              }
              title
              description
              handle
              updatedAt
              productsCount
              sortOrder
            }
          }
        }
      }
      `,
  });

  return res.status(200).json({ allCollections: collectionLists.body.data.collections.edges });
});

userRoutes.get("/store-name", async (req, res) => {

  //false for offline session, true for online session
  const { client } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: false,
  });

  const shop = await client.query({
    data: `{
      shop {
        name,
        id
      }
    }`,
  });

  return res.status(200).json({ text: shop.body.data.shop.name, storeId: shop.body.data.shop.id });
});

userRoutes.post("/", (req, res) => {
  return res.status(200).json(req.body);
});

userRoutes.get("/debug/gql", async (req, res) => {
  //false for offline session, true for online session
  const { client } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: false,
  });

  const shop = await client.query({
    data: `{
      shop {
        name
      }
    }`,
  });

  return res.status(200).json({ text: shop.body.data.shop.name });
});

userRoutes.get("/debug/activeWebhooks", async (req, res) => {
  const { client } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: true,
  });
  const activeWebhooks = await client.query({
    data: `{
      webhookSubscriptions(first: 25) {
        edges {
          node {
            topic
            endpoint {
              __typename
              ... on WebhookHttpEndpoint {
                callbackUrl
              }
            }
          }
        }
      }
    }`,
  });
  return res.status(200).json(activeWebhooks);
});

userRoutes.get("/debug/getActiveSubscriptions", async (req, res) => {
  const { client } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: true,
  });
  const response = await client.query({
    data: `{
      appInstallation {
        activeSubscriptions {
          name
          status
          lineItems {
            plan {
              pricingDetails {
                ... on AppRecurringPricing {
                  __typename
                  price {
                    amount
                    currencyCode
                  }
                  interval
                }
              }
            }
          }
          test
        }
      }
    }`,
  });

  res.status(200).send(response);
});

userRoutes.get("/debug/createNewSubscription", async (req, res) => {
  const { client, shop } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: true,
  });
  const returnUrl = `${process.env.SHOPIFY_APP_URL}/api/auth?shop=${shop}`;

  const planName = "$10.25 plan";
  const planPrice = 10.25; //Always a decimal

  const response = await client.query({
    data: `mutation CreateSubscription{
    appSubscriptionCreate(
      name: "${planName}"
      returnUrl: "${returnUrl}"
      test: true
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: { amount: ${planPrice}, currencyCode: USD }
            }
          }
        }
      ]
    ) {
      userErrors {
        field
        message
      }
      confirmationUrl
      appSubscription {
        id
        status
      }
    }
  }
`,
  });

  if (response.body.data.appSubscriptionCreate.userErrors.length > 0) {
    console.log(
      `--> Error subscribing ${shop} to plan:`,
      response.body.data.appSubscriptionCreate.userErrors
    );
    res.status(400).send({ error: "An error occured." });
    return;
  }

  return res.status(200).send({
    confirmationUrl: `${response.body.data.appSubscriptionCreate.confirmationUrl}`,
  });
});

export default userRoutes;
