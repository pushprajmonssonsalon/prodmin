import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import TopBar from "../components/commoncomponents/TopBar";
import Wrapper from "../components/commoncomponents/Wrapper";
import { GET_SOP_BY_ID } from "../services/crm/user.service";

const SopView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sop, setSop] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchSop = async () => {
      setLoading(true);
      const t = toast.loading("Loading SOP...");
      try {
        const res = await GET_SOP_BY_ID (id);
        const data = res?.data || res || null;
        setSop(data);
        toast.dismiss(t);
      } catch (err) {
        toast.error(err.message || "Failed to load SOP", { id: t });
      } finally {
        setLoading(false);
      }
    };
    fetchSop();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="w-full flex flex-col">
          <TopBar title="Loading SOP..." />
        </div>
        <Wrapper>
          <div className="bg-white p-8 rounded-2xl shadow-sm animate-pulse">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-3">
                <div className="h-8 bg-slate-200 rounded-lg w-64"></div>
                <div className="h-4 bg-slate-200 rounded w-32"></div>
              </div>
              <div className="flex gap-3">
                <div className="h-10 bg-slate-200 rounded-xl w-16"></div>
                <div className="h-10 bg-slate-200 rounded-xl w-24"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-20"></div>
                  <div className="h-6 bg-slate-200 rounded w-32"></div>
                </div>
              ))}
            </div>
            <div className="space-y-4 mb-8">
              <div className="h-6 bg-slate-200 rounded w-32"></div>
              <div className="h-20 bg-slate-200 rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-6 bg-slate-200 rounded w-24"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-6 bg-slate-50">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-16"></div>
                        <div className="h-6 bg-slate-200 rounded w-48"></div>
                      </div>
                      <div className="h-4 bg-slate-200 rounded w-24"></div>
                    </div>
                    <div className="h-16 bg-slate-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full flex flex-col">
        <TopBar title={sop?.name ? `SOP: ${sop.name}` : "SOP Details"} />
      </div>
      <Wrapper>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-lg">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{sop?.name || "No SOP"}</h1>
                    <p className="text-slate-300 flex items-center gap-2">
                      <span>🏷️</span>
                      Category: {sop?.category || "-"}
                    </p>
                  </div>
                </div>
                {sop?.isActive !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      sop.isActive
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        sop.isActive ? "bg-green-400" : "bg-red-400"
                      }`}></span>
                      {sop.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                )}
              </div>
              {/* <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(`/sop/edit/${id}`)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-sm"
                >
                  <span>✏️</span>
                  Edit SOP
                </button>
                <button
                  onClick={() => navigate('/soplist')}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-200"
                >
                  <span>⬅️</span>
                  Back to List
                </button>
              </div> */}
            </div>
          </div>

          {/* Key Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">🔗</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Slug</p>
                  <p className="text-lg font-semibold text-slate-900">{sop?.slug || "-"}</p>
                </div>
              </div>
            </div> */}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">⏱️</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Duration</p>
                  <p className="text-lg font-semibold text-slate-900">{sop?.totalDuration || "-"}</p>
                </div>
              </div>
            </div>

            {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600">👤</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Created By</p>
                  <p className="text-lg font-semibold text-slate-900">{sop?.createdBy || "-"}</p>
                </div>
              </div>
            </div> */}

            {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600">📊</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Version</p>
                  <p className="text-lg font-semibold text-slate-900">{sop?.version ?? "-"}</p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Description Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Description</h2>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700 leading-relaxed text-lg">
                {sop?.description || "No description available."}
              </p>
            </div>
          </div>

          {/* Steps Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Process Steps</h2>
            </div>
            <div className="space-y-6">
              {(sop?.steps || []).map((step, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-6 bg-gradient-to-r from-slate-50 to-white hover:shadow-md transition-all duration-200">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {step.title || `Untitled Step ${step.step}`}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                          <span>⏱️</span>
                          <span>Duration: {step.duration || "-"}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {step.description || "No description available."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {step.actions && step.actions.length > 0 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-blue-600">🎯</span>
                          <h4 className="font-semibold text-blue-900">Actions Required</h4>
                        </div>
                        <ul className="space-y-2">
                          {step.actions.map((action, i) => (
                            <li key={i} className="flex items-start gap-2 text-blue-800">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{action || "-"}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.products && step.products.length > 0 && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-green-600">📦</span>
                          <h4 className="font-semibold text-green-900">Products Needed</h4>
                        </div>
                        <ul className="space-y-2">
                          {step.products.map((product, i) => (
                            <li key={i} className="flex items-start gap-2 text-green-800">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{product.name || "-"} {product.quantity ? `- ${product.quantity}` : ""}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {(sop?.steps || []).length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <span className="text-4xl mb-4 block">📋</span>
                  <p>No steps defined for this SOP.</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-600">🧼</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Hygiene</h3>
              </div>
              <ul className="space-y-2">
                {(sop?.hygiene || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>{item || "-"}</span>
                  </li>
                ))}
              </ul>
              {(sop?.hygiene || []).length === 0 && (
                <p className="text-slate-500 italic">No hygiene guidelines specified.</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600">✅</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Quality Checks</h3>
              </div>
              <ul className="space-y-2">
                {(sop?.qualityChecks || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>{item || "-"}</span>
                  </li>
                ))}
              </ul>
              {(sop?.qualityChecks || []).length === 0 && (
                <p className="text-slate-500 italic">No quality checks specified.</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <span className="text-pink-600">💰</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Upsell Suggestions</h3>
              </div>
              <ul className="space-y-2">
                {(sop?.upsellSuggestions || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-pink-500 mt-1">•</span>
                    <span>{item || "-"}</span>
                  </li>
                ))}
              </ul>
              {(sop?.upsellSuggestions || []).length === 0 && (
                <p className="text-slate-500 italic">No upsell suggestions specified.</p>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default SopView;






// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Layout from "../components/Layout";
// import TopBar from "../components/commoncomponents/TopBar";
// import Wrapper from "../components/commoncomponents/Wrapper";

// const SopView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [sop, setSop] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     const fetchSop = async () => {
//       setLoading(true);
//       const t = toast.loading("Loading SOP...");
//       try {
//         const res = await fetch(`https://crm.smartsalon.in/servicesop/${id}`);
//         if (!res.ok) throw new Error("Failed to load SOP");
//         const payload = await res.json();
//         const data = payload?.data || payload || null;
//         setSop(data);
//         toast.dismiss(t);
//       } catch (err) {
//         toast.error(err.message || "Failed to load SOP", { id: t });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSop();
//   }, [id]);

//   if (loading) return null;

//   return (
//     <Layout>
//       <div className="w-full flex flex-col">
//         <TopBar title={sop?.name ? `SOP: ${sop.name}` : "SOP Details"} />
//       </div>
//       <Wrapper>
//         <div className="bg-white p-6 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <h2 className="text-2xl font-semibold">{sop?.name || "No SOP"}</h2>
//               <p className="text-sm text-slate-500">Category: {sop?.category || "-"}</p>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => navigate(`/sop/edit/${id}`)}
//                 className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => navigate('/soplist')}
//                 className="rounded-xl border px-4 py-2 text-sm font-semibold"
//               >
//                 Back to list
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div>
//               <p className="text-sm text-slate-500">Slug</p>
//               <p className="mt-1">{sop?.slug || "-"}</p>
//             </div>
//             <div>
//               <p className="text-sm text-slate-500">Total Duration</p>
//               <p className="mt-1">{sop?.totalDuration || "-"}</p>
//             </div>
//             <div>
//               <p className="text-sm text-slate-500">Created By</p>
//               <p className="mt-1">{sop?.createdBy || "-"}</p>
//             </div>
//             <div>
//               <p className="text-sm text-slate-500">Version</p>
//               <p className="mt-1">{sop?.version ?? "-"}</p>
//             </div>
//           </div>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold">Description</h3>
//             <p className="mt-2 text-slate-700">{sop?.description || "-"}</p>
//           </div>

//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold">Steps</h3>
//             {(sop?.steps || []).map((step, idx) => (
//               <div key={idx} className="rounded-xl border p-4 bg-slate-50">
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="text-sm text-slate-500">Step {step.step}</p>
//                     <h4 className="font-semibold">{step.title || `Untitled Step ${step.step}`}</h4>
//                   </div>
//                   <p className="text-sm text-slate-500">Duration: {step.duration || "-"}</p>
//                 </div>
//                 <p className="mt-2 text-slate-700">{step.description || "-"}</p>

//                 {step.actions && step.actions.length > 0 && (
//                   <div className="mt-3">
//                     <p className="text-sm font-medium">Actions</p>
//                     <ul className="list-disc pl-6 mt-1">
//                       {step.actions.map((a, i) => (
//                         <li key={i}>{a || "-"}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {step.products && step.products.length > 0 && (
//                   <div className="mt-3">
//                     <p className="text-sm font-medium">Products</p>
//                     <ul className="list-disc pl-6 mt-1">
//                       {step.products.map((p, i) => (
//                         <li key={i}>{p.name || "-"} {p.quantity ? `- ${p.quantity}` : ""}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//             <div>
//               <p className="text-sm text-slate-500">Hygiene</p>
//               <ul className="list-disc pl-6 mt-1">
//                 {(sop?.hygiene || []).map((h, i) => (
//                   <li key={i}>{h || "-"}</li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <p className="text-sm text-slate-500">Quality Checks</p>
//               <ul className="list-disc pl-6 mt-1">
//                 {(sop?.qualityChecks || []).map((q, i) => (
//                   <li key={i}>{q || "-"}</li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <p className="text-sm text-slate-500">Upsell Suggestions</p>
//               <ul className="list-disc pl-6 mt-1">
//                 {(sop?.upsellSuggestions || []).map((u, i) => (
//                   <li key={i}>{u || "-"}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </Wrapper>
//     </Layout>
//   );
// };

// export default SopView;
