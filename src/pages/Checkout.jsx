import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Banknote, MapPin, User, Phone, Mail, Home as HomeIcon, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../context/CartContext';

const clipStyle = {
    clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 10%)'
};

const STEPS = [
    { id: 1, label: 'Informacioni', icon: User },
    { id: 2, label: 'Pagesa', icon: Banknote },
    { id: 3, label: 'Konfirmimi', icon: Check },
];

const stepVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 60 : -60,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (direction) => ({
        x: direction > 0 ? -60 : 60,
        opacity: 0,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    }),
};

// Reusable input
const InputField = ({ icon: Icon, label, field, type = 'text', placeholder, half = false, form, errors, updateField }) => (
    <div className={half ? 'flex-1' : 'w-full'}>
        <label className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold block mb-2">
            {label}
        </label>
        <div className="relative">
            {Icon && (
                <Icon size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
            )}
            <input
                type={type}
                value={form[field]}
                onChange={(e) => updateField(field, e.target.value)}
                placeholder={placeholder}
                className={`w-full bg-[#f5f3f0] border ${errors[field] ? 'border-red-400' : 'border-black/12'} text-black font-mono text-sm tracking-wider ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3.5 focus:outline-none focus:border-[#FF5F00] focus:bg-white transition-all duration-200 placeholder:text-black/25 shadow-sm`}
            />
        </div>
        {errors[field] && (
            <p className="font-mono text-[10px] tracking-widest text-red-500 mt-1.5">{errors[field]}</p>
        )}
    </div>
);

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, subtotal, shipping, total, clearCart } = useCart();

    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [orderNumber] = useState(() => `OC-${Date.now().toString(36).toUpperCase()}`);

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address: '', city: '', zip: '', country: 'Shqipëri', notes: '',
    });
    const [errors, setErrors] = useState({});
    const [paymentSelected, setPaymentSelected] = useState(true);

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateStep1 = () => {
        const e = {};
        if (!form.firstName.trim()) e.firstName = 'Emri është i detyrueshëm';
        if (!form.lastName.trim()) e.lastName = 'Mbiemri është i detyrueshëm';
        if (!form.email.trim()) e.email = 'Email-i është i detyrueshëm';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email-i nuk është valid';
        if (!form.phone.trim()) e.phone = 'Numri i telefonit është i detyrueshëm';
        if (!form.address.trim()) e.address = 'Adresa është e detyrueshme';
        if (!form.city.trim()) e.city = 'Qyteti është i detyrueshëm';
        if (!form.zip.trim()) e.zip = 'Kodi postal është i detyrueshëm';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const goNext = () => {
        if (currentStep === 1 && !validateStep1()) return;
        const nextStep = Math.min(3, currentStep + 1);
        setDirection(1);
        setCurrentStep(nextStep);
        if (nextStep === 3) clearCart();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goBack = () => {
        if (currentStep === 1) { navigate('/cart'); return; }
        setDirection(-1);
        setCurrentStep(prev => Math.max(1, prev - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const fieldProps = { form, errors, updateField };

    // Empty cart redirect
    if (cartItems.length === 0 && currentStep < 3) {
        return (
            <div className="w-full min-h-screen bg-[#e8e4df]">
                <div className="pt-28 md:pt-36 px-6 md:px-12 max-w-[1500px] mx-auto">
                    <div className="w-16 h-[2px] bg-[#FF5F00] mb-6"></div>
                    <h1 className="font-['Anton'] text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase leading-none text-black">Kasa</h1>
                </div>
                <div className="max-w-[800px] mx-auto px-6 md:px-12 py-24 text-center">
                    <div className="bg-white/60 backdrop-blur-sm border border-black/8 p-12 rounded-sm">
                        <Package size={48} strokeWidth={1} className="text-black/30 mx-auto mb-6" />
                        <h2 className="font-['Anton'] text-3xl md:text-4xl tracking-wide uppercase text-black mb-4">Shporta është bosh</h2>
                        <p className="font-mono text-xs tracking-widest uppercase text-black/50 mb-8">Shtoni produkte në shportë para se të vazhdoni me porosinë.</p>
                        <Link to="/collection">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-black text-white px-8 py-4 font-['Anton'] text-base tracking-[0.15em] uppercase hover:bg-[#FF5F00] transition-colors duration-300 flex items-center gap-3 shadow-lg"
                            >
                                Eksploro Koleksionin <ArrowRight size={18} strokeWidth={1.5} />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#e8e4df]">

            {/* ===== CLEAN HEADER ===== */}
            <div className="pt-28 md:pt-36 pb-10 md:pb-14 px-6 md:px-12 max-w-[1500px] mx-auto">
                <nav className="mb-6 font-mono text-[10px] md:text-xs tracking-widest uppercase text-black/40">
                    <Link to="/" className="hover:text-black transition-colors">Ballina</Link>
                    <span className="mx-2">/</span>
                    <Link to="/cart" className="hover:text-black transition-colors">Shporta</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black/80">Kasa</span>
                </nav>
                <div className="w-16 h-[2px] bg-[#FF5F00] mb-6"></div>
                <h1 className="font-['Anton'] text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase leading-none text-black">Kasa</h1>
            </div>

            {/* ===== CONTENT ===== */}
            <div className="max-w-[1500px] mx-auto px-6 md:px-12 pb-24 md:pb-32">

                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-12 md:mb-16">
                    {STEPS.map((step, idx) => {
                        const StepIcon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;
                        return (
                            <React.Fragment key={step.id}>
                                <div className="flex flex-col items-center gap-2">
                                    <div
                                        className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 shadow-sm ${isCompleted ? 'bg-[#FF5F00] text-white shadow-[#FF5F00]/20' : isActive ? 'bg-black text-white shadow-black/20' : 'bg-white border border-black/12 text-black/35'}`}
                                        style={clipStyle}
                                    >
                                        {isCompleted ? <Check size={20} strokeWidth={2} /> : <StepIcon size={20} strokeWidth={1.5} />}
                                    </div>
                                    <span className={`font-mono text-[9px] md:text-[10px] tracking-widest uppercase transition-colors ${isActive ? 'text-black font-semibold' : isCompleted ? 'text-[#FF5F00]' : 'text-black/35'}`}>
                                        {step.label}
                                    </span>
                                </div>
                                {idx < STEPS.length - 1 && (
                                    <div className={`w-16 sm:w-24 md:w-32 h-[2px] mx-2 md:mx-4 mb-6 transition-colors duration-300 ${currentStep > step.id ? 'bg-[#FF5F00]' : 'bg-black/8'}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Main Grid: Form + Sidebar */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20">

                    {/* ===== LEFT: Step Content ===== */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait" custom={direction}>

                            {/* ========== STEP 1: Information ========== */}
                            {currentStep === 1 && (
                                <motion.div key="step1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                                    <div className="bg-white border border-black/10 p-8 md:p-10 shadow-md">
                                        <h2 className="font-['Anton'] text-2xl md:text-3xl tracking-wide uppercase text-black mb-2">Informacioni i Dërgesës</h2>
                                        <p className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-black/40 mb-8">Plotësoni detajet tuaja për dërgesën</p>
                                        <div className="w-full h-[2px] bg-black/8 mb-8"></div>

                                        {/* Name Row */}
                                        <div className="flex flex-col sm:flex-row gap-4 mb-5">
                                            <InputField icon={User} label="Emri" field="firstName" placeholder="Art" half {...fieldProps} />
                                            <InputField icon={User} label="Mbiemri" field="lastName" placeholder="Halimi" half {...fieldProps} />
                                        </div>

                                        {/* Contact Row */}
                                        <div className="flex flex-col sm:flex-row gap-4 mb-5">
                                            <InputField icon={Mail} label="Email" field="email" type="email" placeholder="art@email.com" half {...fieldProps} />
                                            <InputField icon={Phone} label="Telefoni" field="phone" type="tel" placeholder="+355 69 123 4567" half {...fieldProps} />
                                        </div>

                                        <div className="w-full h-[2px] bg-black/8 my-8"></div>
                                        <h3 className="font-['Anton'] text-xl tracking-wide uppercase text-black mb-6">Adresa e Dërgesës</h3>

                                        <div className="mb-5">
                                            <InputField icon={HomeIcon} label="Adresa" field="address" placeholder="Rruga Myslym Shyri, Nr. 15" {...fieldProps} />
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 mb-5">
                                            <InputField icon={MapPin} label="Qyteti" field="city" placeholder="Tiranë" half {...fieldProps} />
                                            <InputField label="Kodi Postal" field="zip" placeholder="1001" half {...fieldProps} />
                                        </div>

                                        {/* Country */}
                                        <div className="mb-5">
                                            <label className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold block mb-2">Shteti</label>
                                            <select value={form.country} onChange={(e) => updateField('country', e.target.value)} className="w-full bg-[#f5f3f0] border border-black/12 text-black font-mono text-sm tracking-wider pl-4 pr-4 py-3.5 focus:outline-none focus:border-[#FF5F00] focus:bg-white transition-all duration-200 appearance-none cursor-pointer shadow-sm">
                                                <option value="Shqipëri">Shqipëri</option>
                                                <option value="Kosovë">Kosovë</option>
                                                <option value="Maqedoni e Veriut">Maqedoni e Veriut</option>
                                                <option value="Mal i Zi">Mal i Zi</option>
                                            </select>
                                        </div>

                                        {/* Notes */}
                                        <div className="mb-2">
                                            <label className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold block mb-2">Shënime (Opsionale)</label>
                                            <textarea value={form.notes} onChange={(e) => updateField('notes', e.target.value)} placeholder="Shënime shtesë rreth porosisë suaj..." rows={3} className="w-full bg-[#f5f3f0] border border-black/12 text-black font-mono text-sm tracking-wider px-4 py-3.5 focus:outline-none focus:border-[#FF5F00] focus:bg-white transition-all duration-200 placeholder:text-black/25 resize-none shadow-sm" />
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex justify-between items-center mt-8">
                                        <button onClick={goBack} className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black/50 hover:text-black transition-colors">
                                            <ArrowLeft size={16} strokeWidth={1.5} /> Kthehu te Shporta
                                        </button>
                                        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={goNext} className="bg-black text-white px-8 py-4 font-['Anton'] text-base tracking-[0.15em] uppercase hover:bg-[#FF5F00] transition-colors flex items-center gap-3 shadow-lg" style={clipStyle}>
                                            Vazhdo te Pagesa <ArrowRight size={18} strokeWidth={1.5} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* ========== STEP 2: Payment ========== */}
                            {currentStep === 2 && (
                                <motion.div key="step2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                                    <div className="bg-white border border-black/10 p-8 md:p-10 shadow-md">
                                        <h2 className="font-['Anton'] text-2xl md:text-3xl tracking-wide uppercase text-black mb-2">Mënyra e Pagesës</h2>
                                        <p className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-black/40 mb-8">Zgjidhni si dëshironi të paguani</p>
                                        <div className="w-full h-[2px] bg-black/8 mb-8"></div>

                                        {/* Cash on Delivery Card */}
                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            onClick={() => setPaymentSelected(true)}
                                            className={`relative border-2 p-6 md:p-8 cursor-pointer transition-all duration-300 shadow-sm ${paymentSelected ? 'border-[#FF5F00] bg-[#FF5F00]/5' : 'border-black/10 hover:border-black/25'}`}
                                            style={clipStyle}
                                        >
                                            {paymentSelected && (
                                                <div className="absolute top-4 right-4 w-6 h-6 bg-[#FF5F00] text-white flex items-center justify-center rounded-full">
                                                    <Check size={14} strokeWidth={2.5} />
                                                </div>
                                            )}
                                            <div className="flex items-start gap-5">
                                                <div className="w-14 h-14 bg-[#f5f3f0] flex items-center justify-center flex-shrink-0" style={clipStyle}>
                                                    <Banknote size={28} strokeWidth={1.5} className="text-black/60" />
                                                </div>
                                                <div>
                                                    <h3 className="font-['Anton'] text-xl md:text-2xl tracking-wide uppercase text-black mb-2">Paguaj me Para në Dorë</h3>
                                                    <p className="font-mono text-xs tracking-wider text-black/50 leading-relaxed">Paguani direkt kur porosia të dorëzohet në adresën tuaj. Nuk nevojiten të dhëna kartash.</p>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Shipment Info */}
                                        <div className="mt-8 p-6 border border-black/10 bg-[#f5f3f0] shadow-sm">
                                            <h3 className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold mb-4">Dërgohet në</h3>
                                            <p className="font-mono text-sm text-black/70 leading-relaxed">
                                                {form.firstName} {form.lastName}<br />
                                                {form.address}<br />
                                                {form.city}, {form.zip}<br />
                                                {form.country}
                                            </p>
                                            <p className="font-mono text-xs text-black/40 mt-3">{form.phone} · {form.email}</p>
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex justify-between items-center mt-8">
                                        <button onClick={goBack} className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black/50 hover:text-black transition-colors">
                                            <ArrowLeft size={16} strokeWidth={1.5} /> Informacioni
                                        </button>
                                        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={goNext} className="bg-black text-white px-8 py-4 font-['Anton'] text-base tracking-[0.15em] uppercase hover:bg-[#FF5F00] transition-colors flex items-center gap-3 shadow-lg" style={clipStyle}>
                                            Konfirmo Porosinë <ArrowRight size={18} strokeWidth={1.5} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* ========== STEP 3: Confirmation ========== */}
                            {currentStep === 3 && (
                                <motion.div key="step3" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
                                    <div className="bg-white border border-black/10 p-8 md:p-12 shadow-md text-center">
                                        {/* Success Icon */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                                            className="w-20 h-20 md:w-24 md:h-24 bg-[#FF5F00] text-white flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#FF5F00]/20"
                                            style={clipStyle}
                                        >
                                            <Check size={40} strokeWidth={2} />
                                        </motion.div>

                                        <h2 className="font-['Anton'] text-3xl md:text-5xl tracking-wide uppercase text-black mb-3">Porosia u Vendos!</h2>
                                        <div className="w-12 h-[2px] bg-[#FF5F00] mx-auto mb-6"></div>

                                        <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-black/50 mb-2">Numri i porosisë</p>
                                        <p className="font-['Anton'] text-2xl md:text-3xl tracking-wider text-[#FF5F00] mb-8">{orderNumber}</p>

                                        <p className="font-mono text-sm text-black/50 leading-relaxed max-w-md mx-auto mb-10">
                                            Faleminderit për porosinë tuaj, {form.firstName}! Do të merrni një konfirmim në <span className="text-black font-semibold">{form.email}</span>. Pagesa bëhet kur porosia të dorëzohet.
                                        </p>

                                        {/* Order Items Summary */}
                                        <div className="text-left border-t border-black/10 pt-8 mt-8">
                                            <h3 className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold mb-6">Produktet e Porositura</h3>
                                            <div className="flex flex-col gap-4">
                                                {cartItems.map(item => (
                                                    <div key={item.id} className="flex items-center gap-4 py-3 border-b border-black/5">
                                                        <div className="relative w-16 h-16 bg-white overflow-hidden flex-shrink-0 shadow-sm" style={clipStyle}>
                                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-['Anton'] text-base tracking-wide uppercase text-black truncate">{item.title}</h4>
                                                            <span className="font-mono text-[10px] tracking-widest uppercase text-black/40">Masa: {item.size} · Sasia: {item.quantity}</span>
                                                        </div>
                                                        <span className="font-mono text-sm font-semibold text-black">${item.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                                            <Link to="/">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="bg-black text-white px-8 py-4 font-['Anton'] text-base tracking-[0.15em] uppercase hover:bg-[#FF5F00] transition-colors duration-300 flex items-center gap-3 shadow-lg"
                                                >
                                                    Kthehu në Ballina <ArrowRight size={18} strokeWidth={1.5} />
                                                </motion.button>
                                            </Link>
                                            <Link to="/collection">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="border-2 border-black/15 text-black px-8 py-4 font-['Anton'] text-base tracking-[0.15em] uppercase hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3"
                                                >
                                                    Vazhdo Blerjet
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>

                    {/* ===== RIGHT: Order Summary Sidebar ===== */}
                    {currentStep < 3 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full lg:w-[380px] xl:w-[400px] flex-shrink-0 lg:sticky lg:top-28 self-start"
                        >
                            <div className="bg-white border border-black/10 p-8 shadow-md">
                                <h3 className="font-['Anton'] text-xl md:text-2xl tracking-wide uppercase text-black mb-6">Porosia Juaj</h3>

                                {/* Cart Items Mini List */}
                                <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-1">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="relative w-14 h-14 bg-white overflow-hidden flex-shrink-0 border border-black/8 shadow-sm" style={clipStyle}>
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-mono text-[10px] tracking-widest uppercase text-black truncate font-semibold">{item.title}</h4>
                                                <span className="font-mono text-[9px] tracking-widest uppercase text-black/40">x{item.quantity} · Masa {item.size}</span>
                                            </div>
                                            <span className="font-mono text-xs font-semibold text-black">${item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="w-full h-[2px] bg-black/8 mb-4"></div>

                                <div className="flex flex-col gap-3 mb-4">
                                    <div className="flex justify-between">
                                        <span className="font-mono text-xs tracking-widest uppercase text-black/50">Nëntotali</span>
                                        <span className="font-mono text-sm text-black font-semibold">${subtotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-mono text-xs tracking-widest uppercase text-black/50">Dërgesa</span>
                                        <span className="font-mono text-sm text-black font-semibold">{shipping === 0 ? 'FALAS' : `$${shipping}`}</span>
                                    </div>
                                </div>

                                <div className="w-full h-[2px] bg-black/8 mb-4"></div>

                                <div className="flex justify-between items-baseline">
                                    <span className="font-['Anton'] text-lg tracking-wider uppercase text-black">Totali</span>
                                    <span className="font-['Anton'] text-2xl md:text-3xl tracking-wider text-black">${total}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Checkout;
