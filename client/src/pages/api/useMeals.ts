import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8080/product",
});
type MealProduct = {
  id: string;
  name: string;
  price: number;
  status: string;
  description: string;
};

export const useMeals = () => {
  const [meals, setMeals] = useState<MealProduct[]>([]);
  const fetch = useCallback(async () => {
    try {
      console.log("aqui");

      const response = await API.get("/all");
      console.log(response);
      setMeals(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { meals, fetch };
};
