import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "./ingredient.entity";
import { Recipe } from "./recipe.entity";

@Entity()
export class RecipeIngredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    recipeId : number;
    
    @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
    recipe: Recipe;
    
    @Column({ nullable: false})
    ingredientId : number;
    
    @ManyToOne(() => Ingredient, ingredient => ingredient.recipesIngridients)
    ingredient: Ingredient;
    
}