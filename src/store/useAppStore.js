import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      profiles: [],
      activeProfileId: null,
      records: [],

      // Acciones de Perfiles
      addProfile: (profile) => set((state) => ({
        profiles: [...state.profiles, { ...profile, id: Date.now().toString() }],
        activeProfileId: state.activeProfileId === null ? Date.now().toString() : state.activeProfileId
      })),
      updateProfile: (id, updatedData) => set((state) => ({
        profiles: state.profiles.map(p => p.id === id ? { ...p, ...updatedData } : p)
      })),
      deleteProfile: (id) => set((state) => {
        const newProfiles = state.profiles.filter(p => p.id !== id);
        return {
          profiles: newProfiles,
          records: state.records.filter(r => r.profileId !== id),
          activeProfileId: state.activeProfileId === id ? (newProfiles.length > 0 ? newProfiles[0].id : null) : state.activeProfileId
        }
      }),
      setActiveProfile: (id) => set({ activeProfileId: id }),

      // Acciones de Registros
      addRecord: (record) => set((state) => ({
        records: [{ ...record, id: Date.now().toString(), profileId: state.activeProfileId }, ...state.records]
      })),
      deleteRecord: (id) => set((state) => ({
        records: state.records.filter(r => r.id !== id)
      })),
    }),
    {
      name: 'bp-app-storage', // Nombre en LocalStorage
    }
  )
)
