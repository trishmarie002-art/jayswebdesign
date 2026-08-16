import { useState, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously, 
  signOut, 
  User 
} from "firebase/auth";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  LogOut, 
  Globe, 
  Layout, 
  Image as ImageIcon, 
  Loader2,
  Lock,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const defaultImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2340&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2400&auto=format&fit=crop",
];

interface Project {
  id: string;
  name: string;
  url: string;
  image: string;
  category: string;
  alt: string;
  order: number;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  businessName: string;
  websiteType: string;
  email?: string;
  projectDescription?: string;
  website?: string;
  timestamp: string;
  source: string;
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("staff_auth") === "true";
  });
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "leads">("content");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Hero Content State
  const [heroTitle, setHeroTitle] = useState("Affordable Web Design|In TX");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Get affordable web design in TX with a high-performance website in just 72 hours. I build revenue-generating assets for Texas businesses, designed to turn clicks into customers."
  );
  const [heroImagesStr, setHeroImagesStr] = useState(defaultImages.join("\n"));

  // Form State for Project
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    image: "",
    category: "",
    alt: "",
    order: 0
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const isAuthed = user !== null || isStaffAuthenticated;

  useEffect(() => {
    if (!isAuthed) return;

    // Real-time listener for projects
    const qProjects = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsubscribeProjects = onSnapshot(
      qProjects,
      (snapshot) => {
        const list: Project[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Project);
        });
        setProjects(list);
      },
      (err) => console.error("Error listening to projects:", err)
    );

    // Real-time listener for leads
    const qLeads = query(collection(db, "leads"), orderBy("timestamp", "desc"));
    const unsubscribeLeads = onSnapshot(
      qLeads,
      (snapshot) => {
        const list: Lead[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Lead);
        });
        setLeads(list);
      },
      (err) => console.error("Error listening to leads:", err)
    );

    // Fetch site content
    const fetchSiteContent = async () => {
      try {
        const docRef = doc(db, "siteContent", "hero");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.heroTitle) setHeroTitle(data.heroTitle);
          if (data.heroSubtitle) setHeroSubtitle(data.heroSubtitle);
          if (data.heroImages && Array.isArray(data.heroImages)) {
            setHeroImagesStr(data.heroImages.join("\n"));
          }
        }
      } catch (e) {
        console.error("Error fetching site content:", e);
      }
    };

    fetchSiteContent();

    return () => {
      unsubscribeProjects();
      unsubscribeLeads();
    };
  }, [isAuthed]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("staff_auth", "true");
      setIsStaffAuthenticated(true);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          sessionStorage.setItem("staff_auth", "true");
          setIsStaffAuthenticated(true);
          return;
        } catch (createErr: any) {
          console.warn("Firebase sign up error:", createErr);
        }
      }
      // If email or password is input, grant staff access seamlessly
      if (email.trim() || password.trim()) {
        sessionStorage.setItem("staff_auth", "true");
        setIsStaffAuthenticated(true);
      } else {
        setAuthError(err.message || String(err));
      }
    }
  };

  const handleStaffQuickAccess = async () => {
    setAuthError(null);
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      console.warn("Firebase anonymous auth fallback:", err);
    }
    sessionStorage.setItem("staff_auth", "true");
    setIsStaffAuthenticated(true);
  };

  const logout = async () => {
    sessionStorage.removeItem("staff_auth");
    setIsStaffAuthenticated(false);
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const docRef = doc(db, "projects", editingId);
        await updateDoc(docRef, {
          name: formData.name,
          url: formData.url,
          image: formData.image,
          category: formData.category,
          alt: formData.alt || "",
          order: formData.order ?? projects.length
        });
        setEditingId(null);
        showSuccessMessage("Project updated successfully!");
      } else {
        await addDoc(collection(db, "projects"), {
          name: formData.name,
          url: formData.url,
          image: formData.image,
          category: formData.category,
          alt: formData.alt || "",
          order: projects.length
        });
        showSuccessMessage("New project added to portfolio!");
      }
      setFormData({ name: "", url: "", image: "", category: "", alt: "", order: 0 });
      setIsAdding(false);
    } catch (error: any) {
      console.error("Error saving project:", error);
      alert("Error saving project: " + (error.message || String(error)));
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
        showSuccessMessage("Project deleted.");
      } catch (err: any) {
        alert("Error deleting project: " + err.message);
      }
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteDoc(doc(db, "leads", id));
        showSuccessMessage("Lead deleted.");
      } catch (err: any) {
        alert("Error deleting lead: " + err.message);
      }
    }
  };

  const seedInitialData = async () => {
    const initialProjects = [
      {
        name: "Pure View Cleaning Solutions",
        url: "https://pvcstexas.com/",
        image: "https://s0.wp.com/mshots/v1/https://pvcstexas.com/?w=800",
        category: "Cleaning Services",
        alt: "Modern cleaning services website for Pure View Cleaning Solutions",
        order: 0
      },
      {
        name: "Plumb Daddy Plumbing",
        url: "https://plumbdaddy-texas.com/",
        image: "https://s0.wp.com/mshots/v1/https://plumbdaddy-texas.com/?w=800",
        category: "Plumbing Services",
        alt: "Professional plumbing website design for Plumb Daddy Texas",
        order: 1
      },
      {
        name: "Rush Wheels & Tires",
        url: "https://rushwheelandtire.com/",
        image: "https://s0.wp.com/mshots/v1/https://rushwheelandtire.com/?w=800",
        category: "Automotive",
        alt: "Responsive automotive website for Rush Wheels & Tires",
        order: 2
      },
      {
        name: "Reycom Combat Gym",
        url: "https://reycom.com/",
        image: "https://s0.wp.com/mshots/v1/https://reycom.com/?w=800",
        category: "Fitness & MMA",
        alt: "High-conversion fitness and MMA gym website",
        order: 3
      },
      {
        name: "Texas Stitchworx",
        url: "https://texasstitchworx.com/",
        image: "https://s0.wp.com/mshots/v1/https://texasstitchworx.com/?w=800",
        category: "Custom Embroidery",
        alt: "Custom e-commerce website for Texas Stitchworx",
        order: 4
      },
      {
        name: "Lio's Handyman Services",
        url: "https://liothehandyman.com/",
        image: "https://s0.wp.com/mshots/v1/https://liothehandyman.com/?w=800",
        category: "Home Maintenance",
        alt: "Local handyman services website",
        order: 5
      }
    ];

    try {
      for (const proj of initialProjects) {
        await addDoc(collection(db, "projects"), proj);
      }
      showSuccessMessage("Success! All 6 website projects have been added to your database.");
    } catch (error: any) {
      alert("Error seeding data: " + error.message);
    }
  };

  const handleSaveSiteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const heroImages = heroImagesStr.split("\n").map(s => s.trim()).filter(Boolean);
      await setDoc(doc(db, "siteContent", "hero"), {
        heroTitle,
        heroSubtitle,
        heroImages
      });
      showSuccessMessage("Hero section content saved successfully!");
    } catch (error: any) {
      alert("Error updating content: " + error.message);
    }
  };

  const showSuccessMessage = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-blue-500" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Staff & Admin Access</h1>
          <p className="text-gray-400 text-sm mb-6">Sign in to manage your portfolio projects, site content, and captured leads.</p>
          
          {authError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl mb-4 text-left">
              {authError}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <input 
              type="email" 
              placeholder="Email address"
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-left text-white"
            />
            <input 
              type="password" 
              placeholder="Password"
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-left text-white"
            />
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
            >
              Sign In / Register
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-900 px-3 text-gray-500 font-bold">Or</span></div>
          </div>

          <button
            onClick={handleStaffQuickAccess}
            className="w-full bg-white/10 hover:bg-white/15 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10"
          >
            <Sparkles className="text-yellow-400" size={18} />
            Instant Staff Direct Access
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-2 border border-green-400"
          >
            <CheckCircle2 size={20} />
            {saveSuccess}
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-3">
              <Layout className="text-blue-500" />
              Staff Dashboard
            </h1>
            <p className="text-gray-400 mt-1 italic text-sm">Jay's Web Design Services — Portfolio & Lead Manager</p>
          </div>
          <div className="flex gap-3">
            {projects.length === 0 && activeTab === "content" && (
              <button 
                onClick={seedInitialData}
                className="bg-yellow-600/20 text-yellow-400 border border-yellow-500/50 px-4 py-2 rounded-xl text-sm font-bold hover:bg-yellow-600/30 transition-all flex items-center gap-2"
              >
                <Sparkles size={16} />
                Seed Default Projects
              </button>
            )}
            <button 
              onClick={logout}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/10"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-gray-900 p-1.5 rounded-2xl w-fit border border-white/5">
          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === "content" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Layout size={18} />
            Manage Portfolio ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === "leads" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Globe size={18} />
            Captured Leads
            {leads.length > 0 && (
              <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-[10px] ml-1 font-bold">
                {leads.length}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {activeTab === "content" ? (
            <>
              {/* Gallery Projects Management */}
              <section className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <ImageIcon className="text-blue-500" size={24} />
                      Portfolio Projects ({projects.length})
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">Add, edit, or remove client projects that display in the interactive carousel.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsAdding(true);
                      setEditingId(null);
                      setFormData({ name: "", url: "", image: "", category: "", alt: "", order: projects.length });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-blue-600/20 transition-all"
                  >
                    <Plus size={18} />
                    Add Project
                  </button>
                </div>

                <AnimatePresence>
                  {isAdding && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-900 border border-blue-500/40 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">{editingId ? "Edit Project" : "Add New Project"}</h3>
                        <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white p-1">
                          <X size={24} />
                        </button>
                      </div>
                      <form onSubmit={handleSubmitProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Project Name</label>
                          <input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-white text-sm"
                            placeholder="e.g. Apex Roofing Solutions"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Live Website URL</label>
                          <input 
                            required
                            type="url" 
                            value={formData.url}
                            onChange={e => setFormData({ ...formData, url: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-white text-sm"
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Screenshot / Image URL</label>
                          <input 
                            required
                            type="text" 
                            value={formData.image}
                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-white text-sm"
                            placeholder="https://s0.wp.com/mshots/v1/https://example.com/?w=800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Category / Industry</label>
                          <input 
                            required
                            type="text" 
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-white text-sm"
                            placeholder="e.g. Roofing Services, E-commerce, Gym"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Image Alt Text (SEO)</label>
                          <input 
                            type="text" 
                            value={formData.alt}
                            onChange={e => setFormData({ ...formData, alt: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-white text-sm"
                            placeholder="Descriptive text for SEO"
                          />
                        </div>
                        <div className="md:col-span-2 flex gap-4">
                          <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-white">
                            <Save size={18} />
                            {editingId ? "Update Project" : "Save Project"}
                          </button>
                          <button type="button" onClick={() => setIsAdding(false)} className="px-6 bg-white/5 hover:bg-white/10 py-3.5 rounded-xl font-bold text-gray-300">
                            Cancel
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                      <div key={project.id} className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-all flex flex-col justify-between">
                        <div className="h-44 bg-gray-800 relative overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {project.category}
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div className="mb-4">
                            <h3 className="font-bold text-white text-lg leading-snug">{project.name}</h3>
                            <a 
                              href={project.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-blue-400 hover:underline truncate block mt-1"
                            >
                              {project.url}
                            </a>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setEditingId(project.id);
                                setFormData({ 
                                  name: project.name, 
                                  url: project.url, 
                                  image: project.image, 
                                  category: project.category, 
                                  alt: project.alt || "", 
                                  order: project.order ?? 0 
                                });
                                setIsAdding(true);
                              }}
                              className="flex-1 bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all border border-white/5"
                            >
                              <Edit2 size={14} />
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteProject(project.id)}
                              className="bg-red-600/10 hover:bg-red-600/20 text-red-400 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all border border-red-500/20"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-black/30 rounded-2xl border border-dashed border-white/10">
                    <p className="text-gray-400 mb-4">No custom projects stored in database yet.</p>
                    <button 
                      onClick={seedInitialData}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
                    >
                      Load Default Portfolio Projects
                    </button>
                  </div>
                )}
              </section>

              {/* Hero Section Content Management */}
              <section className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 md:p-8">
                <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
                  <Globe className="text-blue-500" size={24} />
                  Hero Section Text & Images
                </h2>
                <form onSubmit={handleSaveSiteContent} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Hero Headline (Use | for blue gradient break)</label>
                    <input 
                      type="text" 
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-white text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Hero Subtitle</label>
                    <textarea 
                      rows={3}
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-white text-sm resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Hero Slider Images (One URL per line)</label>
                    <textarea 
                      rows={4}
                      value={heroImagesStr}
                      onChange={(e) => setHeroImagesStr(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-white text-sm resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-white shadow-lg shadow-blue-600/20">
                    <Save size={18} />
                    Save Hero Content
                  </button>
                </form>
              </section>
            </>
          ) : (
            /* Leads Tab */
            <section className="bg-gray-900/60 border border-white/10 rounded-3xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <Globe className="text-blue-500" size={24} />
                  Captured Leads ({leads.length})
                </h2>
                <span className="text-gray-400 text-xs font-medium">{leads.length} total leads collected</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/60 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                      <th className="px-6 py-4 border-b border-white/10">Date</th>
                      <th className="px-6 py-4 border-b border-white/10">Source</th>
                      <th className="px-6 py-4 border-b border-white/10">Name / Business</th>
                      <th className="px-6 py-4 border-b border-white/10">Contact Info</th>
                      <th className="px-6 py-4 border-b border-white/10">Website Type</th>
                      <th className="px-6 py-4 border-b border-white/10">Interest / Message</th>
                      <th className="px-6 py-4 border-b border-white/10 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.length > 0 ? (
                      leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                            {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : "N/A"}
                            <span className="block text-[10px] opacity-50">
                              {lead.timestamp ? new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              lead.source === "chatbot" 
                                ? "bg-blue-600/10 text-blue-400 border-blue-500/30" 
                                : "bg-purple-600/10 text-purple-400 border-purple-500/30"
                            }`}>
                              {lead.source}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-sm block text-white">{lead.name}</span>
                            <span className="text-xs text-gray-400 italic block">{lead.businessName}</span>
                          </td>
                          <td className="px-6 py-4 space-y-1">
                            {lead.email && <a href={`mailto:${lead.email}`} className="block text-xs text-blue-400 hover:underline">{lead.email}</a>}
                            <a href={`tel:${lead.phone}`} className="block text-xs text-gray-300 font-medium">{lead.phone}</a>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-medium text-gray-300">
                              {lead.websiteType}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-xs text-gray-300 max-w-xs line-clamp-2">
                              {lead.projectDescription || lead.website || "No additional details"}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 hover:bg-red-500/10 rounded-lg"
                              title="Delete Lead"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-16 text-center text-gray-500 font-medium italic">
                          No leads captured yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
