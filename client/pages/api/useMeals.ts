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
  //   const addAtivos = useCallback(
  //     async (ativo: Ativo) => {
  //       if (ativos.find((a) => a.nome === ativo.nome)) {
  //         return;
  //       }
  //       try {
  //         const response = await API.post("save", ativo);
  //         return response.data;
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     },
  //     [ativos]
  //   );

  //   const removeAtivos = useCallback(
  //     async (ativo: Ativo) => {
  //       try {
  //         const response = await API.delete(`/delete/${ativo.id}`);
  //         return response.data;
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     },

  //     [ativos]
  //   );

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { meals, fetch };
};

// export type AssetTypes =
//   | "NationalStocks"
//   | "ForeignStocks"
//   | "FIIs"
//   | "REITs"
//   | "Cryptos"
//   | "FixedIncome";
