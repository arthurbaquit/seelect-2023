import React from "react";
import styles from "../../styles/AvailableMeals.module.scss";
import { MealItem } from "./MealItem";
import { Card } from "../UI/Card";
import { useMeals } from "../api/useMeals";

export const AvailableMeals = () => {
  const { meals } = useMeals();
  return (
    <div className={styles.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </div>
  );
};
