// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const CollectionList = () => {
//   const [collections, setCollections] = useState([]);

//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/collections');
//         setCollections(response.data);
//       } catch (error) {
//         console.log('Failed to fetch collections:', error);
//       }
//     };

//     fetchCollections();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Available Collections</h2>
//       <div className="flex flex-wrap">
//         {collections.map((collection) => (
//           <div key={collection} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
//             <div className="bg-white shadow-md rounded-lg p-4">
//               <h3 className="text-lg font-bold mb-2">{collection}</h3>
//               <p className="text-gray-700">This is a simple card for the {collection} collection.</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CollectionList;




// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const CollectionList = () => {
//   const [collections, setCollections] = useState([]);

//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/source-collections');
//         setCollections(response.data);
//       } catch (error) {
//         console.log('Failed to fetch collections:', error);
//       }
//     };

//     fetchCollections();
//   }, []);

//   const cloneCollection = async (collection) => {
//     try {
//       const response = await axios.post('http://localhost:8000/api/clone-collection', {
//         collection,
//       });
//       // Handle the response or update the UI as needed
//       console.log('Collection cloned:', response.data);
//     } catch (error) {
//       console.log('Failed to clone collection:', error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Available Collections</h2>
//       <div className="flex flex-wrap">
//         {collections.map((collection) => (
//           <div key={collection} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
//             <div className="bg-white shadow-md rounded-lg p-4">
//               <h3 className="text-lg font-bold mb-2">{collection}</h3>
//               <p className="text-gray-700">This is a simple card for the {collection} collection.</p>
//               <button
//                 className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => cloneCollection(collection)}
//               >
//                 Clone
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CollectionList;







// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const CollectionList = ({ apiEndpoint }) => {
//   const [collections, setCollections] = useState([]);

//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const url = `http://localhost:8000/api/${apiEndpoint}`;

//         const response = await axios.get(url);
//         setCollections(response.data);
//       } catch (error) {
//         console.log('Failed to fetch collections:', error);
//       }
//     };

//     fetchCollections();
//   }, [apiEndpoint]);

//   const cloneCollection = async (collection) => {
//     try {
//       const response = await axios.post('http://localhost:8000/api/clone-collection', {
//         collection,
//       });
//       // Handle the response or update the UI as needed
//       console.log('Collection cloned:', response.data);
//     } catch (error) {
//       console.log('Failed to clone collection:', error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Available Collections</h2>
//       <div className="flex flex-wrap">
//         {collections.map((collection) => (
//           <div key={collection} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
//             <div className="bg-white shadow-md rounded-lg p-4">
//               <h3 className="text-lg font-bold mb-2">{collection}</h3>
//               <p className="text-gray-700">This is a simple card for the {collection} collection.</p>
//               <button
//                 className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => cloneCollection(collection)}
//               >
//                 Clone
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CollectionList;




import { useState, useEffect } from 'react';
import axios from 'axios';

const CollectionList = ({ apiEndpoint }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const url = `http://localhost:8000/api/${apiEndpoint}`;

        const response = await axios.get(url);
        setCollections(response.data);
      } catch (error) {
        console.log('Failed to fetch collections:', error);
      }
    };

    fetchCollections();
  }, [apiEndpoint]);

  const cloneCollection = async (collection) => {
    try {
      const response = await axios.post('http://localhost:8000/api/clone-collection', {
        collection,
      });
      // Handle the response or update the UI as needed
      console.log('Collection cloned:', response.data);
    } catch (error) {
      console.log('Failed to clone collection:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Collections</h2>
      <div className="flex flex-wrap">
        {collections.map((collection) => (
          <div key={collection} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">{collection}</h3>
              <p className="text-gray-700">This is a simple card for the {collection} collection.</p>
              {apiEndpoint === 'flashcard-collections' ? null : (
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => cloneCollection(collection)}
                >
                  Clone
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionList;















