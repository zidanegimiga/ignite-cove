export interface PlanDetail {
    id: number;
    paymentMethod: string;
    description: string;
    price: number;
    currency: string;
  }
  
  export interface Plan {
    id: number;
    name: string;
    slots: number;
    active: boolean;
    planDetails: PlanDetail[];
  }
  
  export interface PlanSelectionProps {
    handleForward: () => void;
    planDetails?: Plan[];
    error?: any;
    isLoading: boolean;
  }
  