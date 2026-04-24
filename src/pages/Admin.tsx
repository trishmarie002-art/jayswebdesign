import { useState, useEffect } from "react";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  updateDoc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { auth, db, signInWithGoogle, logout } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
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
  Lock
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

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoginLoading(true);
    setLoginError(null);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setLoginError(error.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    image: "",
    category: "",
    alt: "",
    order: 0
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const adminDoc = await getDoc(doc(db, "admins", u.uid));
        if (adminDoc.exists()) {
          setIsAdmin(true);
        } else {
          // If no admins exist at all, make this first user an admin (Bootstrap mode)
          // For safety in production, this should be handled differently.
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), formData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "projects"), {
          ...formData,
          order: projects.length
        });
      }
      setFormData({ name: "", url: "", image: "", category: "", alt: "", order: 0 });
      setIsAdding(false);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
    }
  };

  const seedInitialData = async () => {
    const initialProjects = [
      {
        name: "Pure View Cleaning Solutions",
        url: "https://pvcstexas.com/",
        image: "https://pub-a35884625cfe400d9088764a7f0e49e0.r2.dev/Jay's%20Web%20Design%20Services/pvcswebsitebyJayswebdesignservices.png",
        category: "Cleaning Services",
        alt: "Modern cleaning services website for Pure View Cleaning Solutions",
        order: 0
      },
      {
        name: "Plumb Daddy Plumbing",
        url: "https://plumbdaddy-texas.com/",
        image: "https://pub-a35884625cfe400d9088764a7f0e49e0.r2.dev/Jay's%20Web%20Design%20Services/plumbdaddyswebsitebyjayswebdesignservices.jpeg",
        category: "Plumbing Services",
        alt: "Professional plumbing website design for Plumb Daddy Texas",
        order: 1
      },
      {
        name: "Rush Wheels & Tires",
        url: "https://rushwheelandtire.com/",
        image: "https://pub-a35884625cfe400d9088764a7f0e49e0.r2.dev/Jay's%20Web%20Design%20Services/RushwheelandtireswebsitebyJayswebdesignservices.png",
        category: "Automotive",
        alt: "Responsive automotive website for Rush Wheels & Tires",
        order: 2
      },
      {
        name: "Reycom Combat Gym",
        url: "https://reycom.com/",
        image: "https://pub-a35884625cfe400d9088764a7f0e49e0.r2.dev/Jay's%20Web%20Design%20Services/reycomwebsitebyjayswebdesignservices.png",
        category: "Fitness & MMA",
        alt: "High-conversion fitness and MMA gym website",
        order: 3
      },
      {
        name: "P&F Services",
        url: "https://pnfservices.com/",
        image: "https://pub-a35884625cfe400d9088764a7f0e49e0.r2.dev/Jay's%20Web%20Design%20Services/pnfwebsitebyjayswebdesignservices.png",
        category: "Professional Services",
        alt: "Professional services website by Jay's Web Design",
        order: 4
      }
    ];

    for (const p of initialProjects) {
      await addDoc(collection(db, "projects"), p);
    }
    alert("Success! All 6 website projects have been added back to your gallery.");
  };

  const makeMeAdmin = async () => {
    if (user) {
      try {
        await setDoc(doc(db, "admins", user.uid), { 
          email: user.email,
          displayName: user.displayName,
          createdAt: new Date().toISOString()
        });
        setIsAdmin(true);
        alert("You are now an admin!");
      } catch (error: any) {
        console.error("Error enabling admin:", error);
        alert("Failed to enable admin access. Error: " + (error.message || "Unknown error"));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 border border-white/10 rounded-3xl p-8 text-center">
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-blue-500" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-400 mb-6">Login with your Google account to manage the site gallery and content.</p>
          {loginError && (
            <div className="bg-red-600/20 border border-red-500/50 text-red-400 text-sm p-3 rounded-xl mb-4">
              {loginError}
            </div>
          )}
          <button 
            onClick={handleGoogleSignIn}
            disabled={loginLoading}
            className="w-full btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loginLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Globe size={20} />
            )}
            {loginLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 border border-white/10 rounded-3xl p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8">Your account ({user.email}) does not have admin privileges.</p>
          <div className="space-y-4">
            <button 
              onClick={makeMeAdmin}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold"
            >
              Enable Admin for My Account
            </button>
            <button 
              onClick={logout}
              className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-3">
              <Layout className="text-blue-500" />
              Site Dashboard
            </h1>
            <p className="text-gray-500 mt-1 italic">Welcome back, {user.displayName}</p>
          </div>
          <div className="flex gap-4">
             {projects.length === 0 && (
                <button 
                  onClick={seedInitialData}
                  className="bg-yellow-600/20 text-yellow-500 border border-yellow-500/50 px-4 py-2 rounded-xl text-sm font-bold hover:bg-yellow-600/30 transition-all"
                >
                  Seed Data
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

        <div className="grid grid-cols-1 gap-12">
          {/* Site Content Management */}
          <section className="bg-gray-900 border border-white/5 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-8">
              <Globe className="text-blue-500" size={24} />
              Site Content (Hero Section)
            </h2>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const target = e.target as any;
                await setDoc(doc(db, "siteContent", "hero"), {
                  heroTitle: target.heroTitle.value,
                  heroSubtitle: target.heroSubtitle.value,
                  heroImages: target.heroImages.value.split("\n").filter((s: string) => s.trim() !== "")
                });
                alert("Content updated!");
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">Hero Title (Use | for gradient part)</label>
                <input 
                  name="heroTitle"
                  type="text" 
                  defaultValue="San Antonio’s|Premier Web Designer"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">Hero Subtitle</label>
                <textarea 
                  name="heroSubtitle"
                  rows={3}
                  defaultValue="Get a high-performance website in just 7 days. I build revenue-generating assets for plumbers, gyms, and local pros designed to turn clicks into customers."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">Hero Images (One URL per line)</label>
                <textarea 
                  name="heroImages"
                  rows={4}
                  defaultValue={defaultImages.join("\n")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none resize-none"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <Save size={20} />
                Save Site Content
              </button>
            </form>
          </section>

          {/* Gallery Management */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <ImageIcon className="text-blue-500" size={24} />
                Gallery Projects
              </h2>
              <button 
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                  setFormData({ name: "", url: "", image: "", category: "", alt: "", order: projects.length });
                }}
                className="btn-primary px-5 py-2 rounded-xl flex items-center gap-2 text-sm"
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
                  className="bg-gray-900 border border-blue-500/30 rounded-3xl p-6 md:p-8 mb-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">{editingId ? "Edit Project" : "New Project"}</h3>
                    <button onClick={() => setIsAdding(false)} className="text-gray-500 hover:text-white">
                      <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400">Project Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                        placeholder="e.g. My Website"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400">Website URL</label>
                      <input 
                        required
                        type="url" 
                        value={formData.url}
                        onChange={e => setFormData({ ...formData, url: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400">Image URL</label>
                      <input 
                        required
                        type="text" 
                        value={formData.image}
                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                        placeholder="https://images..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400">Category</label>
                      <input 
                        required
                        type="text" 
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                        placeholder="e.g. Plumber"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-gray-400">Alt Text (SEO)</label>
                      <input 
                        type="text" 
                        value={formData.alt}
                        onChange={e => setFormData({ ...formData, alt: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button type="submit" className="w-full btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                        <Save size={20} />
                        {editingId ? "Update Project" : "Create Project"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-gray-900 border border-white/5 rounded-2xl overflow-hidden group">
                  <div className="h-40 bg-gray-800 relative">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{project.name}</h3>
                    <p className="text-xs text-blue-500 uppercase font-bold mb-4">{project.category}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingId(project.id);
                          setFormData(project);
                          setIsAdding(true);
                        }}
                        className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-lg flex items-center justify-center transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="flex-1 bg-red-600/10 hover:bg-red-600/20 text-red-500 py-2 rounded-lg flex items-center justify-center transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
