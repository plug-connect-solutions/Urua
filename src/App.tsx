/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
  Link as LinkIcon, 
  Trash2, 
  Zap, 
  Users, 
  ShieldCheck, 
  ChartLine, 
  Database, 
  Globe, 
  Coins, 
  FileText, 
  CheckCircle2, 
  Download,
  Menu,
  X,
  Play,
  Activity,
  History,
  Building2,
  Leaf
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './lib/utils';

// --- Types ---
interface Hub {
  id: string;
  name: string;
  status: 'Active' | 'Planned';
  capacity: number;
  earnings: string;
  x: number;
  y: number;
}

interface Transaction {
  id: string;
  hash: string;
  amount: number;
  type: 'reward' | 'stake' | 'transfer';
  timestamp: Date;
}

// --- Data ---
const HUBS: Hub[] = [
  { id: 'mafikeng', name: 'Mafikeng Hub', status: 'Active', capacity: 300, earnings: 'R3.1M', x: 140, y: 160 },
  { id: 'johannesburg', name: 'Johannesburg Hub', status: 'Active', capacity: 250, earnings: 'R2.4M', x: 350, y: 210 },
  { id: 'pretoria', name: 'Pretoria Hub', status: 'Active', capacity: 180, earnings: 'R1.8M', x: 360, y: 160 },
  { id: 'rustenburg', name: 'Rustenburg Hub', status: 'Active', capacity: 200, earnings: 'R2.1M', x: 240, y: 170 },
  { id: 'soweto', name: 'Soweto Hub', status: 'Planned', capacity: 150, earnings: 'R1.2M', x: 320, y: 230 },
  { id: 'vaal', name: 'Vaal Hub', status: 'Planned', capacity: 120, earnings: 'R980K', x: 350, y: 290 },
];

const REVENUE_DATA = [
  { name: 'Y1', value: 8.2 },
  { name: 'Y2', value: 24 },
  { name: 'Y3', value: 68 },
  { name: 'Y4', value: 142 },
  { name: 'Y5', value: 255 },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-[#0A0C0E]/90 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center gap-1 group">
          <span className="text-2xl font-black tracking-tighter text-white group-hover:text-[#C5A059] transition-colors">URUA</span>
          <span className="text-[#C5A059] text-2xl font-bold">∞</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Technology', 'Blockchain', 'Impact', 'Network', 'Investor'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-stone-300 hover:text-[#C5A059] transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-[#C5A059] text-[#0A0C0E] px-5 py-2 rounded-full text-sm font-bold hover:bg-[#E6C87D] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#C5A059]/20">
            Access Pack
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#0A0C0E] border-b border-white/5 p-6 flex flex-col gap-4"
          >
            {['Technology', 'Blockchain', 'Impact', 'Network', 'Investor'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-[#C5A059] text-[#0A0C0E] px-5 py-3 rounded-xl font-bold mt-2">
              Access Pack
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BlockchainDashboard = () => {
  const [tvl, setTvl] = useState(12450000);
  const [wallets, setWallets] = useState(8342);
  const [price, setPrice] = useState(2.45);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTvl(prev => prev + Math.floor(Math.random() * 5000));
      setWallets(prev => prev + (Math.random() > 0.8 ? 1 : 0));
      setPrice(prev => Number((prev + (Math.random() - 0.5) * 0.02).toFixed(2)));
      
      const newTx: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        hash: '0x' + Math.random().toString(36).substr(2, 8),
        amount: Math.floor(Math.random() * 5000),
        type: Math.random() > 0.6 ? 'reward' : (Math.random() > 0.3 ? 'stake' : 'transfer'),
        timestamp: new Date()
      };
      setTransactions(prev => [newTx, ...prev].slice(0, 6));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111316] border border-[#C5A059]/20 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#C5A059]/10 rounded-xl">
            <LinkIcon className="text-[#C5A059]" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">ICBRC Mainnet</h3>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Base L2 Anchor</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#C5A059]/10 rounded-full px-3 py-1.5 border border-[#C5A059]/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wide">Live • 1,247 Nodes</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Value Locked', value: `R${tvl.toLocaleString()}` },
          { label: 'Active Wallets', value: wallets.toLocaleString() },
          { label: 'ICBRC Token Price', value: `R${price.toFixed(2)}` },
          { label: '24h Transactions', value: '42,912' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1A1D23] p-4 rounded-2xl border border-white/5">
            <p className="text-[10px] font-bold text-stone-500 uppercase mb-1">{stat.label}</p>
            <p className="text-lg md:text-xl font-black text-[#C5A059] tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-stone-400 uppercase flex items-center gap-2">
          <Activity size={14} className="text-[#C5A059]" />
          Recent Network Activity
        </h4>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {transactions.map((tx) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-[#1A1D23]/50 rounded-xl border border-white/5 group hover:border-[#C5A059]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                   <div className={cn(
                     "p-1.5 rounded-lg",
                     tx.type === 'reward' ? "bg-green-500/10 text-green-500" :
                     tx.type === 'stake' ? "bg-blue-500/10 text-blue-500" : "bg-stone-500/10 text-stone-400"
                   )}>
                     {tx.type === 'reward' ? <Zap size={14} /> : tx.type === 'stake' ? <ShieldCheck size={14} /> : <History size={14} />}
                   </div>
                   <div>
                     <p className="text-[10px] font-mono text-[#C5A059]">{tx.hash}</p>
                     <p className="text-[9px] text-stone-500 uppercase tracking-wider">{tx.type} settled</p>
                   </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-stone-200">R{tx.amount.toLocaleString()}</p>
                  <p className="text-[8px] text-stone-500">just now</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const CascadeFlow = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { icon: <Coins />, title: 'Incentives', desc: 'ICBRC tokens minted instantly' },
    { icon: <ChartLine />, title: 'Analytics', desc: 'Municipal dashboards updated' },
    { icon: <CheckCircle2 />, title: 'Compliance', desc: 'EPR certificates generated' },
    { icon: <Leaf />, title: 'Impact', desc: 'CO₂ avoidance logged' },
    { icon: <Database />, title: 'Audit', desc: 'Anchored to Base L2' },
    { icon: <Users />, title: 'Identity', desc: 'Financial history extended' },
  ];

  const handleSimulate = () => {
    let step = 0;
    const interval = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step > steps.length) {
        clearInterval(interval);
        setTimeout(() => setActiveStep(null), 2000);
      }
    }, 400);
  };

  return (
    <div className="bg-[#FCF7ED] rounded-[2.5rem] p-8 md:p-12 border border-[#C5A059]/20 shadow-xl overflow-hidden relative">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h3 className="text-3xl font-black text-[#0A2E24] tracking-tight mb-4">One Event. Six Outcomes.</h3>
        <p className="text-[#1A4D3E] font-medium leading-relaxed">
          When a kilogram of waste is recovered, a cascade of financial and administrative triggers fires simultaneously. No human intervention. Pure settlement.
        </p>
        <button 
          onClick={handleSimulate}
          className="mt-8 bg-[#0A2E24] text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-[#0A2E24]/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <Play size={18} fill="white" />
          Simulate Recovery Event
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: activeStep === i ? 1.05 : 1,
              backgroundColor: activeStep === i ? '#0A2E24' : '#FFFFFF',
              color: activeStep === i ? '#FFFFFF' : '#1A4D3E'
            }}
            className="p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4 transition-colors"
          >
            <div className={cn(
              "p-2.5 rounded-xl transition-colors",
              activeStep === i ? "bg-[#C5A059] text-[#0A2E24]" : "bg-[#FCF7ED] text-[#C5A059]"
            )}>
              {step.icon}
            </div>
            <div>
              <p className="font-bold tracking-tight">{step.title}</p>
              <p className={cn("text-[11px] font-medium", activeStep === i ? "text-white/60" : "text-stone-500")}>
                {step.desc}
              </p>
            </div>
            {activeStep === i && (
              <motion.div 
                layoutId="pulse"
                className="ml-auto w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_10px_#C5A059]"
              />
            )}
          </motion.div>
        ))}
      </div>
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mt-10">
        Settlement time: 5.2 seconds • Verifiable • Immutable
      </p>
    </div>
  );
};

const NetworkMap = () => {
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);

  return (
    <div className="relative bg-[#111316] rounded-3xl p-8 border border-white/5 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between mb-10 gap-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Expansion Roadmap</h3>
          <p className="text-stone-400 text-sm max-w-md">
            Our physical node network is expanding rapidly across South Africa's high-impact municipal wards.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest bg-[#0A0C0E] p-3 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]" />
            <span className="text-[#C5A059]">Active Nodes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-stone-700" />
            <span className="text-stone-500">Planned Nodes</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[4/3] bg-[#0A0C0E] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
        {/* Simple SA Path */}
        <svg viewBox="0 0 600 500" className="w-full h-full max-w-[500px] opacity-20">
          <path 
            d="M200,100 L250,80 L350,90 L420,70 L480,100 L510,140 L490,200 L530,280 L500,350 L420,410 L320,430 L220,410 L150,370 L110,300 L100,200 Z" 
            fill="none" 
            stroke="#C5A059" 
            strokeWidth="2" 
          />
        </svg>

        {/* Hubs */}
        <div className="absolute inset-0">
          {HUBS.map((hub) => (
            <motion.div
              key={hub.id}
              className="absolute cursor-pointer"
              style={{ left: `${(hub.x / 600) * 100}%`, top: `${(hub.y / 500) * 100}%` }}
              onMouseEnter={() => setSelectedHub(hub)}
              onMouseLeave={() => setSelectedHub(null)}
              whileHover={{ scale: 1.2 }}
            >
              <div className={cn(
                "w-4 h-4 rounded-full border-2 border-[#0A0C0E] transition-all duration-300",
                hub.status === 'Active' ? "bg-[#C5A059] shadow-[0_0_15px_#C5A059]" : "bg-stone-700"
              )} />
              {hub.status === 'Active' && (
                <div className="absolute inset-0 animate-ping opacity-40 bg-[#C5A059] rounded-full" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {selectedHub && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-6 right-6 p-4 bg-[#1A1D23] border border-[#C5A059]/40 rounded-2xl backdrop-blur-md shadow-2xl z-10"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white">{selectedHub.name}</h4>
                  <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-[0.2em]">{selectedHub.status} Expansion Node</p>
                </div>
                <div className="text-right">
                  <p className="text-stone-400 text-[10px]">Earnings Dist.</p>
                  <p className="text-[#C5A059] font-black">{selectedHub.earnings}</p>
                </div>
              </div>
              <div className="mt-3 h-1 bg-stone-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedHub.capacity / 300) * 100}%` }}
                  className="h-full bg-[#C5A059]"
                />
              </div>
              <p className="text-[9px] text-stone-500 mt-2 uppercase font-bold tracking-widest">Efficiency: 92% • Capacity: {selectedHub.capacity}T/day</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Network Nodes', val: '12' },
          { label: 'Provinces', val: '4' },
          { label: 'Municipalities', val: '7' },
          { label: 'Households Served', val: '45k+' },
        ].map((item, i) => (
          <div key={i} className="text-center md:text-left">
            <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">{item.label}</p>
            <p className="text-xl font-black text-white">{item.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page ---

export default function App() {
  const [investorModalOpen, setInvestorModalOpen] = useState(false);

  return (
    <div className="bg-[#0A0C0E] min-h-screen text-white selection:bg-[#C5A059] selection:text-[#0A0C0E]">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0F2B1A_0%,#0A0C0E_60%)] -z-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-full px-4 py-1.5 mb-8"
          >
            <ShieldCheck size={14} className="text-[#C5A059]" />
            <span className="text-[11px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Next-Gen Settlement Layer</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-black leading-[1.1] md:leading-[1.05] tracking-tighter mb-8"
          >
            Recover Waste.<br />
            <span className="bg-gradient-to-r from-[#C5A059] to-[#E6C87D] bg-clip-text text-transparent">Settle the Economy.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-stone-400 leading-relaxed font-medium mb-12"
          >
            Every kilogram recovered is a financial transaction, a compliance certificate, and an immutable record. 
            URUA is the settlement layer for Africa's circular economy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => setInvestorModalOpen(true)}
              className="w-full sm:w-auto bg-[#C5A059] text-[#0A0C0E] px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-[#C5A059]/30"
            >
              Access Pack →
            </button>
            <a 
              href="#technology"
              className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/10 font-bold hover:bg-white/5 transition-all"
            >
              View System Architecture
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto"
          >
            {[
              { label: 'Tons Diverted', val: '450k+', icon: <Trash2 size={16} /> },
              { label: 'Energy Gen', val: '82MW', icon: <Zap size={16} /> },
              { label: 'Carbon Avoided', val: '250k t', icon: <Leaf size={16} /> },
              { label: 'Com. Earnings', val: 'R25M+', icon: <Users size={16} /> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-[#C5A059] mb-3 opacity-60">{stat.icon}</div>
                <p className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">{stat.val}</p>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The System Section */}
      <section id="technology" className="py-24 bg-white text-[#0A2E24]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">One Network.<br />Four Integrated Layers.</h2>
              <div className="h-1.5 w-20 bg-[#C5A059] rounded-full" />
            </div>
            <p className="text-[#1A4D3E] font-medium max-w-sm">
              We didn’t add blockchain to recycling. We built recycling on top of a financial settlement network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: <Building2 />, title: 'Physical Layer', desc: 'ICBRC nodes, sorting, compactors, and standardized infrastructure.' },
              { icon: <Database />, title: 'Digital Layer', desc: 'Real-time dashboards, identity registry, and municipal compliance.' },
              { icon: <LinkIcon />, title: 'Settlement Layer', desc: 'ICBRC token engine, oracle validation, and cross-chain anchoring.' },
              { icon: <Users />, title: 'Economic Layer', desc: 'Instant pay, financial identity, and community franchise models.' },
            ].map((layer, i) => (
              <div key={i} className="bg-stone-50 border border-stone-200 rounded-2xl p-8 hover:shadow-xl transition-all group">
                <div className="text-[#C5A059] mb-6 p-3 bg-white w-fit rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {layer.icon}
                </div>
                <h3 className="text-xl font-black mb-3">{layer.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>

          <CascadeFlow />
        </div>
      </section>

      {/* Blockchain Dashboard Section */}
      <section id="blockchain" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-xl px-4 py-2">
                <p className="text-xs font-black text-[#C5A059] uppercase tracking-widest">Protocol Infrastructure</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">The Data Engine of the <span className="text-[#C5A059]">Circular Economy</span></h2>
              <p className="text-stone-400 text-lg leading-relaxed">
                Our blockchain infrastructure handles every micro-transaction with sub-second finality. 
                This transparency drives institutional trust, allowing municipalities to audit waste flows in real-time.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Immutable Recovery Logs',
                  'FICA/KYC Identity Vault',
                  'EPR Smart Contracts',
                  'Cross-Chain Interop (Base)',
                  'Real-time API Settlement',
                  'POPIA Compliant Sovereignty'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#C5A059]" />
                    <span className="text-sm font-bold text-stone-200">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button className="flex items-center gap-2 text-[#C5A059] font-black uppercase tracking-widest text-xs group">
                  Explorer Mainnet Repository
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <BlockchainDashboard />
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section id="network" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <NetworkMap />
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-[#0A2E24] tracking-tight">Scale From 1 Node To A National <span className="text-[#C5A059]">Settlement Grid.</span></h2>
              <p className="text-[#1A4D3E] text-lg leading-relaxed font-medium">
                Our hub-and-spoke infrastructure model is designed for capital-efficient scaling. 
                With nodes already active in Mafikeng, we have proven the unit economics: 
              </p>

              <div className="space-y-4">
                {[
                  { label: 'Mafikeng Node CAPEX', val: 'R1.26M' },
                  { label: 'Annual Net Profit (Per Node)', val: 'R4.28M' },
                  { label: 'Payback Period', val: '4-6 Months' },
                  { label: 'Franchise Fee', val: 'R150k Setup' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl border border-stone-200 shadow-sm">
                    <span className="font-bold text-[#0A2E24]">{item.label}</span>
                    <span className="font-black text-[#C5A059]">{item.val}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#0A2E24] p-8 rounded-3xl text-white">
                <p className="text-sm font-bold text-[#C5A059] uppercase tracking-widest mb-4">Expansion Goal</p>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-4xl font-black">35 Nodes</p>
                    <p className="text-xs font-medium text-stone-400">Target by 2027</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-[#C5A059]">R255M</p>
                    <p className="text-xs font-medium text-stone-400">Annual Revenue Projection</p>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C5A059] w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investor/Due Diligence */}
      <section id="investor" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Invest in the Settlement of a Circular Future</h2>
            <p className="text-stone-400 font-medium">
              We are moving from a capital-intensive pilot phase to a scale-out execution. 
              The window for early institutional participation is closing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-[#111316] p-8 rounded-3xl border border-white/5">
              <ChartLine className="text-[#C5A059] mb-4" />
              <h3 className="text-2xl font-black mb-4">TAM R18B+</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                The South African waste recovery market is massive, yet only 10% is currently valorized. 
                URUA captures the 90% white space using tech & physical moats.
              </p>
            </div>
            <div className="bg-[#111316] p-8 rounded-3xl border border-white/5">
              <Building2 className="text-[#C5A059] mb-4" />
              <h3 className="text-2xl font-black mb-4">Municipal Moat</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Direct integration with municipal SLAs and EPR compliance mandates creates recurring 
                revenue before we even apply our technology premiums.
              </p>
            </div>
            <div className="bg-[#111316] p-8 rounded-3xl border border-white/5">
              <ShieldCheck className="text-[#C5A059] mb-4" />
              <h3 className="text-2xl font-black mb-4">First-Mover</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Zero competitors exist with our integrated physical+blockchain payload. 
                We are building the regional standard for circular settlement.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0F2B1A] to-[#0A0C0E] border border-[#C5A059]/30 rounded-[3rem] p-8 md:p-16 flex flex-col items-center text-center">
            <h3 className="text-3xl md:text-5xl font-black leading-tight mb-8">
              Access The Full Investor Pack &<br />
              <span className="text-[#C5A059]">Due Diligence Repository</span>
            </h3>
            <p className="max-w-2xl text-stone-400 mb-12 font-medium">
              Get detailed node financials, our technical whitepaper on ICBRC tokenomics, 
              and our 2025-2027 expansion roadmap. Verified institutional leads only.
            </p>
            <button 
              onClick={() => setInvestorModalOpen(true)}
              className="bg-[#C5A059] text-[#0A0C0E] px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-[#C5A059]/40 flex items-center gap-3"
            >
              <Download size={20} />
              Request Full Pack
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#0A0C0E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-1 mb-6">
                <span className="text-3xl font-black tracking-tighter text-white">URUA</span>
                <span className="text-[#C5A059] text-3xl font-bold">∞</span>
              </div>
              <p className="text-stone-500 max-w-sm leading-relaxed font-medium">
                Transforming waste into power, profit, and community progress through 
                physical infrastructure and blockchain settlement.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Infrastructure</h4>
              <nav className="flex flex-col gap-4 text-sm text-stone-500">
                <a href="#" className="hover:text-[#C5A059]">Technology Layer</a>
                <a href="#" className="hover:text-[#C5A059]">Node Network</a>
                <a href="#" className="hover:text-[#C5A059]">Compliance Vault</a>
                <a href="#" className="hover:text-[#C5A059]">ICBRC Mainnet</a>
              </nav>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Partners</h4>
              <nav className="flex flex-col gap-4 text-sm text-stone-500">
                <a href="#" className="hover:text-[#C5A059]">Municipalities</a>
                <a href="#" className="hover:text-[#C5A059]">Franchisees</a>
                <a href="#" className="hover:text-[#C5A059]">Investors</a>
                <a href="#" className="hover:text-[#C5A059]">Contact Engineering</a>
              </nav>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
            <p className="text-xs text-stone-600 font-medium">© 2026 URUA EXPOSURE. All rights reserved.</p>
            <div className="flex gap-6 text-stone-600 text-[10px] font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Audit Logs</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Investor Modal */}
      <AnimatePresence>
        {investorModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#0A0C0E]/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111316] w-full max-w-xl p-8 md:p-12 rounded-[2.5rem] border border-[#C5A059]/40 shadow-2xl relative"
            >
              <button 
                onClick={() => setInvestorModalOpen(false)}
                className="absolute top-6 right-6 text-stone-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-black mb-4">Request Access</h2>
              <p className="text-stone-400 mb-8 font-medium">
                Please provide your credentials to access our institutional-grade due diligence repository.
              </p>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setInvestorModalOpen(false); alert('Access request submitted. Our team will verify your credentials.'); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Full Name</label>
                  <input type="text" className="w-full bg-[#0A0C0E] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C5A059] transition-colors" placeholder="e.g. Elena Rodriguez" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Institutional Email</label>
                  <input type="email" className="w-full bg-[#0A0C0E] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C5A059] transition-colors" placeholder="name@fund.com" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Investment Focus</label>
                  <select className="w-full bg-[#0A0C0E] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C5A059] transition-colors appearance-none">
                    <option>Venture Capital / Growth</option>
                    <option>Infrastructure / Project Finance</option>
                    <option>Development Finance (DFI)</option>
                    <option>Family Office</option>
                  </select>
                </div>
                <button className="w-full bg-[#C5A059] text-[#0A0C0E] p-5 rounded-xl font-black text-lg hover:bg-[#E6C87D] transition-all">
                  Submit Access Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
