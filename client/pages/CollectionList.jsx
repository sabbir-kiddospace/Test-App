import {Page, Layout, LegacyCard, DataTable, Button} from '@shopify/polaris';
import { useEffect, useState } from 'react';


const CollectionList = () => {

    let [data, setData] = useState([])

  let url = '/api/apps/collection-list';

  useEffect(() => {
    (async() => {
      try {
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();

 
        setData(data.allCollections)
        console.log(data.allCollections)

        // setStoreName(data.text);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
    })()
  },[])

 


    return (
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-10">
      <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              List of all collections
              </h3>
            
          </div>
          <div className="mt-3 md:mt-0">
              <a
                  href="/create-collection"
                  className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                  Add Collection
              </a>
          </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                      <th className="py-3 px-6">Collection Name</th>
                      <th className="py-3 px-6">Collection Description</th>
                      <th className="py-3 px-6"></th>

                  </tr>
              </thead>
              <tbody className="text-gray-600 divide-y bg-white">
                  {
                     
                      data.map((item, idx) => (
                          <tr key={idx}>
                              <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                  <img src={item.node.image?.originalSrc} className="w-10 h-10 rounded-full" />
                                  <div>
                                      <span className="block text-gray-700 text-sm font-medium">{item.node.title}</span>
                                  </div> 
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">{item.node.description}</td>
                              <td className="text-right px-6 whitespace-nowrap">
                                  <a href={`/edit-collection?id=${item.node.id.replace("gid://shopify/Collection/","")}`} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                      Edit Collection
                                  </a>
                                  <a href={`/product-list?id=${item.node.id.replace("gid://shopify/Collection/","")}`} className="py-2 leading-none px-3 font-medium text-green-600 hover:text-green-400 duration-150 hover:bg-gray-50 rounded-lg">
                                      Products
                                  </a>
                              </td>
                          </tr>
                      ))
                  }
              </tbody>
          </table>
      </div>
  </div>
    );
};

export default CollectionList;