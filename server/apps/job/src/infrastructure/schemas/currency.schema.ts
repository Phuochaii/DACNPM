import { Entity } from 'typeorm';
import { Base } from './Base.schema';

@Entity()
export class Currency extends Base {}