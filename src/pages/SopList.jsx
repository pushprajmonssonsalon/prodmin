import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import Wrapper from "../components/commoncomponents/Wrapper";
import TopBar from "../components/commoncomponents/TopBar";
import { DELETE_SOP, DUPLICATE_SOP, GET_ALL_SOPS, TOGGLE_SOP } from "../services/crm/user.service";

const SopList = () => {
  const [sops, setSops] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Fetch all SOPs
    const fetchSops = async () => {
        setLoading(true);
        try {
            const res = await GET_ALL_SOPS();

            console.log("API RESPONSE:", res);

            setSops(res || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load SOPs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    fetchSops();
    }, []);

  // 2. Toggle Status (Active/Inactive)
    const handleToggle = async (id) => {
        try {
            await TOGGLE_SOP(id);
            toast.success("Status updated");
            fetchSops();
        } catch {
            toast.error("Toggle failed");
        }
    };

  // 3. Duplicate SOP
    const handleDuplicate = async (id) => {
        try {
            await DUPLICATE_SOP(id);
            toast.success("SOP Duplicated");
            fetchSops();
        } catch {
            toast.error("Duplication failed");
        }
    };

  // 4. Delete SOP
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this SOP?")) return;

        try {
            await DELETE_SOP(id);
            toast.success("SOP deleted");
            fetchSops();
        } catch {
            toast.error("Delete failed");
        }
    };

  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title="SOP List" />
      </div>

      <Wrapper>
        <div className="w-[100%] mx-auto">
          <div className="w-[97%] mx-auto">

            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-bold">SOP List</h1>
              <button
                onClick={() => navigate("/sopform")}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl"
              >
                + Create New
              </button>
            </div>

            <div className="mx-auto">
              {loading ? (
                <div className="p-8 text-center text-slate-600">
                  Loading SOPs...
                </div>
              ) : (
                <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="p-4 text-left">SOP Name</th>
                      <th className="p-4 text-left">Category</th>
                      <th className="p-4 text-left">Duration</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sops.map((sop) => (
                      <tr
                        key={sop._id}
                        className="border-b hover:bg-slate-50 cursor-pointer"
                        onClick={() => navigate(`/sop/view/${sop._id}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") navigate(`/sop/view/${sop._id}`);
                        }}
                      >
                        <td className="p-4 font-medium">{sop.name}</td>
                        <td className="p-4 text-slate-600">{sop.category}</td>
                        <td className="p-4 text-slate-600">{sop.totalDuration}</td>

                        <td className="p-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggle(sop._id);
                            }}
                            className={`px-3 py-1 rounded-full text-xs ${
                              sop.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {sop.isActive ? "Active" : "Inactive"}
                          </button>
                        </td>

                        <td className="p-4 flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/sop/edit/${sop._id}`);
                            }}
                            className="text-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicate(sop._id);
                            }}
                            className="text-slate-600"
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(sop._id);
                            }}
                            className="text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {sops.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-500">
                          No SOPs found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default SopList;
