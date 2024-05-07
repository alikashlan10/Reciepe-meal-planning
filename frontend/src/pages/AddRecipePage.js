import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { jwtDecode } from 'jwt-decode';  // Ensure this import matches the correct package structure

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

function AddRecipePage() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState(['']);
    const { user } = useAuthContext();  // Assuming 'user' object includes 'token'
    
    // Decode token to get userId
    const userId = user ? getUserIdFromToken(user.token) : null;

    // Handlers for form fields
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients);
    };

    const handleStepChange = (index, event) => {
        const newSteps = [...steps];
        newSteps[index] = event.target.value;
        setSteps(newSteps);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const addStep = () => {
        setSteps([...steps, '']);
    };

    // Form submission handler
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userId) {
            alert("You must be logged in to add a recipe.");
            return;
        }

        const recipeData = {
            title,
            ingredients,
            steps,
            userId  // include userId in the recipe data
        };

        try {
            const response = await fetch('http://localhost:4000/api/recipes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) {
                throw new Error('Failed to add recipe');
            }

            alert('Recipe added successfully!');
            setTitle('');
            setIngredients(['']);
            setSteps(['']);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="add-recipe-container">
            <h2>Add a Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={handleTitleChange} required />
                </div>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <label htmlFor={`ingredient-${index}`}>Ingredient {index + 1}:</label>
                        <input
                            type="text"
                            id={`ingredient-${index}`}
                            value={ingredient}
                            onChange={(event) => handleIngredientChange(index, event)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addIngredient}>Add Another Ingredient</button>
                {steps.map((step, index) => (
                    <div key={index}>
                        <label htmlFor={`step-${index}`}>Step {index + 1}:</label>
                        <input
                            type="text"
                            id={`step-${index}`}
                            value={step}
                            onChange={(event) => handleStepChange(index, event)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addStep}>Add Another Step</button>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
}

export default AddRecipePage;
