"use client";

import { useState, useRef, useTransition } from "react";
import Image from "next/image";
import { categories } from "@/lib/data";
import { CloudinaryImage } from "@/lib/cloudinary";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, Folder, UploadCloud, CheckCircle, X, ImageIcon, KeyRound, Settings2, IndianRupee } from "lucide-react";

type UploadFile = {
  file: File;
  preview: string;
  status: "pending" | "uploading" | "done" | "error";
};

type Service = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  image: string;
};

export default function AdminDashboard({
  initialImages,
  initialFolders,
  initialServices,
}: {
  initialImages: CloudinaryImage[];
  initialFolders: string[];
  initialServices: Service[];
}) {
  const [selectedTag, setSelectedTag] = useState(categories[1]);
  const [selectedFolder, setSelectedFolder] = useState("hp_mehendi_gallery");
  const [isNewFolder, setIsNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState("All");

  // Password change state
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Services state
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [serviceEdits, setServiceEdits] = useState<{ price: string; description: string }>({ price: "", description: "" });
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [serviceMessage, setServiceMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const startEditing = (svc: Service) => {
    setEditingSlug(svc.slug);
    setServiceEdits({ price: svc.price, description: svc.description });
    setServiceMessage(null);
  };

  const saveService = async (slug: string) => {
    setSavingSlug(slug);
    setServiceMessage(null);
    try {
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, price: serviceEdits.price, description: serviceEdits.description }),
      });
      const data = await res.json();
      if (res.ok) {
        setServices(prev => prev.map(s => s.slug === slug ? { ...s, price: serviceEdits.price, description: serviceEdits.description } : s));
        setEditingSlug(null);
        setServiceMessage({ type: "success", text: `"${slug}" updated successfully!` });
      } else {
        setServiceMessage({ type: "error", text: data.error || "Failed to update." });
      }
    } catch {
      setServiceMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setSavingSlug(null);
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const uploadCategories = categories.filter((c) => c !== "All");
  const activeFolder = isNewFolder && newFolderName.trim() ? newFolderName.trim() : selectedFolder;

  const filteredImages =
    filterCategory === "All"
      ? initialImages
      : initialImages.filter((img) => img.category === filterCategory);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles: UploadFile[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      status: "pending",
    }));
    setUploadFiles((prev) => [...prev, ...newFiles]);
    setUploadMessage(null);
  };

  const removeFile = (index: number) => {
    setUploadFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;
    setIsUploading(true);
    setUploadMessage(null);

    const formData = new FormData();
    formData.append("category", selectedTag);
    formData.append("folder", activeFolder);
    uploadFiles.forEach((uf) => formData.append("files", uf.file));

    // Mark all as uploading
    setUploadFiles((prev) => prev.map((f) => ({ ...f, status: "uploading" })));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok) {
        setUploadFiles((prev) => prev.map((f) => ({ ...f, status: "done" })));
        setUploadMessage({ type: "success", text: `${uploadFiles.length} image(s) uploaded successfully!` });
        // Clear queue after short delay
        setTimeout(() => {
          setUploadFiles([]);
          startTransition(() => router.refresh());
        }, 1500);
      } else {
        setUploadFiles((prev) => prev.map((f) => ({ ...f, status: "error" })));
        setUploadMessage({ type: "error", text: data.error || "Upload failed." });
      }
    } catch {
      setUploadFiles((prev) => prev.map((f) => ({ ...f, status: "error" })));
      setUploadMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this image?")) return;
    setDeletingId(id);
    try {
      const res = await fetch("/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: id }),
      });
      if (res.ok) {
        startTransition(() => router.refresh());
      } else {
        alert("Failed to delete image.");
      }
    } catch {
      alert("An error occurred while deleting.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-12">
      {/* Upload Section */}
      <div className="space-y-6">
        <div className="border-b border-accent/20 pb-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-accent" /> Upload Images
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select multiple images at once. Choose a category and folder before uploading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Mehndi Type (Tag)</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground text-sm"
              >
                {uploadCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1">
                <Folder className="w-4 h-4" /> Gallery Folder
              </label>
              <select
                value={isNewFolder ? "NEW_FOLDER" : selectedFolder}
                onChange={(e) => {
                  if (e.target.value === "NEW_FOLDER") { setIsNewFolder(true); }
                  else { setIsNewFolder(false); setSelectedFolder(e.target.value); }
                }}
                className="w-full px-3 py-2 bg-background border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground text-sm mb-2"
              >
                <option value="hp_mehendi_gallery">Default (hp_mehendi_gallery)</option>
                {initialFolders.filter((f) => f !== "hp_mehendi_gallery").map((folder) => (
                  <option key={folder} value={folder}>{folder}</option>
                ))}
                <option value="NEW_FOLDER">+ Create New Folder...</option>
              </select>
              {isNewFolder && (
                <input
                  type="text"
                  placeholder="Enter new folder name..."
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground text-sm"
                />
              )}
            </div>

            {/* Drop zone */}
            <div className="relative border-2 border-dashed border-accent/30 rounded-xl p-6 text-center hover:border-accent/60 hover:bg-accent/5 transition-colors">
              <UploadCloud className="w-8 h-8 mx-auto text-accent/50 mb-2" />
              <p className="text-sm font-medium text-foreground">Click to select images</p>
              <p className="text-xs text-muted-foreground mt-1">or drag and drop · Multiple files supported</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*, image/heic, image/heif"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileSelect}
              />
            </div>

            {uploadFiles.length > 0 && (
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2.5 rounded-md font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Uploading {uploadFiles.length} image(s)...</>
                ) : (
                  <><UploadCloud className="w-4 h-4" /> Upload {uploadFiles.length} Image(s)</>
                )}
              </button>
            )}

            {uploadMessage && (
              <div className={`p-3 rounded-md text-sm ${uploadMessage.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-600" : "bg-red-500/10 border border-red-500/20 text-red-600"}`}>
                {uploadMessage.text}
              </div>
            )}
          </div>

          {/* Preview Queue */}
          {uploadFiles.length > 0 && (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              <p className="text-sm font-medium text-foreground">{uploadFiles.length} file(s) selected:</p>
              {uploadFiles.map((uf, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-accent/5 rounded-lg border border-accent/10">
                  <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-accent/10">
                    <Image src={uf.preview} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{uf.file.name}</p>
                    <p className="text-xs text-muted-foreground">{(uf.file.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <div className="flex-shrink-0">
                    {uf.status === "pending" && (
                      <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {uf.status === "uploading" && <Loader2 className="w-4 h-4 animate-spin text-accent" />}
                    {uf.status === "done" && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {uf.status === "error" && <X className="w-4 h-4 text-destructive" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gallery Management */}
      <div className="space-y-6 pt-6 border-t border-accent/20">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-accent" /> Manage Gallery
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Hover over an image to delete it.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-muted-foreground bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              {filteredImages.length} / {initialImages.length} images
            </span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 bg-background border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground text-sm"
            >
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredImages.map((img) => (
            <div key={img.id} className="relative group rounded-lg overflow-hidden border border-accent/20 bg-background/50 flex flex-col">
              <div className="relative w-full aspect-[3/4]">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="200px" />
              </div>
              <div className="p-2 bg-card border-t border-accent/10">
                <span className="text-xs font-medium text-foreground block truncate">{img.category}</span>
                <span className="text-[10px] text-muted-foreground truncate opacity-70 flex items-center gap-1">
                  <Folder className="w-2.5 h-2.5" /> {img.folder || "root"}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={deletingId === img.id}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground p-3 rounded-full shadow-lg transition-transform hover:scale-110 disabled:opacity-50"
                  title="Delete Image"
                >
                  {deletingId === img.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ))}

          {filteredImages.length === 0 && (
            <div className="col-span-full py-16 text-center text-muted-foreground bg-accent/5 rounded-xl border border-accent/10 border-dashed">
              <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No images found. Upload some above!</p>
            </div>
          )}
        </div>
      </div>
      {/* Change Password Section */}
      <div className="space-y-6 pt-6 border-t border-accent/20">
        <div className="border-b border-accent/20 pb-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-accent" /> Change Password
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Update your admin account password.</p>
        </div>

        <div className="max-w-sm space-y-4">
          {["current", "next", "confirm"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-foreground mb-1 capitalize">
                {field === "next" ? "New Password" : field === "confirm" ? "Confirm New Password" : "Current Password"}
              </label>
              <input
                type="password"
                value={pwForm[field as keyof typeof pwForm]}
                onChange={(e) => setPwForm((p) => ({ ...p, [field]: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground text-sm"
                placeholder="••••••••"
              />
            </div>
          ))}

          {pwMessage && (
            <div className={`p-3 rounded-md text-sm ${
              pwMessage.type === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-600"
                : "bg-red-500/10 border border-red-500/20 text-red-600"
            }`}>
              {pwMessage.text}
            </div>
          )}

          <button
            disabled={pwLoading}
            onClick={async () => {
              if (!pwForm.current || !pwForm.next || !pwForm.confirm) {
                setPwMessage({ type: "error", text: "All fields are required." });
                return;
              }
              if (pwForm.next !== pwForm.confirm) {
                setPwMessage({ type: "error", text: "New passwords do not match." });
                return;
              }
              setPwLoading(true);
              setPwMessage(null);
              try {
                const res = await fetch("/api/auth/change-password", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
                });
                const data = await res.json();
                if (res.ok) {
                  setPwMessage({ type: "success", text: "Password updated successfully!" });
                  setPwForm({ current: "", next: "", confirm: "" });
                } else {
                  setPwMessage({ type: "error", text: data.error || "Failed to update password." });
                }
              } catch {
                setPwMessage({ type: "error", text: "An unexpected error occurred." });
              } finally {
                setPwLoading(false);
              }
            }}
            className="w-full bg-foreground hover:bg-foreground/90 text-background py-2.5 rounded-md font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {pwLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <><KeyRound className="w-4 h-4" /> Update Password</>}
          </button>
        </div>
      </div>

      {/* Services Management Section */}
      <div className="space-y-6 pt-6 border-t border-accent/20">
        <div className="border-b border-accent/20 pb-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-accent" /> Manage Services & Pricing
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Update the price and description shown on your Services page.</p>
        </div>

        {serviceMessage && (
          <div className={`p-3 rounded-md text-sm ${
            serviceMessage.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-600"
              : "bg-red-500/10 border border-red-500/20 text-red-600"
          }`}>
            {serviceMessage.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <div key={svc.slug} className="border border-accent/20 rounded-xl p-4 bg-background/50 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{svc.title}</h3>
                {editingSlug !== svc.slug && (
                  <button
                    onClick={() => startEditing(svc)}
                    className="text-xs text-accent hover:underline flex items-center gap-1"
                  >
                    <Settings2 className="w-3 h-3" /> Edit
                  </button>
                )}
              </div>

              {editingSlug === svc.slug ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1"><IndianRupee className="w-3 h-3" /> Price</label>
                    <input
                      type="text"
                      value={serviceEdits.price}
                      onChange={(e) => setServiceEdits(p => ({ ...p, price: e.target.value }))}
                      className="w-full px-3 py-1.5 bg-background border border-accent/30 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
                    <textarea
                      value={serviceEdits.description}
                      onChange={(e) => setServiceEdits(p => ({ ...p, description: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-1.5 bg-background border border-accent/30 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent text-foreground resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveService(svc.slug)}
                      disabled={savingSlug === svc.slug}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground py-1.5 rounded-md text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      {savingSlug === svc.slug ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</> : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingSlug(null)}
                      className="px-4 py-1.5 border border-accent/30 rounded-md text-sm text-muted-foreground hover:bg-accent/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-accent font-bold text-sm flex items-center gap-1"><IndianRupee className="w-3 h-3" />{svc.price}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{svc.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
