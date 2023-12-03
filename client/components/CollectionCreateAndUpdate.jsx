import { Redirect } from "raviger";
import { useEffect, useState } from "react";

const CollectionCreateAndUpdate = () => {
  let [edit, setEdit] = useState(false);

  let collectionCreateEndPoint = "/api/apps/create-collection";
  let collectionUpdateEndPoint = "/api/apps/update-collection";
  let collectionByIdEndPoint = "/api/apps/get-collection";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  }); 

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    setEdit(window.location.search.includes("id"));

    if (edit) {
      (async () => {
        try {

          let response = await fetch(collectionByIdEndPoint+`?id=${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
        //   console.log(data); 

          setFormData((prevData) => ({
            ...prevData,
            ...data 
          })); 

          console.log('form data ', formData);
          
        } catch (error) {
          console.error("Error:", error.message);
        }
      })();
    }


  }, [edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle the form submission logic here
   
    let response;
    try {
      if (edit) {

        const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

         response = await fetch(collectionUpdateEndPoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"id": id, "title": formData.title, "description": formData.description}),
        });
      } else {
        response = await fetch(collectionCreateEndPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      window.location.href = "/collection-list";


    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <main className="w-full h-full mt-72 flex flex-col items-center justify-center max-w-screen-xl mx-auto px-4 md:px-8 ">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <div className="mt-5 text-center">
            <h1 className="text-gray-800 text-3xl font-bold sm:text-3xl">
              {edit ? "Update Collection" : "Create Collection"}
            </h1>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="space-y-5 mt-10"
        >
          <div className="mt-5">
            <label className="font-medium">Collection Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={handleChange}
              id="name"
              name="title"
              required
              className="w-full mt-3 px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div className=" mt-3 ">
            <label className="font-medium">Collection Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className=" mt-3 w-full px-4 py-2 border rounded resize-none"
            />
          </div>

          <button className=" mt-3  px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            {edit ? "Update Collection" : "Create Collection"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CollectionCreateAndUpdate;
