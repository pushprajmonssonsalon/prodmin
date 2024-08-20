function useImageUploader() {

  const compressFile = async(file) => {
    console.log("file", file);
    try {
      if (file) {
        const newFile = await compressImage(file, file.name);
        return newFile;
      }
    } catch (error) {
        return null;
    }

  
   
  };

  const compressImage = (file, filename) => {
    return new Promise((resolve, reject) => {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // const maxWidth = 800; // max width to resize
        // const maxHeight = 800; // max height to resize
        let width = img.width;
        let height = img.height;

        // if (width > height) {
        //   if (width > maxWidth) {
        //     height *= maxWidth / width;
        //     width = maxWidth;
        //   }
        // } else {
        //   if (height > maxHeight) {
        //     width *= maxHeight / height;
        //     height = maxHeight;
        //   }
        // }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
    

        canvas.toBlob(
          (blob) => {
            if (blob.size > 2 * 1024 * 1024) {
              // Check if size is greater than 2MB
              const newBlob = new Blob([blob], { type: file.type });
              const newFile = new File([newBlob], filename, {
                type: file.type,
              });
              // setCompressedImage(newFile);
              // setImage(newFile);
             resolve(newFile)
            } else {
              const newFile = new File([blob], filename, { type: file.type });
              // setCompressedImage(newFile);
              // setImage(newFile);
              resolve(newFile);

            }
          },
          "image/jpeg",
          0.5
        ); // Adjust quality parameter (0.7) as needed
      };
    };
    reader.onerror = (error) => {
      reject(error);
    };
    
  })};

  return {
    compressFile,
  };
}

export default useImageUploader;
