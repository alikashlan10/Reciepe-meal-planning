import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeDetails = ({ recipe }) => {
  const navigate = useNavigate();

  const handleAuthorClick = (username) => {
    navigate(`/profile/${username}`);
  };

  const openRecipeWindow = () => {
    const left = window.screenX + (window.innerWidth - 600) / 2;
    const top = window.screenY + (window.innerHeight - 400) / 2;
    const recipeWindow = window.open("", "RecipeWindow", `width=600,height=400,left=${left},top=${top},resizable=no,scrollbars=yes`);
    recipeWindow.document.write(`
      <html>
        <head>
          <title>${recipe.title} Steps</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #fff;
              padding: 20px;
              overflow: hidden;
            }
            h1 {
              color: #ff3333;
            }
            h2 {
              color: #000000;
              background-color:#f1f1f1;
            }
            ul, ol {
              margin-left: 20px;
            }
            li {
              margin-bottom: 5px;
            }
          </style>
          <script>
            // Disable dragging of the window
            window.addEventListener('mousedown', function (event) {
              event.preventDefault();
            });
          </script>
        </head>
        <body>
          <h1>${recipe.title} Steps</h1>
          <h2>Ingredients:</h2>
          <ul>
            ${recipe.ingredients.map((ingredient, index) => (
              `<li key=${index}>${ingredient}</li>`
            )).join('')}
          </ul>
          <h2>Steps:</h2>
          <ol>
            ${recipe.steps.map((step, index) => (
              `<li key=${index}>${step}</li>`
            )).join('')}
          </ol>
        </body>
      </html>
    `);
    recipeWindow.document.close();
  };
  

  return (
    <div className="recipe" >
      <h2>{recipe.title}</h2>
      <h3 className="authorTile">
        Author  : {" "}
        <span
          className="author"
          onClick={() => handleAuthorClick(recipe.user.username)}
          style={{ cursor: "pointer" }}
        >
          {recipe.user.username}
        </span>
      </h3>
      <h3 className="ingredients">Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3 className="stepsButton"  onClick={openRecipeWindow} style={{ cursor: "pointer" }}>Steps</h3>
      <h3 className="stepsButton"  onClick={openRecipeWindow} style={{ cursor: "pointer" }}>Reviews</h3>
    </div>
  );
};

export default RecipeDetails;
