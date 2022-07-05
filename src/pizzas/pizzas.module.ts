import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzasController } from './controllers/pizzas.controller';
import { Ingredient } from './entity/ingredient.entity';
import { Recipe } from './entity/recipe.entity';
import { RecipeIngredient } from './entity/recipe_ingredient.entity';
import { PizzasService } from './services/pizzas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, Ingredient, RecipeIngredient])
  ],
  controllers: [PizzasController],
  providers: [PizzasService]
})
export class PizzasModule {}
