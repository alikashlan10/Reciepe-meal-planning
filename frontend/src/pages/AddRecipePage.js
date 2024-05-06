import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function AddRecipePage() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState(['']);
    const {user} = useAuthContext()

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const recipeData = {
            title,
            ingredients,
            steps,
            // Assume user ID and other fields are managed server-side or through context
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
            if (response.status==404) {
                
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