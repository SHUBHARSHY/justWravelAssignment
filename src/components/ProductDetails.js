// import React from 'react'
// import { useParams } from 'react-router-dom'
// import useAPI from '../tools/useAPI'

// const ProductDetails = () => {

//     const {id}= useParams()
//     const data = useAPI()

//     function findProductById(id) {
//         // Use Array.find() to search for the object with the matching ID
//         return data.find((product) => {
//             return product?.id == id});
//       }
      
      
//       const product = findProductById(id);
// console.log(product)

// if(!product) return

//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer hover:shadow-xl">
//     <div className="relative w-100 h-[200px]  flex justify-center items-cente">
//       <img className="w-40 h-full object-cover" src={product?.image} alt={product?.title} />
//     </div>
//   <div className="px-6 py-4">
//     <div className="font-bold text-xl mb-2">{product?.title}</div>
//     <p className="text-gray-700 text-base line-clamp-2">{product?.description}</p>
//     <div className="flex justify-between items-center mt-4">
//       <span className="text-gray-500">{product?.category}</span>
//       <span className="text-gray-900">{product?.price}</span>
//     </div>
//     <div className="flex justify-between items-center mt-2">
//       <span className="text-gray-500">{`Rating: ${product?.rating?.rate} (${product?.rating?.count} reviews)`}</span>
//     </div>
//   </div>
// </div>
//   )
// }

// export default ProductDetails





import React from 'react';
import { useParams } from 'react-router-dom';
import useAPI from '../tools/useAPI';

const ProductDetails = () => {
  const { id } = useParams();
  const data = useAPI();

  function findProductById(id) {
    return data.find((product) => product?.id == id);
  }

  const product = findProductById(id);

  if (!product) return null;

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full rounded-lg overflow-hidden shadow-lg m-4 relative">
          <div className="relative w-full h-[200px]  flex justify-center items-cente">
            <img className=" h-full object-cover" src={product?.image} alt={product?.title} />
          </div>
        <div className="px-6 py-4">
          <div className="font-bold text-3xl mb-2">{product?.title}</div>
          <p className="text-gray-700 text-lg mb-4">{product?.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">{product?.category}</span>
            <span className="text-gray-900"> ₹ {product?.price * 80}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500">{`Rating: ${product?.rating?.rate} (${product?.rating?.count} reviews)`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


