'use client';

import KeyboardApple from "@/public/assets/keyboard-apple.png";
import MeshChairFootrest from "@/public/assets/mesh-chair-with-footrest.png";
import MeshSladChair from "@/public/assets/mesh-slad-chair.png";
import Microwave from "@/public/assets/microwave.png";
import MinimalistDeskAdjustable from "@/public/assets/minimalist-desk-adjustable.png";
import ModernBlackDeskAdjustable from "@/public/assets/modern-black-desk-adjustable.png";
import ModernTreadmil from "@/public/assets/modern-treadmil.png";
import ModernWallnutDeskAdjustable from "@/public/assets/modern-wallnut-desk-adjustable.png";
import Monitor24Inch from "@/public/assets/monitor-24-inch.png";
import MonitorUltrawide from "@/public/assets/monitor-ultrawide.png";
import TrackpadApple from "@/public/assets/trackpad-apple.png";
import WallnutDeskRolling from "@/public/assets/wallnut-desk-rolling.png";
import {
  Check,
  X
} from 'lucide-react';
import { useMemo, useState } from 'react';

import Image from 'next/image';
import { ProductResponseType, ProductType } from './types/product.type';

const INVENTORY: ProductResponseType = {
  chairs: [
    { id: 'chair-basic', name: 'Chair Basic', price: 15, type: 'chair', icon: MeshSladChair },
    { id: 'chair-footrest', name: 'Ergo Chair', price: 35, type: 'chair', icon: MeshChairFootrest },
  ],
  desks: [
    { id: 'desk-wood', name: 'Modern Walnut Desk', price: 45, type: 'desk', icon: ModernWallnutDeskAdjustable },
    { id: 'desk-stand', name: 'Modern Black Desk', price: 40, type: 'desk', icon: ModernBlackDeskAdjustable },
    { id: 'desk-compact', name: 'Minimalis Desk', price: 25, type: 'desk', icon: MinimalistDeskAdjustable }
  ],
  accessories: [
    { id: 'acc-monitor-single', name: '24 Inch Monitor', price: 12, type: 'acc', icon: Monitor24Inch },
    { id: 'acc-monitor-dual', name: 'Ultra wide Monitor', price: 15, type: 'acc', icon: MonitorUltrawide },
    { id: 'acc-keyboard', name: 'Keyboard Magic Apple', price: 18, type: 'acc', icon: KeyboardApple },
    { id: 'acc-trackpad', name: 'Trackpad Magic Apple', price: 16, type: 'acc', icon: TrackpadApple }
  ],
  lifestyle: {
    coffee: [{ id: 'life-microwave', name: 'Microwave Machine', price: 125, icon: Microwave }],
    relax: [{ id: 'life-treadmil', name: 'Tradmil', price: 250, icon: ModernTreadmil }]
  }
};

const RoomPreview = ({ selectedDesk, selectedChair, selectedAccessories, selectedLifestyle }: { selectedDesk: ProductType; selectedChair: ProductType; selectedAccessories: ProductType[]; selectedLifestyle: Omit<ProductType, 'type'>[] }) => {
  const hasAcc = (id: string) => selectedAccessories.some(a => a.id === id);
  const hasLife = (id: string) => selectedLifestyle.some(l => l.id === id);

  const acc = (id: string) => selectedAccessories.find(item => item.id === id && hasAcc(id));
  const life = (id: string) => selectedLifestyle.find(item => item.id === id && hasLife(id));

  return (
    <div className="relative w-full h-[420px] flex justify-center items-end pb-8 overflow-visible">
      {/* Background Rug (Oval) */}
      <div className="absolute bottom-4 w-[120%] max-w-[800px] h-32 border-2 border-stone-300 rounded-[50%] bg-stone-50/50 -z-10 shadow-sm"></div>

      {/* Center Setup Container */}
      <div className="relative w-[620px] h-[460px] flex justify-center items-end">

        {/* ===== RIGHT SIDE: Microwave & Treadmill ===== */}
        {/* Microwave (right of desk, closer) */}
        <div className={`absolute -left-12 bottom-10 z-10 transition-all duration-500 ${hasLife('life-microwave') ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}>
          <div className="absolute -top-5 z-10 right-8">
            <Image
              src={life('life-microwave')?.icon ?? INVENTORY.lifestyle.coffee[0].icon}
              alt="Microwave"
              width={90}
              height={90}
              className="object-contain drop-shadow-md -rotate-1"
            />
          </div>
          <Image
            src={WallnutDeskRolling}
            alt="Wallnut Desk Rolling"
            width={150}
            height={200}
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* Treadmill (right of desk, further right) */}
        <div className={`absolute right-[-110px] bottom-8 z-10 transition-all duration-500 ${hasLife('life-treadmil') ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}>
          <Image
            src={life('life-treadmil')?.icon ?? INVENTORY.lifestyle.relax[0].icon}
            alt="Treadmill"
            width={250}
            height={110}
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* ===== DESK AREA ===== */}
        <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">

          {/* Items ON TOP of the desk surface */}
          <div className="relative flex items-end justify-center w-[400px] h-[100px] mb-0">

            {/* Monitor (center-top of desk) */}
            <div className={`absolute ${hasAcc('acc-monitor-single') ? '-top-43' : '-top-35'} z-10 left-[40%] -translate-x-1/2 transition-all duration-300 ${(hasAcc('acc-monitor-single') || hasAcc('acc-monitor-dual')) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              {hasAcc('acc-monitor-single') && !hasAcc('acc-monitor-dual') && acc('acc-monitor-single') && (
                <Image
                  src={acc('acc-monitor-single')!.icon}
                  alt={acc('acc-monitor-single')!.name}
                  width={200}
                  height={200}
                  className="object-contain drop-shadow-sm"
                />
              )}
              {hasAcc('acc-monitor-dual') && acc('acc-monitor-dual') && (
                <Image
                  src={acc('acc-monitor-dual')!.icon}
                  alt={acc('acc-monitor-dual')!.name}
                  width={200}
                  height={200}
                  className="object-contain drop-shadow-sm"
                />
              )}
            </div>

            {/* Keyboard (bottom-center of desk surface, in front of monitor) */}
            <div className={`absolute -top-14 z-10 left-1/2 -translate-x-1/2 transition-all duration-300 ${hasAcc('acc-keyboard') ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              {acc('acc-keyboard') && (
                <Image
                  src={acc('acc-keyboard')!.icon}
                  alt={acc('acc-keyboard')!.name}
                  width={110}
                  height={40}
                  className="object-contain drop-shadow-sm"
                />
              )}
            </div>

            {/* Trackpad (right of keyboard) */}
            <div className={`absolute -top-10 z-10 right-20 transition-all duration-300 ${hasAcc('acc-trackpad') ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              {acc('acc-trackpad') && (
                <Image
                  src={acc('acc-trackpad')!.icon}
                  alt={acc('acc-trackpad')!.name}
                  width={60}
                  height={40}
                  className="object-contain drop-shadow-sm"
                />
              )}
            </div>
          </div>

          {/* Desk Image */}
          <div className={`absolute ${selectedDesk.id === 'desk-stand' ? '-top-[100px]' : '-top-[70px]'}`}>
            <Image
              src={selectedDesk.icon}
              alt={selectedDesk.name}
              // width={500}
              // height={240}
              className="object-contain scale-95 drop-shadow-lg"
            />
          </div>
        </div>

        {/* ===== CHAIR (in front of desk) ===== */}
        <div className="absolute bottom-4 left-1/4 -translate-x-1/4 z-20 transition-all duration-500">
          <Image
            src={selectedChair.icon}
            alt={selectedChair.name}
            width={selectedChair.id === 'chair-basic' ? 180 : 230}
            height={120}
            className="object-contain drop-shadow-md"
          />
        </div>

      </div>
    </div>
  );
};

const CheckoutModal = ({ isOpen, onClose, desk, chair, accessories, lifestyle, total }: { isOpen: boolean; onClose: () => void; desk: ProductType; chair: ProductType; accessories: ProductType[]; lifestyle: Omit<ProductType, 'type'>[]; total: number; }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border-2 border-stone-800">

        <div className="p-6 text-center border-b-2 border-stone-100 relative bg-stone-50">
          <button onClick={onClose} className="absolute right-4 top-4 p-2 text-stone-500 hover:text-stone-800 rounded-full">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-stone-900">Order Summary</h2>
          <p className="text-stone-500 text-sm">Review your custom workspace</p>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-stone-100 dashed">
              <span className="font-semibold text-stone-800 flex items-center gap-2">
                <Image src={desk.icon} alt={desk.name} width={50} height={50} /> {desk.name} (Desk)
              </span>
              <span className="font-bold text-stone-800">${desk.price}/mo</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-stone-100 dashed">
              <span className="font-semibold text-stone-800 flex items-center gap-2">
                <Image src={chair.icon} alt={chair.name} width={50} height={50} /> {chair.name} (Chair)
              </span>
              <span className="font-bold text-stone-800">${chair.price}/mo</span>
            </div>

            {accessories.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Accessories</p>
                {accessories.map(acc => (
                  <div key={acc.id} className="flex justify-between items-center py-1">
                    <span className="text-stone-600 font-bold text-sm flex items-center gap-2">
                      <Image src={acc.icon} width={50} height={50} alt={acc.name} /> {acc.name}
                    </span>
                    <span className="text-stone-600 text-sm">${acc.price}/mo</span>
                  </div>
                ))}
              </div>
            )}

            {lifestyle.length > 0 && (
              <div className="pt-4 mt-2 border-t border-stone-100">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Lifestyle Add-ons</p>
                {lifestyle.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-1">
                    <span className="text-stone-600 font-bold text-sm flex items-center gap-2">
                      <Image src={item.icon} width={50} height={50} alt={item.name} /> {item.name}</span>
                    <span className="text-stone-600 text-sm">${item.price}/mo</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-stone-50 p-6 border-t-2 border-stone-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-stone-500 font-bold uppercase tracking-wider text-sm">Total Monthly</span>
            <span className="text-3xl font-black text-stone-900">${total}</span>
          </div>
          <button
            onClick={() => { alert('Order placed! Thanks for using monis.rent'); onClose(); }}
            className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            Confirm Order
            <Check size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'chairs' | 'desks'>('chairs');
  const [selectedDesk, setSelectedDesk] = useState(INVENTORY.desks[0]);
  const [selectedChair, setSelectedChair] = useState(INVENTORY.chairs[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<ProductType[]>([]);
  const [selectedLifestyle, setSelectedLifestyle] = useState<Omit<ProductType, 'type'>[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Total Calculation
  const total = useMemo(() => {
    return selectedDesk.price +
      selectedChair.price +
      selectedAccessories.reduce((sum, item) => sum + item.price, 0) +
      selectedLifestyle.reduce((sum, item) => sum + item.price, 0);
  }, [selectedDesk, selectedChair, selectedAccessories, selectedLifestyle]);

  // Toggle helpers
  const toggleItem = (item: ProductType, type: string) => {
    if (type === 'acc') {
      // Handle mutually exclusive monitors
      let newList = [...selectedAccessories];
      const isMonitor = item.id.includes('monitor');

      if (newList.find(a => a.id === item.id)) {
        newList = newList.filter(a => a.id !== item.id);
      } else {
        if (isMonitor) {
          newList = newList.filter(a => !a.id.includes('monitor')); // Remove other monitor
        }
        newList.push(item);
      }
      setSelectedAccessories(newList);
    } else if (type === 'life') {
      setSelectedLifestyle(prev =>
        prev.find(l => l.id === item.id)
          ? prev.filter(l => l.id !== item.id)
          : [...prev, item]
      );
    }
  };

  const isSelected = (id: string, type: string) => {
    if (type === 'desk') return selectedDesk.id === id;
    if (type === 'chair') return selectedChair.id === id;
    if (type === 'acc') return selectedAccessories.some(a => a.id === id);
    if (type === 'life') return selectedLifestyle.some(l => l.id === id);
    return false;
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-stone-200 flex flex-col">

      {/* Header matching wireframe */}
      <header className="pt-8 pb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-stone-800 tracking-tight">Design Your Workspace!</h1>
        <p className="text-stone-500 font-medium text-lg mt-2 flex items-center justify-center gap-2">
          <span className="w-6 h-0.5 bg-stone-300"></span>
          Create Your Perfect Setup!
          <span className="w-6 h-0.5 bg-stone-300"></span>
        </p>
      </header>

      {/* Main Stage (3 Columns: Tabs, Visual, Quick Actions) */}
      <main className="flex-1 w-full mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 mt-8">

        {/* LEFT PANEL: Tabs */}
        <div className="lg:col-span-3 bg-white border-2 border-stone-200 rounded-xl overflow-hidden shadow-sm self-start mt-12 z-20">
          {/* Tab Headers */}
          <div className="flex border-b-2 border-stone-200">
            {['chairs', 'desks'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'chairs' | 'desks')}
                className={`flex-1 py-3 text-sm font-bold capitalize transition-colors ${activeTab === tab ? 'bg-stone-800 text-white' : 'text-stone-500 hover:bg-stone-50'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div className="p-4 grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto">
            {INVENTORY[activeTab].map(item => (
              <button
                key={item.id}
                onClick={() => activeTab === 'desks' ? setSelectedDesk(item) : setSelectedChair(item)}
                className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${isSelected(item.id, activeTab === 'desks' ? 'desk' : 'chair') ? 'border-stone-800 bg-stone-100 shadow-inner' : 'border-dashed border-stone-300 hover:border-stone-400'}`}
              >
                {/* <item.icon size={32} className={`mb-2 stroke-1 ${isSelected(item.id, activeTab === 'desks' ? 'desk' : 'chair') ? 'text-stone-800' : 'text-stone-400'}`} /> */}
                <Image src={item.icon} alt={item.name} />
                <span className="text-xs font-semibold text-center leading-tight">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER PANEL: Visual Preview */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center z-10 w-full min-h-[450px]">
          <RoomPreview
            selectedDesk={selectedDesk}
            selectedChair={selectedChair}
            selectedAccessories={selectedAccessories}
            selectedLifestyle={selectedLifestyle}
          />
        </div>

        {/* RIGHT PANEL: Quick Adds */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-4 self-start mt-12 z-20">
          {INVENTORY.accessories.map(acc => {
            const selected = isSelected(acc.id, 'acc');
            return (
              <button
                key={acc.id}
                onClick={() => toggleItem(acc, 'acc')}
                className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all h-28 ${selected ? 'border-solid border-stone-800 bg-stone-100' : 'border-dashed border-stone-300 hover:border-stone-400 bg-white'}`}
              >
                {selected ? (
                  <Check size={24} className="text-stone-800 mb-2" />
                ) : (
                  // <acc.icon size={28} className="text-stone-400 mb-2 stroke-1" />
                  <Image src={acc.icon} alt={acc.name} />
                )}
                <span className={`text-sm font-bold ${selected ? 'text-stone-800' : 'text-stone-500'}`}>
                  {selected ? 'Added!' : `+ Add ${acc.name.split(' ')[1] || acc.name}!`}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      {/* Action Area (Ready to rent?) */}
      <div className="w-full max-w-md mx-auto text-center mt-[-20px] relative z-30 flex flex-col items-center">
        <div className="bg-white border-2 border-stone-800 rounded-t-xl px-8 py-2 font-black text-stone-800 tracking-wide uppercase shadow-sm">
          Ready to Rent?
        </div>
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="w-full py-4 bg-stone-900 text-white text-xl font-black uppercase tracking-widest rounded-xl hover:bg-stone-800 hover:-translate-y-1 transition-all shadow-[0_10px_0_0_rgba(28,25,23,1)] active:shadow-none active:translate-y-2 border-2 border-stone-900"
        >
          Rent Your Setup!
        </button>
      </div>

      {/* BOTTOM SECTION: Lifestyle Add-ons */}
      <div className="w-full mx-auto px-4 md:px-8 mt-16 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">

          <div className='col-span-1'></div>

          {/* Helper function for lifestyle columns */}
          {Object.entries(INVENTORY.lifestyle).map(([category, items]) => (
            <div key={category} className="border-t-2 border-stone-200 border-dashed pt-4 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4">
                <span className="font-bold border-2 border-stone-800 rounded-full px-4 py-1 text-sm bg-stone-50 capitalize">
                  {category.replace('Space', ' Space').replace('Zone', ' Zone')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {items.map(item => {
                  const selected = isSelected(item.id, 'life');
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item, 'life')}
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all h-24 ${selected ? 'border-solid border-stone-800 bg-stone-100' : 'border-dashed border-stone-300 hover:border-stone-400 bg-white'}`}
                    >
                      {/* <item.icon size={24} className={`mb-2 stroke-1 ${selected ? 'text-stone-800' : 'text-stone-400'}`} /> */}
                      <Image src={item.icon} alt={item.name} />
                      <span className={`text-xs font-semibold text-center leading-tight ${selected ? 'text-stone-800' : 'text-stone-500'}`}>
                        {selected ? 'Added' : `+ Add ${item.name}`}
                      </span>
                    </button>
                  );
                })}
                {/* Empty dashed placeholder if only 1 item to match sketch look */}
                {items.length === 1 && (
                  <div className="border-2 border-stone-200 border-dashed rounded-lg h-24 bg-stone-50/50"></div>
                )}
              </div>
            </div>
          ))}

          <div className='col-span-1'></div>

        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        desk={selectedDesk}
        chair={selectedChair}
        accessories={selectedAccessories}
        lifestyle={selectedLifestyle}
        total={total}
      />
    </div>
  );
}