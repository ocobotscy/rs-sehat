import React, { useState, useRef } from 'react';
import { Card, Button, Input, Badge } from '../components/UI';
import { UserCircle, Mail, Phone, MapPin, Edit3, Save, Camera, Shield, Award, Calendar, BookOpen, Upload } from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [userData, setUserData] = useState({
    name: 'Rans Alfred',
    role: 'Masyarakat Umum',
    email: 'rans.alfred@example.com',
    phone: '0812-3456-7890',
    address: 'Jl. Melati No. 45, Jakarta Selatan',
    bio: 'Saya sangat peduli dengan kesehatan keluarga dan lingkungan. Aktif mengikuti kegiatan posyandu dan senam pagi.',
    bloodType: 'O',
    birthDate: '1995-08-17',
    photo: null as string | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData(prev => ({ ...prev, photo: imageUrl }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, API call goes here
    alert('Data profil berhasil diperbarui!');
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        className="hidden" 
        accept="image/*"
      />

      {/* Header Profile Cover */}
      <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#1e293b] shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="h-40 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end md:items-center gap-6 -mt-12">
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl bg-white dark:bg-gray-800 p-1 shadow-xl overflow-hidden">
              {userData.photo ? (
                <img 
                  src={userData.photo} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-4xl text-white font-bold">
                  {userData.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                </div>
              )}
              
              {/* Overlay for edit mode visual cue */}
              {isEditing && (
                <div 
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={triggerFileInput}
                >
                  <Upload className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
            
            {isEditing && (
              <button 
                onClick={triggerFileInput}
                className="absolute bottom-2 right-2 p-2 bg-gray-900 text-white rounded-full hover:bg-black transition-colors shadow-lg z-10"
                title="Ganti Foto"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex-1 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{userData.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="font-medium">{userData.role}</span>
              <span className="mx-1">•</span>
              <Badge color="green">Akun Terverifikasi</Badge>
            </div>
          </div>

          <div className="mb-4">
             {isEditing ? (
               <Button onClick={handleSave} className="flex items-center gap-2">
                 <Save className="w-4 h-4" /> Simpan Perubahan
               </Button>
             ) : (
               <Button variant="outline" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                 <Edit3 className="w-4 h-4" /> Edit Profil
               </Button>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats & Bio */}
        <div className="space-y-6">
           <Card title="Tentang Saya">
              {isEditing ? (
                <textarea 
                  name="bio"
                  value={userData.bio}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-gray-700 dark:text-gray-300 h-32"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {userData.bio}
                </p>
              )}
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  {isEditing ? <input name="address" value={userData.address} onChange={handleChange} className="border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none w-full" /> : userData.address}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>Bergabung sejak Jan 2025</span>
                </div>
              </div>
           </Card>

           <Card title="Pencapaian Kesehatan">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-center">
                    <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">1,250</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Total Poin</div>
                 </div>
                 <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                    <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">12</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold">Modul Selesai</div>
                 </div>
              </div>
           </Card>
        </div>

        {/* Right Column: Biodata Form */}
        <div className="lg:col-span-2 space-y-6">
           <Card title="Informasi Pribadi">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Nama Lengkap</label>
                    {isEditing ? (
                      <Input name="name" value={userData.name} onChange={handleChange} />
                    ) : (
                      <div className="text-gray-900 dark:text-white font-medium p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-transparent">{userData.name}</div>
                    )}
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Golongan Darah</label>
                    {isEditing ? (
                      <Input name="bloodType" value={userData.bloodType} onChange={handleChange} />
                    ) : (
                      <div className="text-gray-900 dark:text-white font-medium p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-transparent">{userData.bloodType}</div>
                    )}
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center gap-2"><Mail className="w-3 h-3"/> Email</label>
                    {isEditing ? (
                      <Input name="email" value={userData.email} onChange={handleChange} />
                    ) : (
                      <div className="text-gray-900 dark:text-white font-medium p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-transparent">{userData.email}</div>
                    )}
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 flex items-center gap-2"><Phone className="w-3 h-3"/> No. Handphone</label>
                    {isEditing ? (
                      <Input name="phone" value={userData.phone} onChange={handleChange} />
                    ) : (
                      <div className="text-gray-900 dark:text-white font-medium p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-transparent">{userData.phone}</div>
                    )}
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Tanggal Lahir</label>
                    {isEditing ? (
                      <Input type="date" name="birthDate" value={userData.birthDate} onChange={handleChange} />
                    ) : (
                      <div className="text-gray-900 dark:text-white font-medium p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-transparent">{userData.birthDate}</div>
                    )}
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;