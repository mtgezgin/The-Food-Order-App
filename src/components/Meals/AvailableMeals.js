import React, { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import { database } from "../../config/database";
import axios from "axios";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const { signal } = controller;
    try {
      const fetchMeals = async () => {
        const response = await axios.get(`${database}/meals.json`, {
          signal: signal,
        });
        const meals = response.data;
        const loadedMeals = [];
        for (const key in meals) {
          loadedMeals.push({
            id: key,
            ...meals[key],
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      };
      fetchMeals().catch((error) => {
        console.log("Error: ", error.message);
        setError("Error fetching meals");
        setIsLoading(false);
      });
    } catch (error) {
      console.log("Error: ", error.message);
      setError("Error fetching meals");
      setIsLoading(false);
    }
    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
