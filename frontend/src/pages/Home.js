import { useEffect, useState } from "react";
import RecipeDetails from '../components/RecipeDetails';

const Home = () => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/recipes');
                if (response.ok) {
                    const data = await response.json();
                    setRecipes(data);
                } else {
                    console.error('Failed to fetch recipes');
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div className="home">
            <div className="recipe-container">
                {recipes && recipes.map((recipe) => (
                    <RecipeDetails key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default Home;
