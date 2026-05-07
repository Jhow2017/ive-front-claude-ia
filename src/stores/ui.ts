"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
    sidebarCollapsed: boolean;
    mobileSidebarOpen: boolean;
    donationOpen: boolean;
    setSidebarCollapsed: (v: boolean) => void;
    setMobileSidebarOpen: (v: boolean) => void;
    setDonationOpen: (v: boolean) => void;
}

export const useUI = create<UIState>()(
    persist(
        (set) => ({
            sidebarCollapsed: false,
            mobileSidebarOpen: false,
            donationOpen: false,
            setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
            setMobileSidebarOpen: (v) => set({ mobileSidebarOpen: v }),
            setDonationOpen: (v) => set({ donationOpen: v }),
        }),
        { name: "ive-ui", partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed }) }
    )
);
