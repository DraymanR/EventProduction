// store/modalStore.ts
import {create} from "zustand";

interface ModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

<<<<<<< HEAD
export default useModalStore;
=======
export default useModalStore;


>>>>>>> 2ebe7af3aec6debd6fbbf4f07105abe8a5f0d7dc
