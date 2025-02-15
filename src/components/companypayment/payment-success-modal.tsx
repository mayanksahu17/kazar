import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PaymentSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PaymentSuccessModal({ isOpen, onClose }: PaymentSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Successful</DialogTitle>
          <DialogDescription>Your payment has been processed successfully.</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Button onClick={onClose} className="w-full bg-green-500 hover:bg-green-600">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

