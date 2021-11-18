import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActiveWeb3React } from 'hooks';
import { AppDispatch, AppState } from 'state';
import {
  addPopup,
  ApplicationModal,
  PopupContent,
  removePopup,
  setOpenModal,
  updateEthPrice,
  updateGlobalData,
  updateTopTokens,
  updateTokenPairs,
  updateSwapTokenPrice0,
  updateSwapTokenPrice1,
} from './actions';

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();

  return useSelector(
    (state: AppState) => state.application.blockNumber[chainId ?? -1],
  );
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector(
    (state: AppState) => state.application.openModal,
  );
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [
    dispatch,
    modal,
    open,
  ]);
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal]);
}

export function useCloseModals(): () => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setOpenModal(null)), [dispatch]);
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}

export function useToggleSettingsMenu(): () => void {
  return useToggleModal(ApplicationModal.SETTINGS);
}

export function useShowClaimPopup(): boolean {
  return useModalOpen(ApplicationModal.CLAIM_POPUP);
}

export function useToggleShowClaimPopup(): () => void {
  return useToggleModal(ApplicationModal.CLAIM_POPUP);
}

export function useToggleSelfClaimModal(): () => void {
  return useToggleModal(ApplicationModal.SELF_CLAIM);
}

// returns a function that allows adding a popup
export function useAddPopup(): (
  content: PopupContent,
  key?: string,
  removeAfterMs?: number | null,
) => void {
  const dispatch = useDispatch();

  return useCallback(
    (content: PopupContent, key?: string, removeAfterMs?: number | null) => {
      dispatch(addPopup({ content, key, removeAfterMs }));
    },
    [dispatch],
  );
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }));
    },
    [dispatch],
  );
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList);
  return useMemo(() => list.filter((item) => item.show), [list]);
}

export function useEthPrice(): {
  ethPrice: any;
  updateEthPrice: ({ price, oneDayPrice, ethPriceChange }: any) => void;
} {
  const ethPrice = useSelector((state: AppState) => state.application.ethPrice);
  const dispatch = useDispatch();
  const _updateETHPrice = useCallback(
    ({ price, oneDayPrice, ethPriceChange }) => {
      dispatch(updateEthPrice({ price, oneDayPrice, ethPriceChange }));
    },
    [dispatch],
  );
  return { ethPrice, updateEthPrice: _updateETHPrice };
}

export function useGlobalData(): {
  globalData: any;
  updateGlobalData: ({ data }: any) => void;
} {
  const globalData = useSelector(
    (state: AppState) => state.application.globalData,
  );
  const dispatch = useDispatch();
  const _updateGlobalData = useCallback(
    ({ data }) => {
      dispatch(updateGlobalData({ data }));
    },
    [dispatch],
  );
  return { globalData, updateGlobalData: _updateGlobalData };
}

export function useTopTokens(): {
  topTokens: any;
  updateTopTokens: ({ data }: any) => void;
} {
  const topTokens = useSelector(
    (state: AppState) => state.application.topTokens,
  );
  const dispatch = useDispatch();
  const _updateTopTokens = useCallback(
    ({ data }) => {
      dispatch(updateTopTokens({ data }));
    },
    [dispatch],
  );
  return { topTokens, updateTopTokens: _updateTopTokens };
}

export function useTokenPairs(): {
  tokenPairs: any;
  updateTokenPairs: ({ data }: any) => void;
} {
  const tokenPairs = useSelector(
    (state: AppState) => state.application.tokenPairs,
  );
  const dispatch = useDispatch();
  const _updateTokenPairs = useCallback(
    ({ data }) => {
      dispatch(updateTokenPairs({ data }));
    },
    [dispatch],
  );
  return { tokenPairs, updateTokenPairs: _updateTokenPairs };
}

export function useSwapTokenPrice0(): {
  swapTokenPrice0: any;
  updateSwapTokenPrice0: (data: any) => void;
} {
  const swapTokenPrice0 = useSelector(
    (state: AppState) => state.application.swapTokenPrice0,
  );
  const dispatch = useDispatch();
  const _updateSwapTokenPrice0 = useCallback(
    (data) => {
      dispatch(updateSwapTokenPrice0(data));
    },
    [dispatch],
  );
  return { swapTokenPrice0, updateSwapTokenPrice0: _updateSwapTokenPrice0 };
}

export function useSwapTokenPrice1(): {
  swapTokenPrice1: any;
  updateSwapTokenPrice1: (data: any) => void;
} {
  const swapTokenPrice1 = useSelector(
    (state: AppState) => state.application.swapTokenPrice1,
  );
  const dispatch = useDispatch();
  const _updateSwapTokenPrice1 = useCallback(
    (data) => {
      dispatch(updateSwapTokenPrice1(data));
    },
    [dispatch],
  );
  return { swapTokenPrice1, updateSwapTokenPrice1: _updateSwapTokenPrice1 };
}
