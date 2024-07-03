import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TopBar from '../components/commoncomponents/TopBar';
import { EDIT_PRODUCT_DETAILS, SINGLE_PRODUCT_DETAILS, UPLOAD_PRODUCT } from '../services/pro/user.service';
import { useParams } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import InputTextArea from '../components/commoncomponents/InputTextArea';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';

const SingleProduct = () => {
    const params = useParams();
    const [stockQuantity, setStockQuantity] = useState(null);
    const [productDetails, setProductDetails] = useState({});
    const [newImages, setNewImages] = useState([]);
    const [newDesImages, setNewDesImages] = useState([]);

    useEffect(() => {
        async function fetchApi() {
            const product = await SINGLE_PRODUCT_DETAILS({ shortUrl: params.shortUrl });
            setProductDetails(product);
            setNewImages(product?.images);
            setNewDesImages(product?.desImages)
        }
        fetchApi();
    }, [params.shortUrl]);

    const handleImageUpload = async (event) => {
        const files = event.target.files[0];
        const formData = new FormData();
        formData.append('image', files);
        formData.append('productId', productDetails?._id);

        try {
            const uploadImage = await UPLOAD_PRODUCT(formData);
            if (uploadImage) {
                console.log("uploadImage", uploadImage);
                setNewImages(prevImages => [...prevImages, uploadImage]);
                toast.success("Successfully updated!")
            }
        } catch (error) {
            console.error('Failed to upload images:', error);
        }
    };

    const handleDesImageUpload = async(event) => {
        const files = event.target.files[0]; 
        const formData = new FormData();
        formData.append('image', files);
        formData.append('productId', productDetails?._id);

        try {
            const uploadImage = await UPLOAD_PRODUCT(formData);
            if (uploadImage) {
                console.log("uploadImage", uploadImage);   
                setNewDesImages(prevImages => [...prevImages, uploadImage]);
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
    console.log("new images",newImages);

    const handleSubmitDetails=async()=>{
        const allDetails = await EDIT_PRODUCT_DETAILS({obj:{images:newImages,desImages:newDesImages,stockQuantity:+stockQuantity},id:productDetails?._id});
        console.log("allDetails", allDetails)
    }

    return (
        <Layout>
            <div className='w-full flex flex-col '>
                <TopBar title={productDetails?.name} />
                <div className='w-[90%] mx-auto'>
                    <div className='my-5'>
                        <h1 className='text-2xl text-black font-semibold font-serif tracking-medium'>Images</h1>
                        <div className='w-full flex justify-between items-center gap-5 flex-wrap mt-5'>
                            {newImages?.map((img, index) => (
                                <div className='relative' key={index}>
                                    <img src={img} alt={`new-${index}`} className='w-[100px] h-[100px] object-cover ' />
                                    <ImCross className='absolute top-0 right-0 cursor-pointer' onClick={() => handleRemoveImage(index, 'images')} />
                                </div>
                            ))}
                        </div>
                        <input type="file" multiple onChange={handleImageUpload} className='my-5' />
                    </div>

                    <div className='my-5'>
                        <h1 className='text-2xl text-black font-semibold font-serif tracking-medium'>Description Images</h1>
                        <div className='w-full flex justify-between items-center gap-5 flex-wrap mt-5'>
                            {newDesImages?.map((img, index) => (
                                <div className='relative shadow-lg' key={index}>
                                    <img src={img} alt={`new-des-${index}`} className='w-[100px] h-[100px] object-cover ' />
                                    <ImCross className='absolute top-0 right-0 cursor-pointer text-sm ' onClick={() => handleRemoveImage(index, 'desImages')} />
                                </div>
                            ))}
                        </div>
                        <input type="file" multiple onChange={handleDesImageUpload} className='my-5' />
                    </div>

                    <div className='my-5 '>
                        <h1 className='text-2xl text-black font-semibold font-serif tracking-medium my-3'> Edit Stock Quantity </h1>
                        <InputTextArea label="Enter Stock Quantity" value={stockQuantity} setProperty={setStockQuantity} />
                    </div>
                </div>
                <Button variant='contained' onClick={handleSubmitDetails}>Submit</Button>
            </div>
        </Layout>
    );
}

export default SingleProduct;
