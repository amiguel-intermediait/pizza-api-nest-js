import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "./ingredient.entity";

@Entity()
export class FoodType {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: false})
    name : string;

    @Column({ nullable: false})
    isAllergen : boolean;

    @OneToMany(() => Ingredient, ingredient => ingredient.foodType)
    ingredients: Ingredient[];
}
