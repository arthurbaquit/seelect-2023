import classes from "../../styles/MealsSummary.module.scss";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Comida deliciosa diretamente para a sua casa!</h2>
      <p>
        Escolha sua refeição favorita de nossa ampla seleção de refeições e
        desfrute de um delicioso almoço ou jantar em casa.
      </p>
      <p>
        Todas as nossas refeições são cozinhadas com ingredientes de alta
        qualidade, no momento certo e, claro, por chefs experientes!
      </p>
    </section>
  );
};

export default MealsSummary;
