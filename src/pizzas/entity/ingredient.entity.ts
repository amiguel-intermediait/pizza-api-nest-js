import { Column, Entity,ManyToOne,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FoodType } from "./food_type.entity";
import { RecipeIngredient } from "./recipe_ingredient.entity";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    calories: number;

    @OneToMany(() => RecipeIngredient, (recipesIngridient) => recipesIngridient.ingredient)
    recipesIngridients: RecipeIngredient[];

    @Column({nullable: false})
    foodTypeId: number;

    @ManyToOne(() => FoodType, foodType => foodType.ingredients)
    foodType: FoodType;


}