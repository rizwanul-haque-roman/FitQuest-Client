import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddNewClass = () => {
  const axiosSecure = useAxiosSecure();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const classname = form.classname.value;
    const url = form.url.value;
    const description = form.description.value;

    const classData = {
      className: classname,
      image: url,
      description: description,
      totalBookings: 0,
    };
    // (classData);

    axiosSecure
      .post("/classes", classData)
      .then((res) => {
        res.data;
        if (res.data.acknowledged) {
          Swal.fire("Class Added Successfully");
        }
      })
      .catch((error) => error.message);
  };

  return (
    <div>
      <div className="w-11/12 lg:container mx-auto ">
        <div className="my-6">
          <h1 className="text-5xl font-bold text-clr-main text-center">
            Add Class
          </h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="lg:flex justify-center items-center gap-6 lg:w-1/2 mx-auto">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Class Name
                  </span>
                </div>
                <input
                  type="text"
                  name="classname"
                  className="input input-bordered "
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Thumbnail URL
                  </span>
                </div>
                <input
                  type="url"
                  name="url"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="text-center mt-6">
              <label className="form-control lg:w-1/2 mx-auto">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Class Description
                  </span>
                </div>
                <textarea
                  name="description"
                  className="textarea textarea-bordered h-24"
                ></textarea>
              </label>
              <button className="btn mt-6 bg-clr-main">Add Class</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewClass;
