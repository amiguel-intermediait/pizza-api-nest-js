import { Body, Controller, forwardRef, Get, HttpStatus, Inject, Param, Post, Req, Res } from '@nestjs/common';
import { Recipe } from '../entity/recipe.entity';
import { hasAllergenResponse } from '../dtos/dtos';
import { PizzasService } from '../services/pizzas.service';


@Controller('pizzas')
export class PizzasController {
    constructor(
        @Inject(forwardRef(() => PizzasService))
        private readonly pizzasService: PizzasService
        ) {}

    @Get('/allergens')            //  ## pizzas/allergens?allergens=asd&allergens=qwe&recipe=pizza ## 
    async hasAllergens(@Req() req, @Res() res):  Promise<hasAllergenResponse>{;
        try {
            const allergens : string[] = req.query.allergens; 
            const recipe :string = req.query.recipe;
            const pizza: hasAllergenResponse = await this.pizzasService.hasAllergen(allergens,recipe);
            if(pizza.recipe === '' ){
                return res.status(HttpStatus.BAD_REQUEST).json(
                    "Recipe doesn't exist"
                );
            }
            return res.status(HttpStatus.OK).json(pizza);
        } catch (error) {
            console.log(error)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                "Something is wrong"
            );
        }
    }

    @Get('/foodtype')            //   ## pizzas/foodtype?foodtypes=asd&foodtypes=qwe&recipe=pizza ##
    async hasFoodType(@Req() req, @Res() res):  Promise<Recipe>{;
        try {
            const foodTypes : string[] = req.query.foodtypes;
            const recipe :string = req.query.recipe;
            const pizza: Recipe = await this.pizzasService.hasFoodType(foodTypes,recipe);
            if(!pizza){
                return res.status(HttpStatus.BAD_REQUEST).json(
                    "Recipe doesn't exist"
                );
            }
            return res.status(HttpStatus.OK).json([pizza]);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                "Something is wrong"
            );
        }
    }

    @Post('/removeallergens')
    async removeAllergens(@Res() res, @Body() body):  Promise<Recipe>{;
        try {
            const pizza: Recipe = await this.pizzasService.removeAllergens(body.allergens,body.recipe);
            if(!pizza){
                return res.status(HttpStatus.BAD_REQUEST).json(
                    "Recipe doesn't exist"
                );
            }
            return res.status(HttpStatus.OK).json([pizza]);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                "Something is wrong"
            );
        }
    }

    @Post('/removefoodtype')
    async removeFoodType(@Res() res, @Body() body):  Promise<Recipe>{;
        try {
            const pizza: Recipe = await this.pizzasService.removeFoodType(body.foodTypes,body.recipe);
            if(!pizza){
                return res.status(HttpStatus.BAD_REQUEST).json(
                    "Recipe doesn't exist"
                );
            }
            return res.status(HttpStatus.OK).json([pizza]);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                "Something is wrong"
            );
        }
    }

    @Get('/:recipe/calories')
    async getCalories(@Res() res, @Param() params):  Promise<Recipe>{;
        try {
            const pizza: Recipe = await this.pizzasService.getCalories(params.recipe);
            if(!pizza){
                return res.status(HttpStatus.BAD_REQUEST).json(
                    "Recipe doesn't exist"
                );
            }
            return res.status(HttpStatus.OK).json([pizza]);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                "Something is wrong"
            );
        }
    }

    @Post('/:recipe/dobule')
    async dobuleIngredients(@Res() res, @Body() body, @Param() params):  Promise<Recipe>{;
        try {
            const pizza: Recipe = await this.pizzasService.doubleIngredietns(body.ingredients, params.recipe);
            if(!pizza){
                return res.status(HttpStatus.BAD_REQUEST).json(
                    "Recipe doesn't exist"
                );
            }
            return res.status(HttpStatus.OK).json([pizza]);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                "Something is wrong"
            );
        }
    }
}
