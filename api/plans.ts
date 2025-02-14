import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken } from "@/utilities/storage";

const API_BASE_URL = "https://sandbox.ignitecove.com/v1/plan";

const fetchPlans = async () => {
  const token = await getToken();
  if (!token) throw new Error("Unauthorized: No access token found");

  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }

  return response.json();
};

export const useGetPlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });
};

const updatePlan = async (planData: any) => {
  const token = await getToken();
  if (!token) throw new Error("Unauthorized: No access token found");

  const response = await fetch(API_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(planData),
  });

  if (!response.ok) {
    throw new Error("Failed to update plan");
  }

  return response.json();
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

const createPlan = async (planData: any) => {
  const token = await getToken();
  if (!token) throw new Error("Unauthorized: No access token found");

  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(planData),
  });

  if (!response.ok) {
    throw new Error("Failed to create plan");
  }

  return response.json();
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

const activatePlan = async (id: number) => {
  const token = await getToken();
  if (!token) throw new Error("Unauthorized: No access token found");

  const response = await fetch(`${API_BASE_URL}/activate/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to activate plan");
  }

  return response.json();
};

export const useActivatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activatePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] }); // Refresh plans after activation
    },
  });
};
