import { useEffect, useState } from "react";
import RecipeDetails from '../components/RecipeDetails';
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
    const [recipes, setRecipes] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/recipes', {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                });
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

        if (user) {
            fetchRecipes();
        }
    }, [user]);

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
