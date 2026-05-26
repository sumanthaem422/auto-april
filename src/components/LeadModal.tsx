import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2, Send } from 'lucide-react';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useLead } from '../context/LeadContext';
import { generateUUID } from '../lib/utils';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function LeadModal() {
  const { isModalOpen, closeModal, modalSource } = useLead();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    industry: ''
  });
  const [countryCode, setCountryCode] = useState('+1');
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final check
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);

    if (!isEmailValid || !isPhoneValid) {
      setErrors({
        email: isEmailValid ? '' : 'Please enter a valid email address',
        phone: isPhoneValid ? '' : 'Please enter a valid 10-digit phone number'
      });
      return;
    }

    setLoading(true);
    setErrors({ email: '', phone: '' });

    const path = 'leads';
    const phoneDigits = formData.phone.replace(/\D/g, '');
    const leadId = generateUUID();

    try {
      await setDoc(doc(db, path, leadId), {
        ...formData,
        phone: `${countryCode}${phoneDigits}`,
        industry: formData.industry || 'Not Specified',
        source: modalSource,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setTimeout(() => {
        closeModal();
        setSuccess(false);
        setFormData({ fullName: '', email: '', phone: '', company: '', website: '', industry: '' });
      }, 2500);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>

            {success ? (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h3 className="text-2xl font-black font-syne text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Our AI specialist will review your details and reach out shortly to schedule your audit.
                </p>
              </div>
            ) : (
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <h3 className="text-3xl font-black font-syne text-slate-900 mb-2">Book Your AI Audit</h3>
                  <p className="text-slate-500 font-medium">
                    Get a personalized automation roadmap for your business.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({...formData, email: val});
                          if (val && !validateEmail(val)) {
                            setErrors(prev => ({...prev, email: 'Invalid email format'}));
                          } else {
                            setErrors(prev => ({...prev, email: ''}));
                          }
                        }}
                        className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all`}
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                       <select 
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-3.5 text-sm font-bold focus:outline-none border-slate-200 focus:border-brand transition-all w-24"
                       >
                         <option value="+1">🇺🇸 +1</option>
                         <option value="+44">🇬🇧 +44</option>
                         <option value="+91">🇮🇳 +91</option>
                         <option value="+61">🇦🇺 +61</option>
                         <option value="+49">🇩🇪 +49</option>
                         <option value="+33">🇫🇷 +33</option>
                         <option value="+81">🇯🇵 +81</option>
                         <option value="+971">🇦🇪 +971</option>
                       </select>
                       <input
                        required
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData({...formData, phone: val});
                          if (val.length > 0 && val.length !== 10) {
                            setErrors(prev => ({...prev, phone: 'Must be exactly 10 digits'}));
                          } else {
                            setErrors(prev => ({...prev, phone: ''}));
                          }
                        }}
                        className={`flex-1 bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all`}
                        placeholder="123 456 7890"
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Industry Sector</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all appearance-none"
                    >
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail & E-commerce">Retail & E-commerce</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all"
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Company Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all"
                      placeholder="https://acme.com"
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-slate-900 text-white rounded-xl py-4 font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 mt-4 group"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Request Free Audit <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-6">
                    ⚡ No Credit Card required · Limited slots available
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
