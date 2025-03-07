import Layout from '../components/Layout'
import TopBar from '../components/commoncomponents/TopBar'
import Wrapper from '../components/commoncomponents/Wrapper'

const AddReview = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
      };
    //   name: {type: String},
    //   description: {type: String},
    //   title: {type: String},
    //   rating: {type: Number},
    //   userId: {type: Schema.Types.ObjectId},
    //   productId: {type: Schema.Types.ObjectId},
    //   imageUrl: {type: [String]},
      const inputFields=[
        {
            name:"name",
            type:"text",
            placeholder:"Enter your name",
            label:"Name"
        },
        {
            name:"description",
            type:"text",
            placeholder:"Enter your description",
            label:"Description"
        },
        {
            name:"rating",
            type:"text",
            placeholder:"Enter your description",
            label:"Description"
        },
        {
            name:"productId",
            type:"select",
            placeholder:"Select Product",
            label:"Select Product"
        },
      ]
  return (
    <>
         <Layout>
        <div className="w-full flex flex-col ">
          <TopBar title="Add Review" />
        </div>
        <Wrapper>
        <form
            onSubmit={handleSubmit}
            className="w-full"
          >
          {
            inputFields?.map((input,index)=>{
                return 
            })
          }

          </form>
        </Wrapper>
        </Layout>
    </>
  )
}

export default AddReview