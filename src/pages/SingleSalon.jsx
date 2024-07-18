import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TopBar from '../components/commoncomponents/TopBar';
import { EDIT_PRODUCT_DETAILS, SINGLE_PRODUCT_DETAILS, UPLOAD_PRODUCT } from '../services/pro/user.service';
import { useParams } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import { SINGLE_SALON_DETAILS } from '../services/crm/user.service';
import axios from 'axios';

const SingleSalon = () => {
  const params = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [name1, setName] = useState('');
  const [newImages, setNewImages] = useState([]);
  const [newDesImages, setNewDesImages] = useState([]);
  const [compressedImage, setCompressedImage] = useState(null);
  const [salonData, setSalonData] = useState({
    name: productDetails.name,
    address:productDetails.address ,
    address2:productDetails.address2,
    rating:productDetails.rating,
    phoneNumber:productDetails.phoneNumber,
    contactNumber:'',
    stateName:productDetails.stateName,
    landmark:productDetails.landmark,
    images: [],
    geoLocation: []
  });
  console.log("productDetailsformdata",productDetails)
  useEffect(() => {
    if (productDetails) {
      setSalonData({
        name: productDetails?.name || '',
        address: productDetails?.address || '',
        address2: productDetails?.address2 || '',
        rating: productDetails?.rating || '',
        phoneNumber: productDetails?.phoneNumber || '',
        contactNumber: productDetails?.contactNumber || '',
        stateName: productDetails?.stateName || '',
        landmark: productDetails?.landmark || '',
        images: productDetails?.images || [],
        geoLocation: productDetails?.geoLocation || []
      });
    }
  }, [productDetails]);

  useEffect(() => {
    async function fetchApi() {
      let salonId = params.shortUrl;
      const product = await axios.get(`https://smartsalon.in/api/getSingleSalonDetail?id=${salonId}`);
      setProductDetails(product?.data?.data);
      setName(product?.data?.data?.name);
      setNewImages(product?.data?.data?.images || []);
      setNewDesImages(product?.data?.data?.desImages || []);
      setSalonData({
        name: product?.data?.data?.name || '',
        address: product?.data?.data?.address || '',
        address2: product?.data?.data?.address2 || '',
        rating: product?.data?.data?.rating || '',
        phoneNumber: product?.data?.data?.phoneNumber || '',
        contactNumber: product?.data?.data?.contactNumber || '',
        stateName: product?.data?.data?.stateName || '',
        landmark: product?.data?.data?.landmark || '',
        images: product?.data?.data?.images || [],
        geoLocation: product?.data?.data?.geoLocation || []
      });
    }
    fetchApi();
  }, [params.shortUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file);
    }
  };

  const compressImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxWidth = 800; // max width to resize
        const maxHeight = 800; // max height to resize
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob.size > 2 * 1024 * 1024) { // Check if size is greater than 2MB
            const newBlob = new Blob([blob], { type: file.type });
            setCompressedImage(newBlob);
          } else {
            setCompressedImage(blob);
          }
        }, 'image/jpeg', 0.7); // Adjust quality parameter (0.7) as needed
      };
    };
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', compressedImage);
    formData.append('productId', productDetails?._id);

    try {
      const uploadImage = await UPLOAD_PRODUCT(formData);
      if (uploadImage) {
        setNewImages(prevImages => [...prevImages, uploadImage]);
        toast.success("Successfully updated!");
      }
    } catch (error) {
      console.error('Failed to upload images:', error);
    }
  };

  const handleRemoveImage = (index, type) => {
    if (type === 'images') {
      setNewImages(prevImages => prevImages.filter((_, i) => i !== index));
    } else if (type === 'desImages') {
      setNewDesImages(prevImages => prevImages.filter((_, i) => i !== index));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalonData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(salonData);
    const allDetails = await EDIT_PRODUCT_DETAILS({
      obj: {
        ...salonData,
        images: newImages,
        desImages: newDesImages
      },
      id: productDetails?._id
    });
    if (allDetails) {
      toast.success("Successfully Updated!");
    }
  };

  return (
    <Layout>
      <div className='w-full flex flex-col'>
        <TopBar title={productDetails?.name} />
        <div className='w-[90%] mx-auto'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={salonData.name} 
                onChange={handleChange} 
                className='mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Address:</label>
              <input 
                type="text" 
                name="address" 
                value={salonData.address} 
                onChange={handleChange} 
                className='mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Address 2:</label>
              <input 
                type="text" 
                name="address2" 
                value={salonData.address2} 
                onChange={handleChange} 
                className='mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Rating:</label>
              <input 
                type="text" 
                name="rating" 
                value={salonData.rating} 
                onChange={handleChange} 
                className='mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Phone Number:</label>
              <input 
                type="text" 
                name="phoneNumber" 
                value={salonData.phoneNumber} 
                onChange={handleChange} 
                className='mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Contact Number:</label>
              <input 
                type="text" 
                name="contactNumber" 
                value={salonData.contactNumber} 
                onChange={handleChange} 
                className='mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>State Name:</label>
              <input 
                type="text" 
                name="stateName" 
                value={salonData.stateName} 
                onChange={handleChange} 
                className='mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Landmark:</label>
              <input 
                type="text" 
                name="landmark" 
                value={salonData.landmark} 
                onChange={handleChange} 
                className='mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Images:</label>
              <input 
                type="file" 
                onChange={handleFileChange} 
                className='mt-1'
              />
              <Button onClick={handleImageUpload}>Upload Image</Button>
            </div>
            <div className='mt-4'>
              {newImages?.length > 0 && newImages.map((img, index) => (
                <div key={index} className='flex items-center'>
                  <img src={img} alt="salon" className='w-16 h-16 rounded mr-2'/>
                  <ImCross onClick={() => handleRemoveImage(index, 'images')} className='cursor-pointer text-red-500'/>
                </div>
              ))}
            </div>
            <Button type="submit">Save</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SingleSalon;
