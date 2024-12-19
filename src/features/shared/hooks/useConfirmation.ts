import { useState } from 'react';

export function useConfirmation() {
  const [isConfirming, setIsConfirming] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const confirm = (action: () => void) => {
    setIsConfirming(true);
    setPendingAction(() => action);
  };

  const handleConfirm = () => {
    if (pendingAction) {
      pendingAction();
    }
    setIsConfirming(false);
    setPendingAction(null);
  };

  const handleCancel = () => {
    setIsConfirming(false);
    setPendingAction(null);
  };

  return {
    isConfirming,
    confirm,
    handleConfirm,
    handleCancel,
  };
}