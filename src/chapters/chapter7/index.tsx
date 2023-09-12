import { useState, useEffect} from 'react'
import { Storage } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import config from "../../aws-exports";

function Chapter7() {
  const [images, setImages] = useState([])
  useEffect(() => {
    fetchImages()
  }, [])

  async function onChange(e) {
    /* When a file is uploaded, create a unique name and save it using
       the Storage API */
    const file = e.target.files[0];
    const filetype = file.name.split('.')[file.name.split.length - 1]
    await Storage.put(`${uuid()}.${filetype}`, file)
    /* Once the file is uploaded, fetch the list of images */
    fetchImages()
  }

  async function fetchImages() {
    /* This function fetches the list of image keys from your S3 bucket */
    // Storage.configure({
    //     region: config.aws_user_files_s3_bucket_region,
    //     bucket: config.aws_user_files_s3_bucket,
    //     identityPoolId: config.aws_user_pools_id,
    //     level: "protected",
    // })
    // aws_user_files_s3_bucket
    const files = await Storage.list('')
    console.log(files);
    /* Once we have the image keys, the images must be signed in order
       for them to be displayed */
    const signedFiles = await Promise.all(files?.results?.map(async file => {
      /* To sign the images, we map over the image key array and get a
         signed url for each image */
      const signedFile = await Storage.get(file.key)
      return signedFile
    }))
    setImages(signedFiles)
  }
  return (
    <div className="App">
      <header className="App-header">
        <input
type="file"
          onChange={onChange}
        />
        {
          images.map(image => (
            <img
              src={image}
              key={image}
              style={{ width: 500 }}
/> ))
} </header>
</div> );
}
export default Chapter7