import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../entity/recipe.entity';
import { hasAllergenResponse } from '../dtos/dtos';

@Injectable()
export class PizzasService {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipeRepository: Repository<Recipe>
    ){}

    async getRecipes(): Promise<Recipe[]>{  
        return await this.recipeRepository.find()
    } 

    async getPizzaData():  Promise<Recipe>{
        return await this.recipeRepository.createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
        .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient')
        .leftJoinAndSelect('ingredient.foodType', 'foodType')
        .getOne()
    }

    async hasAllergen(allergens: string[], recipe: string) :  Promise<hasAllergenResponse>{ //HACER LOGICA PARA VER SI TIENE ALERGENOS QUE NOS PASARON Y RETORNAR BOOLEAN
        const response: hasAllergenResponse = {
            hasAllergen : false,
            recipe : ''
        }
        const pizza: Recipe  = await this.recipeRepository.createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
        .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient')
        .leftJoinAndSelect('ingredient.foodType', 'foodType')
        .where('recipe.name = :recipe', {recipe:recipe} )
        .getOne()
        if(!pizza){
            return response;
        }
        response.recipe = pizza.name;

        for(let i =0; i < pizza.recipeIngredients.length; i++){
            if((pizza.recipeIngredients[i].ingredient.foodType.isAllergen)&&(allergens.includes(pizza.recipeIngredients[i].ingredient.name))){
                response.hasAllergen = true;
                return response;
            }
        }
        response.hasAllergen = false;
        return response;
    }

    async hasFoodType(foodTypes: string[], recipe: string) :  Promise<Recipe>{ //HACER LOGICA PARA VER SI TIENE ESOS FOODTYPES QUE NOS PASARON Y RETORNAR BOOLEAN
        return await this.recipeRepository.createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
        .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient')
        .leftJoinAndSelect('ingredient.foodType', 'foodType')
        .where('recipe.name = :recipe', {recipe:recipe} )
        .getOne()
    }

    async removeAllergens(allergens: string[], recipe: string) :  Promise<Recipe>{ //HACER LOGICA PARA SACAR LOS ALERGENOS DE LA RECETA
        return await this.recipeRepository.createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
        .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient')
        .leftJoinAndSelect('ingredient.foodType', 'foodType')
        .where('recipe.name = :recipe', {recipe:recipe} )
        .getOne()
    }


    async removeFoodType(foodTypes: string[], recipe: string) :  Promise<Recipe>{ //HACER LOGICA PARA SACAR LOS FOODTYPES DE LA RECETA
        return await this.recipeRepository.createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
        .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient')
        .leftJoinAndSelect('ingredient.foodType', 'foodType')
        .where('recipe.name = :recipe', {recipe:recipe} )
        .getOne()
    }

    async getCalories(recipe: string) :  Promise<Recipe>{ //HACER LOGICA PARA DEVOLVER CALORIAS
        return await this.recipeRepository.createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
        .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient')
        .leftJoinAndSelect('ingredient.foodType', 'foodType')
        .where('recipe.name = :recipe', {recipe:recipe} )
        .getOne()
    }
    
    async doubleIngredietns(ingredients: string[],recipe: string) :  Promise<Recipe>{ //HACER LOGICA PARA DEVOLVER CALORIAS
        return await this.recipeRepository.createQueryBuilder('recipe')
        .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredients')
        .leftJoinAndSelect('recipeIngredients.ingredient', 'ingredient')
        .leftJoinAndSelect('ingredient.foodType', 'foodType')
        .where('recipe.name = :recipe', {recipe:recipe} )
        .getOne()
    }
};
