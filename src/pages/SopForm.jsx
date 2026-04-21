import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import { useParams, useNavigate } from "react-router-dom";
import { CREATE_SOP, GET_SOP_BY_ID, UPDATE_SOP } from "../services/crm/user.service";

const createEmptyProduct = () => ({
  name: "",
  brand: "",
  category: "",
  usage: "",
  quantity: "",
  unit: "",
});

const createEmptyStep = (stepNumber) => ({
  step: stepNumber,
  title: "",
  description: "",
  duration: "",
  optional: false,
  actions: [""],
  products: [createEmptyProduct()],
  tools: [""],
  checkpoints: [""],
});

const initialFormData = {
  name: "",
  slug: "",
  category: "",
  subCategory: "",
  description: "",
  totalDuration: "",
  steps: [createEmptyStep(1)],
  hygiene: [""],
  qualityChecks: [""],
  upsellSuggestions: [""],
  version: 1,
  isActive: true,
  createdBy: "",
};

const categoryOptions = ["hair", "skin", "nail", "spa", "other"];

const sectionLabels = {
  hygiene: "Hygiene",
  qualityChecks: "Quality Checks",
  upsellSuggestions: "Upsell Suggestions",
};

const SopForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchSop = async () => {
      const toastId = toast.loading("Loading SOP...");
      try {
        const response = await GET_SOP_BY_ID(id);
        const data = response?.data || response || {};
        setFormData((prev) => ({
          ...prev,
          ...data,
          steps: data.steps && data.steps.length ? data.steps : prev.steps,
          hygiene: data.hygiene && data.hygiene.length ? data.hygiene : prev.hygiene,
          qualityChecks:
            data.qualityChecks && data.qualityChecks.length ? data.qualityChecks : prev.qualityChecks,
          upsellSuggestions:
            data.upsellSuggestions && data.upsellSuggestions.length ? data.upsellSuggestions : prev.upsellSuggestions,
        }));
        toast.success("SOP loaded", { id: toastId });
      } catch (error) {
        toast.error(error.message || "Failed to load SOP", { id: toastId });
      }
    };

    fetchSop();
  }, [id]);

  const completionCount = useMemo(() => {
    const filledTopLevelFields = [
      formData?.name,
      formData?.slug,
      formData?.category,
      formData?.subCategory,
      formData?.description,
      formData?.totalDuration,
      formData?.createdBy,
    ]?.filter((value) => value !== "").length;

    const titledSteps = formData.steps.filter((step) => step.title.trim() !== "").length;

    return filledTopLevelFields + titledSteps;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "version"
          ? Math.max(1, Number(value) || 1)
          : value,
    }));
  };

  const handleStepFieldChange = (stepIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, index) =>
        index === stepIndex
          ? {
              ...step,
              [field]: value,
            }
          : step
      ),
    }));
  };

  const handleStepListChange = (stepIndex, field, itemIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, index) =>
        index === stepIndex
          ? {
              ...step,
              [field]: step[field].map((item, currentIndex) =>
                currentIndex === itemIndex ? value : item
              ),
            }
          : step
      ),
    }));
  };

  const addStepListItem = (stepIndex, field) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, index) =>
        index === stepIndex
          ? {
              ...step,
              [field]: [...step[field], ""],
            }
          : step
      ),
    }));
  };

  const removeStepListItem = (stepIndex, field, itemIndex) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, index) => {
        if (index !== stepIndex) return step;

        const nextItems = step[field].filter((_, currentIndex) => currentIndex !== itemIndex);

        return {
          ...step,
          [field]: nextItems.length ? nextItems : [""],
        };
      }),
    }));
  };

  const handleProductChange = (stepIndex, productIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, index) =>
        index === stepIndex
          ? {
              ...step,
              products: step.products.map((product, currentIndex) =>
                currentIndex === productIndex
                  ? {
                      ...product,
                      [field]: value,
                    }
                  : product
              ),
            }
          : step
      ),
    }));
  };

  const addProduct = (stepIndex) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, index) =>
        index === stepIndex
          ? {
              ...step,
              products: [...step.products, createEmptyProduct()],
            }
          : step
      ),
    }));
  };

  const removeProduct = (stepIndex, productIndex) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, index) => {
        if (index !== stepIndex) return step;

        const nextProducts = step.products.filter((_, currentIndex) => currentIndex !== productIndex);

        return {
          ...step,
          products: nextProducts.length ? nextProducts : [createEmptyProduct()],
        };
      }),
    }));
  };

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, createEmptyStep(prev.steps.length + 1)],
    }));
  };

  const removeStep = (stepIndex) => {
    setFormData((prev) => {
      const nextSteps = prev.steps
        .filter((_, index) => index !== stepIndex)
        .map((step, index) => ({
          ...step,
          step: index + 1,
        }));

      return {
        ...prev,
        steps: nextSteps.length ? nextSteps : [createEmptyStep(1)],
      };
    });
  };

  const handleRootListChange = (field, itemIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, index) => (index === itemIndex ? value : item)),
    }));
  };

  const addRootListItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeRootListItem = (field, itemIndex) => {
    setFormData((prev) => {
      const nextItems = prev[field].filter((_, index) => index !== itemIndex);

      return {
        ...prev,
        [field]: nextItems.length ? nextItems : [""],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingTopLevel = !formData.name.trim() || !formData.category.trim();
    const invalidStep = formData.steps.some((step) => !step.title.trim());

    if (missingTopLevel || invalidStep) {
      toast.error("Please fill SOP name, category, and each step title.");
      return;
    }

    const payload = {
      ...formData,
      version: Number(formData.version) || 1,
      steps: formData.steps.map((step, index) => ({
        ...step,
        step: index + 1,
        actions: step.actions.filter((item) => item.trim() !== ""),
        products: step.products
          .filter((product) => product.name.trim() !== "")
          .map((product) => ({
            ...product,
            quantity: product.quantity === "" ? undefined : Number(product.quantity),
          })),
        tools: step.tools.filter((item) => item.trim() !== ""),
        checkpoints: step.checkpoints.filter((item) => item.trim() !== ""),
      })),
      hygiene: formData.hygiene.filter((item) => item.trim() !== ""),
      qualityChecks: formData.qualityChecks.filter((item) => item.trim() !== ""),
      upsellSuggestions: formData.upsellSuggestions.filter((item) => item.trim() !== ""),
    };

    const toastId = toast.loading("Saving SOP...");
    setLoading(true);

    try {
      if (id) {
        await UPDATE_SOP(id, payload);
      } else {
        await CREATE_SOP(payload);
      }
      
      toast.success(id ? "SOP updated successfully!" : "SOP saved successfully!", { id: toastId });
      navigate("/soplist");
    } catch (error) {
      toast.error(error.message || "Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      ...initialFormData,
      steps: [createEmptyStep(1)],
      hygiene: [""],
      qualityChecks: [""],
      upsellSuggestions: [""],
    });
  };

  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="SOP Form" />
      </div>
      <Wrapper>
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_360px] gap-6">
          <form onSubmit={handleSubmit} className="w-full rounded-2xl bg-white/90 p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-slate-900">{id ? "Edit SOP" : "Create SOP"}</h2>
              <p className="text-sm text-slate-600">
                This form follows your SOP schema with nested steps, products, hygiene notes, quality
                checks, upsell suggestions, version, and active status.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 text-sm font-medium text-slate-700">
                  SOP Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Hair Cut & Blow Dry"
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="slug" className="mb-2 text-sm font-medium text-slate-700">
                  Slug
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="hair-cut-blow-dry"
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="category" className="mb-2 text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-slate-400 focus:bg-white"
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="subCategory" className="mb-2 text-sm font-medium text-slate-700">
                  Sub Category
                </label>
                <input
                  id="subCategory"
                  name="subCategory"
                  type="text"
                  value={formData.subCategory}
                  onChange={handleChange}
                  placeholder="haircut"
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="totalDuration" className="mb-2 text-sm font-medium text-slate-700">
                  Total Duration
                </label>
                <input
                  id="totalDuration"
                  name="totalDuration"
                  type="text"
                  value={formData.totalDuration}
                  onChange={handleChange}
                  placeholder="50-75 mins"
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="version" className="mb-2 text-sm font-medium text-slate-700">
                  Version
                </label>
                <input
                  id="version"
                  name="version"
                  type="number"
                  min="1"
                  value={formData.version}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="createdBy" className="mb-2 text-sm font-medium text-slate-700">
                  Created By
                </label>
                <input
                  id="createdBy"
                  name="createdBy"
                  type="text"
                  value={formData.createdBy}
                  onChange={handleChange}
                  placeholder="admin / staff id"
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                  SOP is Active
                </label>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label htmlFor="description" className="mb-2 text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add SOP description"
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Steps</h3>
                  <p className="text-sm text-slate-600">
                    Add every SOP step with actions, tools, checkpoints, and products used.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addStep}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Add Step
                </button>
              </div>

              <div className="space-y-6">
                {formData.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Step {step.step}
                        </p>
                        <h4 className="text-lg font-semibold text-slate-900">
                          {step.title || `Untitled Step ${step.step}`}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStep(stepIndex)}
                        className="rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Remove Step
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-slate-700">Step Title</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => handleStepFieldChange(stepIndex, "title", e.target.value)}
                          placeholder="Consultation"
                          className="rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-400"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="mb-2 text-sm font-medium text-slate-700">Duration</label>
                        <input
                          type="text"
                          value={step.duration}
                          onChange={(e) => handleStepFieldChange(stepIndex, "duration", e.target.value)}
                          placeholder="10 mins"
                          className="rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-400"
                        />
                      </div>

                      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                        <input
                          id={`optional-${stepIndex}`}
                          type="checkbox"
                          checked={step.optional}
                          onChange={(e) => handleStepFieldChange(stepIndex, "optional", e.target.checked)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`optional-${stepIndex}`} className="text-sm font-medium text-slate-700">
                          Optional Step
                        </label>
                      </div>

                      <div className="flex flex-col md:col-span-2">
                        <label className="mb-2 text-sm font-medium text-slate-700">Description</label>
                        <textarea
                          rows={3}
                          value={step.description}
                          onChange={(e) =>
                            handleStepFieldChange(stepIndex, "description", e.target.value)
                          }
                          placeholder="Optional explanation for this step"
                          className="rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-400"
                        />
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4">
                      {[
                        { key: "actions", label: "Actions", singular: "Action" },
                        { key: "tools", label: "Tools", singular: "Tool" },
                        { key: "checkpoints", label: "Checkpoints", singular: "Checkpoint" },
                      ].map((field) => (
                        <div key={field.key} className="rounded-xl border border-slate-200 bg-white p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-800">{field.label}</p>
                            <button
                              type="button"
                              onClick={() => addStepListItem(stepIndex, field.key)}
                              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                            >
                              Add {field.singular}
                            </button>
                          </div>
                          <div className="space-y-3">
                            {step[field.key].map((item, itemIndex) => (
                              <div key={itemIndex} className="flex gap-3">
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) =>
                                    handleStepListChange(stepIndex, field.key, itemIndex, e.target.value)
                                  }
                                  placeholder={`Add ${field.singular.toLowerCase()}`}
                                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-slate-400"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeStepListItem(stepIndex, field.key, itemIndex)}
                                  className="rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-800">Products</p>
                        <button
                          type="button"
                          onClick={() => addProduct(stepIndex)}
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                          Add Product
                        </button>
                      </div>

                      <div className="space-y-4">
                        {step.products.map((product, productIndex) => (
                          <div
                            key={productIndex}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <input
                              type="text"
                              value={product.name}
                              onChange={(e) =>
                                handleProductChange(stepIndex, productIndex, "name", e.target.value)
                              }
                              placeholder="Product name"
                              className="rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-400"
                            />
                            <input
                              type="text"
                              value={product.brand}
                              onChange={(e) =>
                                handleProductChange(stepIndex, productIndex, "brand", e.target.value)
                              }
                              placeholder="Brand"
                              className="rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-400"
                            />
                            <input
                              type="text"
                              value={product.category}
                              onChange={(e) =>
                                handleProductChange(stepIndex, productIndex, "category", e.target.value)
                              }
                              placeholder="Category"
                              className="rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-400"
                            />
                            <input
                              type="text"
                              value={product.usage}
                              onChange={(e) =>
                                handleProductChange(stepIndex, productIndex, "usage", e.target.value)
                              }
                              placeholder="Usage"
                              className="rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-400"
                            />
                            <input
                              type="number"
                              min="0"
                              value={product.quantity}
                              onChange={(e) =>
                                handleProductChange(stepIndex, productIndex, "quantity", e.target.value)
                              }
                              placeholder="Quantity"
                              className="rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-400"
                            />
                            <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
                              <input
                                type="text"
                                value={product.unit}
                                onChange={(e) =>
                                  handleProductChange(stepIndex, productIndex, "unit", e.target.value)
                                }
                                placeholder="Unit"
                                className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-400"
                              />
                              <button
                                type="button"
                                onClick={() => removeProduct(stepIndex, productIndex)}
                                className="whitespace-nowrap rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 flex-shrink-0"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4">
              {Object.keys(sectionLabels).map((field) => (
                <div key={field} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{sectionLabels[field]}</h3>
                      <p className="text-sm text-slate-600">Add each value as a separate item.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addRootListItem(field)}
                      className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      Add Item
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData[field].map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-3">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleRootListChange(field, itemIndex, e.target.value)}
                          placeholder={`Add ${sectionLabels[field].toLowerCase()}`}
                          className="flex-1 rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => removeRootListItem(field, itemIndex)}
                          className="rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Saving..." : "Save SOP"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Reset
              </button>
            </div>
          </form>

          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
              SOP Summary
            </p>
            <h3 className="mt-3 text-xl font-semibold">{formData.name || "Untitled SOP"}</h3>
            <p className="mt-2 text-sm text-slate-300">
              Live preview of the schema-based SOP data while the form is being filled.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-slate-300">Slug</p>
                <p className="mt-1 font-medium text-white">{formData.slug || "--"}</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-slate-300">Version</p>
                <p className="mt-1 font-medium text-white">{formData.version || "--"}</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-slate-300">Category</p>
                <p className="mt-1 font-medium text-white">{formData.category || "--"}</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-slate-300">Active</p>
                <p className="mt-1 font-medium text-white">{formData.isActive ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-300">Progress</p>
              <p className="mt-2 text-3xl font-semibold">{completionCount}</p>
              <p className="mt-2 text-sm text-slate-300">
                Filled top-level fields and titled steps are counted here.
              </p>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-200">
              <div>
                <p className="text-slate-300">Description</p>
                <p className="mt-1 leading-6">{formData.description || "No description added yet."}</p>
              </div>
              <div>
                <p className="text-slate-300">Steps</p>
                <p className="mt-1 leading-6">{formData.steps.length}</p>
              </div>
              <div>
                <p className="text-slate-300">Last Step Title</p>
                <p className="mt-1 leading-6">
                  {formData.steps[formData.steps.length - 1]?.title || "No step title added yet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default SopForm;