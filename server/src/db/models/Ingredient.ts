import { Document, Schema, Model, model } from 'mongoose';
import { menuItemSchema } from './menuItem';
import { TOrderStatus } from '../../../../common/Interfaces';
import {Unit} from './Unit';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

export type TfmiId = string;

export interface Ingredient {
  _id?: TfmiId;
  title: string;
  amount: number;
  unit?: { id: string};
}

export interface IIngredient {
  title: string;
  amount: number;
  unit?: { id: string};
}

const IngredientSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  unit: { type: Object }
});

interface IIngredientModel extends IIngredient, Document {}

export const Ingredient: Model<IIngredientModel> = model<IIngredientModel>('Ingredient', IngredientSchema);
