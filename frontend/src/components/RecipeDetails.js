// RecipeDetails.js
import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeDetails = ({ recipe }) => {
  const navigate = useNavigate();

  const handleAuthorClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="recipe">
      <h2>{recipe.title}</h2>
      <p>
        Author:{" "}
        <span
          className="author"
          onClick={() => handleAuthorClick(recipe.user.username)}
          style={{ cursor: "pointer" }}
        >
          {recipe.user.username}
        </span>
      </p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetails;
