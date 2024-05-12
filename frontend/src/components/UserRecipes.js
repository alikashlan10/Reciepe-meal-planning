import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';  // Ensure this import matches the correct package structure
import { useAuthContext } from "../hooks/useAuthContext";


// Utility function to decode JWT and extract userId
function getUserIdFromToken(token) {
    if (!token) {
        console.log("No token found");
        return null;
    }
    try {
        const decoded = jwtDecode(token);
        return decoded.userId;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
}

const postReview = async (rating, comment, recipeId, userId) => {
  try {
      const response = await fetch('http://localhost:4000/api/reviews', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              rating,
              comment,
              recipeId ,
              userId
          })
      });
      if (response.ok) {
          const data = await response.json();
          console.log('Review added successfully:', data);
          return data;
      } else {
          console.error('failed to add review');
          throw new Error('failed to add review');
      }
  } catch (error) {
      console.error('Error adding review:', error);
      throw error;
  }
};

const RecipeDetails = ({ recipe }) => {

  const [reviewBody, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const { user } = useAuthContext();
  const userId = user ? getUserIdFromToken(user.token) : null;

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setRating(event.target.value);
  };

  const navigate = useNavigate();

  const AddnewReview = () =>{
    postReview(rating, reviewBody, recipe._id, userId);

  }

  const openRecipeWindow = () => {
    const left = window.screenX + (window.innerWidth - 600) / 2;
    const top = window.screenY + (window.innerHeight - 400) / 2;
    const recipeWindow = window.open("", "RecipeWindow", `width=600,height=400,left=${left},top=${top},resizable=no,scrollbars=yes`);
    recipeWindow.document.write(`
      <html>
        <head>
          <title>${recipe.title} Steps</title>
          <style>
            body style="overflow: auto{
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

const openReviewsWindow = () => {
    const left = window.screenX + (window.innerWidth - 600) / 2;
    const top = window.screenY + (window.innerHeight - 400) / 2;
    const reviewsWindow = window.open("", "ReviewsWindow", `width=600,height=400,left=${left},top=${top},resizable=no,scrollbars=yes`);
    reviewsWindow.document.write(`
      <html>
        <head>
          <title>Reviews</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f7f7f7;
              padding: 20px;
            }
            h1 {
              color: #ff3333;
              text-align: center;
              margin-bottom: 20px;
            }
            h2 {
              color: #333;
              background-color: #f1f1f1;
              padding: 10px;
              margin-top: 30px;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              margin-bottom: 20px;
              border: 1px solid #ccc;
              padding: 10px;
              background-color: #fff;
            }
            input[type="text"] {
              width: 100%;
              padding: 10px;
              margin-bottom: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
            button {
              background-color: #ff3333;
              color: #fff;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
            button:hover {
              background-color: #d63030;
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
          <h1>Reviews</h1>
          <ul>
            ${recipe.reviews.map((review, index) => (
              `<li key=${index}>
                <h2>Rating: ${review.rating}</h2>
                <p>Comment: ${review.comment}</p>
                <p>Author: ${review.user.username}</p>
              </li>`
            )).join('')}
          </ul>
         
        </body>
      </html>
    `);
    reviewsWindow.document.close();
  };


  return (
    <div className="recipe" >
      <h2>{recipe.title}</h2>
      <h3 className="ingredients">Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3 className="stepsButton"  onClick={openRecipeWindow} style={{ cursor: "pointer" }}>Steps</h3>
      <h3 className="stepsButton"  onClick={openReviewsWindow} style={{ cursor: "pointer" }}>Reviews</h3>
      <h3 className="addReviewTitle"> Add your review</h3>
      <div class="row">
        <label for="rating">Rating :</label>
        <select id="rating" onChange={handleDropdownChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <input className= "reviewInput" id="reviewInput" type="text" placeholder="add your review" onChange={handleInputChange}></input>
     <button id="publishButton" onClick={() => AddnewReview()}>Publish</button>


    </div>
  );

  
};




export default RecipeDetails;
