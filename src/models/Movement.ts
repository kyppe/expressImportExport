import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Article } from './Article';
import { Fournisseur } from './Fournisseur';

@Table({ tableName: 'movements' })
class Movement extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,

  })
  userId!: number;

  @Column({
    type: DataType.STRING,
 
  })
  type!: string;

  @Column({
    type: DataType.INTEGER,

  })
  value!: number;

  @Column({
    type: DataType.DATE,

    defaultValue: DataType.NOW
  })
  date!: Date;

  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
   
  })
  articleId?: number;




  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Article)
  article?: Article;


  @ForeignKey(() => Fournisseur)
  @Column({
    type: DataType.INTEGER,
  })
  fournisseurId?: number;
  
  @BelongsTo(() => Fournisseur)
  fournisseur!: Fournisseur;
}

export { Movement };
