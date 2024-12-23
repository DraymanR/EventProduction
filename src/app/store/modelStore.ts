
// store/modalStore.ts
import {create} from "zustand";
import { ModalState } from "../types/user";

const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useModalStore;


