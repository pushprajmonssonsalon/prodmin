import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import {
  CREATE_SERVICE,
  GET_SERVICE_CATEGORIES,
  GET_SERVICE_SUBCATEGORIES,
} from "../services/crm/user.service";
import toast from "react-hot-toast";

const initialData = {
  gender: "F",
  category: "",
  subCategory: "",
  name: "",
  mrp: "",
  price: "",
};

const inputClass =
  "border-2 outline-none order-gray-300 focus:ring-2 boutline-none p-2 rounded-md";
const labelClass = "mb-2 font-medium text-gray-700";

const AddService = () => {
  const [service, setService] = useState({ ...initialData });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    GET_SERVICE_CATEGORIES().then((res) => {
      if (Array.isArray(res)) setCategories(res);
    });
  }, []);

  useEffect(() => {
    setSubCategories([]);
    if (!service.category) return;
    GET_SERVICE_SUBCATEGORIES({
      categoryName: service.category,
      gender: service.gender,
    }).then((res) => {
      if (Array.isArray(res)) setSubCategories(res);
    });
  }, [service.category, service.gender]);

  const categoryNames = [
    ...new Set(
      categories
        .filter((elm) => elm.gender === service.gender)
        .map((elm) => elm.name)
    ),
  ];
  const subCategoryNames = [...new Set(subCategories.map((elm) => elm.name))];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: value,
      // a new category means the old subcategory no longer applies
      ...(name === "category" && { subCategory: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...service,
      name: service.name.trim(),
      category: service.category.trim(),
      subCategory: service.subCategory.trim(),
      mrp: Number(service.mrp),
      price: Number(service.price),
    };
    const isSomeEmpty = Object.values(service).some(
      (elm) => String(elm).trim() === ""
    );
    if (isSomeEmpty) return toast.error("fill all the fields");
    if (payload.price > payload.mrp)
      return toast.error("price cannot be more than mrp");

    setSubmitting(true);
    CREATE_SERVICE(payload)
      .then((res) => {
        if (res?._id) {
          toast.success(`service created (code ${res.uniqueCode})`);
          setService((prev) => ({ ...prev, name: "", mrp: "", price: "" }));
        } else {
          toast.error("service not created, it may already exist");
        }
      })
      .catch(() => {
        toast.error("service not created");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Add Services" />
        </div>
        <Wrapper>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col mb-4">
                <div className={labelClass}>Gender</div>
                <div className="flex gap-4 items-center">
                  {[
                    { value: "F", label: "Female" },
                    { value: "M", label: "Male" },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`gender-${opt.value}`}
                        value={opt.value}
                        name="gender"
                        checked={service.gender === opt.value}
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={`gender-${opt.value}`}
                        className="ml-2 text-sm font-medium text-gray-900"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col my-0">
                <label htmlFor="name" className={labelClass}>
                  Service Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. H.D (Groom Makeup)"
                  className={inputClass}
                  value={service.name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col my-0">
                <label htmlFor="category" className={labelClass}>
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  list="category-options"
                  placeholder="Choose or type a category"
                  className={inputClass}
                  value={service.category}
                  onChange={handleChange}
                />
                <datalist id="category-options">
                  {categoryNames.map((name) => (
                    <option value={name} key={name} />
                  ))}
                </datalist>
              </div>

              <div className="flex flex-col my-0">
                <label htmlFor="subCategory" className={labelClass}>
                  Sub Category
                </label>
                <input
                  type="text"
                  id="subCategory"
                  name="subCategory"
                  list="subcategory-options"
                  placeholder="Choose or type a sub category"
                  className={inputClass}
                  value={service.subCategory}
                  onChange={handleChange}
                />
                <datalist id="subcategory-options">
                  {subCategoryNames.map((name) => (
                    <option value={name} key={name} />
                  ))}
                </datalist>
              </div>

              <div className="flex flex-col my-0">
                <label htmlFor="mrp" className={labelClass}>
                  MRP
                </label>
                <input
                  type="number"
                  id="mrp"
                  name="mrp"
                  min={0}
                  className={inputClass}
                  value={service.mrp}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col my-0">
                <label htmlFor="price" className={labelClass}>
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min={0}
                  className={inputClass}
                  value={service.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-500 text-white py-3 my-6 px-6 rounded-md text-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Submit"}
            </button>
          </form>
        </Wrapper>
      </Layout>
    </>
  );
};

export default AddService;
